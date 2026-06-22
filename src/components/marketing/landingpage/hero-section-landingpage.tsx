"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  LayoutTemplate,
  Image as ImageIcon,
  Type,
  MousePointerClick,
  Star,
  Briefcase,
  Megaphone,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/hooks/use-user";

const highlights = [
  "Pilih template, langsung edit",
  "Tanpa coding, tanpa hosting",
  "Subdomain profesional sendiri",
];

// Simulated block builder
const blocks = [
  { id: "header", icon: Type, label: "Header & Judul", color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-950/40", active: true },
  { id: "about", icon: FileText, label: "Tentang / Bio", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/40", active: true },
  { id: "portfolio", icon: ImageIcon, label: "Galeri Portofolio", color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-950/40", active: true },
  { id: "cta", icon: MousePointerClick, label: "Tombol Hubungi", color: "text-green-600", bg: "bg-green-50 dark:bg-green-950/40", active: false },
];

export function HeroSectionLanding() {
  const [mounted, setMounted] = useState(false);
  const [activeBlock, setActiveBlock] = useState(-1);
  const { user, loading } = useUser();

  useEffect(() => {
    setMounted(true);
    // Animate blocks appearing one by one
    blocks.forEach((_, i) => {
      setTimeout(() => setActiveBlock(i), 400 + i * 350);
    });
  }, []);

  return (
    <section className="relative overflow-hidden gradient-hero py-20 sm:py-28 lg:py-36">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-orange-400/15 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-yellow-300/15 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left: Text */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <Badge
              variant="secondary"
              className="mb-6 gap-1.5 px-4 py-1.5 text-sm font-medium border border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400 hover:bg-amber-500/15 transition-colors"
            >
              <LayoutTemplate className="w-3.5 h-3.5" />
              Landing Page Builder
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.15] mb-5">
              Website Mini Profesional{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                Tanpa Coding,
              </span>
              <br />
              Siap dalam 5 Menit
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
              Pilih template, isi konten kamu, dan landing page-mu langsung live di{" "}
              <span className="font-semibold text-foreground">subdomain kustom</span>
              {" "}sendiri. Cocok untuk portofolio, CV digital, profil bisnis, dan halaman promo.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 mb-10">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              {!mounted || loading ? (
                <div className="w-full sm:w-48 h-12 bg-muted/30 animate-pulse rounded-lg" />
              ) : user ? (
                <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg hover:opacity-90 hover:scale-[1.02] sm:hover:scale-105 transition-all duration-200 px-8 h-12 text-base" asChild>
                  <Link href="/dashboard">
                    Ke Dashboard <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              ) : (
                <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg hover:opacity-90 hover:scale-[1.02] sm:hover:scale-105 transition-all duration-200 px-8 h-12 text-base" asChild>
                  <Link href="/register">
                    Buat Landing Page Gratis <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              )}
              <Button size="lg" variant="outline" className="border-border/60 hover:bg-amber-50 dark:hover:bg-amber-950/30 hover:text-amber-700 px-8 h-12 text-base" asChild>
                <Link href="#showcase">Lihat Template</Link>
              </Button>
            </div>

            <p className="mt-8 text-sm text-muted-foreground">
              Cocok untuk{" "}
              <span className="font-semibold text-foreground">freelancer, UMKM, job seeker & pemilik bisnis</span>
            </p>
          </div>

          {/* Right: Builder Mockup */}
          <div className="flex-1 flex justify-center lg:justify-end w-full max-w-md lg:max-w-none">
            <div className="relative w-full max-w-sm">

              {/* Browser window mock */}
              <div className="bg-card border-2 border-border/60 rounded-2xl shadow-2xl overflow-hidden">
                {/* Browser bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-muted/60 border-b border-border/50">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-400" />
                    <span className="w-3 h-3 rounded-full bg-yellow-400" />
                    <span className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 mx-3">
                    <div className="bg-background rounded-md px-3 py-1 text-xs flex items-center gap-2 max-w-xs mx-auto">
                      <span className="text-green-500">🔒</span>
                      <span className="font-semibold text-amber-700 dark:text-amber-400 font-mono text-[11px]">budi-portfolio.upshare.id</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full">Live</span>
                </div>

                {/* Split: Editor + Preview */}
                <div className="flex min-h-[340px]">
                  {/* Left panel: block list */}
                  <div className="w-40 border-r border-border/50 bg-muted/30 p-3 flex flex-col gap-2">
                    <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Blok Halaman</p>
                    {blocks.map((block, i) => {
                      const Icon = block.icon;
                      const isVisible = i <= activeBlock;
                      return (
                        <div
                          key={block.id}
                          style={{ transitionDelay: `${i * 60}ms` }}
                          className={`flex items-center gap-2 p-2 rounded-lg border transition-all duration-500 cursor-pointer ${
                            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"
                          } ${block.active
                            ? "border-amber-300 bg-amber-50 dark:bg-amber-950/40 dark:border-amber-800"
                            : "border-border/50 bg-background hover:border-amber-200"
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 ${block.bg}`}>
                            <Icon className={`w-3 h-3 ${block.color}`} />
                          </div>
                          <span className="text-[9px] font-medium text-foreground leading-tight">{block.label}</span>
                        </div>
                      );
                    })}
                    {/* Add block button */}
                    <button className="mt-1 flex items-center justify-center gap-1 p-2 rounded-lg border border-dashed border-border/60 hover:border-amber-400 text-muted-foreground hover:text-amber-600 transition-colors text-[9px] font-medium">
                      <Sparkles className="w-3 h-3" /> + Tambah Blok
                    </button>
                  </div>

                  {/* Right panel: mini preview */}
                  <div className="flex-1 bg-gradient-to-b from-amber-50/60 to-orange-50/30 dark:from-amber-950/20 dark:to-background p-4 flex flex-col gap-3">
                    {/* Hero block preview */}
                    <div className={`transition-all duration-500 ${activeBlock >= 0 ? "opacity-100" : "opacity-0"}`}>
                      <div className="text-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 mx-auto mb-1.5 flex items-center justify-center">
                          <Briefcase className="w-5 h-5 text-white" />
                        </div>
                        <p className="text-[10px] font-bold text-foreground">Budi Santoso</p>
                        <p className="text-[8px] text-muted-foreground">UI/UX Designer</p>
                      </div>
                    </div>

                    {/* About block */}
                    <div className={`bg-white dark:bg-card rounded-lg p-2.5 border border-border/50 transition-all duration-500 ${activeBlock >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
                      <p className="text-[8px] font-semibold text-foreground mb-1">Tentang Saya</p>
                      <div className="space-y-1">
                        <div className="h-1.5 bg-muted rounded-full w-full" />
                        <div className="h-1.5 bg-muted rounded-full w-4/5" />
                        <div className="h-1.5 bg-muted rounded-full w-3/5" />
                      </div>
                    </div>

                    {/* Portfolio block */}
                    <div className={`grid grid-cols-3 gap-1.5 transition-all duration-500 ${activeBlock >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
                      {[
                        "bg-purple-200 dark:bg-purple-900",
                        "bg-blue-200 dark:bg-blue-900",
                        "bg-rose-200 dark:bg-rose-900"
                      ].map((c, i) => (
                        <div key={i} className={`h-12 rounded-lg ${c}`} />
                      ))}
                    </div>

                    {/* CTA block */}
                    <div className={`transition-all duration-500 ${activeBlock >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
                      <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg py-2 text-center">
                        <p className="text-[9px] font-bold text-white">Hubungi Saya →</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -right-5 top-20 bg-white dark:bg-card border border-border/60 rounded-2xl px-3 py-2 shadow-xl">
                <p className="text-[10px] text-muted-foreground">Pengunjung hari ini</p>
                <p className="text-lg font-bold text-amber-600">248</p>
              </div>

              <div className="absolute -left-5 bottom-20 bg-amber-500 text-white rounded-2xl px-3 py-2 shadow-xl">
                <div className="flex items-center gap-1.5">
                  <Star className="w-3 h-3 fill-white" />
                  <p className="text-[10px] font-bold">27 Proyek Selesai</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
