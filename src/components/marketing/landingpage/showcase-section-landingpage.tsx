"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Megaphone,
  GraduationCap,
  Star,
  MapPin,
  Mail,
  Phone,
  Tag,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const templates = [
  {
    id: "portfolio",
    name: "Portofolio Kreatif",
    category: "Freelancer & Designer",
    categoryColor: "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-400",
    description: "Tampilkan karya terbaik kamu dalam tampilan galeri yang elegan. Ideal untuk desainer, fotografer, dan developer.",
    accent: "from-purple-500 to-violet-600",
    profileIcon: Briefcase,
    profileBg: "from-purple-500 to-violet-600",
    subdomain: "budi-design.upshare.id",
    previewName: "Budi Santoso",
    previewRole: "UI/UX Designer",
    previewBio: "Membantu bisnis tampil lebih baik di digital",
    previewStat: "27 Proyek",
    previewStatColor: "text-purple-600",
    previewBlocks: [
      { label: "Tentang Saya", bg: "bg-purple-50 dark:bg-purple-950/40", border: "border-purple-200 dark:border-purple-800/50" },
      { label: "Portofolio Karya", bg: "bg-muted", border: "border-border/60" },
      { label: "Kontak & Hire Me", bg: "bg-purple-50 dark:bg-purple-950/40", border: "border-purple-200 dark:border-purple-800/50" },
    ],
    tags: ["Galeri Foto", "Kontak Klien", "Daftar Skill"],
  },
  {
    id: "bisnis",
    name: "Profil Bisnis",
    category: "UMKM & Perusahaan",
    categoryColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400",
    description: "Company profile sederhana yang terlihat profesional. Cocok untuk toko, klinik, salon, laundry, dan bisnis lokal lainnya.",
    accent: "from-blue-500 to-cyan-500",
    profileIcon: Building2,
    profileBg: "from-blue-500 to-cyan-500",
    subdomain: "klinik-sehat.upshare.id",
    previewName: "Klinik Sehat Sentosa",
    previewRole: "Klinik Kesehatan",
    previewBio: "Melayani dengan sepenuh hati sejak 2010",
    previewStat: "⭐ 4.9 Rating",
    previewStatColor: "text-blue-600",
    previewBlocks: [
      { label: "Profil & Layanan", bg: "bg-blue-50 dark:bg-blue-950/40", border: "border-blue-200 dark:border-blue-800/50" },
      { label: "Jam Operasional", bg: "bg-muted", border: "border-border/60" },
      { label: "Lokasi & Kontak", bg: "bg-blue-50 dark:bg-blue-950/40", border: "border-blue-200 dark:border-blue-800/50" },
    ],
    tags: ["Profil Layanan", "Jam Buka", "Maps & Kontak"],
  },
  {
    id: "promo",
    name: "Halaman Promo",
    category: "Promosi Produk",
    categoryColor: "bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-400",
    description: "Landing page khusus untuk peluncuran produk atau event promo. Buat pengunjung langsung tergiur beli.",
    accent: "from-rose-500 to-orange-500",
    profileIcon: Megaphone,
    profileBg: "from-rose-500 to-orange-500",
    subdomain: "promo-ramadan.upshare.id",
    previewName: "PROMO RAMADAN 2026",
    previewRole: "Diskon s/d 70%",
    previewBio: "Berlaku 1–30 Maret. Jangan sampai ketinggalan!",
    previewStat: "⏳ 12 Hari Lagi",
    previewStatColor: "text-rose-600",
    previewBlocks: [
      { label: "Banner Promo Hero", bg: "bg-rose-50 dark:bg-rose-950/40", border: "border-rose-200 dark:border-rose-800/50" },
      { label: "Daftar Produk Sale", bg: "bg-muted", border: "border-border/60" },
      { label: "Countdown & Order", bg: "bg-rose-50 dark:bg-rose-950/40", border: "border-rose-200 dark:border-rose-800/50" },
    ],
    tags: ["Countdown Timer", "Katalog Produk", "Tombol Beli"],
  },
  {
    id: "cv",
    name: "CV Digital",
    category: "Pencari Kerja",
    categoryColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400",
    description: "Versi digital dari CV-mu yang bisa dibagikan dengan satu link. Lebih berkesan dari file PDF biasa saat melamar kerja.",
    accent: "from-emerald-500 to-teal-500",
    profileIcon: GraduationCap,
    profileBg: "from-emerald-500 to-teal-500",
    subdomain: "sari-cv.upshare.id",
    previewName: "Sari Ramadhani",
    previewRole: "Fresh Graduate — S1 Teknik Informatika",
    previewBio: "Siap berkontribusi di dunia teknologi",
    previewStat: "Open to Work",
    previewStatColor: "text-emerald-600",
    previewBlocks: [
      { label: "Ringkasan & Skill", bg: "bg-emerald-50 dark:bg-emerald-950/40", border: "border-emerald-200 dark:border-emerald-800/50" },
      { label: "Pengalaman & Edu", bg: "bg-muted", border: "border-border/60" },
      { label: "Kontak HRD", bg: "bg-emerald-50 dark:bg-emerald-950/40", border: "border-emerald-200 dark:border-emerald-800/50" },
    ],
    tags: ["Daftar Skill", "Riwayat Kerja", "Download CV"],
  },
];

export function ShowcaseSectionLanding() {
  const [activeTab, setActiveTab] = useState(0);
  const current = templates[activeTab];
  const ProfileIcon = current.profileIcon;

  return (
    <section id="showcase" className="py-20 sm:py-28 bg-muted/20 relative overflow-hidden scroll-mt-20">
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50 dark:bg-amber-900/30 dark:border-amber-800 dark:text-amber-400 mb-4 px-4 py-1.5">
            <Star className="w-3.5 h-3.5 mr-1.5 fill-current" />
            4 Template Tersedia
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
            Pilih Template, Isi Konten,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
              Langsung Live
            </span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Setiap template sudah didesain untuk tujuan spesifik — bukan template kosong yang membingungkan.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-14 max-w-5xl mx-auto">
          {/* Left: Template cards */}
          <div className="flex-1 w-full space-y-3">
            {templates.map((tpl, index) => (
              <button
                key={tpl.id}
                onClick={() => setActiveTab(index)}
                className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-300 ${
                  activeTab === index
                    ? "border-amber-400 bg-amber-50/80 dark:bg-amber-950/30 shadow-lg shadow-amber-500/10"
                    : "border-border/60 bg-card hover:border-amber-300/60 hover:bg-amber-50/20 dark:hover:bg-amber-950/10"
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
                    {/* Tags */}
                    {activeTab === index && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {tpl.tags.map((tag) => (
                          <span key={tag} className="inline-flex items-center gap-1 text-[10px] bg-white dark:bg-card border border-border/60 rounded-full px-2 py-0.5 text-muted-foreground">
                            <Tag className="w-2.5 h-2.5" /> {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  {activeTab === index && (
                    <ArrowRight className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  )}
                </div>
              </button>
            ))}

            <div className="pt-2">
              <Button asChild className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 hover:opacity-90 shadow-lg">
                <Link href="/register">
                  Mulai dengan Template Ini <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right: Live Preview */}
          <div className="flex-shrink-0 w-full lg:w-72 xl:w-80">
            <div
              key={current.id}
              className="bg-card border-2 border-border/60 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300"
            >
              {/* Browser bar */}
              <div className="flex items-center gap-2 px-3 py-2.5 bg-muted/50 border-b border-border/50">
                <div className="flex gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 mx-2">
                  <div className="bg-background rounded px-2 py-1 text-[10px] flex items-center gap-1 max-w-full">
                    <span className="text-green-500">🔒</span>
                    <span className="font-mono font-semibold text-amber-700 dark:text-amber-400 truncate">{current.subdomain}</span>
                  </div>
                </div>
              </div>

              {/* Page content preview */}
              <div className="p-4 bg-gradient-to-b from-white to-muted/20 dark:from-background dark:to-muted/10 min-h-[380px] space-y-3">
                {/* Profile header */}
                <div className="text-center pb-3 border-b border-border/40">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${current.profileBg} mx-auto mb-2 flex items-center justify-center shadow-lg`}>
                    <ProfileIcon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-foreground text-xs leading-tight">{current.previewName}</h3>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{current.previewRole}</p>
                  <p className="text-[9px] text-muted-foreground mt-0.5 italic">{current.previewBio}</p>
                  <div className={`inline-block mt-1.5 text-[9px] font-bold ${current.previewStatColor} bg-muted px-2 py-0.5 rounded-full`}>
                    {current.previewStat}
                  </div>
                </div>

                {/* Block previews */}
                <div className="space-y-2">
                  {current.previewBlocks.map((block, i) => (
                    <div key={i} className={`p-2.5 rounded-xl border ${block.border} ${block.bg}`}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[9px] font-semibold text-foreground">{block.label}</span>
                        <span className="text-[8px] text-muted-foreground">Blok {i + 1}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="h-1.5 bg-border/60 rounded-full w-full" />
                        <div className="h-1.5 bg-border/60 rounded-full w-3/4" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Contact info */}
                <div className="flex flex-col gap-1.5 pt-1">
                  {[
                    { icon: Mail, label: "Email / Kontak" },
                    { icon: Phone, label: "WhatsApp" },
                    { icon: MapPin, label: "Lokasi" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2 text-[9px] text-muted-foreground">
                      <Icon className="w-3 h-3 flex-shrink-0" />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
