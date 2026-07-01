import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { resend, fromEmail } from "@/lib/email/resend";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    // 1. Verifikasi Signature Key Midtrans
    const orderId = payload.order_id;
    const statusCode = payload.status_code;
    const grossAmount = payload.gross_amount;
    const serverKey = process.env.MIDTRANS_SERVER_KEY || "";
    const signatureKey = payload.signature_key;

    const hash = crypto.createHash('sha512').update(`${orderId}${statusCode}${grossAmount}${serverKey}`).digest('hex');

    if (hash !== signatureKey) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // 2. Cek status transaksi
    const transactionStatus = payload.transaction_status;
    const fraudStatus = payload.fraud_status;

    let isPaid = false;

    if (transactionStatus == 'capture') {
        if (fraudStatus == 'accept') {
            isPaid = true;
        }
    } else if (transactionStatus == 'settlement') {
        isPaid = true;
    }

    if (!isPaid) {
      // Abaikan jika bukan status sukses (misal pending, deny, expire, cancel)
      return NextResponse.json({ message: "Ignored, status not paid" }, { status: 200 });
    }

    // 3. Ekstrak Custom Fields
    // Di client.ts:
    // custom_field1: userId
    // custom_field2: planId
    // custom_field3: type (atau addon_domain:tenantId)
    
    const userId = payload.custom_field1;
    let planId = payload.custom_field2;
    if (planId === "none") planId = null;

    let transactionType = payload.custom_field3 || "subscription";
    let tenantId = null;

    if (transactionType.startsWith("addon_domain:")) {
      tenantId = transactionType.split(":")[1];
      transactionType = "addon_domain";
    }

    if (!userId) {
      return NextResponse.json({ error: "Missing user_id in custom_fields" }, { status: 400 });
    }

    const supabaseAdmin = getSupabaseAdmin();

    if (transactionType === 'topup' || transactionType === 'addon_domain') {
      console.log(`[Webhook] Menerima pembayaran ${transactionType} sebesar ${grossAmount} untuk user ${userId}`);
      
      // Catat di tabel transactions
      await supabaseAdmin.from("transactions").insert({
        user_id: userId,
        type: transactionType,
        amount: parseFloat(grossAmount),
        status: "success",
        reference_id: payload.transaction_id || null,
        description: `Pembayaran ${transactionType} berhasil via Midtrans`
      });

      // Jika addon_domain, perpanjang expires_at domain spesifik
      if (transactionType === 'addon_domain' && tenantId) {
        const { data: tenant } = await supabaseAdmin
          .from("tenants")
          .select("expires_at, is_active")
          .eq("id", tenantId)
          .eq("user_id", userId)
          .single();
          
        let nextMonth = new Date();
        if (tenant?.is_active && tenant?.expires_at) {
          const currentExp = new Date(tenant.expires_at);
          // Jika masih aktif (belum expired), tambahkan 1 bulan dari masa aktif saat ini
          if (currentExp > nextMonth) {
            nextMonth = currentExp;
          }
        }
        nextMonth.setMonth(nextMonth.getMonth() + 1);

        await supabaseAdmin.from("tenants").update({
          is_active: true,
          expires_at: nextMonth.toISOString()
        }).eq("id", tenantId).eq("user_id", userId);
      } else if (transactionType === 'topup') {
        // TODO: Tambah saldo user
      }

      return NextResponse.json({ success: true, message: `Webhook processed for ${transactionType}` }, { status: 200 });
    }

    // Upsert Subscription
    if (!planId) {
      return NextResponse.json({ error: "Missing plan_id for subscription" }, { status: 400 });
    }

    const now = new Date();
    const nextPeriod = new Date();
    nextPeriod.setMonth(nextPeriod.getMonth() + 1); // Masa aktif 1 bulan untuk semua paket (Pro & Business)

    const { error: subError } = await supabaseAdmin
      .from("subscriptions")
      .upsert({
        user_id: userId,
        plan: planId,
        status: "active",
        current_period_start: now.toISOString(),
        current_period_end: nextPeriod.toISOString(),
      }, { onConflict: "user_id" });

    if (subError) {
      console.error("Error updating subscription:", subError);
      throw subError;
    }

    // Aktifkan Tenant bawaan tier jika ada (is_addon = false)
    const { error: tenantError } = await supabaseAdmin
      .from("tenants")
      .update({ is_active: true })
      .eq("user_id", userId)
      .eq("is_addon", false);

    if (tenantError) {
      console.error("Error activating tenant:", tenantError);
    }

    // Kirim Email Notifikasi via Resend
    // Midtrans tidak mengirim email customer kecuali kita minta di request API, tapi kita bisa ambil dari database
    const { data: authUser } = await supabaseAdmin.auth.admin.getUserById(userId);
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("full_name")
      .eq("id", userId)
      .single();

    const customerEmail = authUser?.user?.email;
    const customerName = profile?.full_name || authUser?.user?.user_metadata?.full_name || "Customer";

    if (customerEmail) {
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #0F62FE;">Pembayaran Berhasil! 🎉</h2>
          <p>Halo ${customerName},</p>
          <p>Terima kasih telah berlangganan paket <strong>${planId.toUpperCase()}</strong> di Upshare.</p>
          <p>Akun Anda telah diaktifkan, dan kini Anda dapat menikmati semua fitur premium kami.</p>
          <br/>
          <p>Salam hangat,<br/><strong>Tim Upshare</strong></p>
        </div>
      `;

      await resend.emails.send({
        from: `Upshare <${fromEmail}>`,
        to: customerEmail,
        subject: "Pembayaran Upshare Berhasil",
        html: emailHtml,
      });
    }

    return NextResponse.json({ success: true, message: "Webhook processed" }, { status: 200 });

  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
