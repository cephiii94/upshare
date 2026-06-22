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
    preview: {
      badge: "🔒 cecep.upshare.id",
      title: "Reverse Proxy Aktif",
      description: "Pengunjung membuka cecep.upshare.id tapi melihat project Netlify/Vercel kamu — tanpa tahu aslinya.",
      from: "cecep.upshare.id",
      to: "cecep-project.netlify.app",
      tag: "Proxy Aktif",
      tagColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
    },
  },
  {
    id: "undangan",
    label: "Undangan",
    icon: Heart,
    color: "text-rose-500",
    activeBg: "bg-rose-500",
    preview: {
      badge: "💍 romeo-dan-juliet.upshare.id",
      title: "Website Pernikahan Sendiri",
      description: "Punya domain nama pasangan sendiri. Bukan path di platform orang — ini web kamu di romeo-dan-juliet.upshare.id.",
      from: "Romeo & Juliet",
      to: "Sabtu, 14 Feb 2026 • 143 RSVP",
      tag: "143 RSVP",
      tagColor: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400",
    },
  },
  {
    id: "biolink",
    label: "Biolink",
    icon: Link2,
    color: "text-purple-500",
    activeBg: "bg-purple-500",
    preview: {
      badge: "🛍️ toko-baju.upshare.id",
      title: "Biolink & Toko Online",
      description: "Halaman biolink ala Linktree dengan tombol WA langsung, katalog produk, dan link sosmed.",
      from: "Toko Baju Cantik",
      to: "1.200 klik bulan ini",
      tag: "Aktif",
      tagColor: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400",
    },
  },
  {
    id: "landing",
    label: "Landing Page",
    icon: LayoutTemplate,
    color: "text-amber-500",
    activeBg: "bg-amber-500",
    preview: {
      badge: "✨ portofolio.upshare.id",
      title: "Landing Page & Portofolio",
      description: "Mini landing page profesional untuk portofolio, produk, atau profil perusahaan — tanpa coding.",
      from: "Budi Santoso — UI/UX Designer",
      to: "27 project selesai",
      tag: "Live",
      tagColor: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
    },
  },
];

const highlights = [
  "Web Proxy & Reverse Proxy",
  "Undangan Digital + RSVP",
  "Biolink & Toko Online",
  "Landing Page Builder",
];

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
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const current = tabs[activeTab];
  const IconCurrent = current.icon;

  return (
    <section className="relative overflow-hidden gradient-hero py-20 sm:py-28 lg:py-36">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-accent/30 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-secondary/40 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
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
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mb-8 sm:mb-10 leading-relaxed px-2 sm:px-0">
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
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10">
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

        {/* Hero Visual - Interactive Tab Showcase */}
        <div className="mt-12 sm:mt-16 max-w-3xl mx-auto w-full">
          {/* Tab Selector */}
          <div className="flex justify-center gap-2 mb-6 flex-wrap">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === index
                      ? `${tab.activeBg} text-white shadow-lg scale-105`
                      : "bg-background border border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Preview Card */}
          <div
            key={current.id}
            className="glass rounded-2xl shadow-2xl overflow-hidden border border-border/50 animate-in fade-in slide-in-from-bottom-4 duration-300"
          >
            {/* Browser Bar */}
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-muted/50 border-b border-border/50">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-background rounded-md px-3 py-1 text-xs text-muted-foreground flex items-center justify-center gap-2 max-w-xs mx-auto">
                  <span className="text-green-500">🔒</span>
                  <span className="truncate">{current.preview.badge.split(" ").slice(1).join(" ")}</span>
                </div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${current.preview.tagColor}`}>
                {current.preview.tag}
              </span>
            </div>

            {/* Mock Content */}
            <div className="p-6 sm:p-10 bg-gradient-to-br from-background to-secondary/20 min-h-[200px] sm:min-h-[220px] flex flex-col items-center justify-center gap-4 text-center">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${current.activeBg}/15`}>
                <IconCurrent className={`w-6 h-6 ${current.color}`} />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-lg mb-1">{current.preview.title}</h3>
                <p className="text-muted-foreground text-sm max-w-md">{current.preview.description}</p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3 bg-background px-5 py-3 rounded-2xl shadow border border-border/50 text-sm">
                <span className="font-semibold text-foreground">{current.preview.from}</span>
                <ArrowRight className={`w-4 h-4 ${current.color} rotate-90 sm:rotate-0`} />
                <span className="text-muted-foreground">{current.preview.to}</span>
              </div>
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
    </section>
  );
}
