import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/register-form";
import { AuthLayout } from "@/components/auth/auth-layout";

export const metadata: Metadata = {
  title: "Daftar ke Upshare",
  description: "Buat akun Upshare gratis dan mulai berbagi file secara profesional.",
};

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Buat Akun Gratis"
      subtitle="Bergabung dengan 5.000+ pengguna Upshare"
    >
      <RegisterForm />
    </AuthLayout>
  );
}
