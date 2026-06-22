import { PremiumWeddingTemplate } from "./premium-wedding";
import { ModernRomanceTemplate } from "./modern-romance";

interface TemplateRendererProps {
  data: any;
  subdomain: string;
  activeTab?: string;
}

/**
 * Komponen Koordinator (Registry)
 * Bertugas memilih komponen desain mana yang akan dirender berdasarkan theme_id dari database.
 *
 * Template IDs:
 *  - "modern-romance"   → Free tier (gratis)
 *  - "premium-wedding"  → Premium (berbayar)
 */
export function TemplateRenderer({ data, subdomain, activeTab }: TemplateRendererProps) {
  const themeId = data.theme_id || "modern-romance";

  switch (themeId) {
    case "modern-romance":
      return <ModernRomanceTemplate data={data} subdomain={subdomain} activeTab={activeTab} />;

    case "premium-wedding":
      return <PremiumWeddingTemplate data={data} subdomain={subdomain} activeTab={activeTab} />;

    default:
      return <ModernRomanceTemplate data={data} subdomain={subdomain} activeTab={activeTab} />;
  }
}

