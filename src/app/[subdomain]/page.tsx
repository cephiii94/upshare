import type { Metadata } from "next";

interface SubdomainPageProps {
  params: Promise<{ subdomain: string }>;
}

export async function generateMetadata({
  params,
}: SubdomainPageProps): Promise<Metadata> {
  const { subdomain } = await params;
  return {
    title: `${subdomain} | Upshare`,
    description: `Halaman subdomain ${subdomain} di Upshare`,
  };
}

export default async function SubdomainPage({ params }: SubdomainPageProps) {
  const { subdomain } = await params;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gradient-hero">
      <div className="glass rounded-2xl p-10 text-center max-w-md shadow-lg">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-brand mb-4">
          <span className="text-white text-2xl font-bold">
            {subdomain[0]?.toUpperCase()}
          </span>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {subdomain}
          <span className="text-gradient-brand">.upshare.id</span>
        </h1>
        <p className="text-muted-foreground">
          Subdomain ini sedang aktif. Konten akan tampil di sini setelah
          tenant mengkonfigurasi halaman mereka.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Subdomain Aktif
        </div>
      </div>
    </div>
  );
}
