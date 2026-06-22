"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Link2,
  ShoppingBag,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/hooks/use-user";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const TwitterXIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.738l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const highlights = [
  "Tanpa coding, aktif 2 menit",
  "Tombol WhatsApp langsung",
  "Analitik klik real-time",
];

// Mock biolink card preview
const mockLinks = [
  { icon: ShoppingBag, label: "Katalog Produk Lengkap", color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-950/40", clicks: "1.2k" },
  { icon: MessageCircle, label: "Order via WhatsApp", color: "text-green-600", bg: "bg-green-50 dark:bg-green-950/40", clicks: "893" },
  { icon: InstagramIcon, label: "Follow Instagram", color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-950/40", clicks: "412" },
  { icon: YoutubeIcon, label: "Tonton Video Review", color: "text-red-500", bg: "bg-red-50 dark:bg-red-950/40", clicks: "205" },
];

export function HeroSectionBiolink() {
  const [mounted, setMounted] = useState(false);
  const [activeLink, setActiveLink] = useState<number | null>(null);
  const { user, loading } = useUser();

  useEffect(() => {
    setMounted(true);
    // Animate links one by one
    const timers = mockLinks.map((_, i) =>
      setTimeout(() => setActiveLink(i), 600 + i * 300)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="relative overflow-hidden gradient-hero py-20 sm:py-28 lg:py-36">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-violet-400/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-fuchsia-300/20 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left: Text content */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <Badge
              variant="secondary"
              className="mb-6 gap-1.5 px-4 py-1.5 text-sm font-medium border border-purple-500/20 bg-purple-500/10 text-purple-600 dark:text-purple-400 hover:bg-purple-500/15 transition-colors"
            >
              <Link2 className="w-3.5 h-3.5" />
              Biolink & Toko Online
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.15] mb-5">
              Satu Link untuk{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-violet-500">
                Semua yang Kamu Jual
              </span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
              Buat halaman biolink toko online yang{" "}
              <span className="font-semibold text-foreground">profesional dan branded</span>{" "}
              di subdomain kamu sendiri. Tampilkan produk, tombol WhatsApp, dan semua link sosmed — dalam satu halaman rapi.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 mb-10">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-purple-500 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              {!mounted || loading ? (
                <div className="w-full sm:w-48 h-12 bg-muted/30 animate-pulse rounded-lg" />
              ) : user ? (
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-violet-500 text-white border-0 shadow-lg hover:opacity-90 hover:scale-[1.02] sm:hover:scale-105 transition-all duration-200 px-8 h-12 text-base" asChild>
                  <Link href="/dashboard">
                    Ke Dashboard <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              ) : (
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-violet-500 text-white border-0 shadow-lg hover:opacity-90 hover:scale-[1.02] sm:hover:scale-105 transition-all duration-200 px-8 h-12 text-base" asChild>
                  <Link href="/register">
                    Buat Biolink Gratis <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              )}
              <Button size="lg" variant="outline" className="border-border/60 hover:bg-purple-50 dark:hover:bg-purple-950/30 hover:text-purple-600 px-8 h-12 text-base" asChild>
                <Link href="#features">Lihat Fitur</Link>
              </Button>
            </div>

            <p className="mt-8 text-sm text-muted-foreground">
              Cocok untuk{" "}
              <span className="font-semibold text-foreground">UMKM, online shop, freelancer & kreator konten</span>
            </p>
          </div>

          {/* Right: Biolink phone mockup */}
          <div className="flex-1 flex justify-center lg:justify-end w-full max-w-sm lg:max-w-none">
            <div className="relative w-72 sm:w-80">
              {/* Phone frame */}
              <div className="relative bg-foreground/5 border-2 border-border/60 rounded-[2.5rem] p-3 shadow-2xl">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-background rounded-b-2xl z-10" />

                {/* Screen */}
                <div className="bg-gradient-to-b from-purple-50 via-white to-purple-50/30 dark:from-purple-950/50 dark:via-background dark:to-background rounded-[2rem] overflow-hidden min-h-[520px] pt-8">

                  {/* URL bar */}
                  <div className="mx-4 mb-5 bg-white dark:bg-card border border-purple-200 dark:border-purple-800/50 rounded-xl px-3 py-1.5 flex items-center gap-2 shadow-sm">
                    <span className="text-green-500 text-xs">🔒</span>
                    <span className="text-[11px] font-semibold text-purple-700 dark:text-purple-300 font-mono">tokobaju.upshare.id</span>
                  </div>

                  {/* Profile */}
                  <div className="text-center px-4 mb-5">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-violet-600 mx-auto mb-2 flex items-center justify-center shadow-lg">
                      <ShoppingBag className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-bold text-foreground text-sm">Toko Baju Cantik</h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Fashion wanita kekinian 🛍️</p>
                    <div className="flex items-center justify-center gap-3 mt-2">
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <InstagramIcon className="w-3 h-3" /> @tokobajucantik
                      </span>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <TwitterXIcon className="w-3 h-3" /> @tokobaju
                      </span>
                    </div>
                  </div>

                  {/* Links */}
                  <div className="px-4 space-y-2.5">
                    {mockLinks.map((link, index) => {
                      const Icon = link.icon;
                      const isVisible = activeLink !== null && index <= activeLink;
                      return (
                        <div
                          key={link.label}
                          style={{ transitionDelay: `${index * 80}ms` }}
                          className={`flex items-center gap-3 bg-white dark:bg-card border border-border/60 rounded-xl px-3 py-2.5 shadow-sm transition-all duration-500 ${
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${link.bg}`}>
                            <Icon className={`w-4 h-4 ${link.color}`} />
                          </div>
                          <span className="text-xs font-medium text-foreground flex-1 truncate">{link.label}</span>
                          <span className="text-[10px] text-muted-foreground font-mono">{link.clicks}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Footer powered by */}
                  <p className="text-center text-[9px] text-muted-foreground/60 mt-5 pb-3">
                    Powered by <span className="font-semibold">upshare.id</span>
                  </p>
                </div>
              </div>

              {/* Floating stats badge */}
              <div className="absolute -right-6 top-16 bg-white dark:bg-card border border-border/60 rounded-2xl px-3 py-2 shadow-xl">
                <p className="text-[10px] text-muted-foreground">Klik bulan ini</p>
                <p className="text-lg font-bold text-purple-600">2.712</p>
              </div>

              {/* Floating WA badge */}
              <div className="absolute -left-6 bottom-24 bg-green-500 text-white rounded-2xl px-3 py-2 shadow-xl">
                <p className="text-[10px] font-medium">Order WA</p>
                <p className="text-base font-bold">+47 hari ini</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
