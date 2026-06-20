"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createPaymentLink } from "@/lib/mayar/client";
import { safeAction } from "@/lib/safe-action";

export const createCheckoutSession = safeAction(async (formData: FormData) => {
  const planId = formData.get("planId") as "pro" | "business";
  
  if (!planId || !["pro", "business"].includes(planId)) {
    return { success: false, error: "Plan langganan tidak valid" };
  }

  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  // Ambil profil user untuk mendapatkan nama
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  const customerName = profile?.full_name || user.email?.split("@")[0] || "Customer";
  const customerEmail = user.email || "";

  // Set harga dan deskripsi
  let amount = 0;
  let name = "";
  let description = "";

  if (planId === "pro") {
    amount = 50000;
    name = "Paket Pro Upshare";
    description = "Langganan Paket Pro selama 1 Bulan";
  } else if (planId === "business") {
    amount = 150000;
    name = "Paket Business Upshare";
    description = "Langganan Paket Business selama 1 Bulan";
  }

  // Buat link pembayaran
  const paymentUrl = await createPaymentLink({
    name,
    description,
    amount,
    customerName,
    customerEmail,
    userId: user.id,
    planId,
  });

  if (!paymentUrl) {
    return { success: false, error: "Gagal membuat sesi pembayaran. Silakan coba lagi nanti." };
  }

  // Redirect user ke halaman checkout Mayar
  // Redirect ini akan melempar 'NEXT_REDIRECT' yang akan dilewatkan dengan aman oleh safeAction
  redirect(paymentUrl);
});

export const buyAddonDomain = safeAction(async (formData: FormData) => {
  const tenantId = formData.get("tenant_id") as string;
  
  if (!tenantId) {
    return { success: false, error: "ID Domain tidak valid" };
  }

  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  // Verifikasi kepemilikan domain
  const { data: tenant } = await supabase
    .from("tenants")
    .select("subdomain, is_addon")
    .eq("id", tenantId)
    .eq("user_id", user.id)
    .single();

  if (!tenant) {
    return { success: false, error: "Domain tidak ditemukan" };
  }

  // Ambil profil user untuk mendapatkan nama
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  const customerName = profile?.full_name || user.email?.split("@")[0] || "Customer";
  const customerEmail = user.email || "";

  // Set harga dan deskripsi untuk Addon
  const amount = 10000;
  const name = `Add-on Domain: ${tenant.subdomain}.upshare.id`;
  const description = `Aktivasi/Perpanjangan Add-on Domain selama 30 Hari`;

  // Buat link pembayaran
  const paymentUrl = await createPaymentLink({
    name,
    description,
    amount,
    customerName,
    customerEmail,
    userId: user.id,
    type: "addon_domain",
    tenantId,
  });

  if (!paymentUrl) {
    return { success: false, error: "Gagal membuat sesi pembayaran. Silakan coba lagi nanti." };
  }

  redirect(paymentUrl);
});
