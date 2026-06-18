"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";
import { headers } from "next/headers";
import { tenantRateLimit } from "@/lib/ratelimit";
import { safeAction } from "@/lib/safe-action";

const ProfileSchema = z.object({
  full_name: z
    .string()
    .min(2, { message: "Nama minimal terdiri dari 2 karakter." })
    .max(50, { message: "Nama maksimal terdiri dari 50 karakter." })
    .trim(),
});

export const updateProfile = safeAction(async (formData: FormData) => {
  const ip = (await headers()).get("x-forwarded-for") ?? "127.0.0.1";
  const { success: rateLimitSuccess } = await tenantRateLimit.limit(ip);
  if (!rateLimitSuccess) {
    return { success: false, error: "Terlalu banyak permintaan. Silakan coba beberapa saat lagi." };
  }

  const validation = ProfileSchema.safeParse({
    full_name: formData.get("full_name"),
  });

  if (!validation.success) {
    return { success: false, error: validation.error.issues[0]?.message || "Input tidak valid" };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Autentikasi tidak valid. Silakan login kembali." };
  }

  // Update profil di database
  const { error } = await supabase
    .from("profiles")
    .update({ full_name: validation.data.full_name })
    .eq("id", user.id);

  if (error) {
    console.error("Error updating profile:", error);
    return { success: false, error: "Terjadi kesalahan saat menyimpan profil." };
  }

  // Segarkan (refresh) halaman settings dan seluruh dashboard untuk mengupdate nama di Sidebar
  revalidatePath("/dashboard/settings");
  revalidatePath("/dashboard", "layout");

  return { success: true, message: "Profil berhasil diperbarui!" };
});
