"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Heart,
  Clock,
  MapPin,
  Users,
  Camera,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/hooks/use-user";

const highlights = [
  "Website pernikahan sendiri",
  "RSVP & konfirmasi tamu",
  "Countdown hari H otomatis",
];

// Animasi countdown
function useCountdown() {
  const target = new Date("2026-02-14T10:00:00");
  const [diff, setDiff] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const calc = () => {
      const now = new Date();
      const total = Math.max(0, Math.floor((target.getTime() - now.getTime()) / 1000));
      setDiff({
        d: Math.floor(total / 86400),
        h: Math.floor((total % 86400) / 3600),
        m: Math.floor((total % 3600) / 60),
        s: total % 60,
      });
    };
    calc();
    const t = setInterval(calc, 1000);
    return () => clearInterval(t);
  }, []);
  return diff;
}

export function HeroSectionUndangan() {
  const [mounted, setMounted] = useState(false);
  const { user, loading } = useUser();
  const countdown = useCountdown();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative overflow-hidden gradient-hero py-20 sm:py-28 lg:py-36">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-pink-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-rose-400/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-red-300/20 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left: Text */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <Badge
              variant="secondary"
              className="mb-6 gap-1.5 px-4 py-1.5 text-sm font-medium border border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/15 transition-colors"
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              Undangan Digital Premium
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.15] mb-5">
              Website Pernikahan{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">
                Atas Nama Kalian
              </span>
              , Bukan Nama Platform
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
              Bukan lagi link panjang dari Canva atau Netlify.
              Undangan digital kamu tampil di{" "}
              <span className="font-semibold text-foreground">romeo-dan-juliet.upshare.id</span>
              {" "}— seolah punya website pernikahan sendiri, lengkap dengan RSVP dan countdown.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 mb-10">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-rose-500 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              {!mounted || loading ? (
                <div className="w-full sm:w-48 h-12 bg-muted/30 animate-pulse rounded-lg" />
              ) : user ? (
                <Button size="lg" className="bg-gradient-to-r from-rose-500 to-pink-600 text-white border-0 shadow-lg hover:opacity-90 hover:scale-[1.02] sm:hover:scale-105 transition-all duration-200 px-8 h-12 text-base" asChild>
                  <Link href="/dashboard">
                    Ke Dashboard <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              ) : (
                <Button size="lg" className="bg-gradient-to-r from-rose-500 to-pink-600 text-white border-0 shadow-lg hover:opacity-90 hover:scale-[1.02] sm:hover:scale-105 transition-all duration-200 px-8 h-12 text-base" asChild>
                  <Link href="/register">
                    Buat Undangan Sekarang <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              )}
              <Button size="lg" variant="outline" className="border-border/60 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 px-8 h-12 text-base" asChild>
                <Link href="#templates">Lihat Template</Link>
              </Button>
            </div>

            <p className="mt-8 text-sm text-muted-foreground">
              Cocok untuk{" "}
              <span className="font-semibold text-foreground">calon pengantin & vendor undangan digital</span>
            </p>
          </div>

          {/* Right: Phone mockup — Wedding Invitation */}
          <div className="flex-1 flex justify-center lg:justify-end w-full max-w-xs lg:max-w-none">
            <div className="relative w-72 sm:w-80">
              {/* Phone frame */}
              <div className="relative bg-foreground/5 border-2 border-border/60 rounded-[2.5rem] p-3 shadow-2xl">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-background rounded-b-2xl z-10" />

                {/* Screen */}
                <div className="bg-gradient-to-b from-rose-50 via-pink-50/60 to-white dark:from-rose-950/60 dark:via-pink-950/30 dark:to-background rounded-[2rem] overflow-hidden min-h-[540px] pt-8">

                  {/* URL bar */}
                  <div className="mx-4 mb-4 bg-white dark:bg-card border border-rose-200 dark:border-rose-800/50 rounded-xl px-3 py-1.5 flex items-center gap-2 shadow-sm">
                    <span className="text-green-500 text-xs">🔒</span>
                    <span className="text-[11px] font-semibold text-rose-700 dark:text-rose-300 font-mono">romeo-dan-juliet.upshare.id</span>
                  </div>

                  {/* Wedding card content */}
                  <div className="px-4 flex flex-col items-center gap-4">
                    {/* Ornament header */}
                    <div className="flex items-center gap-2 w-full justify-center">
                      <div className="h-px flex-1 bg-rose-200 dark:bg-rose-800" />
                      <Heart className="w-4 h-4 text-rose-500 fill-rose-400" />
                      <div className="h-px flex-1 bg-rose-200 dark:bg-rose-800" />
                    </div>

                    {/* Names */}
                    <div className="text-center">
                      <p className="text-[9px] uppercase tracking-[0.3em] text-rose-400 font-medium mb-0.5">Undangan Pernikahan</p>
                      <h2 className="text-xl font-bold text-foreground leading-tight">
                        Romeo <span className="text-rose-500">&</span> Juliet
                      </h2>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Sabtu, 14 Februari 2026</p>
                    </div>

                    {/* Countdown */}
                    <div className="w-full bg-white dark:bg-card border border-rose-100 dark:border-rose-900/50 rounded-2xl p-3 shadow-sm">
                      <div className="flex items-center gap-1.5 mb-2">
                        <Clock className="w-3 h-3 text-rose-500" />
                        <span className="text-[9px] font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wide">Countdown Hari H</span>
                      </div>
                      <div className="grid grid-cols-4 gap-1">
                        {[
                          { val: countdown.d, label: "Hari" },
                          { val: countdown.h, label: "Jam" },
                          { val: countdown.m, label: "Mnt" },
                          { val: countdown.s, label: "Det" },
                        ].map(({ val, label }) => (
                          <div key={label} className="flex flex-col items-center bg-rose-50 dark:bg-rose-950/50 rounded-xl py-1.5">
                            <span className="text-sm font-bold text-rose-600 tabular-nums">
                              {String(val).padStart(2, "0")}
                            </span>
                            <span className="text-[8px] text-muted-foreground">{label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Location */}
                    <div className="w-full bg-white dark:bg-card border border-border/50 rounded-xl p-2.5 flex items-center gap-2.5 shadow-sm">
                      <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-950/50 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4 text-rose-500" />
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold text-foreground">Masjid Istiqlal, Jakarta</p>
                        <p className="text-[9px] text-muted-foreground">Pukul 10.00 WIB</p>
                      </div>
                    </div>

                    {/* RSVP */}
                    <div className="w-full bg-white dark:bg-card border border-border/50 rounded-xl p-2.5 shadow-sm">
                      <div className="flex items-center gap-1.5 mb-2">
                        <Users className="w-3 h-3 text-rose-500" />
                        <span className="text-[9px] font-semibold text-foreground">Konfirmasi Kehadiran</span>
                      </div>
                      <div className="flex gap-1.5">
                        <div className="flex-1 bg-rose-500 rounded-lg py-1.5 text-center">
                          <span className="text-[9px] font-bold text-white">✓ Hadir</span>
                        </div>
                        <div className="flex-1 bg-muted rounded-lg py-1.5 text-center">
                          <span className="text-[9px] font-medium text-muted-foreground">✗ Tidak</span>
                        </div>
                      </div>
                    </div>

                    {/* Gallery row */}
                    <div className="w-full">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Camera className="w-3 h-3 text-rose-500" />
                        <span className="text-[9px] font-semibold text-foreground">Galeri Foto</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        {[
                          "bg-rose-200 dark:bg-rose-900",
                          "bg-pink-200 dark:bg-pink-900",
                          "bg-red-200 dark:bg-red-900",
                        ].map((c, i) => (
                          <div key={i} className={`h-14 rounded-xl ${c}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating: RSVP count */}
              <div className="absolute -right-6 top-20 bg-white dark:bg-card border border-border/60 rounded-2xl px-3 py-2 shadow-xl">
                <p className="text-[10px] text-muted-foreground">Tamu konfirmasi</p>
                <p className="text-lg font-bold text-rose-600">143 ✓</p>
              </div>

              {/* Floating: WA share */}
              <div className="absolute -left-6 bottom-28 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-2xl px-3 py-2 shadow-xl">
                <p className="text-[10px] font-medium">Link dibuka</p>
                <p className="text-base font-bold">892 kali</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
