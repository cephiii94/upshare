"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function updateTargetUrl(formData: FormData) {
  const targetUrl = formData.get("target_url") as string;

  if (!targetUrl) {
    return { error: "URL target tidak boleh kosong." };
  }

  // Validasi URL secara sederhana
  let cleanUrl = targetUrl.trim();
  if (!cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://")) {
    cleanUrl = "https://" + cleanUrl;
  }

  try {
    new URL(cleanUrl); // Tes parsing URL
  } catch (e) {
    return { error: "Format URL tidak valid." };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  // Update URL target di database
  const { error } = await supabase
    .from("tenants")
    .update({ target_url: cleanUrl })
    .eq("user_id", user.id);

  if (error) {
    console.error("Error updating target URL:", error);
    return { error: "Terjadi kesalahan saat menyimpan pengaturan." };
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/subdomains");

  return { success: true, message: "URL Target berhasil diperbarui!" };
}

export async function claimSubdomain(formData: FormData) {
  const subdomain = formData.get("subdomain") as string;

  if (!subdomain) {
    return { error: "Subdomain tidak boleh kosong." };
  }

  // Validasi format subdomain (hanya huruf kecil, angka, dan hyphen)
  const subdomainRegex = /^[a-z0-9-]+$/;
  if (!subdomainRegex.test(subdomain)) {
    return { error: "Subdomain hanya boleh berisi huruf kecil, angka, dan tanda hubung (-)." };
  }

  if (subdomain.length < 3 || subdomain.length > 30) {
    return { error: "Subdomain harus terdiri dari 3 hingga 30 karakter." };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  // Cek apakah user sudah punya subdomain
  const { data: existingTenant } = await supabase
    .from("tenants")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (existingTenant) {
    return { error: "Anda sudah memiliki subdomain. (Paket Gratis maksimal 1)" };
  }

  // Cek ketersediaan subdomain
  const { data: takenSubdomain } = await supabase
    .from("tenants")
    .select("id")
    .eq("subdomain", subdomain)
    .single();

  if (takenSubdomain) {
    return { error: "Subdomain ini sudah digunakan orang lain. Silakan pilih nama lain." };
  }

  // Klaim subdomain baru
  const { error } = await supabase
    .from("tenants")
    .insert({
      user_id: user.id,
      subdomain: subdomain,
      is_active: true, // Untuk saat ini kita buat langsung aktif
    });

  if (error) {
    console.error("Error claiming subdomain:", error);
    return { error: "Terjadi kesalahan saat mengklaim subdomain." };
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/subdomains");

  return { success: true, message: "Subdomain berhasil diklaim!" };
}

