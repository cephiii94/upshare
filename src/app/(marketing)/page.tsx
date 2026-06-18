import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/hero-section";
import { FeaturesSection } from "@/components/marketing/features-section";
import { PricingSection } from "@/components/marketing/pricing-section";
import { CTASection } from "@/components/marketing/cta-section";
import { MarketingNavbar } from "@/components/marketing/navbar";
import { MarketingFooter } from "@/components/marketing/footer";

export const metadata: Metadata = {
  title: "Upshare — Platform Berbagi File Profesional",
  description:
    "Buat subdomain kustom dan bagikan file Anda secara profesional. Upshare adalah solusi terbaik untuk individu dan bisnis yang ingin tampil profesional secara online.",
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
