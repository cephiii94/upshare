"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/use-user";

export function CTASectionLanding() {
  const [mounted, setMounted] = useState(false);
  const { user, loading } = useUser();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 p-10 sm:p-16 text-center shadow-2xl">
          {/* Blobs */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute top-1/3 left-1/3 w-48 h-48 bg-white/5 rounded-full blur-2xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              Gratis selamanya — Tidak perlu kartu kredit
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Landing Page Profesional-mu,
              <br />
              Siap dalam 5 Menit
            </h2>

            <p className="text-white/80 text-lg max-w-xl mx-auto mb-4">
              Pilih template, isi konten kamu, dan website mini-mu langsung live di subdomain kustom. Gratis, tanpa coding, tanpa hosting rumit.
            </p>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10 text-white/80 text-sm">
              {["✓ 4 template siap pakai", "✓ Editor blok visual", "✓ SEO otomatis", "✓ Subdomain sendiri"].map((item) => (
                <span key={item} className="font-medium">{item}</span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              {!mounted || loading ? (
                <div className="w-48 h-12 bg-white/10 animate-pulse rounded-lg" />
              ) : user ? (
                <Button size="lg" className="bg-white text-orange-600 hover:bg-white/90 hover:scale-105 transition-all shadow-lg px-8 h-12 text-base font-semibold" asChild>
                  <Link href="/dashboard">
                    Ke Dashboard <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button size="lg" className="bg-white text-orange-600 hover:bg-white/90 hover:scale-[1.02] sm:hover:scale-105 transition-all shadow-lg px-8 h-12 text-base font-semibold" asChild>
                    <Link href="/register">
                      Buat Landing Page Gratis <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="ghost" className="text-white hover:bg-white/10 border border-white/30 px-8 h-12 text-base" asChild>
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
