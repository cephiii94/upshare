import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, Eye, ArrowRight } from "lucide-react";
import Link from "next/link";

const templates = [
  {
    id: "premium-wedding",
    name: "Premium Elegance",
    category: "Paling Diminati",
    description: "Desain mewah dengan efek glassmorphism dan tipografi Playfair Display.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
    color: "bg-rose-50"
  },
  {
    id: "tema-minimalis",
    name: "Minimalist White",
    category: "Elegan",
    description: "Bersih, putih, dan simpel. Sangat cocok untuk konsep pernikahan modern.",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
    color: "bg-slate-50"
  },
  {
    id: "premium-gold",
    name: "Royal Gold",
    category: "Mewah",
    description: "Perpaduan warna gelap dan aksen emas untuk pernikahan malam hari yang megah.",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop",
    color: "bg-amber-50"
  }
];

export function TemplatePreviewSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-rose-50 to-transparent dark:from-rose-950/20" />
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="text-rose-600 border-rose-200 bg-rose-50 mb-4 px-4 py-1.5 dark:bg-rose-900/30 dark:border-rose-800 dark:text-rose-400">
            <Sparkles className="w-4 h-4 mr-2" /> Pilihan Desain
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Pilih Tema Sesuai Karakter Anda
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Tidak punya desain sendiri? Jangan khawatir. Anda bisa menggunakan kumpulan template premium bawaan kami secara instan, tanpa biaya tambahan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <div 
              key={template.id} 
              className="group relative bg-card rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 flex flex-col"
            >
              {/* Preview Image */}
              <div className="relative h-64 overflow-hidden bg-muted">
                <img 
                  src={template.image} 
                  alt={template.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                  <Button asChild variant="secondary" className="rounded-full shadow-lg gap-2 font-medium">
                    <Link href={`/preview?theme=${template.id}`}>
                      <Eye className="w-4 h-4" /> Preview
                    </Link>
                  </Button>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white/90 text-rose-600 hover:bg-white shadow-sm border-0 font-medium px-3">
                    {template.category}
                  </Badge>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold mb-2 font-serif text-foreground">{template.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                  {template.description}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                  <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
                    ID: {template.id}
                  </span>
                  <Link href="/register" className="text-sm font-medium text-primary flex items-center gap-1 hover:gap-2 transition-all">
                    Gunakan <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">
            Dan masih banyak lagi template yang akan terus ditambahkan setiap bulannya.
          </p>
          <Button size="lg" asChild className="rounded-full px-8 shadow-lg bg-rose-600 hover:bg-rose-700 text-white">
            <Link href="/register">Buat Undangan Sekarang</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
