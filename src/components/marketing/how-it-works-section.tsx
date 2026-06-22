"use client";

import { UserPlus, LayoutGrid, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Daftar & Klaim Subdomain",
    description:
      "Buat akun gratis dan pilih nama subdomain impian kamu. Tidak perlu kartu kredit, tidak perlu pengaturan DNS yang rumit.",
    color: "text-blue-500",
    bg: "bg-blue-500",
    lightBg: "bg-blue-50 dark:bg-blue-950/40",
    border: "border-blue-200 dark:border-blue-800/60",
    detail: "Contoh: namakamu.upshare.id",
  },
  {
    number: "02",
    icon: LayoutGrid,
    title: "Pilih Mode yang Kamu Butuhkan",
    description:
      "Pilih mau digunakan sebagai Web Proxy, Undangan Digital, Biolink Toko, atau Landing Page. Bisa ganti mode kapan saja.",
    color: "text-purple-500",
    bg: "bg-purple-500",
    lightBg: "bg-purple-50 dark:bg-purple-950/40",
    border: "border-purple-200 dark:border-purple-800/60",
    detail: "4 mode tersedia, bebas pilih",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Aktifkan & Bagikan",
    description:
      "Isi konten, konfigurasi sesuai kebutuhan, lalu aktifkan. Subdomain kamu langsung live dan bisa langsung dibagikan.",
    color: "text-green-500",
    bg: "bg-green-500",
    lightBg: "bg-green-50 dark:bg-green-950/40",
    border: "border-green-200 dark:border-green-800/60",
    detail: "Siap dalam kurang dari 2 menit",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 sm:py-28 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-widest mb-2 sm:mb-3">
            Cara Kerja
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
            Mulai dalam{" "}
            <span className="text-gradient-brand">3 Langkah Mudah</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Tidak butuh keahlian teknis. Tidak perlu tahu DNS atau coding.
            Cukup daftar, pilih, dan aktifkan.
          </p>
        </div>

        {/* Steps */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connector line - desktop only */}
          <div className="hidden lg:block absolute top-[52px] left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200 dark:from-blue-900 dark:via-purple-900 dark:to-green-900" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="relative flex flex-col items-center text-center lg:items-start lg:text-left"
                >
                  {/* Step Number + Icon */}
                  <div className="relative mb-5">
                    <div
                      className={`w-16 h-16 rounded-2xl ${step.lightBg} border-2 ${step.border} flex items-center justify-center shadow-sm relative z-10`}
                    >
                      <Icon className={`w-7 h-7 ${step.color}`} />
                    </div>
                    <div
                      className={`absolute -top-2 -right-2 w-7 h-7 rounded-full ${step.bg} flex items-center justify-center z-20`}
                    >
                      <span className="text-[10px] font-bold text-white">
                        {index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`p-5 rounded-2xl border ${step.border} ${step.lightBg} w-full`}>
                    <h3 className="text-base font-bold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      {step.description}
                    </p>
                    <div
                      className={`inline-flex items-center gap-1.5 text-xs font-medium ${step.color} bg-white/70 dark:bg-black/20 px-3 py-1.5 rounded-full`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {step.detail}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
