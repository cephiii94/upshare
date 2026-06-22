"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Heart, Star, Clock, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const templates = [
  {
    id: "modern-romance",
    name: "Modern Romance",
    category: "Free Tier (Gratis)",
    categoryColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400",
    description: "Desain modern dengan tipografi bold dan foto prewedding besar. Tersedia gratis untuk semua pengguna.",
    accent: "from-rose-500 to-pink-600",
    cardBg: "from-rose-50 via-pink-50 to-white dark:from-rose-950/60 dark:via-pink-950/30 dark:to-background",
    accentText: "text-rose-600",
    accentBorder: "border-rose-200 dark:border-rose-800/50",
    accentBg: "bg-rose-50 dark:bg-rose-950/40",
    photoArea: "bg-gradient-to-br from-rose-200 to-pink-300 dark:from-rose-900 dark:to-pink-900",
    tags: ["Template Gratis", "Foto Hero Besar", "Countdown Live", "RSVP & Ucapan"],
  },
  {
    id: "classic-gold",
    name: "Classic Gold",
    category: "Premium (Mewah)",
    categoryColor: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400",
    description: "Perpaduan warna krem dan aksen emas untuk kesan mewah, anggun, dan timeless. Cocok untuk pernikahan resmi.",
    accent: "from-amber-500 to-yellow-500",
    cardBg: "from-amber-50 via-yellow-50/60 to-white dark:from-amber-950/60 dark:via-yellow-950/30 dark:to-background",
    accentText: "text-amber-700",
    accentBorder: "border-amber-200 dark:border-amber-800/50",
    accentBg: "bg-amber-50 dark:bg-amber-950/40",
    photoArea: "bg-gradient-to-br from-amber-200 to-yellow-300 dark:from-amber-900 dark:to-yellow-900",
    tags: ["Tema Mewah", "Aksen Emas", "Kalender & Maps"],
  },
  {
    id: "minimalist-white",
    name: "Minimalist White",
    category: "Premium (Elegan)",
    categoryColor: "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-400",
    description: "Bersih, putih, dan simpel. Fokus pada teks dan tipografi. Pilihan sempurna untuk konsep pernikahan modern.",
    accent: "from-slate-600 to-slate-800",
    cardBg: "from-slate-50 to-white dark:from-slate-900/60 dark:to-background",
    accentText: "text-slate-700",
    accentBorder: "border-slate-200 dark:border-slate-700/50",
    accentBg: "bg-slate-50 dark:bg-slate-900/40",
    photoArea: "bg-gradient-to-br from-slate-200 to-gray-300 dark:from-slate-800 dark:to-gray-900",
    tags: ["Clean & Minimal", "Typografi Elegan", "Galeri Grid"],
  },
  {
    id: "garden-floral",
    name: "Garden Floral",
    category: "Premium (Romantis)",
    categoryColor: "bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-400",
    description: "Ornamen bunga dan daun hijau yang segar. Cocok untuk pernikahan outdoor, kebun, atau konsep alam.",
    accent: "from-emerald-500 to-teal-500",
    cardBg: "from-emerald-50 via-green-50/50 to-white dark:from-emerald-950/60 dark:via-green-950/30 dark:to-background",
    accentText: "text-emerald-700",
    accentBorder: "border-emerald-200 dark:border-emerald-800/50",
    accentBg: "bg-emerald-50 dark:bg-emerald-950/40",
    photoArea: "bg-gradient-to-br from-emerald-200 to-teal-300 dark:from-emerald-900 dark:to-teal-900",
    tags: ["Dekorasi Floral", "Outdoor Vibes", "RSVP Ramah"],
  },
];

export function TemplatePreviewSection() {
  const [activeTab, setActiveTab] = useState(0);
  const current = templates[activeTab];

  return (
    <section id="templates" className="py-20 sm:py-28 bg-muted/20 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <Badge variant="outline" className="text-rose-600 border-rose-200 bg-rose-50 dark:bg-rose-900/30 dark:border-rose-800 dark:text-rose-400 mb-4 px-4 py-1.5">
            <Star className="w-3.5 h-3.5 mr-1.5 fill-current" />
            4 Template Tersedia
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
            Pilih Tema yang{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">
              Mencerminkan Kalian
            </span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Setiap template sudah lengkap dengan countdown, RSVP, galeri, dan peta — tinggal ganti nama dan foto.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-14 max-w-5xl mx-auto">
          {/* Left: Template selector */}
          <div className="flex-1 w-full space-y-3">
            {templates.map((tpl, index) => (
              <button
                key={tpl.id}
                onClick={() => setActiveTab(index)}
                className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-300 ${
                  activeTab === index
                    ? "border-rose-400 bg-rose-50/80 dark:bg-rose-950/30 shadow-lg shadow-rose-500/10"
                    : "border-border/60 bg-card hover:border-rose-300/60 hover:bg-rose-50/20 dark:hover:bg-rose-950/10"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tpl.accent} flex items-center justify-center flex-shrink-0 shadow-md`}>
                    <Heart className="w-5 h-5 text-white fill-white/60" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-semibold text-foreground text-sm">{tpl.name}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tpl.categoryColor}`}>
                        {tpl.category}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{tpl.description}</p>
                    {activeTab === index && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {tpl.tags.map((tag) => (
                          <span key={tag} className="text-[10px] bg-white dark:bg-card border border-border/60 rounded-full px-2 py-0.5 text-muted-foreground">
                            ✦ {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  {activeTab === index && (
                    <ArrowRight className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                  )}
                </div>
              </button>
            ))}

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
                  <span className={`text-[10px] font-mono font-semibold ${current.accentText} truncate`}>romeo-dan-juliet.upshare.id</span>
                </div>

                {/* Photo area */}
                <div className={`mx-3 h-24 rounded-2xl ${current.photoArea} mb-3 flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="relative text-center">
                    <div className="flex items-center justify-center gap-1.5 mb-0.5">
                      <div className="h-px w-8 bg-white/60" />
                      <Heart className="w-3 h-3 text-white fill-white" />
                      <div className="h-px w-8 bg-white/60" />
                    </div>
                    <p className="text-white font-bold text-sm drop-shadow">Romeo & Juliet</p>
                    <p className="text-white/80 text-[9px]">14 Februari 2026</p>
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
                    <p className="text-[9px] font-semibold text-foreground">Masjid Istiqlal</p>
                    <p className="text-[8px] text-muted-foreground">Pukul 10.00 WIB</p>
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
          Template akan terus bertambah setiap bulan.{" "}
          <Link href="/register" className="text-rose-600 font-semibold hover:underline">
            Mulai gratis sekarang →
          </Link>
        </p>
      </div>
    </section>
  );
}
