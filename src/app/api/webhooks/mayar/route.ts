import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { resend, fromEmail } from "@/lib/email/resend";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    // 1. Verifikasi Webhook Secret (Authorization header atau Custom Header)
    const authHeader = req.headers.get("Authorization");
    const mayarSecret = process.env.MAYAR_WEBHOOK_SECRET;

    if (mayarSecret && mayarSecret !== "your-mayar-webhook-secret") {
      const isAuthValid = 
        authHeader === `Bearer ${mayarSecret}` || 
        req.headers.get("x-mayar-signature") === mayarSecret;
      
      if (!isAuthValid) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const payload = await req.json();
    console.log("[Mayar Webhook] Received payload:", JSON.stringify(payload, null, 2));

    // 2. Ekstrak data pembayaran
    // Struktur payload disesuaikan dengan standar Mayar (misalnya status, data.status, dll)
    const status = payload.status || payload.data?.status;
    const event = payload.event;
    
    // Status PAID, COMPLETED, SUCCESS atau event payment.received menandakan pembayaran sukses
    const isPaid = 
      event === "payment.received" || 
      status === "PAID" || 
      status === "COMPLETED" || 
      status === "SUCCESS" || 
      status === "success" || 
      status === "paid";

    if (!isPaid) {
      // Abaikan jika bukan status sukses
      return NextResponse.json({ message: "Ignored, status not paid" }, { status: 200 });
    }

    const customerEmail = payload.customer?.email || payload.data?.customer?.email || payload.email || payload.data?.email;
    const customerName = payload.customer?.name || payload.data?.customer?.name || payload.name || payload.data?.name || "Customer";
    const customFields = payload.custom_field || payload.data?.custom_field || payload.extraData || payload.data?.extraData || {};
    
    const userId = customFields.user_id || customFields.userId;
    let planId = customFields.plan_id || customFields.planId;
    if (planId === "none") planId = null;

    if (!userId) {
      return NextResponse.json({ error: "Missing user_id in custom_fields" }, { status: 400 });
    }

    // 3. Update Database (Supabase) via Admin (bypass RLS)
    const supabaseAdmin = getSupabaseAdmin();
    
    // Cek apakah ini transaksi subscription atau topup/addon
    const transactionType = customFields.type || 'subscription';
    const amount = parseFloat(payload.amount || payload.data?.amount || 0);

    if (transactionType === 'topup' || transactionType === 'addon_domain') {
      console.log(`[Webhook] Menerima pembayaran ${transactionType} sebesar ${amount} untuk user ${userId}`);
      
      // Catat di tabel transactions
      await supabaseAdmin.from("transactions").insert({
        user_id: userId,
        type: transactionType,
        amount: amount,
        status: "success",
        reference_id: payload.id || payload.data?.id || null,
        description: `Pembayaran ${transactionType} berhasil via Mayar`
      });

      // Jika addon_domain, perpanjang expires_at domain spesifik
      const tenantId = customFields.tenant_id || customFields.tenantId;
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
        // TODO: Tambah saldo user jika dibutuhkan
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

    // 4. Kirim Email Notifikasi via Resend
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
