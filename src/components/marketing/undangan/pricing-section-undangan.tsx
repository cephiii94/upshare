"use client";

import Link from "next/link";
import { CheckCircle2, X } from "lucide-react";
import { Sparkles, Check, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createCheckoutSession } from "@/app/actions/checkout";

const plans = [
  {
    name: "Personal (Calon Pengantin)",
    id: "pro", // Menggunakan ID langganan yang ada, bisa disesuaikan nanti
    price: "Rp 49.000",
    period: "sekali bayar",
    description: "Sempurna untuk satu acara pernikahan. Aktif selama 1 tahun penuh.",
    badge: null,
    features: [
      { text: "1 Subdomain Pasangan", included: true },
      { text: "Kustom Thumbnail WA & IG", included: true },
      { text: "SSL (HTTPS) Keamanan", included: true },
      { text: "Link aktif 1 Tahun", included: true },
      { text: "Multi-klien dashboard", included: false },
      { text: "Prioritas support WhatsApp", included: false },
    ],
    cta: "Pilih Paket",
    ctaVariant: "outline" as const,
    href: "/register?plan=pro",
  },
  {
    name: "Vendor / EO",
    id: "business", // Menggunakan ID langganan yang ada
    price: "Rp 149.000",
    period: "per bulan",
    description: "Untuk jasa pembuat undangan digital yang memiliki banyak klien.",
    badge: "Pilihan Utama",
    features: [
      { text: "Subdomain Pasangan UNLIMITED", included: true },
      { text: "Kustom Thumbnail WA & IG", included: true },
      { text: "SSL (HTTPS) Keamanan", included: true },
      { text: "Link aktif selamanya (selama langganan)", included: true },
      { text: "Multi-klien dashboard (Manajemen mudah)", included: true },
      { text: "Prioritas support WhatsApp 24/7", included: true },
    ],
    cta: "Pilih Paket",
    ctaVariant: "default" as const,
    href: "/register?plan=business",
  },
];

export function PricingSectionUndangan() {
  return (
    <section id="pricing" className="py-20 sm:py-28 bg-rose-50/30 dark:bg-rose-950/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-rose-500 uppercase tracking-widest mb-3">
            Investasi Terjangkau
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Harga Spesial untuk{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">Hari Spesial</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Pilih paket yang sesuai dengan kebutuhan Anda. Transparan tanpa biaya tersembunyi.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-8 transition-all duration-300 ${
                plan.badge
                  ? "border-rose-500 shadow-xl shadow-rose-500/10 bg-card scale-[1.02]"
                  : "border-border/60 bg-card hover:border-rose-500/40 hover:shadow-lg"
              }`}
            >
              {/* Popular Badge */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-rose-500 to-pink-600 text-white border-0 shadow-md px-4 py-1">
                    {plan.badge}
                  </Badge>
                </div>
              )}

              {/* Plan Name */}
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-foreground">
                  {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-6 pb-6 border-b border-border/50 min-h-[85px] flex flex-col justify-center">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-foreground">
                    {plan.price}
                  </span>
                </div>
                <span className="text-sm font-medium text-rose-600 dark:text-rose-400 mt-1 block">
                  {plan.period}
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature.text} className="flex items-start gap-3">
                    {feature.included ? (
                      <CheckCircle2 className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-muted-foreground/30 flex-shrink-0 mt-0.5" />
                    )}
                    <span
                      className={`text-sm ${
                        feature.included
                          ? "text-foreground font-medium"
                          : "text-muted-foreground/50"
                      }`}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              {plan.id ? (
                <form action={async (formData) => {
                  const res = await createCheckoutSession(formData);
                  if (res && res.success && res.data?.paymentUrl) {
                    toast.success("Mengarahkan ke pembayaran...");
                    window.location.href = res.data.paymentUrl;
                  } else if (res && !res.success) {
                    toast.error(res.error);
                  }
                }} className="w-full mt-auto">
                  <input type="hidden" name="planId" value={plan.id} />
                  <Button
                    type="submit"
                    variant={plan.badge ? "default" : plan.ctaVariant}
                    size="lg"
                    className={
                      plan.badge
                        ? "bg-gradient-to-r from-rose-500 to-pink-600 text-white border-0 hover:opacity-90 w-full text-base h-12"
                        : "w-full text-base h-12 border-rose-200 dark:border-rose-900 hover:bg-rose-50 dark:hover:bg-rose-900/30"
                    }
                  >
                    {plan.cta}
                  </Button>
                </form>
              ) : (
                <Button
                  variant={plan.badge ? "default" : plan.ctaVariant}
                  size="lg"
                  className={
                    plan.badge
                      ? "bg-gradient-to-r from-rose-500 to-pink-600 text-white border-0 hover:opacity-90 w-full text-base h-12"
                      : "w-full text-base h-12"
                  }
                  asChild
                >
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
