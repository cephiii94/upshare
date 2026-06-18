import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";
import { AuthLayout } from "@/components/auth/auth-layout";

export const metadata: Metadata = {
  title: "Masuk ke Upshare",
  description: "Login ke akun Upshare Anda untuk mengelola subdomain dan file Anda.",
};

export default function LoginPage() {
  return (
    <AuthLayout
      title="Selamat Datang Kembali"
      subtitle="Masuk untuk melanjutkan ke dashboard Anda"
    >
      <LoginForm />
    </AuthLayout>
  );
}
