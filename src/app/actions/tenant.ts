"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";
import { headers } from "next/headers";
import { tenantRateLimit } from "@/lib/ratelimit";
import { safeAction } from "@/lib/safe-action";

// ── Schemas ────────────────────────────────────────────────────────────────
const TargetUrlSchema = z.object({
  target_url: z
    .string()
    .min(1, { message: "URL target tidak boleh kosong." })
    .transform((url) => {
      let cleanUrl = url.trim();
      if (!cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://")) {
        cleanUrl = "https://" + cleanUrl;
      }
      return cleanUrl;
    })
    .refine(
      (url) => {
        try {
          new URL(url);
          return true;
        } catch {
          return false;
        }
      },
      { message: "Format URL tidak valid." }
    ),
});

const SubdomainSchema = z.object({
  subdomain: z
    .string()
    .min(3, { message: "Subdomain harus terdiri dari 3 hingga 30 karakter." })
    .max(30, { message: "Subdomain harus terdiri dari 3 hingga 30 karakter." })
    .regex(/^[a-z0-9-]+$/, {
      message: "Subdomain hanya boleh berisi huruf kecil, angka, dan tanda hubung (-).",
    })
    .trim(),
});

// ── Actions ────────────────────────────────────────────────────────────────

export const updateTargetUrl = safeAction(async (formData: FormData) => {
  const ip = (await headers()).get("x-forwarded-for") ?? "127.0.0.1";
  const { success: rateLimitSuccess } = await tenantRateLimit.limit(ip);
  if (!rateLimitSuccess) {
    return { success: false, error: "Terlalu banyak permintaan. Silakan coba beberapa saat lagi." };
  }

  const validation = TargetUrlSchema.safeParse({
    target_url: formData.get("target_url"),
  });

  if (!validation.success) {
    return { success: false, error: validation.error.issues[0]?.message || "Input tidak valid" };
  }

  const cleanUrl = validation.data.target_url;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  // Update URL target di database
  const { error } = await supabase
    .from("tenants")
    .update({ target_url: cleanUrl })
    .eq("user_id", user.id);

  if (error) {
    console.error("Error updating target URL:", error);
    return { success: false, error: "Terjadi kesalahan saat menyimpan pengaturan." };
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/subdomains");

  return { success: true, message: "URL Target berhasil diperbarui!" };
});

export const claimSubdomain = safeAction(async (formData: FormData) => {
  const ip = (await headers()).get("x-forwarded-for") ?? "127.0.0.1";
  const { success: rateLimitSuccess } = await tenantRateLimit.limit(ip);
  if (!rateLimitSuccess) {
    return { success: false, error: "Terlalu banyak permintaan. Silakan coba beberapa saat lagi." };
  }

  const validation = SubdomainSchema.safeParse({
    subdomain: formData.get("subdomain"),
  });

  if (!validation.success) {
    return { success: false, error: validation.error.issues[0]?.message || "Input tidak valid" };
  }

  const subdomain = validation.data.subdomain;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  // Cek apakah user sudah punya subdomain
  const { data: existingTenant } = await supabase
    .from("tenants")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (existingTenant) {
    return { success: false, error: "Anda sudah memiliki subdomain. (Paket Gratis maksimal 1)" };
  }

  // Cek ketersediaan subdomain
  const { data: takenSubdomain } = await supabase
    .from("tenants")
    .select("id")
    .eq("subdomain", subdomain)
    .single();

  if (takenSubdomain) {
    return { success: false, error: "Subdomain ini sudah digunakan orang lain. Silakan pilih nama lain." };
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
    return { success: false, error: "Terjadi kesalahan saat mengklaim subdomain." };
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/subdomains");

  return { success: true, message: "Subdomain berhasil diklaim!" };
});

export const deleteSubdomain = safeAction(async () => {
  const ip = (await headers()).get("x-forwarded-for") ?? "127.0.0.1";
  const { success: rateLimitSuccess } = await tenantRateLimit.limit(ip);
  if (!rateLimitSuccess) {
    return { success: false, error: "Terlalu banyak permintaan. Silakan coba beberapa saat lagi." };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  // Hapus subdomain milik user tersebut
  const { error } = await supabase
    .from("tenants")
    .delete()
    .eq("user_id", user.id);

  if (error) {
    console.error("Error deleting subdomain:", error);
    return { success: false, error: "Terjadi kesalahan saat menghapus subdomain." };
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/subdomains");

  return { success: true, message: "Subdomain berhasil dihapus." };
});
