"use client";

import {
  Globe,
  ShieldCheck,
  Zap,
  BarChart3,
  Palette,
  LinkIcon,
} from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Subdomain Kustom",
    description:
      "Dapatkan subdomain eksklusif Anda sendiri seperti nama.upshare.id. Tampilkan identitas profesional Anda kepada dunia.",
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    icon: Zap,
    title: "Upload Cepat & Mudah",
    description:
      "Drag & drop file apapun dengan kecepatan tinggi. Mendukung semua format file hingga ukuran 5GB per file.",
    color: "text-yellow-500",
    bg: "bg-yellow-50 dark:bg-yellow-950/30",
  },
  {
    icon: ShieldCheck,
    title: "Keamanan Tinggi",
    description:
      "File Anda dilindungi dengan enkripsi end-to-end. Kontrol akses dengan tautan privat atau proteksi password.",
    color: "text-green-500",
    bg: "bg-green-50 dark:bg-green-950/30",
  },
  {
    icon: BarChart3,
    title: "Analitik Lengkap",
    description:
      "Pantau performa konten Anda. Ketahui siapa yang mengunduh, kapan, dan dari mana dengan dashboard analitik real-time.",
    color: "text-purple-500",
    bg: "bg-purple-50 dark:bg-purple-950/30",
  },
  {
    icon: Palette,
    title: "Tampilan Kustom",
    description:
      "Sesuaikan tampilan halaman subdomain Anda dengan warna, font, dan tata letak yang mencerminkan brand Anda.",
    color: "text-pink-500",
    bg: "bg-pink-50 dark:bg-pink-950/30",
  },
  {
    icon: LinkIcon,
    title: "Tautan Pintar",
    description:
      "Buat tautan pendek yang mudah diingat. Bagikan ke media sosial, email, atau kartu nama digital Anda.",
    color: "text-cyan-500",
    bg: "bg-cyan-50 dark:bg-cyan-950/30",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            Fitur Unggulan
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Semua yang Anda Butuhkan,{" "}
            <span className="text-gradient-brand">Dalam Satu Platform</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Upshare dirancang untuk memenuhi kebutuhan profesional modern —
            dari freelancer hingga tim enterprise.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative p-6 rounded-2xl border border-border/60 bg-card hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${feature.bg} mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className={`w-6 h-6 ${feature.color}`} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
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
