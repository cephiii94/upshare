import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export async function GET(req: NextRequest) {
  try {
    // 1. Verifikasi CRON_SECRET agar tidak bisa ditembak sembarangan
    const authHeader = req.headers.get("Authorization");
    const cronSecret = process.env.CRON_SECRET;
    
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabaseAdmin = getSupabaseAdmin();
    const now = new Date().toISOString();

    console.log(`[CRON] Starting domain & subscription check at ${now}`);

    // ==========================================
    // TUGAS 1: Matikan Domain Add-on yang Expired
    // ==========================================
    const { error: addonError } = await supabaseAdmin
      .from("tenants")
      .update({ is_active: false })
      .eq("is_addon", true)
      .eq("is_active", true)
      .lt("expires_at", now);

    if (addonError) {
      console.error("[CRON] Error updating expired addon domains:", addonError);
    } else {
      console.log("[CRON] Successfully checked and deactivated expired addon domains.");
    }

    // ==========================================
    // TUGAS 2: Matikan Langganan & Domain Bawaan
    // ==========================================
    // Cari semua langganan yang masa aktifnya sudah habis
    const { data: expiredSubs, error: getSubsError } = await supabaseAdmin
      .from("subscriptions")
      .select("user_id")
      .eq("status", "active")
      .lt("current_period_end", now);

    if (getSubsError) {
      console.error("[CRON] Error fetching expired subscriptions:", getSubsError);
    } else if (expiredSubs && expiredSubs.length > 0) {
      const userIds = expiredSubs.map(sub => sub.user_id);

      // a. Ubah status langganan menjadi past_due / inactive
      const { error: updateSubError } = await supabaseAdmin
        .from("subscriptions")
        .update({ status: "inactive" })
        .in("user_id", userIds);

      if (updateSubError) {
        console.error("[CRON] Error updating expired subscriptions status:", updateSubError);
      }

      // b. Matikan semua domain bawaan tier (is_addon = false) milik user yang expired
      const { error: baseDomainError } = await supabaseAdmin
        .from("tenants")
        .update({ is_active: false })
        .in("user_id", userIds)
        .eq("is_addon", false)
        .eq("is_active", true);

      if (baseDomainError) {
        console.error("[CRON] Error deactivating base domains for expired subs:", baseDomainError);
      }

      console.log(`[CRON] Deactivated ${userIds.length} expired subscriptions and their base domains.`);
    } else {
      console.log("[CRON] No expired subscriptions found.");
    }

    // ==========================================
    // TUGAS 3: Pengingat H-3 Expired Addon
    // ==========================================
    const targetStart = new Date();
    targetStart.setDate(targetStart.getDate() + 3);
    targetStart.setUTCHours(0, 0, 0, 0);

    const targetEnd = new Date(targetStart);
    targetEnd.setUTCDate(targetEnd.getUTCDate() + 1);

    const { data: expiringAddons, error: expiringError } = await supabaseAdmin
      .from("tenants")
      .select("id, subdomain, user_id, expires_at")
      .eq("is_addon", true)
      .eq("is_active", true)
      .gte("expires_at", targetStart.toISOString())
      .lt("expires_at", targetEnd.toISOString());

    if (expiringError) {
      console.error("[CRON] Error fetching expiring addon domains:", expiringError);
    } else if (expiringAddons && expiringAddons.length > 0) {
      const { resend, fromEmail } = await import("@/lib/email/resend");
      
      for (const addon of expiringAddons) {
        try {
          const { data: { user }, error: userError } = await supabaseAdmin.auth.admin.getUserById(addon.user_id);
          
          if (userError || !user?.email) {
            console.error(`[CRON] Error getting user email for ${addon.user_id}:`, userError);
            continue;
          }

          const expiryDate = new Date(addon.expires_at!).toLocaleDateString("id-ID", {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
          });

          await resend.emails.send({
            from: `Upshare <${fromEmail}>`,
            to: [user.email],
            subject: `Pemberitahuan: Domain ${addon.subdomain}.upshare.id akan kedaluwarsa`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>Halo,</h2>
                <p>Masa aktif Add-on Domain Anda <strong>${addon.subdomain}.upshare.id</strong> akan habis pada <strong>${expiryDate}</strong>.</p>
                <p>Agar proxy/undangan digital Anda tidak terputus, mohon segera perpanjang domain tersebut melalui Dashboard.</p>
                <p>Hanya dengan Rp 10.000, domain Anda akan kembali aktif selama 30 hari.</p>
                <br/>
                <a href="https://upshare.id/dashboard/subdomains" style="background-color: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Perpanjang Sekarang</a>
                <br/><br/>
                <p>Terima kasih,</p>
                <p><strong>Tim Upshare</strong></p>
              </div>
            `,
          });
          console.log(`[CRON] Sent H-3 reminder email to ${user.email} for domain ${addon.subdomain}`);
        } catch (err) {
          console.error(`[CRON] Failed to send email for domain ${addon.subdomain}:`, err);
        }
      }
    } else {
      console.log("[CRON] No expiring addon domains found for H-3 reminder.");
    }

    return NextResponse.json({ success: true, message: "Cron check completed" }, { status: 200 });

  } catch (error) {
    console.error("[CRON] Internal server error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
