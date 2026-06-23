import type { Metadata } from "next";
import { HeroSectionUndangan } from "@/components/marketing/undangan/hero-section-undangan";
import { FeaturesSectionUndangan } from "@/components/marketing/undangan/features-section-undangan";
import { TemplatePreviewSection } from "@/components/marketing/undangan/template-preview-section";
import { PricingSectionUndangan } from "@/components/marketing/undangan/pricing-section-undangan";
import { CTASection } from "@/components/marketing/cta-section";
import { MarketingNavbar } from "@/components/marketing/navbar";
import { MarketingFooter } from "@/components/marketing/footer";

export const metadata: Metadata = {
  title: "Upshare Undangan — Undangan Digital Premium untuk Semua Acara",
  description:
    "Buat undangan digital eksklusif di nama-acara.upshare.id. Pernikahan, anniversary, khitanan, ulang tahun, aqiqah, dan lebih banyak lagi — lengkap dengan countdown, RSVP online, galeri foto, dan peta lokasi. Gratis, tanpa coding.",
};

export default function UndanganPremiumPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <MarketingNavbar />
      <main className="flex-1">
        <HeroSectionUndangan />
        <FeaturesSectionUndangan />
        <TemplatePreviewSection />
        <PricingSectionUndangan />
        <CTASection />
      </main>
      <MarketingFooter />
    </div>
  );
}
