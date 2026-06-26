"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createSnapTransaction } from "@/lib/midtrans/client";
import { safeAction } from "@/lib/safe-action";
import crypto from "crypto";

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
  let itemName = "";

  if (planId === "pro") {
    amount = 50000;
    itemName = "Paket Pro Upshare";
  } else if (planId === "business") {
    amount = 150000;
    itemName = "Paket Business Upshare";
  }

  const orderId = `SUB-${user.id.substring(0, 8)}-${Date.now()}`;

  // Buat snap token
  const snapToken = await createSnapTransaction({
    orderId,
    itemName,
    amount,
    customerName,
    customerEmail,
    userId: user.id,
    planId,
    type: "subscription"
  });

  if (!snapToken) {
    return { success: false, error: "Gagal membuat sesi pembayaran. Silakan coba lagi nanti." };
  }

  // Mengembalikan token ke klien untuk membuka pop-up
  return { success: true, data: { snapToken } };
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
  const itemName = `Add-on Domain: ${tenant.subdomain}.upshare.id`;

  const orderId = `ADDON-${tenantId.substring(0, 8)}-${Date.now()}`;

  // Buat snap token
  const snapToken = await createSnapTransaction({
    orderId,
    itemName,
    amount,
    customerName,
    customerEmail,
    userId: user.id,
    type: "addon_domain",
    tenantId,
  });

  if (!snapToken) {
    return { success: false, error: "Gagal membuat sesi pembayaran. Silakan coba lagi nanti." };
  }

  return { success: true, data: { snapToken } };
});
