import type { Metadata } from "next";
import { MarketingNavbar } from "@/components/marketing/navbar";
import { MarketingFooter } from "@/components/marketing/footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zap, Globe, Shield, Users, Target, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: "Pelajari lebih lanjut tentang Upshare — platform all-in-one untuk web proxy, undangan digital, biolink, dan landing page.",
};

const values = [
  {
    icon: Target,
    title: "Fokus pada Kemudahan",
    desc: "Kami percaya setiap orang berhak memiliki kehadiran digital yang profesional tanpa harus menguasai kode.",
  },
  {
    icon: Zap,
    title: "Cepat & Efisien",
    desc: "Dari ide ke halaman yang live dalam hitungan menit. Tidak perlu setup yang rumit atau konfigurasi teknis.",
  },
  {
    icon: Shield,
    title: "Aman & Terpercaya",
    desc: "Setiap halaman dilindungi SSL/HTTPS otomatis. Data Anda aman dan infrastruktur kami dirancang untuk keandalan.",
  },
  {
    icon: Globe,
    title: "Platform All-in-One",
    desc: "Web proxy, undangan digital, biolink, hingga landing page — semuanya dari satu akun dengan satu subdomain.",
  },
  {
    icon: Users,
    title: "Untuk Semua",
    desc: "Dari kreator konten, pelaku UMKM, event organizer, hingga profesional — Upshare dirancang untuk semua kalangan.",
  },
  {
    icon: Heart,
    title: "Dibuat dengan Cinta",
    desc: "Dibuat dan dikembangkan di Indonesia, untuk membantu kreator dan pelaku usaha lokal berkembang secara digital.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <MarketingNavbar />
      <main className="flex-1 bg-background">
        {/* Hero Section */}
        <section className="py-20 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
            <p className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-widest mb-4">
              Tentang Upshare
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Satu Subdomain untuk{" "}
              <span className="text-gradient-brand">Segalanya</span>
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
              Upshare hadir untuk menghilangkan batasan teknis bagi siapa saja yang ingin memiliki kehadiran digital yang profesional — tanpa coding, tanpa ribet, tanpa mahal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full px-8 gradient-brand border-0 text-white" asChild>
                <Link href="/register">Coba Sekarang — Gratis</Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8" asChild>
                <Link href="/#pricing">Lihat Paket Harga</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 sm:py-20 bg-muted/30 border-y border-border/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Mengapa Kami Ada</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Banyak kreator, UMKM, dan profesional berbakat di Indonesia yang tidak memiliki kehadiran digital layak — bukan karena tidak mau, melainkan karena prosesnya terlalu rumit dan mahal.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Upshare lahir untuk memecahkan masalah itu. Dengan satu akun dan satu subdomain gratis, Anda bisa langsung membuat web proxy, undangan digital, halaman biolink, hingga landing page yang siap dipakai dan tampil profesional.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Pengguna Aktif", value: "1.000+" },
                  { label: "Halaman Dibuat", value: "5.000+" },
                  { label: "Mode Tersedia", value: "4" },
                  { label: "Uptime", value: "99.9%" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-card border border-border/60 rounded-2xl p-6 text-center"
                  >
                    <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-14">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Nilai yang Kami Pegang</h2>
              <p className="text-muted-foreground">Prinsip yang memandu setiap keputusan yang kami buat untuk Anda.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((val) => {
                const Icon = val.icon;
                return (
                  <div
                    key={val.title}
                    className="bg-card border border-border/60 rounded-2xl p-6 hover:border-primary/40 hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{val.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{val.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Brich Digital Badge */}
        <section className="pb-20 sm:pb-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="bg-muted/40 border border-border/60 rounded-2xl p-6 sm:p-8 text-center">
              <p className="text-sm text-muted-foreground">
                Upshare.id adalah produk yang dikembangkan dan dioperasikan oleh{" "}
                <strong className="text-foreground">Brich Digital</strong> — sebuah studio teknologi yang berfokus pada pembuatan produk digital untuk kreator dan pelaku usaha Indonesia.
              </p>
            </div>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}
