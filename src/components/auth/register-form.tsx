"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { registerAction, loginWithGoogleAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle2, Loader2, Eye, EyeOff } from "lucide-react";
import { useTransition } from "react";

// Google Icon SVG
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

// Password strength checker
function getPasswordStrength(password: string) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[a-zA-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;
  return score;
}

const strengthLabels = ["", "Lemah", "Sedang", "Kuat", "Sangat Kuat"];
const strengthColors = [
  "",
  "bg-red-400",
  "bg-yellow-400",
  "bg-blue-400",
  "bg-green-400",
];

export function RegisterForm() {
  const [state, action, isPending] = useActionState(registerAction, undefined);
  const [, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const passwordStrength = getPasswordStrength(password);

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    startTransition(() => {
      loginWithGoogleAction();
    });
  };

  // Sukses: tampilkan pesan konfirmasi
  if (state?.success) {
    return (
      <div className="flex flex-col items-center text-center gap-4 py-4">
        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-green-500" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground mb-1">
            Cek Email Anda!
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {state.message}
          </p>
        </div>
        <Button variant="outline" className="mt-2" asChild>
          <Link href="/login">Pergi ke halaman Login</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Google OAuth */}
      <Button
        type="button"
        variant="outline"
        className="w-full h-11 gap-2 border-border/60 hover:bg-muted/50"
        onClick={handleGoogleLogin}
        disabled={isPending || isGoogleLoading}
        id="google-register-btn"
      >
        {isGoogleLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <GoogleIcon />
        )}
        Daftar dengan Google
      </Button>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border/50" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-3 text-muted-foreground">atau</span>
        </div>
      </div>

      {/* Error Message */}
      {state?.message && !state.success && (
        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{state.message}</span>
        </div>
      )}

      {/* Form */}
      <form action={action} className="space-y-4">
        {/* Full Name */}
        <div className="space-y-1.5">
          <Label htmlFor="full_name" className="text-sm font-medium">
            Nama Lengkap
          </Label>
          <Input
            id="full_name"
            name="full_name"
            type="text"
            placeholder="Ahmad Firmansyah"
            autoComplete="name"
            required
            className="h-11"
          />
          {state?.errors?.full_name && (
            <p className="text-xs text-destructive">
              {state.errors.full_name[0]}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-sm font-medium">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="nama@email.com"
            autoComplete="email"
            required
            className="h-11"
          />
          {state?.errors?.email && (
            <p className="text-xs text-destructive">{state.errors.email[0]}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <Label htmlFor="password" className="text-sm font-medium">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Min. 8 karakter"
              autoComplete="new-password"
              required
              className="h-11 pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Password Strength Indicator */}
          {password.length > 0 && (
            <div className="space-y-1.5">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                      i <= passwordStrength
                        ? strengthColors[passwordStrength]
                        : "bg-muted"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Kekuatan:{" "}
                <span
                  className={`font-medium ${
                    passwordStrength <= 1
                      ? "text-red-500"
                      : passwordStrength <= 2
                        ? "text-yellow-500"
                        : passwordStrength <= 3
                          ? "text-blue-500"
                          : "text-green-500"
                  }`}
                >
                  {strengthLabels[passwordStrength]}
                </span>
              </p>
            </div>
          )}

          {state?.errors?.password && (
            <ul className="text-xs text-destructive space-y-0.5">
              {state.errors.password.map((err) => (
                <li key={err}>• {err}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Terms */}
        <p className="text-xs text-muted-foreground leading-relaxed">
          Dengan mendaftar, Anda menyetujui{" "}
          <Link href="/terms" className="text-primary hover:underline">
            Syarat & Ketentuan
          </Link>{" "}
          dan{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            Kebijakan Privasi
          </Link>{" "}
          Upshare.
        </p>

        {/* Submit */}
        <Button
          type="submit"
          id="register-submit-btn"
          className="w-full h-11 gradient-brand text-white border-0 hover:opacity-90 transition-opacity font-medium"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              Mendaftarkan...
            </>
          ) : (
            "Buat Akun Gratis"
          )}
        </Button>
      </form>

      {/* Login Link */}
      <p className="text-center text-sm text-muted-foreground">
        Sudah punya akun?{" "}
        <Link
          href="/login"
          className="text-primary font-medium hover:underline"
        >
          Masuk di sini
        </Link>
      </p>
    </div>
  );
}
