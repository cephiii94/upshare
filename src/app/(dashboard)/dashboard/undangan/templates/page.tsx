import { ArrowLeft, LayoutTemplate } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TemplateCatalogPage() {
  const templates = [
    {
      id: "premium-wedding",
      name: "Premium Elegance",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop",
      badge: "Terlaris"
    },
    {
      id: "modern-dark",
      name: "Modern Dark",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop",
      badge: "Baru"
    },
    {
      id: "rustic-floral",
      name: "Rustic Floral",
      image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=600&auto=format&fit=crop",
      badge: "Klasik"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-4">
        <Button asChild variant="ghost" className="w-fit -ml-4 text-muted-foreground hover:text-foreground">
          <Link href="/dashboard/subdomains">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Daftar Proyek
          </Link>
        </Button>
        
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <div className="p-2 bg-rose-100 rounded-lg">
              <LayoutTemplate className="h-6 w-6 text-rose-600" />
            </div>
            Pilih Desain Undangan
          </h1>
          <p className="text-muted-foreground mt-1 text-lg">
            Pilih template yang paling sesuai dengan tema pernikahan Anda. Anda bebas mengganti warna dan foto nantinya.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((template) => (
          <div key={template.id} className="group relative rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 bg-white cursor-pointer">
            <div className="aspect-[3/4] overflow-hidden relative">
              {template.badge && (
                <div className="absolute top-4 right-4 z-10 bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-widest">
                  {template.badge}
                </div>
              )}
              <img 
                src={template.image} 
                alt={template.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                <Button asChild className="rounded-full shadow-lg gap-2 font-bold px-8 py-6 bg-rose-600 hover:bg-rose-700 text-white scale-90 group-hover:scale-100 transition-transform">
                  <Link href={`/dashboard/undangan/new?theme=${template.id}`}>
                    Gunakan Desain Ini
                  </Link>
                </Button>
              </div>
            </div>
            <div className="p-6 text-center border-t">
              <h3 className="font-bold text-xl text-slate-800">{template.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
