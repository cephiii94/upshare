"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ShoppingBag, MessageCircle, Globe, Star, Headphones } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const TwitterXIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.738l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const templates = [
  {
    id: "umkm-toko",
    name: "Toko Online",
    category: "UMKM & Jualan",
    categoryColor: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400",
    description: "Cocok untuk online shop. Tampilkan produk, harga, dan tombol order WhatsApp.",
    accent: "from-amber-400 to-orange-500",
    bgAccent: "bg-amber-50 dark:bg-amber-950/30",
    profileBg: "from-amber-400 to-orange-500",
    profileIcon: ShoppingBag,
    links: [
      { icon: ShoppingBag, label: "Lihat Katalog Lengkap", color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-950/40" },
      { icon: MessageCircle, label: "Order via WhatsApp", color: "text-green-600", bg: "bg-green-50 dark:bg-green-950/40" },
      { icon: InstagramIcon, label: "Follow @tokobaju", color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-950/40" },
    ],
    subdomain: "tokobaju.upshare.id",
    name2: "Toko Baju Cantik",
    bio: "Fashion wanita kekinian 🛍️",
  },
  {
    id: "kreator",
    name: "Kreator Konten",
    category: "Influencer & Creator",
    categoryColor: "bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-400",
    description: "Untuk YouTuber, TikToker, dan influencer. Semua konten dan kolaborasi di satu link.",
    accent: "from-rose-500 to-pink-600",
    bgAccent: "bg-rose-50 dark:bg-rose-950/30",
    profileBg: "from-rose-500 to-pink-600",
    profileIcon: Star,
    links: [
      { icon: YoutubeIcon, label: "Subscribe YouTube", color: "text-red-500", bg: "bg-red-50 dark:bg-red-950/40" },
      { icon: Headphones, label: "Follow TikTok", color: "text-foreground", bg: "bg-muted" },
      { icon: InstagramIcon, label: "DM untuk Kolaborasi", color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-950/40" },
    ],
    subdomain: "sari-creator.upshare.id",
    name2: "Sari Pratiwi",
    bio: "Lifestyle & Beauty Creator ✨",
  },
  {
    id: "freelancer",
    name: "Freelancer",
    category: "Profesional",
    categoryColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400",
    description: "Portofolio singkat, link kerja, dan kontak klien — semua terangkum rapi.",
    accent: "from-blue-500 to-violet-600",
    bgAccent: "bg-blue-50 dark:bg-blue-950/30",
    profileBg: "from-blue-500 to-violet-600",
    profileIcon: Globe,
    links: [
      { icon: Globe, label: "Lihat Portofolio", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/40" },
      { icon: MessageCircle, label: "Hubungi via WhatsApp", color: "text-green-600", bg: "bg-green-50 dark:bg-green-950/40" },
      { icon: TwitterXIcon, label: "Follow di X/Twitter", color: "text-foreground", bg: "bg-muted" },
    ],
    subdomain: "budi-design.upshare.id",
    name2: "Budi Santoso",
    bio: "UI/UX Designer · 5+ tahun 🎨",
  },
];

export function BiolinkShowcaseSection() {
  const [activeTab, setActiveTab] = useState(0);
  const current = templates[activeTab];
  const ProfileIcon = current.profileIcon;

  return (
    <section id="showcase" className="py-20 sm:py-28 bg-muted/20 relative overflow-hidden scroll-mt-20">
      {/* Background */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <Badge variant="outline" className="text-purple-600 border-purple-200 bg-purple-50 dark:bg-purple-900/30 dark:border-purple-800 dark:text-purple-400 mb-4 px-4 py-1.5">
            Template Siap Pakai
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
            Pilih Template,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-violet-500">
              Langsung Live
            </span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Tinggal pilih template sesuai kebutuhan, isi data kamu, dan biolink-mu siap dibagikan.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 max-w-5xl mx-auto">
          {/* Left: Template selector */}
          <div className="flex-1 w-full space-y-4">
            {templates.map((tpl, index) => (
              <button
                key={tpl.id}
                onClick={() => setActiveTab(index)}
                className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-300 ${
                  activeTab === index
                    ? "border-purple-400 bg-purple-50/80 dark:bg-purple-950/30 shadow-lg shadow-purple-500/10"
                    : "border-border/60 bg-card hover:border-purple-300/60 hover:bg-purple-50/30 dark:hover:bg-purple-950/10"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tpl.accent} flex items-center justify-center flex-shrink-0 shadow-md`}>
                    <tpl.profileIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-semibold text-foreground text-sm">{tpl.name}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tpl.categoryColor}`}>
                        {tpl.category}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{tpl.description}</p>
                  </div>
                  {activeTab === index && (
                    <ArrowRight className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                  )}
                </div>
              </button>
            ))}

            <div className="pt-2">
              <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-violet-500 text-white border-0 hover:opacity-90 shadow-lg">
                <Link href="/register">
                  Buat Biolink Gratis Sekarang <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right: Phone preview */}
          <div className="flex-shrink-0 w-64 sm:w-72">
            <div key={current.id} className="relative bg-foreground/5 border-2 border-border/60 rounded-[2.5rem] p-3 shadow-2xl animate-in fade-in zoom-in-95 duration-300">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-background rounded-b-xl z-10" />

              <div className="bg-gradient-to-b from-white to-purple-50/50 dark:from-background dark:to-purple-950/20 rounded-[2rem] overflow-hidden min-h-[460px] pt-7">
                {/* URL bar */}
                <div className="mx-3 mb-4 bg-white dark:bg-card border border-purple-200 dark:border-purple-800/50 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 shadow-sm">
                  <span className="text-green-500 text-[10px]">🔒</span>
                  <span className="text-[10px] font-mono font-semibold text-purple-700 dark:text-purple-300 truncate">{current.subdomain}</span>
                </div>

                {/* Profile */}
                <div className="text-center px-4 mb-5">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${current.profileBg} mx-auto mb-2 flex items-center justify-center shadow-lg`}>
                    <ProfileIcon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-foreground text-xs">{current.name2}</h3>
                  <p className="text-[10px] text-muted-foreground">{current.bio}</p>
                </div>

                {/* Links */}
                <div className="px-3 space-y-2">
                  {current.links.map((link) => {
                    const Icon = link.icon;
                    return (
                      <div key={link.label} className="flex items-center gap-2.5 bg-white dark:bg-card border border-border/60 rounded-xl px-3 py-2.5 shadow-sm">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${link.bg}`}>
                          <Icon className={`w-3.5 h-3.5 ${link.color}`} />
                        </div>
                        <span className="text-[10px] font-medium text-foreground truncate">{link.label}</span>
                      </div>
                    );
                  })}
                </div>

                <p className="text-center text-[8px] text-muted-foreground/50 mt-5 pb-3">
                  upshare.id
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
