"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  CheckCircle2,
  Heart,
  Star,
  Scissors,
  Clock,
  MapPin,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/hooks/use-user";

const highlights = [
  "Subdomain atas nama acara",
  "RSVP & konfirmasi tamu",
  "Countdown hari H otomatis",
];

// ── Invitation type ───────────────────────────────────────────
interface Invitation {
  id: string;
  type: string;
  typeIcon: LucideIcon;
  iconFill?: boolean;
  subdomain: string;
  title: string;
  date: string;
  venue: string;
  time: string;
  gradient: string;
  heroBg: string;
  urlText: string;
  urlBorder: string;
  accentText: string;
  accentBg: string;
  accentBorder: string;
  photoBg: string;
}

// ── Invitation mock data ─────────────────────────────────────
const invitations: Invitation[] = [
  {
    id: "nikah",
    type: "Pernikahan",
    typeIcon: Heart,
    iconFill: true,
    subdomain: "romeo-dan-juliet.upshare.id",
    title: "Romeo & Juliet",
    date: "Sabtu, 14 Feb 2026",
    venue: "Masjid Istiqlal, Jakarta",
    time: "Pukul 10.00 WIB",
    gradient: "from-rose-500 to-pink-600",
    heroBg: "from-rose-100 via-pink-50 to-white dark:from-rose-950/70 dark:via-pink-950/30 dark:to-background",
    urlText: "text-rose-600 dark:text-rose-400",
    urlBorder: "border-rose-200 dark:border-rose-800/50",
    accentText: "text-rose-600",
    accentBg: "bg-rose-50 dark:bg-rose-950/40",
    accentBorder: "border-rose-100 dark:border-rose-900/40",
    photoBg: "bg-gradient-to-br from-rose-200 to-pink-300 dark:from-rose-900 dark:to-pink-900",
  },
  {
    id: "anniversary",
    type: "Anniversary",
    typeIcon: Star,
    iconFill: true,
    subdomain: "10tahun-bersama.upshare.id",
    title: "10 Tahun Bersama ✨",
    date: "Minggu, 20 Jul 2026",
    venue: "Aston Priority Hotel",
    time: "Pukul 18.00 WIB",
    gradient: "from-amber-500 to-yellow-500",
    heroBg: "from-amber-50 via-yellow-50/60 to-white dark:from-amber-950/70 dark:via-yellow-950/30 dark:to-background",
    urlText: "text-amber-700 dark:text-amber-400",
    urlBorder: "border-amber-200 dark:border-amber-800/50",
    accentText: "text-amber-700",
    accentBg: "bg-amber-50 dark:bg-amber-950/40",
    accentBorder: "border-amber-200 dark:border-amber-800/40",
    photoBg: "bg-gradient-to-br from-amber-200 to-yellow-300 dark:from-amber-900 dark:to-yellow-900",
  },
  {
    id: "khitanan",
    type: "Khitanan",
    typeIcon: Scissors,
    iconFill: false,
    subdomain: "khitanan-azzam.upshare.id",
    title: "Muhammad Azzam",
    date: "Ahad, 5 Apr 2026",
    venue: "Gedung Serba Guna Al-Ikhlas",
    time: "Pukul 09.00 WIB",
    gradient: "from-teal-500 to-cyan-500",
    heroBg: "from-teal-50 via-cyan-50/60 to-white dark:from-teal-950/70 dark:via-cyan-950/30 dark:to-background",
    urlText: "text-teal-700 dark:text-teal-400",
    urlBorder: "border-teal-200 dark:border-teal-800/50",
    accentText: "text-teal-700",
    accentBg: "bg-teal-50 dark:bg-teal-950/40",
    accentBorder: "border-teal-200 dark:border-teal-800/40",
    photoBg: "bg-gradient-to-br from-teal-200 to-cyan-300 dark:from-teal-900 dark:to-cyan-900",
  },
];

// ── Single Phone Card ─────────────────────────────────────────
function PhoneCard({
  inv,
  position,
}: {
  inv: (typeof invitations)[number];
  position: "left" | "center" | "right";
}) {
  const posStyle = {
    left:   "rotate-[-8deg] translate-x-[-55%] translate-y-[8%] scale-[0.82] z-10 opacity-80",
    center: "rotate-[0deg]  translate-x-[0]    translate-y-[0]   scale-[1]    z-30 opacity-100",
    right:  "rotate-[8deg]  translate-x-[55%]  translate-y-[8%]  scale-[0.82] z-10 opacity-80",
  }[position];

  const TypeIcon = inv.typeIcon;

  return (
    <div
      className={`absolute transition-all duration-700 ease-in-out ${posStyle} w-52 sm:w-60`}
      style={{ transformOrigin: "bottom center" }}
    >
      <div className="relative bg-foreground/5 border-2 border-border/60 rounded-[2.5rem] p-2.5 shadow-2xl">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-5 bg-background rounded-b-xl z-10" />

        {/* Screen */}
        <div className={`bg-gradient-to-b ${inv.heroBg} rounded-[2rem] overflow-hidden min-h-[440px] pt-7`}>
          {/* URL bar */}
          <div className={`mx-2.5 mb-3 bg-white dark:bg-card border ${inv.urlBorder} rounded-lg px-2 py-1.5 flex items-center gap-1.5 shadow-sm`}>
            <span className="text-green-500 text-[10px]">🔒</span>
            <span className={`text-[9px] font-mono font-semibold ${inv.urlText} truncate`}>
              {inv.subdomain}
            </span>
          </div>

          <div className="px-2.5 flex flex-col gap-2.5">
            {/* Type badge + photo area */}
            <div className={`h-20 rounded-2xl ${inv.photoBg} flex flex-col items-center justify-center relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative text-center">
                <div className="flex items-center justify-center gap-1 mb-0.5">
                  <div className="h-px w-6 bg-white/50" />
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${inv.gradient} flex items-center justify-center`}>
                    <TypeIcon className={`w-3 h-3 text-white ${inv.iconFill ? "fill-white" : ""}`} />
                  </div>
                  <div className="h-px w-6 bg-white/50" />
                </div>
                <p className="text-[9px] text-white/80 uppercase tracking-widest font-medium">{inv.type}</p>
                <p className="text-white font-bold text-xs drop-shadow mt-0.5">{inv.title}</p>
                <p className="text-white/70 text-[8px]">{inv.date}</p>
              </div>
            </div>

            {/* Countdown */}
            <div className={`border ${inv.accentBorder} ${inv.accentBg} rounded-xl p-2`}>
              <div className="flex items-center gap-1 mb-1.5">
                <Clock className={`w-2.5 h-2.5 ${inv.accentText}`} />
                <span className={`text-[7px] font-bold ${inv.accentText} uppercase tracking-wide`}>Countdown</span>
              </div>
              <div className="grid grid-cols-4 gap-0.5">
                {["127", "08", "42", "05"].map((v, i) => (
                  <div key={i} className="bg-white dark:bg-card rounded-lg py-1 text-center">
                    <p className={`text-[9px] font-bold ${inv.accentText}`}>{v}</p>
                    <p className="text-[6px] text-muted-foreground">{["H", "J", "M", "D"][i]}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="bg-white dark:bg-card border border-border/50 rounded-xl p-2 flex items-center gap-2">
              <div className={`w-6 h-6 rounded-lg ${inv.accentBg} flex items-center justify-center flex-shrink-0`}>
                <MapPin className={`w-3 h-3 ${inv.accentText}`} />
              </div>
              <div>
                <p className="text-[8px] font-semibold text-foreground truncate">{inv.venue}</p>
                <p className="text-[7px] text-muted-foreground">{inv.time}</p>
              </div>
            </div>

            {/* RSVP */}
            <div className="bg-white dark:bg-card border border-border/50 rounded-xl p-2">
              <div className="flex items-center gap-1 mb-1.5">
                <Users className={`w-2.5 h-2.5 ${inv.accentText}`} />
                <span className="text-[7px] font-bold text-foreground">Konfirmasi Kehadiran</span>
              </div>
              <div className="flex gap-1">
                <div className={`flex-1 bg-gradient-to-r ${inv.gradient} rounded-lg py-1.5 text-center`}>
                  <span className="text-[7px] font-bold text-white">✓ Hadir</span>
                </div>
                <div className="flex-1 bg-muted rounded-lg py-1.5 text-center">
                  <span className="text-[7px] text-muted-foreground">✗ Tidak</span>
                </div>
              </div>
            </div>

            <p className="text-center text-[7px] text-muted-foreground/40 pb-1">upshare.id</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Hero ─────────────────────────────────────────────────
export function HeroSectionUndangan() {
  const [mounted, setMounted] = useState(false);
  const { user, loading } = useUser();
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => { setMounted(true); }, []);

  // Auto-rotate every 3s
  useEffect(() => {
    const t = setInterval(() => setActiveIdx((i) => (i + 1) % invitations.length), 3000);
    return () => clearInterval(t);
  }, []);

  // Map index → position
  const getPosition = (i: number): "left" | "center" | "right" => {
    const n = invitations.length;
    const diff = (i - activeIdx + n) % n;
    if (diff === 0) return "center";
    if (diff === 1) return "right";
    return "left";
  };

  return (
    <section className="relative overflow-hidden gradient-hero py-20 sm:py-28 lg:py-36">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-pink-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-rose-400/20 blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-teal-400/10 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* ── LEFT: Text ── */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <Badge
              variant="secondary"
              className="mb-6 gap-1.5 px-4 py-1.5 text-sm font-medium border border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/15 transition-colors"
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              Undangan Digital Premium
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.15] mb-5">
              Undangan Digital{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500">
                Atas Nama Acaramu
              </span>
              , Bukan Nama Platform
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mb-5 leading-relaxed">
              Dari pernikahan, anniversary, hingga khitanan — semua tampil di{" "}
              <span className="font-semibold text-foreground">nama-acara.upshare.id</span>.
              Undangan digital yang terasa seperti website eksklusif sendiri.
            </p>

            {/* Category pills */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-8">
              {[
                { label: "💍 Pernikahan", color: "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800" },
                { label: "✨ Anniversary", color: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800" },
                { label: "✂️ Khitanan", color: "bg-teal-100 text-teal-700 border-teal-200 dark:bg-teal-950/40 dark:text-teal-400 dark:border-teal-800" },
                { label: "🎂 Ulang Tahun", color: "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-800" },
                { label: "🌿 Aqiqah", color: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800" },
              ].map(({ label, color }) => (
                <span key={label} className={`text-xs font-medium px-3 py-1 rounded-full border ${color}`}>
                  {label}
                </span>
              ))}
            </div>

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
                  <Link href="/dashboard">Ke Dashboard <ArrowRight className="ml-2 w-4 h-4" /></Link>
                </Button>
              ) : (
                <Button size="lg" className="bg-gradient-to-r from-rose-500 to-pink-600 text-white border-0 shadow-lg hover:opacity-90 hover:scale-[1.02] sm:hover:scale-105 transition-all duration-200 px-8 h-12 text-base" asChild>
                  <Link href="/register">Buat Undangan Sekarang <ArrowRight className="ml-2 w-4 h-4" /></Link>
                </Button>
              )}
              <Button size="lg" variant="outline" className="border-border/60 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 px-8 h-12 text-base" asChild>
                <Link href="#templates">Lihat Template</Link>
              </Button>
            </div>

            <p className="mt-8 text-sm text-muted-foreground">
              Cocok untuk{" "}
              <span className="font-semibold text-foreground">pengantin, keluarga & vendor undangan digital</span>
            </p>
          </div>

          {/* ── RIGHT: 3 Staggered Phone Mockups ── */}
          <div className="flex-1 flex justify-center lg:justify-end w-full">
            {/* Container with perspective */}
            <div className="relative w-60 sm:w-72 h-[520px] sm:h-[580px] flex items-center justify-center">
              {invitations.map((inv, i) => (
                <PhoneCard key={inv.id} inv={inv} position={getPosition(i)} />
              ))}

              {/* Floating: RSVP count */}
              <div className="absolute -right-2 sm:-right-8 top-16 bg-white dark:bg-card border border-border/60 rounded-2xl px-3 py-2 shadow-xl z-40 pointer-events-none">
                <p className="text-[10px] text-muted-foreground">Tamu konfirmasi</p>
                <p className="text-lg font-bold text-rose-600">143 ✓</p>
              </div>

              {/* Floating: views */}
              <div className="absolute -left-2 sm:-left-8 bottom-24 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-2xl px-3 py-2 shadow-xl z-40 pointer-events-none">
                <p className="text-[10px] font-medium">Link dibuka</p>
                <p className="text-base font-bold">892 kali</p>
              </div>

              {/* Dot indicators */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-40">
                {invitations.map((inv, i) => (
                  <button
                    key={inv.id}
                    onClick={() => setActiveIdx(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === activeIdx
                        ? "w-5 h-2 bg-rose-500"
                        : "w-2 h-2 bg-border hover:bg-rose-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
