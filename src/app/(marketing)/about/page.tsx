import type { Metadata } from "next";
import { MarketingNavbar } from "@/components/marketing/navbar";
import { MarketingFooter } from "@/components/marketing/footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: "Pelajari lebih lanjut tentang Upshare.id, sebuah produk dari Brich Digital.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <MarketingNavbar />
      <main className="flex-1 py-20 sm:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Tentang Upshare
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Kami mempermudah siapa saja untuk memiliki kehadiran digital yang profesional, 
              mulai dari web proxy, undangan digital, hingga halaman biolink.
            </p>
          </div>

          <div className="space-y-12 text-foreground/80 leading-relaxed">
            <section className="bg-card border border-border/60 rounded-3xl p-8 sm:p-12 shadow-sm text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">Produk dari Brich Digital</h2>
              <p className="text-lg mb-6">
                <strong>Upshare.id</strong> dengan bangga dikembangkan dan dikelola oleh <strong>Brich Digital</strong>. 
                Sebagai bagian dari ekosistem Brich Digital, kami berkomitmen untuk menghadirkan solusi teknologi 
                yang inovatif, cepat, dan mudah digunakan bagi kreator, UMKM, dan profesional di seluruh Indonesia.
              </p>
              <p className="text-muted-foreground mb-8">
                Misi kami adalah menghapus batasan teknis dalam pembuatan website sehingga Anda bisa fokus pada apa 
                yang paling penting: konten dan bisnis Anda.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="rounded-full px-8 gradient-brand border-0" asChild>
                  <Link href="/register">Mulai Sekarang</Link>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full px-8" asChild>
                  <Link href="/contact">Hubungi Kami</Link>
                </Button>
              </div>
            </section>
            
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center pt-8">
              <div>
                <h3 className="text-4xl font-bold text-primary mb-2">Efisien</h3>
                <p className="text-sm text-muted-foreground">Buat halaman dalam hitungan menit tanpa perlu keahlian coding.</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-primary mb-2">Terjangkau</h3>
                <p className="text-sm text-muted-foreground">Opsi gratis selamanya dan paket berbayar yang ramah di kantong.</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-primary mb-2">Modern</h3>
                <p className="text-sm text-muted-foreground">Desain yang responsif, cepat, dan selalu mengikuti tren terkini.</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
