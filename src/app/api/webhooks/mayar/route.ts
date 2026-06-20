import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { resend, fromEmail } from "@/lib/email/resend";

export async function POST(req: NextRequest) {
  try {
    // 1. Verifikasi Webhook Secret (Sederhana via Authorization header atau Custom Header)
    // Dalam praktek nyatanya, sesuaikan dengan dokumentasi Mayar (misal memvalidasi HMAC SHA256)
    const authHeader = req.headers.get("Authorization");
    const mayarSecret = process.env.MAYAR_WEBHOOK_SECRET;

    if (mayarSecret && authHeader !== `Bearer ${mayarSecret}` && req.headers.get("x-mayar-signature") !== mayarSecret) {
      // Kita cek Bearer atau custom header. Untuk keamanan produksi pastikan validasi HMAC jika didukung
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await req.json();

    // 2. Ekstrak data pembayaran
    // Struktur payload disesuaikan dengan standar Mayar (misalnya status, data.status, dll)
    const status = payload.status || payload.data?.status;
    const isPaid = status === "PAID" || status === "COMPLETED" || status === "SUCCESS";

    if (!isPaid) {
      // Abaikan jika bukan status sukses
      return NextResponse.json({ message: "Ignored, status not paid" }, { status: 200 });
    }

    const customerEmail = payload.customer?.email || payload.data?.customer?.email;
    const customerName = payload.customer?.name || payload.data?.customer?.name;
    const customFields = payload.custom_field || payload.data?.custom_field || {};
    
    const userId = customFields.user_id;
    const planId = customFields.plan_id;

    if (!userId || !planId) {
      return NextResponse.json({ error: "Missing user_id or plan_id in custom_fields" }, { status: 400 });
    }

    // 3. Update Database (Supabase) via Admin (bypass RLS)
    const supabaseAdmin = getSupabaseAdmin();
    
    // Cek apakah ini transaksi subscription atau topup/addon
    const transactionType = customFields.type || 'subscription';

    if (transactionType === 'topup' || transactionType === 'addon_domain') {
      // TODO: Implementasi logika penambahan saldo (wallets) atau perpanjangan domain (expires_at)
      console.log(`[Webhook] Menerima pembayaran ${transactionType} sebesar ${payload.amount} untuk user ${userId}`);
      
      // Catat di tabel transactions
      await supabaseAdmin.from("transactions").insert({
        user_id: userId,
        type: transactionType,
        amount: payload.amount || 0,
        status: "success",
        reference_id: payload.id || null,
        description: `Pembayaran ${transactionType} berhasil`
      });

      // Jika addon_domain, perpanjang expires_at domain spesifik
      if (transactionType === 'addon_domain' && customFields.tenant_id) {
        const nextMonth = new Date();
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        await supabaseAdmin.from("tenants").update({
          is_active: true,
          expires_at: nextMonth.toISOString()
        }).eq("id", customFields.tenant_id).eq("user_id", userId);
      } else if (transactionType === 'topup') {
        // TODO: Tambah saldo user
      }

      return NextResponse.json({ success: true, message: `Webhook processed for ${transactionType}` }, { status: 200 });
    }

    // a. Upsert Subscription (Logika default)
    const now = new Date();
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    const { error: subError } = await supabaseAdmin
      .from("subscriptions")
      .upsert({
        user_id: userId,
        plan: planId,
        status: "active",
        current_period_start: now.toISOString(),
        current_period_end: nextMonth.toISOString(),
      }, { onConflict: "user_id" });

    if (subError) {
      console.error("Error updating subscription:", subError);
      throw subError;
    }

    // b. Aktifkan Tenant bawaan tier jika ada (is_addon = false)
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
          <p>Halo ${customerName || "Customer"},</p>
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
