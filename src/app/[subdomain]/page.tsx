import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

interface SubdomainPageProps {
  params: Promise<{ subdomain: string }>;
}

export async function generateMetadata({
  params,
}: SubdomainPageProps): Promise<Metadata> {
  const { subdomain } = await params;
  
  // Optionally fetch tenant details for metadata
  const supabase = await createClient();
  const { data: tenant } = await supabase
    .from("tenants")
    .select("display_name, bio")
    .eq("subdomain", subdomain)
    .eq("is_active", true)
    .single();

  return {
    title: tenant?.display_name ? `${tenant.display_name} | Upshare` : `${subdomain} | Upshare`,
    description: tenant?.bio || `Halaman subdomain ${subdomain} di Upshare`,
  };
}

export default async function SubdomainPage({ params }: SubdomainPageProps) {
  const { subdomain } = await params;

  const supabase = await createClient();

  // Validate tenant
  const { data: tenantData, error } = await supabase
    .rpc("get_tenant_with_details", { p_subdomain: subdomain })
    .single();

  if (error || !tenantData) {
    // Return 404 if tenant doesn't exist or isn't active
    notFound();
  }

  const tenant = tenantData as any;

  // Render Template Undangan jika kategori undangan dan punya data
  if (tenant.category === "undangan" && tenant.template_data) {
    const data = tenant.template_data;
    
    // Tentukan apakah user Premium atau Gratis (untuk Watermark MVP internal jika diinginkan,
    // namun instruksi mengatakan: "yang membayar template kita tidak ada watermark".
    // Berarti template internal = Premium = Bebas Watermark.)
    
    return (
      <div className="min-h-screen bg-rose-50 flex flex-col items-center justify-center font-serif text-rose-950 relative overflow-hidden">
        {/* Dekorasi Latar Belakang */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-rose-200/50 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-t from-rose-200/50 to-transparent pointer-events-none" />
        
        {/* Konten Utama */}
        <div className="z-10 text-center max-w-2xl px-6 py-12 bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl border border-rose-100 m-4">
          <span className="text-sm tracking-[0.3em] uppercase text-rose-600 font-sans mb-4 block">The Wedding Of</span>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-rose-800 drop-shadow-sm" style={{ fontFamily: 'Georgia, serif' }}>
            {data.nama_pria || "Pria"} <span className="text-rose-400 font-light">&</span> {data.nama_wanita || "Wanita"}
          </h1>
          
          <div className="w-24 h-px bg-rose-300 mx-auto mb-8" />
          
          <p className="text-lg italic text-rose-700 mb-8 max-w-md mx-auto">
            Kami mengundang Anda untuk hadir dan berbagi kebahagiaan di hari istimewa kami.
          </p>
          
          <div className="bg-rose-100/50 rounded-2xl p-6 mb-8 inline-block text-left w-full max-w-sm">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-rose-200 flex items-center justify-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-rose-700"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              </div>
              <div>
                <h3 className="font-bold text-rose-900">Tanggal Acara</h3>
                <p className="text-rose-700">{data.tanggal_acara ? new Date(data.tanggal_acara).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "-"}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-rose-200 flex items-center justify-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-rose-700"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <div>
                <h3 className="font-bold text-rose-900">Lokasi Acara</h3>
                <p className="text-rose-700">{data.lokasi_acara || "-"}</p>
              </div>
            </div>
          </div>
          
          <button className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 rounded-full font-sans tracking-wide transition-colors shadow-lg">
            Simpan Tanggal
          </button>
        </div>
      </div>
    );
  }

  // Fallback View (Universal Project without target_url)
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gradient-hero">
      <div className="glass rounded-2xl p-10 text-center max-w-md shadow-lg">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-brand mb-4 overflow-hidden shadow-inner">
          {tenant.avatar_url ? (
            <img src={tenant.avatar_url} alt={tenant.display_name || subdomain} className="w-full h-full object-cover" />
          ) : (
            <span className="text-white text-3xl font-bold">
              {(tenant.display_name || subdomain)[0]?.toUpperCase()}
            </span>
          )}
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {tenant.display_name || subdomain}
        </h1>
        {tenant.bio && (
          <p className="text-muted-foreground mb-4">
            {tenant.bio}
          </p>
        )}
        <p className="text-sm text-muted-foreground border-t border-border pt-4 mt-2">
          Subdomain ini telah diklaim, namun belum diarahkan ke project mana pun.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Subdomain Aktif
        </div>
      </div>
    </div>
  );
}
