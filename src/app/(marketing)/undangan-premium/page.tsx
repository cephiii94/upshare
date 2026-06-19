import type { Metadata } from "next";
import { HeroSectionUndangan } from "@/components/marketing/undangan/hero-section-undangan";
import { FeaturesSectionUndangan } from "@/components/marketing/undangan/features-section-undangan";
import { PricingSection } from "@/components/marketing/pricing-section";
import { CTASection } from "@/components/marketing/cta-section";
import { MarketingNavbar } from "@/components/marketing/navbar";
import { MarketingFooter } from "@/components/marketing/footer";

export const metadata: Metadata = {
  title: "Upshare Undangan Premium — Link Subdomain Elegan untuk Undangan Digital",
  description:
    "Ubah link undangan pernikahan Netlify/Vercel Anda menjadi nama pasangan. Berikan kesan eksklusif dan mewah saat undangan dibagikan di WhatsApp.",
};

export default function UndanganPremiumPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <MarketingNavbar />
      <main className="flex-1">
        <HeroSectionUndangan />
        <FeaturesSectionUndangan />
        {/* Menggunakan komponen universal untuk Pricing & CTA */}
        <PricingSection />
        <CTASection />
      </main>
      <MarketingFooter />
    </div>
  );
}
