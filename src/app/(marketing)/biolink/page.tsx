import type { Metadata } from "next";
import { HeroSectionBiolink } from "@/components/marketing/biolink/hero-section-biolink";
import { FeaturesSectionBiolink } from "@/components/marketing/biolink/features-section-biolink";
import { BiolinkShowcaseSection } from "@/components/marketing/biolink/showcase-section-biolink";
import { CTASectionBiolink } from "@/components/marketing/biolink/cta-section-biolink";
import { MarketingNavbar } from "@/components/marketing/navbar";
import { MarketingFooter } from "@/components/marketing/footer";

export const metadata: Metadata = {
  title: "Upshare Biolink — Satu Link untuk Semua yang Kamu Jual",
  description:
    "Buat halaman biolink toko online profesional di subdomain sendiri. Tampilkan produk, tombol WhatsApp, dan semua link sosmed dalam satu halaman — gratis, tanpa coding.",
};

export default function BiolinkPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <MarketingNavbar />
      <main className="flex-1">
        <HeroSectionBiolink />
        <FeaturesSectionBiolink />
        <BiolinkShowcaseSection />
        <CTASectionBiolink />
      </main>
      <MarketingFooter />
    </div>
  );
}
