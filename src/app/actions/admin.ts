"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";
import { safeAction } from "@/lib/safe-action";

const AdminCreateSubdomainSchema = z.object({
  user_id: z.string().uuid({ message: "Pilih pengguna yang valid." }),
  subdomain: z
    .string()
    .min(3, { message: "Minimal 3 karakter." })
    .max(30, { message: "Maksimal 30 karakter." })
    .regex(/^[a-z0-9-]+$/, { message: "Hanya huruf kecil, angka, dan strip (-)." })
    .trim(),
});

// Helper: Check Admin
async function checkAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;
  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single();
  return !!profile?.is_admin;
}

export const adminCreateSubdomain = safeAction(async (formData: FormData) => {
  if (!(await checkAdmin())) return { success: false, error: "Unauthorized" };

  const validation = AdminCreateSubdomainSchema.safeParse({
    user_id: formData.get("user_id"),
    subdomain: formData.get("subdomain"),
  });

  if (!validation.success) {
    return { success: false, error: validation.error.issues[0]?.message || "Input tidak valid" };
  }

  const { user_id, subdomain } = validation.data;
  const adminSupabase = getSupabaseAdmin();

  // Cek ketersediaan
  const { data: taken } = await adminSupabase.from("tenants").select("id").eq("subdomain", subdomain).single();
  if (taken) return { success: false, error: "Subdomain sudah terpakai." };

  const { error } = await adminSupabase.from("tenants").insert({
    user_id,
    subdomain,
    is_active: true,
  });

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/subdomains");
  return { success: true, message: "Subdomain berhasil dibuat." };
});

export const adminDeleteSubdomain = safeAction(async (formData: FormData) => {
  if (!(await checkAdmin())) return { success: false, error: "Unauthorized" };

  const tenant_id = formData.get("tenant_id");
  if (!tenant_id || typeof tenant_id !== "string") return { success: false, error: "Invalid ID" };

  const adminSupabase = getSupabaseAdmin();
  const { error } = await adminSupabase.from("tenants").delete().eq("id", tenant_id);

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/subdomains");
  return { success: true, message: "Subdomain berhasil dihapus." };
});
