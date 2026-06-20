import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TemplateRenderer } from "@/components/templates";

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
    
    return <TemplateRenderer data={data} subdomain={subdomain} />;
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
