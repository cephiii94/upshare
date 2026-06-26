"use client";

import {
  Globe,
  Heart,
  Link2,
  LayoutTemplate,
  ShieldCheck,
  Zap,
  BarChart3,
  Share2,
  Palette,
  Clock,
} from "lucide-react";

const pillars = [
  {
    icon: Globe,
    title: "Web Proxy",
    description:
      "Arahkan subdomain kamu ke project Netlify, Vercel, atau GitHub Pages. Pengunjung melihat URL-mu, bukan URL hosting aslinya.",
    color: "text-blue-500",
    bg: "bg-blue-500",
    lightBg: "bg-blue-50 dark:bg-blue-950/40",
    border: "border-blue-200 dark:border-blue-800/50",
    badge: "Tersedia",
    badgeColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400",
  },
  {
    icon: Heart,
    title: "Undangan Digital",
    description:
      "Template undangan pernikahan & acara yang cantik dengan fitur countdown, RSVP online, galeri foto, dan peta lokasi.",
    color: "text-rose-500",
    bg: "bg-rose-500",
    lightBg: "bg-rose-50 dark:bg-rose-950/40",
    border: "border-rose-200 dark:border-rose-800/50",
    badge: "Tersedia",
    badgeColor: "bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-400",
  },
  {
    icon: Link2,
    title: "Biolink & Toko",
    description:
      "Halaman biolink ala Linktree lengkap dengan tombol WhatsApp, katalog produk, dan semua link sosial media kamu di satu tempat.",
    color: "text-purple-500",
    bg: "bg-purple-500",
    lightBg: "bg-purple-50 dark:bg-purple-950/40",
    border: "border-purple-200 dark:border-purple-800/50",
    badge: "Segera",
    badgeColor: "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-400",
  },
  {
    icon: LayoutTemplate,
    title: "Landing Page",
    description:
      "Buat mini landing page profesional untuk portofolio, produk, atau profil bisnis kamu — tanpa perlu tahu coding sama sekali.",
    color: "text-amber-500",
    bg: "bg-amber-500",
    lightBg: "bg-amber-50 dark:bg-amber-950/40",
    border: "border-amber-200 dark:border-amber-800/50",
    badge: "Segera",
    badgeColor: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400",
  },
];

const supportFeatures = [
  {
    icon: ShieldCheck,
    title: "SSL Otomatis",
    description: "HTTPS gratis selamanya di semua subdomain.",
    color: "text-green-500",
    bg: "bg-green-50 dark:bg-green-950/30",
  },
  {
    icon: BarChart3,
    title: "Analitik Pengunjung",
    description: "Pantau traffic & klik dari dashboard.",
    color: "text-indigo-500",
    bg: "bg-indigo-50 dark:bg-indigo-950/30",
  },
  {
    icon: Zap,
    title: "Setup 2 Menit",
    description: "Tanpa DNS, tanpa coding, langsung aktif.",
    color: "text-yellow-500",
    bg: "bg-yellow-50 dark:bg-yellow-950/30",
  },
  {
    icon: Share2,
    title: "Open Graph Otomatis",
    description: "Preview rapi saat link dibagikan ke WA & sosmed.",
    color: "text-sky-500",
    bg: "bg-sky-50 dark:bg-sky-950/30",
  },
  {
    icon: Palette,
    title: "Custom Tema",
    description: "Pilih warna & style sesuai identitas brand-mu.",
    color: "text-pink-500",
    bg: "bg-pink-50 dark:bg-pink-950/30",
  },
  {
    icon: Clock,
    title: "Add-on Subdomain",
    description: "Tambah subdomain ekstra hanya Rp 10rb/domain.",
    color: "text-orange-500",
    bg: "bg-orange-50 dark:bg-orange-950/30",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-28 bg-background scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 px-4 sm:px-0">
          <p className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-widest mb-2 sm:mb-3">
            Semua dalam 1 Subdomain
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
            Bukan Sekadar Subdomain,{" "}
            <br className="hidden sm:block" />
            <span className="text-gradient-brand">Tapi Ekosistem Digital Kamu</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Pilih mode yang kamu butuhkan. Satu akun, satu subdomain gratis,
            bisa untuk apa saja.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-10 sm:mb-14">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className={`group relative p-6 sm:p-8 rounded-2xl border-2 ${pillar.border} ${pillar.lightBg} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${pillar.bg}/15 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`w-6 h-6 ${pillar.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h3 className="text-lg font-bold text-foreground">
                        {pillar.title}
                      </h3>
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${pillar.badgeColor}`}
                      >
                        {pillar.badge}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-border/60" />
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest whitespace-nowrap">
            Fitur Pendukung
          </p>
          <div className="flex-1 h-px bg-border/60" />
        </div>

        {/* Support Features Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {supportFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group flex flex-col items-center text-center p-4 rounded-xl border border-border/60 bg-card hover:border-primary/40 hover:shadow-md transition-all duration-300"
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${feature.bg} mb-3 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className={`w-5 h-5 ${feature.color}`} />
                </div>
                <h4 className="text-xs font-semibold text-foreground mb-1">
                  {feature.title}
                </h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
