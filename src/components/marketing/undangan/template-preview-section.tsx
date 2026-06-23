"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Heart, Star, Scissors, Clock, MapPin, Users, Cake, Leaf } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// ── Category filters ──────────────────────────────────────────
const categories = [
  { id: "all",         label: "Semua" },
  { id: "pernikahan",  label: "💍 Pernikahan" },
  { id: "anniversary", label: "✨ Anniversary" },
  { id: "khitanan",    label: "✂️ Khitanan" },
  { id: "ulang-tahun", label: "🎂 Ulang Tahun" },
];

// ── Template data ─────────────────────────────────────────────
const templates = [
  {
    id: "modern-romance",
    name: "Modern Romance",
    category: "pernikahan",
    categoryLabel: "💍 Pernikahan",
    tier: "Gratis",
    tierColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400",
    description: "Desain modern dengan tipografi bold dan foto hero besar. Tersedia gratis untuk semua pengguna.",
    accent: "from-rose-500 to-pink-600",
    cardBg: "from-rose-50 via-pink-50 to-white dark:from-rose-950/60 dark:via-pink-950/30 dark:to-background",
    accentText: "text-rose-600",
    accentBorder: "border-rose-200 dark:border-rose-800/50",
    accentBg: "bg-rose-50 dark:bg-rose-950/40",
    photoBg: "bg-gradient-to-br from-rose-200 to-pink-300 dark:from-rose-900 dark:to-pink-900",
    tags: ["Template Gratis", "Foto Hero Besar", "Countdown Live", "RSVP & Ucapan"],
    mockSubdomain: "romeo-dan-juliet.upshare.id",
    mockTitle: "Romeo & Juliet",
    mockDate: "14 Februari 2026",
    mockVenue: "Masjid Istiqlal, Jakarta",
    mockTime: "Pukul 10.00 WIB",
    mockIcon: Heart,
  },
  {
    id: "premium-wedding",
    name: "Classic Gold",
    category: "pernikahan",
    categoryLabel: "💍 Pernikahan",
    tier: "Premium",
    tierColor: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400",
    description: "Perpaduan warna krem dan aksen emas untuk kesan mewah, anggun, dan timeless. Cocok untuk pernikahan resmi.",
    accent: "from-amber-500 to-yellow-500",
    cardBg: "from-amber-50 via-yellow-50/60 to-white dark:from-amber-950/60 dark:via-yellow-950/30 dark:to-background",
    accentText: "text-amber-700",
    accentBorder: "border-amber-200 dark:border-amber-800/50",
    accentBg: "bg-amber-50 dark:bg-amber-950/40",
    photoBg: "bg-gradient-to-br from-amber-200 to-yellow-300 dark:from-amber-900 dark:to-yellow-900",
    tags: ["Tema Mewah", "Aksen Emas", "Kalender & Maps"],
    mockSubdomain: "aditya-dan-nadia.upshare.id",
    mockTitle: "Aditya & Nadia",
    mockDate: "20 Desember 2026",
    mockVenue: "Grand Ballroom Hotel Indonesia",
    mockTime: "Pukul 11.00 WIB",
    mockIcon: Heart,
  },
  {
    id: "anniversary-gold",
    name: "Anniversary Gold",
    category: "anniversary",
    categoryLabel: "✨ Anniversary",
    tier: "Premium",
    tierColor: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400",
    description: "Desain hangat dengan nuansa emas dan romantis. Sempurna untuk merayakan tahun-tahun kebersamaan yang berharga.",
    accent: "from-amber-400 to-orange-500",
    cardBg: "from-amber-50 via-orange-50/50 to-white dark:from-amber-950/60 dark:via-orange-950/30 dark:to-background",
    accentText: "text-amber-700",
    accentBorder: "border-amber-200 dark:border-amber-800/50",
    accentBg: "bg-amber-50 dark:bg-amber-950/40",
    photoBg: "bg-gradient-to-br from-amber-200 to-orange-300 dark:from-amber-900 dark:to-orange-900",
    tags: ["Nuansa Romantis", "Timeline Kebersamaan", "Countdown", "Buku Tamu"],
    mockSubdomain: "10tahun-bersama.upshare.id",
    mockTitle: "10 Tahun Bersama ✨",
    mockDate: "20 Juli 2026",
    mockVenue: "Aston Priority Hotel, Jakarta",
    mockTime: "Pukul 18.00 WIB",
    mockIcon: Star,
  },
  {
    id: "khitanan-clean",
    name: "Khitanan Modern",
    category: "khitanan",
    categoryLabel: "✂️ Khitanan",
    tier: "Premium",
    tierColor: "bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-400",
    description: "Desain bersih dan cerah dengan ornamen Islami. Warna teal yang segar cocok untuk acara khitanan anak.",
    accent: "from-teal-500 to-cyan-500",
    cardBg: "from-teal-50 via-cyan-50/50 to-white dark:from-teal-950/60 dark:via-cyan-950/30 dark:to-background",
    accentText: "text-teal-700",
    accentBorder: "border-teal-200 dark:border-teal-800/50",
    accentBg: "bg-teal-50 dark:bg-teal-950/40",
    photoBg: "bg-gradient-to-br from-teal-200 to-cyan-300 dark:from-teal-900 dark:to-cyan-900",
    tags: ["Ornamen Islami", "RSVP Online", "Countdown", "Galeri Foto"],
    mockSubdomain: "khitanan-azzam.upshare.id",
    mockTitle: "Muhammad Azzam",
    mockDate: "5 April 2026",
    mockVenue: "Gedung Serba Guna Al-Ikhlas",
    mockTime: "Pukul 09.00 WIB",
    mockIcon: Scissors,
  },
  {
    id: "birthday-festive",
    name: "Birthday Festive",
    category: "ulang-tahun",
    categoryLabel: "🎂 Ulang Tahun",
    tier: "Segera Hadir",
    tierColor: "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-400",
    description: "Penuh warna dan keceriaan! Template playful untuk undangan ulang tahun anak maupun dewasa.",
    accent: "from-purple-500 to-fuchsia-500",
    cardBg: "from-purple-50 via-fuchsia-50/50 to-white dark:from-purple-950/60 dark:via-fuchsia-950/30 dark:to-background",
    accentText: "text-purple-700",
    accentBorder: "border-purple-200 dark:border-purple-800/50",
    accentBg: "bg-purple-50 dark:bg-purple-950/40",
    photoBg: "bg-gradient-to-br from-purple-200 to-fuchsia-300 dark:from-purple-900 dark:to-fuchsia-900",
    tags: ["Warna Festive", "RSVP Online", "Countdown", "Galeri"],
    mockSubdomain: "hbd-calista.upshare.id",
    mockTitle: "Calista — Sweet 17 🎂",
    mockDate: "12 Agustus 2026",
    mockVenue: "Garden Party Hall, Bandung",
    mockTime: "Pukul 16.00 WIB",
    mockIcon: Cake,
  },
  {
    id: "aqiqah-green",
    name: "Aqiqah Natural",
    category: "all",
    categoryLabel: "🌿 Aqiqah",
    tier: "Segera Hadir",
    tierColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400",
    description: "Nuansa hijau alami dengan ornamen dedaunan. Hangat dan khidmat untuk acara aqiqah dan syukuran.",
    accent: "from-emerald-500 to-green-600",
    cardBg: "from-emerald-50 via-green-50/50 to-white dark:from-emerald-950/60 dark:via-green-950/30 dark:to-background",
    accentText: "text-emerald-700",
    accentBorder: "border-emerald-200 dark:border-emerald-800/50",
    accentBg: "bg-emerald-50 dark:bg-emerald-950/40",
    photoBg: "bg-gradient-to-br from-emerald-200 to-green-300 dark:from-emerald-900 dark:to-green-900",
    tags: ["Nuansa Alami", "Ornamen Islami", "RSVP Online"],
    mockSubdomain: "aqiqah-ibrahim.upshare.id",
    mockTitle: "Ibrahim Al-Fatih 🌿",
    mockDate: "3 Maret 2026",
    mockVenue: "Kediaman Keluarga Besar",
    mockTime: "Pukul 10.00 WIB",
    mockIcon: Leaf,
  },
];

export function TemplatePreviewSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTab, setActiveTab] = useState(0);

  const filtered = activeCategory === "all"
    ? templates
    : templates.filter((t) => t.category === activeCategory);

  const current = filtered[Math.min(activeTab, filtered.length - 1)];
  const safeActiveTab = Math.min(activeTab, filtered.length - 1);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setActiveTab(0);
  };

  const MockIcon = current.mockIcon;

  return (
    <section id="templates" className="py-20 sm:py-28 bg-muted/20 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <Badge variant="outline" className="text-rose-600 border-rose-200 bg-rose-50 dark:bg-rose-900/30 dark:border-rose-800 dark:text-rose-400 mb-4 px-4 py-1.5">
            <Star className="w-3.5 h-3.5 mr-1.5 fill-current" />
            {templates.length} Template Tersedia
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
            Template untuk Setiap{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">
              Momen Spesial
            </span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Pilih tema yang pas untuk acaramu. Setiap template sudah lengkap dengan countdown, RSVP, galeri, dan peta.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                activeCategory === cat.id
                  ? "bg-rose-500 text-white border-rose-500 shadow-lg shadow-rose-500/20"
                  : "bg-card text-muted-foreground border-border/60 hover:border-rose-300/60 hover:bg-rose-50/20 dark:hover:bg-rose-950/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-14 max-w-5xl mx-auto">
          {/* Left: Template selector */}
          <div className="flex-1 w-full space-y-3">
            {filtered.map((tpl, index) => {
              const TplIcon = tpl.mockIcon;
              return (
                <button
                  key={tpl.id}
                  onClick={() => setActiveTab(index)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-300 ${
                    safeActiveTab === index
                      ? "border-rose-400 bg-rose-50/80 dark:bg-rose-950/30 shadow-lg shadow-rose-500/10"
                      : "border-border/60 bg-card hover:border-rose-300/60 hover:bg-rose-50/20 dark:hover:bg-rose-950/10"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tpl.accent} flex items-center justify-center flex-shrink-0 shadow-md`}>
                      <TplIcon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-semibold text-foreground text-sm">{tpl.name}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tpl.tierColor}`}>
                          {tpl.tier}
                        </span>
                        <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                          {tpl.categoryLabel}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{tpl.description}</p>
                      {safeActiveTab === index && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {tpl.tags.map((tag) => (
                            <span key={tag} className="text-[10px] bg-white dark:bg-card border border-border/60 rounded-full px-2 py-0.5 text-muted-foreground">
                              ✦ {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    {safeActiveTab === index && (
                      <ArrowRight className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                    )}
                  </div>
                </button>
              );
            })}

            <div className="pt-2">
              <Button asChild className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white border-0 hover:opacity-90 shadow-lg">
                <Link href="/register">
                  Gunakan Template Ini <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right: Phone preview */}
          <div className="flex-shrink-0 w-full lg:w-64 xl:w-72">
            <div
              key={current.id}
              className="relative bg-foreground/5 border-2 border-border/60 rounded-[2.5rem] p-3 shadow-2xl animate-in fade-in zoom-in-95 duration-300"
            >
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-background rounded-b-xl z-10" />

              <div className={`bg-gradient-to-b ${current.cardBg} rounded-[2rem] overflow-hidden min-h-[500px] pt-7`}>
                {/* URL bar */}
                <div className={`mx-3 mb-4 bg-white dark:bg-card border ${current.accentBorder} rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 shadow-sm`}>
                  <span className="text-green-500 text-[10px]">🔒</span>
                  <span className={`text-[10px] font-mono font-semibold ${current.accentText} truncate`}>
                    {current.mockSubdomain}
                  </span>
                </div>

                {/* Photo / hero area */}
                <div className={`mx-3 h-24 rounded-2xl ${current.photoBg} mb-3 flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="relative text-center">
                    <div className="flex items-center justify-center gap-1.5 mb-0.5">
                      <div className="h-px w-8 bg-white/60" />
                      <MockIcon className="w-3 h-3 text-white fill-white" />
                      <div className="h-px w-8 bg-white/60" />
                    </div>
                    <p className="text-white font-bold text-sm drop-shadow">{current.mockTitle}</p>
                    <p className="text-white/80 text-[9px]">{current.mockDate}</p>
                  </div>
                </div>

                {/* Countdown mini */}
                <div className={`mx-3 mb-2.5 border ${current.accentBorder} ${current.accentBg} rounded-xl p-2`}>
                  <div className="flex items-center gap-1 mb-1.5">
                    <Clock className={`w-2.5 h-2.5 ${current.accentText}`} />
                    <span className={`text-[8px] font-bold ${current.accentText} uppercase tracking-wide`}>Countdown</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1">
                    {["237", "08", "42", "05"].map((v, i) => (
                      <div key={i} className="bg-white dark:bg-card rounded-lg py-1 text-center">
                        <p className={`text-[10px] font-bold ${current.accentText}`}>{v}</p>
                        <p className="text-[7px] text-muted-foreground">{["H", "J", "M", "D"][i]}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div className="mx-3 mb-2.5 bg-white dark:bg-card border border-border/50 rounded-xl p-2 flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-lg ${current.accentBg} flex items-center justify-center`}>
                    <MapPin className={`w-3.5 h-3.5 ${current.accentText}`} />
                  </div>
                  <div>
                    <p className="text-[9px] font-semibold text-foreground truncate max-w-[140px]">{current.mockVenue}</p>
                    <p className="text-[8px] text-muted-foreground">{current.mockTime}</p>
                  </div>
                </div>

                {/* RSVP */}
                <div className="mx-3 mb-2.5 bg-white dark:bg-card border border-border/50 rounded-xl p-2">
                  <div className="flex items-center gap-1 mb-1.5">
                    <Users className={`w-2.5 h-2.5 ${current.accentText}`} />
                    <span className="text-[8px] font-bold text-foreground">Konfirmasi Kehadiran</span>
                  </div>
                  <div className="flex gap-1">
                    <div className={`flex-1 bg-gradient-to-r ${current.accent} rounded-lg py-1.5 text-center`}>
                      <span className="text-[8px] font-bold text-white">✓ Hadir</span>
                    </div>
                    <div className="flex-1 bg-muted rounded-lg py-1.5 text-center">
                      <span className="text-[8px] text-muted-foreground">✗ Tidak</span>
                    </div>
                  </div>
                </div>

                <p className="text-center text-[8px] text-muted-foreground/50 pb-3">upshare.id</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <p className="text-center text-sm text-muted-foreground mt-10">
          Template baru terus ditambahkan setiap bulan.{" "}
          <Link href="/register" className="text-rose-600 font-semibold hover:underline">
            Mulai gratis sekarang →
          </Link>
        </p>
      </div>
    </section>
  );
}
