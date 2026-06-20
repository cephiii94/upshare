import { PremiumWeddingTemplate } from "./premium-wedding";

// CONTOH: Jika Anda sudah membuat file free-minimalist.tsx, uncomment baris di bawah:
// import { FreeMinimalist } from "./free-minimalist";

interface TemplateRendererProps {
  data: any;
  subdomain: string;
}

/**
 * Komponen Koordinator (Registry)
 * Bertugas memilih komponen desain mana yang akan dirender berdasarkan theme_id dari database.
 */
export function TemplateRenderer({ data, subdomain }: TemplateRendererProps) {
  // Ambil theme_id dari database, jika kosong gunakan "premium-wedding" sebagai default
  const themeId = data.theme_id || "premium-wedding"; 
  
  switch (themeId) {
    case "premium-wedding":
      return <PremiumWeddingTemplate data={data} subdomain={subdomain} />;
      
    // case "free-minimalist":
    //   return <FreeMinimalist data={data} subdomain={subdomain} />;
      
    // case "premium-dark-gold":
    //   return <PremiumDarkGold data={data} subdomain={subdomain} />;

    default:
      // Fallback ke template default jika theme_id tidak dikenali
      return <PremiumWeddingTemplate data={data} subdomain={subdomain} />;
  }
}
