"use client";

import {
  Link2,
  ShoppingBag,
  MessageCircle,
  BarChart3,
  Palette,
  Share2,
  Zap,
  ShieldCheck,
  ImageIcon,
} from "lucide-react";

const features = [
  {
    icon: Link2,
    title: "Semua Link di Satu Halaman",
    description:
      "Tampilkan link toko, WhatsApp, Instagram, TikTok, Shopee, Tokopedia — semuanya dalam satu halaman yang bisa dikustomisasi.",
    color: "text-purple-500",
    bg: "bg-purple-50 dark:bg-purple-950/30",
  },
  {
    icon: MessageCircle,
    title: "Tombol WhatsApp Langsung",
    description:
      "Pelanggan bisa langsung chat atau order via WhatsApp dengan satu klik. Kamu bisa atur pesan template otomatis.",
    color: "text-green-600",
    bg: "bg-green-50 dark:bg-green-950/30",
  },
  {
    icon: ShoppingBag,
    title: "Katalog Produk Mini",
    description:
      "Tampilkan produk unggulan dengan foto, nama, dan harga. Cocok untuk online shop tanpa website resmi.",
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-950/30",
  },
  {
    icon: BarChart3,
    title: "Analitik Klik Real-time",
    description:
      "Pantau berapa kali setiap link diklik, dari mana pengunjung datang, dan produk mana yang paling diminati.",
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    icon: Palette,
    title: "Tampilan Custom & Branded",
    description:
      "Pilih warna, font, dan tema yang sesuai dengan identitas brand-mu. Bukan template generik — tapi benar-benar kamu.",
    color: "text-rose-500",
    bg: "bg-rose-50 dark:bg-rose-950/30",
  },
  {
    icon: Share2,
    title: "Open Graph Otomatis",
    description:
      "Saat link dibagikan ke WhatsApp atau Instagram Story, otomatis muncul thumbnail foto profil toko dan nama brand-mu.",
    color: "text-sky-500",
    bg: "bg-sky-50 dark:bg-sky-950/30",
  },
  {
    icon: Zap,
    title: "Setup dalam 2 Menit",
    description:
      "Tidak perlu tahu coding. Isi nama, foto profil, dan tambahkan link — halaman biolink-mu langsung live dan siap dibagikan.",
    color: "text-yellow-500",
    bg: "bg-yellow-50 dark:bg-yellow-950/30",
  },
  {
    icon: ShieldCheck,
    title: "SSL & Subdomain Sendiri",
    description:
      "Bukan link gratisan generik. Kamu punya subdomain sendiri seperti tokobaju.upshare.id dengan HTTPS gratis selamanya.",
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  {
    icon: ImageIcon,
    title: "Galeri Foto Produk",
    description:
      "Tampilkan foto-foto produk terbaik di halaman biolink-mu. Buat calon pembeli langsung jatuh cinta sebelum chat.",
    color: "text-pink-500",
    bg: "bg-pink-50 dark:bg-pink-950/30",
  },
];

export function FeaturesSectionBiolink() {
  return (
    <section id="features" className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <p className="text-xs sm:text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-2 sm:mb-3">
            Fitur Unggulan
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
            Lebih dari Sekadar{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-violet-500">
              Link Biasa
            </span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Upshare Biolink dirancang khusus untuk UMKM, online shop, dan kreator konten Indonesia — bukan hanya halaman link polos.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group p-6 rounded-2xl border border-border/60 bg-card hover:border-purple-400/40 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${feature.bg} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
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
