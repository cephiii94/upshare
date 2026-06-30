import type { Metadata } from "next";
import { MarketingNavbar } from "@/components/marketing/navbar";
import { MarketingFooter } from "@/components/marketing/footer";
import { Mail, MessageCircle, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Hubungi Kami",
  description: "Hubungi tim dukungan Upshare untuk bantuan, pertanyaan, atau masukan.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <MarketingNavbar />
      <main className="flex-1 py-20 sm:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Kami Siap Membantu
            </h1>
            <p className="text-muted-foreground text-lg">
              Punya pertanyaan seputar layanan Upshare? Tim kami selalu siap membantu Anda untuk mendapatkan pengalaman terbaik.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card border border-border/60 rounded-2xl p-8 text-center flex flex-col items-center hover:border-primary/40 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email Dukungan</h3>
              <p className="text-muted-foreground mb-6 flex-1">
                Kirimkan pertanyaan atau masukan Anda. Kami biasanya membalas dalam 24 jam kerja.
              </p>
              <a href="mailto:hello.brichdigital@gmail.com" className="text-primary font-medium hover:underline">
                hello.brichdigital@gmail.com
              </a>
            </div>

            <div className="bg-card border border-border/60 rounded-2xl p-8 text-center flex flex-col items-center hover:border-primary/40 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">WhatsApp</h3>
              <p className="text-muted-foreground mb-6 flex-1">
                Butuh bantuan cepat atau konsultasi layanan Pro/Business? Hubungi kami via WhatsApp.
              </p>
              <a href="https://wa.me/6287777540577" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">
                Chat dengan Kami
              </a>
            </div>

            <div className="bg-card border border-border/60 rounded-2xl p-8 text-center flex flex-col items-center hover:border-primary/40 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lokasi Kami</h3>
              <p className="text-muted-foreground mb-6 flex-1">
                Kami adalah platform digital yang berbasis di Indonesia, mendukung kreator dari berbagai daerah.
              </p>
              <span className="text-foreground font-medium">
                Indonesia
              </span>
            </div>
          </div>
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
