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
    title: "Subdomain Premium",
    description:
      "Dapatkan subdomain eksklusif Anda sendiri seperti nama.upshare.id tanpa perlu membeli domain secara terpisah.",
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    icon: Zap,
    title: "Setup Instan Tanpa DNS",
    description:
      "Tidak perlu pusing dengan pengaturan DNS, CNAME, atau A Record. Cukup masukkan URL target, dan biarkan sistem kami bekerja.",
    color: "text-yellow-500",
    bg: "bg-yellow-50 dark:bg-yellow-950/30",
  },
  {
    icon: ShieldCheck,
    title: "SSL Otomatis",
    description:
      "Setiap subdomain yang Anda klaim sudah otomatis dilengkapi dengan sertifikat SSL (HTTPS) gratis selamanya.",
    color: "text-green-500",
    bg: "bg-green-50 dark:bg-green-950/30",
  },
  {
    icon: BarChart3,
    title: "Analitik Real-time",
    description:
      "Pantau performa traffic Anda. Ketahui berapa banyak pengunjung yang mengakses project Anda melalui subdomain Upshare.",
    color: "text-purple-500",
    bg: "bg-purple-50 dark:bg-purple-950/30",
  },
  {
    icon: LinkIcon,
    title: "Seamless Proxy",
    description:
      "Pengunjung tidak akan menyadari bahwa mereka diarahkan ke Netlify/Vercel. URL di browser tetap nama subdomain Anda.",
    color: "text-pink-500",
    bg: "bg-pink-50 dark:bg-pink-950/30",
  },
  {
    icon: Palette,
    title: "Satu Akun, Banyak Project",
    description:
      "Punya banyak project? Kelola berbagai subdomain dan arahkan ke berbagai platform berbeda hanya dari satu dashboard.",
    color: "text-cyan-500",
    bg: "bg-cyan-50 dark:bg-cyan-950/30",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 px-4 sm:px-0">
          <p className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-widest mb-2 sm:mb-3">
            Fitur Unggulan
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
            Semua yang Anda Butuhkan,{" "}
            <br className="hidden sm:block" />
            <span className="text-gradient-brand">Dalam Satu Platform</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Upshare dirancang untuk memenuhi kebutuhan profesional modern —
            dari freelancer hingga tim enterprise.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-border/60 bg-card hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl ${feature.bg} mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${feature.color}`} />
                </div>

                {/* Content */}
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1.5 sm:mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
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
