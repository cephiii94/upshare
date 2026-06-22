import type { Metadata } from "next";
import { HeroSectionLanding } from "@/components/marketing/landingpage/hero-section-landingpage";
import { FeaturesSectionLanding } from "@/components/marketing/landingpage/features-section-landingpage";
import { ShowcaseSectionLanding } from "@/components/marketing/landingpage/showcase-section-landingpage";
import { CTASectionLanding } from "@/components/marketing/landingpage/cta-section-landingpage";
import { MarketingNavbar } from "@/components/marketing/navbar";
import { MarketingFooter } from "@/components/marketing/footer";

export const metadata: Metadata = {
  title: "Upshare Landing — Buat Website Mini Profesional Tanpa Coding",
  description:
    "Buat landing page profesional untuk portofolio, CV digital, profil bisnis, atau halaman promo di subdomain kustom kamu sendiri. Pilih template, isi konten, langsung live.",
};

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <MarketingNavbar />
      <main className="flex-1">
        <HeroSectionLanding />
        <FeaturesSectionLanding />
        <ShowcaseSectionLanding />
        <CTASectionLanding />
      </main>
      <MarketingFooter />
    </div>
  );
}
