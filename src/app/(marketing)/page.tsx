import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/hero-section";
import { FeaturesSection } from "@/components/marketing/features-section";
import { PricingSection } from "@/components/marketing/pricing-section";
import { CTASection } from "@/components/marketing/cta-section";
import { MarketingNavbar } from "@/components/marketing/navbar";
import { MarketingFooter } from "@/components/marketing/footer";

export const metadata: Metadata = {
  title: "Upshare — Kustom Subdomain & Forwarding Platform",
  description:
    "Klaim subdomain kustom premium dan arahkan ke website Netlify, Vercel, atau Github Pages Anda secara instan dengan Upshare.",
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <MarketingNavbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <CTASection />
      </main>
      <MarketingFooter />
    </div>
  );
}
