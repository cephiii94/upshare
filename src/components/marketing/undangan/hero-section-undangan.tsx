"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/hooks/use-user";

const highlights = [
  "Subdomain nama pasangan",
  "Tampil elegan di WhatsApp",
  "Tanpa perlu beli domain",
];

export function HeroSectionUndangan() {
  const [mounted, setMounted] = useState(false);
  const { user, loading } = useUser();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative overflow-hidden gradient-hero py-20 sm:py-28 lg:py-36">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-pink-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-rose-400/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-red-300/30 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Badge */}
          <Badge
            variant="secondary"
            className="mb-6 gap-1.5 px-4 py-1.5 text-sm font-medium border border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/15 transition-colors"
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
            Platform Link Undangan Pernikahan Premium
          </Badge>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
            Bagikan Momen Bahagia dengan{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">Link Lebih Elegan</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed">
            Tinggalkan link Netlify atau Vercel yang panjang. Klaim nama pasangan Anda di{" "}
            <span className="font-semibold text-foreground">upshare.id</span>{" "}
            dan berikan kesan mewah pada undangan digital Anda.
          </p>

          {/* Highlights */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10">
            {highlights.map((item) => (
              <div
                key={item}
                className="flex items-center gap-1.5 text-sm text-muted-foreground"
              >
                <CheckCircle2 className="w-4 h-4 text-rose-500 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {!mounted || loading ? (
              <div className="w-48 h-12 bg-muted/30 animate-pulse rounded-lg" />
            ) : user ? (
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-rose-500 to-pink-600 text-white border-0 shadow-lg hover:opacity-90 hover:scale-105 transition-all duration-200 px-8 text-base h-12"
                asChild
              >
                <Link href="/dashboard">
                  Ke Dashboard
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            ) : (
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-rose-500 to-pink-600 text-white border-0 shadow-lg hover:opacity-90 hover:scale-105 transition-all duration-200 px-8 text-base h-12"
                asChild
              >
                <Link href="/register">
                  Klaim Subdomain Sekarang
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            )}
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-border/60 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 dark:hover:text-rose-400 px-8 text-base h-12"
              asChild
            >
              <Link href="#features">Lihat Fitur Premium</Link>
            </Button>
          </div>

          {/* Social Proof */}
          <p className="mt-10 text-sm text-muted-foreground">
            Solusi tepat untuk <span className="font-semibold text-foreground">Vendor Undangan Digital</span> & Calon Pengantin
          </p>
        </div>

        {/* Hero Visual - Mock UI */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="glass rounded-2xl shadow-2xl overflow-hidden border border-rose-500/20">
            {/* Browser Bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border/50">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-background rounded-md px-3 py-1 text-xs text-muted-foreground flex items-center gap-2 max-w-xs mx-auto">
                  <span className="w-3 h-3 text-green-500">🔒</span>
                  budi-dan-ani.upshare.id
                </div>
              </div>
            </div>
            {/* Mock Content */}
            <div className="p-8 bg-gradient-to-br from-rose-50/50 to-pink-100/50 dark:from-background dark:to-rose-950/20 min-h-[240px] flex items-center justify-center">
              <div className="text-center">
                <div className="inline-flex items-center gap-4 bg-background px-6 py-3 rounded-full shadow-lg border border-rose-200 dark:border-rose-900">
                  <span className="text-foreground font-semibold">budi-dan-ani.upshare.id</span>
                  <ArrowRight className="text-rose-500 w-5 h-5" />
                  <span className="text-muted-foreground font-mono text-sm">budi-ani-wedding.netlify.app</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
