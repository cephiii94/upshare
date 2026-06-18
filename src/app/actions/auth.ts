"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";
import { authRateLimit } from "@/lib/ratelimit";

// ── Schemas ────────────────────────────────────────────────────────────────
const LoginSchema = z.object({
  email: z.email({ error: "Masukkan alamat email yang valid." }).trim(),
  password: z
    .string()
    .min(6, { error: "Password minimal 6 karakter." })
    .trim(),
});

const RegisterSchema = z.object({
  full_name: z
    .string()
    .min(2, { error: "Nama minimal 2 karakter." })
    .max(100)
    .trim(),
  email: z.email({ error: "Masukkan alamat email yang valid." }).trim(),
  password: z
    .string()
    .min(8, { error: "Password minimal 8 karakter." })
    .regex(/[a-zA-Z]/, { error: "Password harus mengandung huruf." })
    .regex(/[0-9]/, { error: "Password harus mengandung angka." })
    .trim(),
});

// ── Types ──────────────────────────────────────────────────────────────────
export type AuthFormState =
  | {
      errors?: {
        full_name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
      success?: boolean;
    }
  | undefined;

// ── Login Action ───────────────────────────────────────────────────────────
export async function loginAction(
  _state: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const ip = (await headers()).get("x-forwarded-for") ?? "127.0.0.1";
  const { success: rateLimitSuccess } = await authRateLimit.limit(ip);
  if (!rateLimitSuccess) {
    return { message: "Terlalu banyak percobaan login. Silakan coba beberapa saat lagi." };
  }

  const validated = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: validated.data.email,
    password: validated.data.password,
  });

  if (error) {
    console.error("Login error details:", error);
    return {
      message:
        error.message === "Invalid login credentials"
          ? "Email atau password salah."
          : `Terjadi kesalahan: ${error.message}`,
    };
  }

  redirect("/dashboard");
}

// ── Register Action ────────────────────────────────────────────────────────
export async function registerAction(
  _state: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const ip = (await headers()).get("x-forwarded-for") ?? "127.0.0.1";
  const { success: rateLimitSuccess } = await authRateLimit.limit(ip);
  if (!rateLimitSuccess) {
    return { message: "Terlalu banyak percobaan pendaftaran. Silakan coba beberapa saat lagi." };
  }

  const validated = RegisterSchema.safeParse({
    full_name: formData.get("full_name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: validated.data.email,
    password: validated.data.password,
    options: {
      data: {
        full_name: validated.data.full_name,
      },
    },
  });

  if (error) {
    if (error.message.includes("already registered")) {
      return { message: "Email ini sudah terdaftar. Silakan login." };
    }
    return { message: "Terjadi kesalahan saat mendaftar. Silakan coba lagi." };
  }

  // Kirim Welcome Email (Fire and forget, error tidak memblokir pendaftaran)
  try {
    const { resend, fromEmail } = await import("@/lib/email/resend");
    
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #0F62FE;">Selamat Datang di Upshare! 🚀</h2>
        <p>Halo ${validated.data.full_name},</p>
        <p>Terima kasih telah bergabung dengan Upshare, platform berbagi file premium Anda.</p>
        <p>Silakan konfirmasi email Anda dengan mengklik link yang telah kami kirim secara terpisah oleh sistem keamanan kami.</p>
        <br/>
        <p>Salam hangat,<br/><strong>Tim Upshare</strong></p>
      </div>
    `;

    await resend.emails.send({
      from: `Upshare <${fromEmail}>`,
      to: validated.data.email,
      subject: "Selamat Datang di Upshare",
      html: emailHtml,
    });
  } catch (emailErr) {
    console.error("Gagal mengirim welcome email:", emailErr);
  }

  return {
    success: true,
    message:
      "Pendaftaran berhasil! Cek email Anda untuk konfirmasi akun.",
  };
}

// ── Google OAuth Action ────────────────────────────────────────────────────
export async function loginWithGoogleAction() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  });

  if (error) {
    redirect("/login?error=oauth");
  }

  if (data.url) {
    redirect(data.url);
  }
}

// ── Logout Action ──────────────────────────────────────────────────────────
export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
