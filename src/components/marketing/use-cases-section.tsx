"use client";

import {
  Heart,
  ShoppingBag,
  Code2,
  Megaphone,
} from "lucide-react";

const useCases = [
  {
    icon: Heart,
    emoji: "💍",
    target: "Pasangan & Pengantin",
    headline: "Undangan Pernikahan Digital",
    description:
      "Gantikan undangan kertas dengan halaman web elegan. Ada countdown hari H, konfirmasi kehadiran (RSVP), galeri foto, dan lokasi maps.",
    example: "andi-sari.upshare.id",
    mode: "Undangan Digital",
    modeColor: "text-rose-500 bg-rose-50 dark:bg-rose-950/50",
    color: "text-rose-500",
    gradient: "from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30",
    border: "border-rose-100 dark:border-rose-900/50",
    accent: "bg-rose-500",
  },
  {
    icon: ShoppingBag,
    emoji: "🛍️",
    target: "UMKM & Online Shop",
    headline: "Biolink Toko & Katalog Produk",
    description:
      "Satu link untuk semua. Tampilkan produk, tombol order via WhatsApp, dan semua sosial media toko kamu dari satu halaman yang rapi.",
    example: "tokobaju.upshare.id",
    mode: "Biolink & Toko",
    modeColor: "text-purple-500 bg-purple-50 dark:bg-purple-950/50",
    color: "text-purple-500",
    gradient: "from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30",
    border: "border-purple-100 dark:border-purple-900/50",
    accent: "bg-purple-500",
  },
  {
    icon: Code2,
    emoji: "👨‍💻",
    target: "Developer & Freelancer",
    headline: "Web Proxy & Custom Domain",
    description:
      "Deploy ke Netlify atau Vercel, lalu proxy ke subdomain kustom kamu. Project kamu tetap diakses lewat URL yang profesional.",
    example: "porto.upshare.id",
    mode: "Web Proxy",
    modeColor: "text-blue-500 bg-blue-50 dark:bg-blue-950/50",
    color: "text-blue-500",
    gradient: "from-blue-50 to-sky-50 dark:from-blue-950/30 dark:to-sky-950/30",
    border: "border-blue-100 dark:border-blue-900/50",
    accent: "bg-blue-500",
  },
  {
    icon: Megaphone,
    emoji: "🎨",
    target: "Kreator & Content Creator",
    headline: "Landing Page & Portofolio",
    description:
      "Buat halaman profil personal yang menampilkan semua konten, link channel, dan cara follow kamu — dalam satu subdomain yang branded.",
    example: "creator.upshare.id",
    mode: "Landing Page",
    modeColor: "text-amber-500 bg-amber-50 dark:bg-amber-950/50",
    color: "text-amber-500",
    gradient: "from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30",
    border: "border-amber-100 dark:border-amber-900/50",
    accent: "bg-amber-500",
  },
];

export function UseCasesSection() {
  return (
    <section className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-widest mb-2 sm:mb-3">
            Untuk Siapa?
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
            Cocok untuk{" "}
            <span className="text-gradient-brand">Semua Kalangan</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Dari pengantin hingga developer, dari UMKM hingga kreator konten — Upshare punya solusinya.
          </p>
        </div>

        {/* Use Case Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 max-w-5xl mx-auto">
          {useCases.map((uc) => {
            const Icon = uc.icon;
            return (
              <div
                key={uc.target}
                className={`group relative overflow-hidden rounded-2xl border ${uc.border} bg-gradient-to-br ${uc.gradient} p-6 sm:p-7 hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                {/* Top Row */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl ${uc.accent}/15 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-5 h-5 ${uc.color}`} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium mb-0.5">{uc.target}</p>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${uc.modeColor}`}>
                        {uc.mode}
                      </span>
                    </div>
                  </div>
                  <span className="text-2xl flex-shrink-0">{uc.emoji}</span>
                </div>

                {/* Content */}
                <h3 className="text-base sm:text-lg font-bold text-foreground mb-2">
                  {uc.headline}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {uc.description}
                </p>

                {/* Example URL */}
                <div className="flex items-center gap-2 bg-white/60 dark:bg-black/20 border border-white/50 dark:border-white/10 rounded-lg px-3 py-2 w-fit">
                  <span className="text-green-500 text-xs">🔒</span>
                  <span className={`text-xs font-mono font-medium ${uc.color}`}>
                    {uc.example}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
