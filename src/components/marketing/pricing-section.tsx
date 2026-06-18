"use client";

import Link from "next/link";
import { CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    name: "Gratis",
    price: "Rp 0",
    period: "selamanya",
    description: "Cocok untuk memulai dan mencoba platform Upshare.",
    badge: null,
    features: [
      { text: "1 Subdomain kustom", included: true },
      { text: "Upload hingga 500MB/bulan", included: true },
      { text: "Maks. 10 file aktif", included: true },
      { text: "Tampilan default Upshare", included: true },
      { text: "Analitik dasar", included: false },
      { text: "Custom branding", included: false },
      { text: "Prioritas support", included: false },
    ],
    cta: "Mulai Gratis",
    ctaVariant: "outline" as const,
    href: "/register",
  },
  {
    name: "Pro",
    price: "Rp 49.000",
    period: "per bulan",
    description: "Untuk profesional yang ingin tampil maksimal.",
    badge: "Paling Populer",
    features: [
      { text: "1 Subdomain kustom premium", included: true },
      { text: "Upload hingga 10GB/bulan", included: true },
      { text: "File aktif tak terbatas", included: true },
      { text: "Custom branding & tema", included: true },
      { text: "Analitik lengkap", included: true },
      { text: "Proteksi password", included: true },
      { text: "Prioritas support", included: false },
    ],
    cta: "Mulai Pro",
    ctaVariant: "default" as const,
    href: "/register?plan=pro",
  },
  {
    name: "Business",
    price: "Rp 149.000",
    period: "per bulan",
    description: "Solusi lengkap untuk tim dan bisnis yang berkembang.",
    badge: null,
    features: [
      { text: "5 Subdomain kustom", included: true },
      { text: "Upload tak terbatas", included: true },
      { text: "File aktif tak terbatas", included: true },
      { text: "Custom branding & tema", included: true },
      { text: "Analitik advanced + API", included: true },
      { text: "Proteksi password & 2FA", included: true },
      { text: "Prioritas support 24/7", included: true },
    ],
    cta: "Mulai Business",
    ctaVariant: "outline" as const,
    href: "/register?plan=business",
  },
];

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="py-20 sm:py-28 bg-muted/30"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            Harga Transparan
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Pilih Paket{" "}
            <span className="text-gradient-brand">yang Tepat</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Mulai gratis, upgrade kapan saja. Tidak ada biaya tersembunyi.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-6 transition-all duration-300 ${
                plan.badge
                  ? "border-primary shadow-xl shadow-primary/10 bg-card scale-[1.02]"
                  : "border-border/60 bg-card hover:border-primary/40 hover:shadow-lg"
              }`}
            >
              {/* Popular Badge */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge className="gradient-brand text-white border-0 shadow-md px-4 py-1">
                    {plan.badge}
                  </Badge>
                </div>
              )}

              {/* Plan Name */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-foreground">
                  {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-foreground">
                    {plan.price}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {plan.period}
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature.text} className="flex items-start gap-2.5">
                    {feature.included ? (
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-4 h-4 text-muted-foreground/40 flex-shrink-0 mt-0.5" />
                    )}
                    <span
                      className={`text-sm ${
                        feature.included
                          ? "text-foreground"
                          : "text-muted-foreground/60"
                      }`}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant={plan.badge ? "default" : plan.ctaVariant}
                className={
                  plan.badge
                    ? "gradient-brand text-white border-0 hover:opacity-90 w-full"
                    : "w-full"
                }
                asChild
              >
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
