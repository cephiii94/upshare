"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  Sparkles,
  Globe,
  Heart,
  Link2,
  LayoutTemplate,
  Shield,
  Clock,
  MapPin,
  Users,
  Star,
  ShoppingBag,
  Camera,
  MessageCircle,
  Briefcase,
  ExternalLink,
  RefreshCw,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/hooks/use-user";

const tabs = [
  {
    id: "proxy",
    label: "Web Proxy",
    icon: Globe,
    color: "text-blue-500",
    activeBg: "bg-blue-500",
    activeGrad: "from-blue-500 to-cyan-500",
    badge: "cecep.upshare.id",
    badgeColor: "text-blue-600 dark:text-blue-400",
  },
  {
    id: "undangan",
    label: "Undangan",
    icon: Heart,
    color: "text-rose-500",
    activeBg: "bg-rose-500",
    activeGrad: "from-rose-500 to-pink-500",
    badge: "romeo-dan-juliet.upshare.id",
    badgeColor: "text-rose-600 dark:text-rose-400",
  },
  {
    id: "biolink",
    label: "Biolink",
    icon: Link2,
    color: "text-purple-500",
    activeBg: "bg-purple-500",
    activeGrad: "from-purple-500 to-violet-500",
    badge: "toko-baju.upshare.id",
    badgeColor: "text-purple-600 dark:text-purple-400",
  },
  {
    id: "landing",
    label: "Landing Page",
    icon: LayoutTemplate,
    color: "text-amber-500",
    activeBg: "bg-amber-500",
    activeGrad: "from-amber-500 to-orange-500",
    badge: "portofolio.upshare.id",
    badgeColor: "text-amber-600 dark:text-amber-400",
  },
];

const highlights = [
  "Web Proxy & Reverse Proxy",
  "Undangan Digital + RSVP",
  "Biolink & Toko Online",
  "Landing Page Builder",
];

/* ── Per-tab visual previews ── */

function ProxyPreview() {
  return (
    <div className="flex flex-col gap-3">
      {/* Status bar */}
      <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/50 rounded-xl px-3 py-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-semibold text-blue-700 dark:text-blue-300">Proxy Aktif</span>
        </div>
        <RefreshCw className="w-3 h-3 text-blue-500" />
      </div>

      {/* Routing diagram */}
      <div className="bg-white dark:bg-card rounded-xl border border-border/50 p-3">
        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider mb-2.5">Rute Aktif</p>
        <div className="flex flex-col gap-2">
          {/* Origin */}
          <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-950/30 rounded-lg px-2.5 py-2">
            <Globe className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
            <div>
              <p className="text-[9px] font-bold text-foreground">cecep.upshare.id</p>
              <p className="text-[8px] text-muted-foreground">Domain kamu</p>
            </div>
          </div>
          {/* Arrow */}
          <div className="flex items-center justify-center">
            <div className="h-4 w-px bg-gradient-to-b from-blue-400 to-cyan-400" />
          </div>
          <div className="flex items-center justify-center -mt-2 -mb-0.5">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full px-2 py-0.5 flex items-center gap-1">
              <Zap className="w-2.5 h-2.5 text-white" />
              <span className="text-[8px] font-bold text-white">Reverse Proxy</span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="h-4 w-px bg-gradient-to-b from-cyan-400 to-green-400" />
          </div>
          {/* Target */}
          <div className="flex items-center gap-2 bg-green-50 dark:bg-green-950/30 rounded-lg px-2.5 py-2">
            <ExternalLink className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
            <div>
              <p className="text-[9px] font-bold text-foreground">cecep-project.netlify.app</p>
              <p className="text-[8px] text-muted-foreground">Target asli (tersembunyi)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white dark:bg-card rounded-xl border border-border/50 p-2.5 text-center">
          <p className="text-sm font-bold text-blue-600">99.9%</p>
          <p className="text-[8px] text-muted-foreground">Uptime</p>
        </div>
        <div className="bg-white dark:bg-card rounded-xl border border-border/50 p-2.5 text-center">
          <p className="text-sm font-bold text-green-600">12ms</p>
          <p className="text-[8px] text-muted-foreground">Latency</p>
        </div>
      </div>

      {/* Shield */}
      <div className="flex items-center gap-2 bg-blue-500 rounded-xl px-3 py-2">
        <Shield className="w-3.5 h-3.5 text-white flex-shrink-0" />
        <p className="text-[9px] font-semibold text-white">SSL otomatis · Domain kustom · Zero config</p>
      </div>
    </div>
  );
}

function UndanganPreview() {
  return (
    <div className="flex flex-col gap-2.5">
      {/* Photo hero */}
      <div className="relative h-20 bg-gradient-to-br from-rose-300 to-pink-400 dark:from-rose-800 dark:to-pink-900 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="flex items-center gap-1.5 mb-0.5">
            <div className="h-px w-6 bg-white/60" />
            <Heart className="w-3 h-3 text-white fill-white" />
            <div className="h-px w-6 bg-white/60" />
          </div>
          <p className="text-white font-bold text-sm drop-shadow">Romeo & Juliet</p>
          <p className="text-white/80 text-[9px]">14 Februari 2026</p>
        </div>
        {/* template badge */}
        <div className="absolute top-1.5 right-1.5 bg-white/90 dark:bg-card/90 rounded-full px-1.5 py-0.5">
          <span className="text-[8px] font-bold text-rose-600">Modern Romance</span>
        </div>
      </div>

      {/* Countdown */}
      <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/50 rounded-xl p-2">
        <div className="flex items-center gap-1 mb-1.5">
          <Clock className="w-2.5 h-2.5 text-rose-500" />
          <span className="text-[8px] font-bold text-rose-600 uppercase tracking-wide">Menuju Hari H</span>
        </div>
        <div className="grid grid-cols-4 gap-1">
          {[["237","Hari"], ["08","Jam"], ["42","Menit"], ["05","Detik"]].map(([v, l]) => (
            <div key={l} className="bg-white dark:bg-card rounded-lg py-1 text-center">
              <p className="text-[11px] font-bold text-rose-600">{v}</p>
              <p className="text-[7px] text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Location + RSVP row */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white dark:bg-card rounded-xl border border-border/50 p-2 flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-lg bg-rose-50 dark:bg-rose-950/40 flex items-center justify-center flex-shrink-0">
            <MapPin className="w-3 h-3 text-rose-500" />
          </div>
          <div>
            <p className="text-[8px] font-semibold text-foreground">Masjid Istiqlal</p>
            <p className="text-[7px] text-muted-foreground">10.00 WIB</p>
          </div>
        </div>
        <div className="bg-white dark:bg-card rounded-xl border border-border/50 p-2 flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-lg bg-rose-50 dark:bg-rose-950/40 flex items-center justify-center flex-shrink-0">
            <Users className="w-3 h-3 text-rose-500" />
          </div>
          <div>
            <p className="text-[8px] font-semibold text-foreground">143 RSVP</p>
            <p className="text-[7px] text-muted-foreground">Hadir ✓</p>
          </div>
        </div>
      </div>

      {/* RSVP button */}
      <div className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl py-2 text-center">
        <span className="text-[9px] font-bold text-white">Konfirmasi Kehadiran →</span>
      </div>

      {/* Template selector dots */}
      <div className="flex items-center justify-center gap-1.5 pt-0.5">
        {["bg-rose-500", "bg-amber-400", "bg-slate-400", "bg-emerald-500"].map((c, i) => (
          <div key={i} className={`${c} rounded-full ${i === 0 ? "w-4 h-1.5" : "w-1.5 h-1.5"} transition-all`} />
        ))}
        <span className="text-[8px] text-muted-foreground ml-1">4 template</span>
      </div>
    </div>
  );
}

function BiolinkPreview() {
  const links = [
    { label: "🛒 Katalog Produk", color: "bg-purple-500" },
    { label: "💬 Chat WhatsApp", color: "bg-green-500" },
    { label: "📦 Order Sekarang", color: "bg-violet-500" },
  ];
  return (
    <div className="flex flex-col gap-2.5">
      {/* Profile */}
      <div className="flex items-center gap-3 bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-950/40 dark:to-violet-950/30 rounded-xl p-3 border border-purple-200/60 dark:border-purple-800/40">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-400 to-violet-500 flex items-center justify-center flex-shrink-0 shadow-lg">
          <ShoppingBag className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-sm font-bold text-foreground">Toko Baju Cantik</p>
          <p className="text-[10px] text-muted-foreground">Fashion Wanita · Bandung</p>
          <div className="flex items-center gap-1 mt-0.5">
            <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
            <span className="text-[9px] font-semibold text-amber-600">4.9</span>
            <span className="text-[9px] text-muted-foreground">· 1.2k klik</span>
          </div>
        </div>
      </div>

      {/* Social icons */}
      <div className="flex items-center justify-center gap-2">
        {[
          { Icon: Camera, color: "text-pink-500 bg-pink-50 dark:bg-pink-950/40" },
          { Icon: MessageCircle, color: "text-sky-500 bg-sky-50 dark:bg-sky-950/40" },
          { Icon: ShoppingBag, color: "text-orange-500 bg-orange-50 dark:bg-orange-950/40" },
        ].map(({ Icon, color }, i) => (
          <div key={i} className={`w-8 h-8 rounded-xl ${color} border border-border/50 flex items-center justify-center`}>
            <Icon className="w-3.5 h-3.5" />
          </div>
        ))}
      </div>

      {/* Link buttons */}
      <div className="flex flex-col gap-1.5">
        {links.map(({ label, color }, i) => (
          <div
            key={i}
            className={`${color} rounded-xl py-2 px-3 flex items-center justify-between`}
          >
            <span className="text-[10px] font-bold text-white">{label}</span>
            <ArrowRight className="w-3 h-3 text-white/70" />
          </div>
        ))}
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-1.5">
        {[["1.2k","Klik"], ["340","Produk"], ["98%","Respons"]].map(([v, l]) => (
          <div key={l} className="bg-white dark:bg-card rounded-xl border border-border/50 p-2 text-center">
            <p className="text-[11px] font-bold text-purple-600">{v}</p>
            <p className="text-[8px] text-muted-foreground">{l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function LandingPreview() {
  return (
    <div className="flex flex-col gap-2.5">
      {/* Profile hero */}
      <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/30 rounded-xl p-3 border border-amber-200/60 dark:border-amber-800/40 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-16 h-16 bg-amber-300/30 dark:bg-amber-700/20 rounded-full blur-xl" />
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-md">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">Budi Santoso</p>
            <p className="text-[10px] text-amber-700 dark:text-amber-400 font-medium">UI/UX Designer</p>
            <div className="flex gap-1 mt-0.5">
              {["React", "Figma", "Next.js"].map((t) => (
                <span key={t} className="text-[7px] bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 px-1.5 py-0.5 rounded-full font-medium">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* About bio */}
      <div className="bg-white dark:bg-card rounded-xl border border-border/50 p-2.5">
        <p className="text-[8px] font-bold text-foreground mb-1.5">Tentang Saya</p>
        <div className="space-y-1">
          <div className="h-1.5 bg-muted rounded-full w-full" />
          <div className="h-1.5 bg-muted rounded-full w-5/6" />
          <div className="h-1.5 bg-muted rounded-full w-3/4" />
        </div>
      </div>

      {/* Portfolio grid */}
      <div>
        <p className="text-[8px] font-bold text-foreground mb-1.5">Portofolio</p>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            "bg-purple-200 dark:bg-purple-900",
            "bg-blue-200 dark:bg-blue-900",
            "bg-rose-200 dark:bg-rose-900",
          ].map((c, i) => (
            <div key={i} className={`h-14 rounded-xl ${c} relative overflow-hidden`}>
              <div className="absolute bottom-1 left-1 right-1 bg-black/30 rounded-md py-0.5">
                <p className="text-[6px] text-white text-center font-medium">Proyek {i + 1}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats + CTA */}
      <div className="flex gap-2">
        <div className="flex-1 grid grid-cols-2 gap-1.5">
          {[["27","Proyek"], ["5yr","Exp"]].map(([v, l]) => (
            <div key={l} className="bg-white dark:bg-card rounded-xl border border-border/50 p-2 text-center">
              <p className="text-[11px] font-bold text-amber-600">{v}</p>
              <p className="text-[7px] text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>
        <div className="flex-1 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
          <p className="text-[9px] font-bold text-white text-center px-1">Hubungi Saya →</p>
        </div>
      </div>
    </div>
  );
}

const tabPreviews = [ProxyPreview, UndanganPreview, BiolinkPreview, LandingPreview];

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const { user, loading } = useUser();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-rotate tabs
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % tabs.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const current = tabs[activeTab];
  const PreviewComponent = tabPreviews[activeTab];

  return (
    <section className="relative overflow-hidden gradient-hero py-20 sm:py-28 lg:py-36">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-accent/30 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-secondary/40 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 max-w-6xl mx-auto">

          {/* Left: Text Content */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Badge */}
            <Badge
              variant="secondary"
              className="mb-6 gap-1.5 px-4 py-1.5 text-sm font-medium border border-primary/20 bg-primary/10 text-primary hover:bg-primary/15 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              All-in-One Digital Platform
            </Badge>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground leading-[1.2] sm:leading-[1.1] mb-4 sm:mb-6">
              Satu Subdomain.{" "}
              <span className="text-gradient-brand">Tak Terbatas</span>
              <br />
              Kegunaannya.
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-xl mb-8 sm:mb-10 leading-relaxed">
              Dari{" "}
              <span className="font-semibold text-foreground">web proxy</span>,{" "}
              <span className="font-semibold text-foreground">undangan digital</span>,{" "}
              <span className="font-semibold text-foreground">biolink toko</span>, hingga{" "}
              <span className="font-semibold text-foreground">landing page</span> —
              semua bisa kamu buat dengan{" "}
              <span className="text-primary font-semibold">1 subdomain gratis</span>{" "}
              di upshare.id.
            </p>

            {/* Highlights */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 mb-10">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center w-full sm:w-auto gap-3 sm:gap-4">
              {!mounted || loading ? (
                <div className="w-full sm:w-48 h-12 bg-muted/30 animate-pulse rounded-lg" />
              ) : user ? (
                <Button
                  size="lg"
                  className="gradient-brand w-full sm:w-auto text-white border-0 shadow-lg hover:opacity-90 hover:scale-[1.02] sm:hover:scale-105 transition-all duration-200 px-8 text-base h-12"
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
                  className="gradient-brand w-full sm:w-auto text-white border-0 shadow-lg hover:opacity-90 hover:scale-[1.02] sm:hover:scale-105 transition-all duration-200 px-8 text-base h-12"
                  asChild
                >
                  <Link href="/register">
                    Mulai Gratis Sekarang
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              )}
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-border/60 hover:bg-accent px-8 text-base h-12"
                asChild
              >
                <Link href="#features">Lihat Semua Fitur</Link>
              </Button>
            </div>

            {/* Social Proof */}
            <p className="mt-10 text-sm text-muted-foreground">
              Dipercaya oleh{" "}
              <span className="font-semibold text-foreground">5.000+</span>{" "}
              pengguna aktif di seluruh Indonesia
            </p>
          </div>

          {/* Right: Interactive Template Preview */}
          <div className="flex-1 w-full max-w-sm lg:max-w-md mx-auto lg:mx-0">

            {/* Tab Selector */}
            <div className="flex justify-center lg:justify-start gap-2 mb-5 flex-wrap">
              {tabs.map((tab, index) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(index)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeTab === index
                        ? `bg-gradient-to-r ${tab.activeGrad} text-white shadow-lg scale-105`
                        : "bg-background border border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Browser mockup */}
            <div
              key={current.id}
              className="glass rounded-2xl shadow-2xl overflow-hidden border border-border/50 animate-in fade-in slide-in-from-bottom-4 duration-300"
            >
              {/* Browser Bar */}
              <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 bg-muted/50 border-b border-border/50">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-400" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400" />
                  <span className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 mx-3">
                  <div className="bg-background rounded-lg px-3 py-1.5 text-xs flex items-center gap-2 max-w-xs mx-auto border border-border/40">
                    <span className="text-green-500 text-sm">🔒</span>
                    <span className={`font-mono font-semibold truncate ${current.badgeColor}`}>
                      {current.badge}
                    </span>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full bg-gradient-to-r ${current.activeGrad} text-white flex-shrink-0`}>
                  Live
                </span>
              </div>

              {/* Template Preview Content */}
              <div className="p-4 bg-gradient-to-br from-background to-secondary/20 min-h-[340px]">
                <PreviewComponent />
              </div>
            </div>

            {/* Tab dots */}
            <div className="flex justify-center gap-2 mt-4">
              {tabs.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`transition-all duration-300 rounded-full ${
                    activeTab === index
                      ? "w-6 h-2 bg-primary"
                      : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
