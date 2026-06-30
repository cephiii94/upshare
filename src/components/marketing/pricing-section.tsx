"use client";

import Link from "next/link";
import Script from "next/script";
import { CheckCircle2, X, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createCheckoutSession } from "@/app/actions/checkout";

const plans = [
  {
    name: "Gratis",
    id: null,
    price: "Rp 0",
    period: "selamanya",
    description: "Sempurna untuk memulai dan merasakan semua fitur Upshare.",
    badge: null,
    features: [
      { text: "1 Subdomain gratis", included: true },
      { text: "Akses semua mode (Proxy, Undangan, Biolink)", included: true, highlight: true },
      { text: "+ Add-on subdomain Rp 10rb/domain", included: true, highlight: true },
      { text: "SSL (HTTPS) Otomatis", included: true },
      { text: "Analitik dasar", included: true },
      { text: "Bebas Watermark Upshare", included: false },
      { text: "Template premium & custom tema", included: false },
    ],
    cta: "Mulai Gratis",
    ctaVariant: "outline" as const,
    href: "/register",
  },
  {
    name: "Pro",
    id: "pro",
    price: "Rp 49.000",
    period: "per bulan",
    description: "Untuk kreator, UMKM, dan profesional yang butuh lebih.",
    badge: "Paling Populer",
    features: [
      { text: "3 Subdomain bawaan", included: true },
      { text: "Akses semua mode (Proxy, Undangan, Biolink)", included: true, highlight: true },
      { text: "+ Add-on subdomain Rp 10rb/domain", included: true, highlight: true },
      { text: "SSL (HTTPS) Otomatis", included: true },
      { text: "Analitik lengkap (traffic, klik, referral)", included: true },
      { text: "Bebas Watermark & Template Premium", included: true },
      { text: "Prioritas support", included: false },
    ],
    cta: "Pilih Paket",
    ctaVariant: "default" as const,
    href: "/register?plan=pro",
  },
  {
    name: "Business",
    id: "business",
    price: "Rp 149.000",
    period: "per bulan",
    description: "Solusi lengkap tanpa batas untuk tim dan agensi.",
    badge: null,
    features: [
      { text: "10 Subdomain bawaan", included: true },
      { text: "Akses semua mode (Proxy, Undangan, Biolink)", included: true, highlight: true },
      { text: "+ Add-on subdomain Rp 10rb/domain", included: true, highlight: true },
      { text: "SSL (HTTPS) Otomatis", included: true },
      { text: "Analitik advanced + export data", included: true },
      { text: "Bebas Watermark & Template Premium", included: true },
      { text: "Prioritas support 24/7", included: true },
    ],
    cta: "Pilih Paket",
    ctaVariant: "outline" as const,
    href: "/register?plan=business",
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 sm:py-28 bg-muted/30 scroll-mt-20">
      <Script 
        src={process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === 'true' ? 'https://app.midtrans.com/snap/snap.js' : 'https://app.sandbox.midtrans.com/snap/snap.js'}
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 px-4 sm:px-0">
          <p className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-widest mb-2 sm:mb-3">
            Harga Transparan
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            Pilih Paket{" "}
            <span className="text-gradient-brand">yang Tepat</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg mb-4">
            Mulai gratis, upgrade kapan saja. Tidak ada biaya tersembunyi.
          </p>
          {/* Value highlight */}
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-sm font-medium px-4 py-2 rounded-full">
            <Sparkles className="w-4 h-4" />
            Semua paket sudah termasuk akses Proxy, Undangan, Biolink & Landing Page
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-6 sm:p-8 transition-all duration-300 ${
                plan.badge
                  ? "border-primary shadow-xl shadow-primary/10 bg-card md:scale-[1.02]"
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
              <div className="mb-6 min-h-[60px] flex flex-col justify-center">
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
                {plan.features.map((feature) => {
                  const isHighlighted = "highlight" in feature && feature.highlight;
                  return (
                    <li key={feature.text} className="flex items-start gap-2.5">
                      {feature.included ? (
                        <CheckCircle2
                          className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                            isHighlighted ? "text-amber-500" : "text-primary"
                          }`}
                        />
                      ) : (
                        <X className="w-4 h-4 text-muted-foreground/40 flex-shrink-0 mt-0.5" />
                      )}
                      <span
                        className={`text-sm ${
                          feature.included
                            ? isHighlighted
                              ? "text-amber-600 dark:text-amber-500 font-medium"
                              : "text-foreground"
                            : "text-muted-foreground/60"
                        }`}
                      >
                        {feature.text}
                      </span>
                    </li>
                  );
                })}
              </ul>

              {/* CTA */}
              {plan.id ? (
                <form
                  action={async (formData) => {
                    const res = await createCheckoutSession(formData);
                    if (res && res.success && res.data?.snapToken) {
                      // Trigger Midtrans Snap
                      // @ts-ignore
                      window.snap.pay(res.data.snapToken, {
                        onSuccess: function(result: any) {
                          toast.success("Pembayaran berhasil!", { description: "Sedang mengarahkan..." });
                          setTimeout(() => window.location.href = '/dashboard', 1500);
                        },
                        onPending: function(result: any) {
                          toast.info("Menunggu pembayaran Anda!");
                        },
                        onError: function(result: any) {
                          toast.error("Pembayaran gagal!");
                        },
                        onClose: function() {
                          console.log('Customer closed the popup without finishing the payment');
                        }
                      });
                    } else if (res && !res.success) {
                      toast.error(res.error);
                    }
                  }}
                  className="w-full"
                >
                  <input type="hidden" name="planId" value={plan.id} />
                  <Button
                    type="submit"
                    variant={plan.badge ? "default" : plan.ctaVariant}
                    className={
                      plan.badge
                        ? "gradient-brand text-white border-0 hover:opacity-90 w-full"
                        : "w-full"
                    }
                  >
                    {plan.cta}
                  </Button>
                </form>
              ) : (
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
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
