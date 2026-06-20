"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";
import { headers } from "next/headers";
import { tenantRateLimit } from "@/lib/ratelimit";
import { safeAction } from "@/lib/safe-action";

// ── Schemas ────────────────────────────────────────────────────────────────
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

const TenantSettingsSchema = z.object({
  tenant_id: z.string().uuid({ message: "ID Subdomain tidak valid" }),
  category: z.enum(["universal", "undangan"]),
  target_url: z.string().nullable().optional().transform(url => {
    if (!url) return null;
    let cleanUrl = url.trim();
    if (cleanUrl && !cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://")) {
      cleanUrl = "https://" + cleanUrl;
    }
    return cleanUrl;
  }),
  template_data: z.string().nullable().optional(),
});

export const updateTenantSettings = safeAction(async (formData: FormData) => {
  const ip = (await headers()).get("x-forwarded-for") ?? "127.0.0.1";
  const { success: rateLimitSuccess } = await tenantRateLimit.limit(ip);
  if (!rateLimitSuccess) {
    return { success: false, error: "Terlalu banyak permintaan." };
  }

  const validation = TenantSettingsSchema.safeParse({
    tenant_id: formData.get("tenant_id"),
    category: formData.get("category"),
    target_url: formData.get("target_url"),
    template_data: formData.get("template_data"),
  });

  if (!validation.success) {
    console.error("Validation error:", validation.error.format());
    return { success: false, error: "Input tidak valid: " + validation.error.issues[0]?.message };
  }

  const { tenant_id, category, target_url, template_data } = validation.data;
  let parsedTemplateData = null;

  if (template_data) {
    try {
      parsedTemplateData = JSON.parse(template_data);
    } catch {
      return { success: false, error: "Data template tidak valid." };
    }
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { success: false, error: "Unauthorized" };

  const { error } = await supabase
    .from("tenants")
    .update({ 
      category, 
      target_url: target_url || null, 
      template_data: parsedTemplateData 
    })
    .eq("id", tenant_id)
    .eq("user_id", user.id);

  if (error) {
    console.error("Error updating tenant settings:", error);
    return { success: false, error: "Terjadi kesalahan saat menyimpan pengaturan." };
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/subdomains");

  return { success: true, message: "Pengaturan Subdomain berhasil disimpan!" };
});

const CreateSubdomainSchema = z.object({
  subdomain: z
    .string()
    .min(3, { message: "Subdomain harus terdiri dari 3 hingga 30 karakter." })
    .max(30, { message: "Subdomain harus terdiri dari 3 hingga 30 karakter." })
    .regex(/^[a-z0-9-]+$/, {
      message: "Subdomain hanya boleh berisi huruf kecil, angka, dan tanda hubung (-).",
    })
    .trim(),
  category: z.enum(["universal", "undangan"]),
  target_url: z.string().nullable().optional().transform(url => {
    if (!url) return null;
    let cleanUrl = url.trim();
    if (cleanUrl && !cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://")) {
      cleanUrl = "https://" + cleanUrl;
    }
    return cleanUrl;
  }),
  template_data: z.string().nullable().optional(),
});

export const checkSubdomainAvailability = async (subdomain: string) => {
  if (!subdomain || subdomain.length < 3) return false;
  
  const supabase = await createClient();
  const { data: takenSubdomain } = await supabase
    .from("tenants")
    .select("id")
    .eq("subdomain", subdomain)
    .single();

  return !takenSubdomain; // return true if available (not taken)
};

export const claimSubdomain = safeAction(async (formData: FormData) => {
  const ip = (await headers()).get("x-forwarded-for") ?? "127.0.0.1";
  const { success: rateLimitSuccess } = await tenantRateLimit.limit(ip);
  if (!rateLimitSuccess) {
    return { success: false, error: "Terlalu banyak permintaan. Silakan coba beberapa saat lagi." };
  }

  const validation = CreateSubdomainSchema.safeParse({
    subdomain: formData.get("subdomain"),
    category: formData.get("category"),
    target_url: formData.get("target_url"),
    template_data: formData.get("template_data"),
  });

  if (!validation.success) {
    return { success: false, error: validation.error.issues[0]?.message || "Input tidak valid" };
  }

  const { subdomain, category, target_url, template_data } = validation.data;
  let parsedTemplateData = null;

  if (template_data) {
    try {
      parsedTemplateData = JSON.parse(template_data);
    } catch {
      return { success: false, error: "Data template tidak valid." };
    }
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  // Cek jumlah subdomain yang sudah dimiliki user
  const { data: allTenants } = await supabase
    .from("tenants")
    .select("id, is_addon")
    .eq("user_id", user.id);

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("plan, status")
    .eq("user_id", user.id)
    .single();

  const isAdmin = profile?.is_admin || false;
  const isPro = subscription?.status === "active" && subscription?.plan === "pro";
  const isBusiness = subscription?.status === "active" && subscription?.plan === "business";

  let maxBaseDomains = 1;
  if (isPro) maxBaseDomains = 3;
  if (isBusiness) maxBaseDomains = 10;
  if (isAdmin) maxBaseDomains = 999;

  const baseTenantsCount = allTenants?.filter(t => !t.is_addon).length || 0;
  const isOverQuota = baseTenantsCount >= maxBaseDomains;

  // Cek ketersediaan subdomain
  const isAvailable = await checkSubdomainAvailability(subdomain);

  if (!isAvailable) {
    return { success: false, error: "Subdomain ini sudah digunakan orang lain. Silakan pilih nama lain." };
  }

  // Klaim subdomain baru beserta pengaturannya
  const { data: newTenant, error } = await supabase
    .from("tenants")
    .insert({
      user_id: user.id,
      subdomain: subdomain,
      category: category,
      target_url: target_url || null,
      template_data: parsedTemplateData,
      is_active: !isOverQuota,
      is_addon: isOverQuota,
    })
    .select("id")
    .single();

  if (error) {
    console.error("Error claiming subdomain:", error);
    return { success: false, error: "Terjadi kesalahan saat mengklaim subdomain." };
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/subdomains");

  if (isOverQuota) {
    return { 
      success: true, 
      message: "Subdomain dibuat! Karena kuota bawaan habis, silakan lakukan aktivasi (Beli Add-on).", 
      data: { id: newTenant.id, requirePayment: true } 
    };
  }

  return { success: true, message: "Subdomain berhasil dibuat!", data: { id: newTenant.id, requirePayment: false } };
});

const DeleteSubdomainSchema = z.object({
  tenant_id: z.string().uuid({ message: "ID Subdomain tidak valid." }),
});

export const deleteSubdomain = safeAction(async (formData: FormData) => {
  const ip = (await headers()).get("x-forwarded-for") ?? "127.0.0.1";
  const { success: rateLimitSuccess } = await tenantRateLimit.limit(ip);
  if (!rateLimitSuccess) {
    return { success: false, error: "Terlalu banyak permintaan. Silakan coba beberapa saat lagi." };
  }

  const validation = DeleteSubdomainSchema.safeParse({
    tenant_id: formData.get("tenant_id"),
  });

  if (!validation.success) {
    return { success: false, error: validation.error.issues[0]?.message || "Input tidak valid" };
  }

  const { tenant_id } = validation.data;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  // Hapus subdomain milik user tersebut berdasarkan tenant_id
  const { error } = await supabase
    .from("tenants")
    .delete()
    .eq("id", tenant_id)
    .eq("user_id", user.id);

  if (error) {
    console.error("Error deleting subdomain:", error);
    return { success: false, error: "Terjadi kesalahan saat menghapus subdomain." };
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/subdomains");

  return { success: true, message: "Subdomain berhasil dihapus." };
});
