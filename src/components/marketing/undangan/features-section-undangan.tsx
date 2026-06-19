"use client";

import {
  Globe,
  ImageIcon,
  Zap,
  BarChart3,
  Users,
  LinkIcon,
} from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Subdomain Nama Pasangan",
    description:
      "Ubah link berantakan menjadi nama-pasangan.upshare.id. Memberikan kesan mewah dan eksklusif pada undangan digital Anda.",
    color: "text-rose-500",
    bg: "bg-rose-50 dark:bg-rose-950/30",
  },
  {
    icon: ImageIcon,
    title: "Thumbnail WA Elegan",
    description:
      "Tampilan gambar preview (thumbnail) saat link disebar di WhatsApp atau sosmed akan terlihat sempurna, tidak terpotong.",
    color: "text-pink-500",
    bg: "bg-pink-50 dark:bg-pink-950/30",
  },
  {
    icon: Zap,
    title: "Setup Instan Tanpa Ribet",
    description:
      "Tidak perlu mengerti coding atau DNS. Masukkan URL asal (Canva/Netlify/Vercel) dan link premium langsung jadi dalam 1 menit.",
    color: "text-yellow-500",
    bg: "bg-yellow-50 dark:bg-yellow-950/30",
  },
  {
    icon: Users,
    title: "Multi-klien untuk Vendor",
    description:
      "Khusus untuk EO atau Vendor Undangan: Kelola puluhan link klien pernikahan berbeda hanya dari satu dashboard tersentralisasi.",
    color: "text-purple-500",
    bg: "bg-purple-50 dark:bg-purple-950/30",
  },
  {
    icon: LinkIcon,
    title: "Seamless Proxy",
    description:
      "Tamu undangan tidak akan menyadari bahwa website asli di-hosting di tempat gratisan. URL di browser tetap nama pasangan.",
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    icon: BarChart3,
    title: "Analitik Real-time",
    description:
      "Pantau antusiasme tamu. Ketahui berapa banyak orang yang telah membuka link undangan digital Anda.",
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
  },
];

export function FeaturesSectionUndangan() {
  return (
    <section id="features" className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-rose-500 uppercase tracking-widest mb-3">
            Fitur Premium
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Buat Undangan Digital Anda{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">Terlihat Mahal</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Solusi praktis untuk menyamarkan link hosting gratisan menjadi link undangan pernikahan kelas atas.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative p-6 rounded-2xl border border-border/60 bg-card hover:border-rose-500/30 hover:shadow-lg hover:shadow-rose-500/5 transition-all duration-300"
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
