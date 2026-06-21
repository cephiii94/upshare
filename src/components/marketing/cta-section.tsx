"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/use-user";

export function CTASection() {
  const [mounted, setMounted] = useState(false);
  const { user, loading } = useUser();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl gradient-brand p-12 sm:p-16 text-center shadow-2xl">
          {/* Decorative Blobs */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              Mulai hari ini — Gratis!
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Siap Tampil Profesional
              <br />
              di Internet?
            </h2>

            <p className="text-white/80 text-lg max-w-xl mx-auto mb-10">
              Daftar sekarang dan dapatkan subdomain kustom Anda dalam hitungan
              menit. Tidak perlu kartu kredit.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center w-full sm:w-auto gap-3 sm:gap-4">
              {!mounted || loading ? (
                <div className="w-full sm:w-48 h-12 bg-white/10 animate-pulse rounded-lg" />
              ) : user ? (
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 hover:scale-[1.02] sm:hover:scale-105 transition-all duration-200 shadow-lg px-8 h-12 text-base font-semibold"
                  asChild
                >
                  <Link href="/dashboard">
                    Ke Dashboard
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 hover:scale-[1.02] sm:hover:scale-105 transition-all duration-200 shadow-lg px-8 h-12 text-base font-semibold"
                    asChild
                  >
                    <Link href="/register">
                      Buat Akun Gratis
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="ghost"
                    className="w-full sm:w-auto text-white hover:bg-white/10 border border-white/30 px-8 h-12 text-base"
                    asChild
                  >
                    <Link href="/login">Sudah punya akun? Masuk</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
