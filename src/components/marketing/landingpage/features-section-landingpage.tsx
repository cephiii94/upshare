"use client";

import {
  LayoutTemplate,
  Palette,
  Smartphone,
  Zap,
  BarChart3,
  ShieldCheck,
  MousePointerClick,
  Search,
  Share2,
} from "lucide-react";

const features = [
  {
    icon: LayoutTemplate,
    title: "Template Siap Pakai",
    description:
      "Pilih dari koleksi template profesional: portofolio, CV digital, profil bisnis, halaman promo, dan lainnya. Tinggal ganti isi, langsung jadi.",
    color: "text-amber-600",
    bg: "bg-amber-50 dark:bg-amber-950/30",
  },
  {
    icon: MousePointerClick,
    title: "Editor Blok Visual",
    description:
      "Susun halaman-mu dengan sistem blok drag-and-drop. Tambah, hapus, dan atur urutan blok konten semudah menyusun puzzle.",
    color: "text-orange-500",
    bg: "bg-orange-50 dark:bg-orange-950/30",
  },
  {
    icon: Smartphone,
    title: "Otomatis Responsif",
    description:
      "Setiap landing page yang kamu buat secara otomatis tampil sempurna di semua ukuran layar — HP, tablet, dan desktop.",
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    icon: Palette,
    title: "Custom Warna & Font",
    description:
      "Pilih palet warna dan tipografi yang mencerminkan personal brand atau identitas bisnis kamu. Tidak ada dua halaman yang sama.",
    color: "text-purple-500",
    bg: "bg-purple-50 dark:bg-purple-950/30",
  },
  {
    icon: Search,
    title: "SEO Otomatis",
    description:
      "Title tag, meta description, dan Open Graph sudah diatur otomatis. Landing page-mu mudah ditemukan di Google dan tampil rapi di sosmed.",
    color: "text-green-600",
    bg: "bg-green-50 dark:bg-green-950/30",
  },
  {
    icon: Share2,
    title: "Preview Cantik di WA",
    description:
      "Saat link dibagikan di WhatsApp, otomatis muncul thumbnail gambar, nama, dan deskripsi — bukan link kosong tanpa preview.",
    color: "text-sky-500",
    bg: "bg-sky-50 dark:bg-sky-950/30",
  },
  {
    icon: BarChart3,
    title: "Analitik Pengunjung",
    description:
      "Pantau siapa yang mengunjungi landing page-mu, dari mana datangnya, dan blok mana yang paling banyak dilihat.",
    color: "text-indigo-500",
    bg: "bg-indigo-50 dark:bg-indigo-950/30",
  },
  {
    icon: ShieldCheck,
    title: "SSL & Subdomain Sendiri",
    description:
      "Landing page-mu tampil di subdomain kustom seperti nama.upshare.id dengan HTTPS gratis — terlihat lebih profesional.",
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  {
    icon: Zap,
    title: "Publish Instan",
    description:
      "Setelah selesai edit, tekan Publish — halaman langsung live dalam hitungan detik. Tidak perlu deploy, tidak perlu server.",
    color: "text-yellow-500",
    bg: "bg-yellow-50 dark:bg-yellow-950/30",
  },
];

export function FeaturesSectionLanding() {
  return (
    <section id="features" className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs sm:text-sm font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-2 sm:mb-3">
            Fitur Unggulan
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
            Semua yang Kamu Butuhkan untuk{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
              Tampil Profesional
            </span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Bukan cuma halaman statis biasa — landing page Upshare punya tools lengkap layaknya website builder premium.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group p-6 rounded-2xl border border-border/60 bg-card hover:border-amber-400/40 hover:shadow-lg hover:shadow-amber-500/5 transition-all duration-300 hover:-translate-y-0.5"
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
