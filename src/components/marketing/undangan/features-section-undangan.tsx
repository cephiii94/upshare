"use client";

import {
  Globe,
  Clock,
  Users,
  Camera,
  MapPin,
  MessageCircle,
  BarChart3,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Subdomain Nama Pasangan",
    description:
      "romeo-dan-juliet.upshare.id — bukan link panjang dari Canva atau Netlify. Berikan kesan punya website pernikahan sendiri yang eksklusif.",
    color: "text-rose-500",
    bg: "bg-rose-50 dark:bg-rose-950/30",
  },
  {
    icon: Clock,
    title: "Countdown Hari H Real-time",
    description:
      "Hitung mundur detik demi detik menuju hari pernikahan. Tamu langsung tahu berapa lama lagi momen spesial itu tiba.",
    color: "text-pink-500",
    bg: "bg-pink-50 dark:bg-pink-950/30",
  },
  {
    icon: Users,
    title: "RSVP Online Langsung",
    description:
      "Tamu bisa konfirmasi kehadiran langsung dari halaman undangan — tanpa perlu chat WA satu per satu. Semua data masuk ke dashboard.",
    color: "text-purple-500",
    bg: "bg-purple-50 dark:bg-purple-950/30",
  },
  {
    icon: Camera,
    title: "Galeri Foto Pasangan",
    description:
      "Tampilkan momen terbaik prewedding atau foto favorit kalian berdua. Buat tamu semakin antusias datang ke pernikahan.",
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-950/30",
  },
  {
    icon: MapPin,
    title: "Peta Lokasi Terintegrasi",
    description:
      "Lokasi akad dan resepsi lengkap dengan Google Maps embed. Tidak ada lagi tamu yang nyasar atau salah tujuan.",
    color: "text-green-600",
    bg: "bg-green-50 dark:bg-green-950/30",
  },
  {
    icon: MessageCircle,
    title: "Ucapan & Doa Tamu",
    description:
      "Buka kolom ucapan agar tamu bisa menitipkan doa dan pesan hangat. Kenangan yang bisa dibaca ulang kapan saja.",
    color: "text-sky-500",
    bg: "bg-sky-50 dark:bg-sky-950/30",
  },
  {
    icon: Sparkles,
    title: "Thumbnail WA yang Cantik",
    description:
      "Saat link dibagikan di WhatsApp, muncul preview gambar pasangan, nama, dan tanggal — bukan link kosong tanpa preview.",
    color: "text-fuchsia-500",
    bg: "bg-fuchsia-50 dark:bg-fuchsia-950/30",
  },
  {
    icon: BarChart3,
    title: "Analitik Tamu Real-time",
    description:
      "Pantau berapa kali link undangan dibuka, berapa tamu yang RSVP, dan dari kota mana saja tamu kalian berasal.",
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  {
    icon: ShieldCheck,
    title: "SSL & Aktif Selamanya",
    description:
      "Link undangan kamu HTTPS dan tetap bisa diakses setelah hari H — sebagai kenangan digital pernikahan kalian.",
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
  },
];

export function FeaturesSectionUndangan() {
  return (
    <section id="features" className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs sm:text-sm font-semibold text-rose-500 uppercase tracking-widest mb-2 sm:mb-3">
            Fitur Unggulan
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
            Lebih dari Sekadar{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">
              Link Undangan Biasa
            </span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Upshare Undangan adalah website pernikahan lengkap — bukan hanya redirect link, tapi pengalaman undangan yang berkesan.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group p-6 rounded-2xl border border-border/60 bg-card hover:border-rose-400/40 hover:shadow-lg hover:shadow-rose-500/5 transition-all duration-300 hover:-translate-y-0.5"
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
