import type { Metadata } from "next";
import { HeroSectionUndangan } from "@/components/marketing/undangan/hero-section-undangan";
import { FeaturesSectionUndangan } from "@/components/marketing/undangan/features-section-undangan";
import { TemplatePreviewSection } from "@/components/marketing/undangan/template-preview-section";
import { CTASection } from "@/components/marketing/cta-section";
import { MarketingNavbar } from "@/components/marketing/navbar";
import { MarketingFooter } from "@/components/marketing/footer";

export const metadata: Metadata = {
  title: "Upshare Undangan — Website Pernikahan Digital Lengkap",
  description:
    "Buat website pernikahan impian kalian di romeo-dan-juliet.upshare.id. Lengkap dengan countdown, RSVP online, galeri foto, peta lokasi, dan ucapan tamu — gratis, tanpa coding.",
};

export default function UndanganPremiumPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <MarketingNavbar />
      <main className="flex-1">
        <HeroSectionUndangan />
        <FeaturesSectionUndangan />
        <TemplatePreviewSection />
        <CTASection />
      </main>
      <MarketingFooter />
    </div>
  );
}
