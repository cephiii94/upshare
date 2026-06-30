import type { Metadata } from "next";
import { MarketingNavbar } from "@/components/marketing/navbar";
import { MarketingFooter } from "@/components/marketing/footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Pertanyaan yang Sering Diajukan seputar layanan Upshare.",
};

const faqs = [
  {
    question: "Apa itu Upshare?",
    answer: "Upshare adalah platform all-in-one yang memungkinkan Anda untuk membuat web proxy, undangan digital, biolink toko online, dan landing page secara instan tanpa perlu keahlian coding. Kami menyediakan subdomain gratis untuk setiap halaman yang Anda buat.",
  },
  {
    question: "Apakah layanan Upshare benar-benar gratis?",
    answer: "Ya! Kami menyediakan paket Gratis selamanya yang sudah mencakup pembuatan 1 subdomain dengan fitur-fitur dasar (termasuk SSL/HTTPS otomatis). Untuk fitur lebih lanjut seperti kustom domain, tanpa watermark, dan analitik tingkat lanjut, Anda bisa berlangganan paket Pro atau Business.",
  },
  {
    question: "Bagaimana cara membuat undangan digital?",
    answer: "Cukup daftar akun di Upshare, masuk ke dashboard, dan pilih mode 'Undangan'. Anda dapat memilih template yang tersedia, mengisi informasi acara, dan mempublikasikan undangan Anda dalam hitungan menit.",
  },
  {
    question: "Apakah saya bisa menggunakan nama domain sendiri?",
    answer: "Untuk paket Gratis, Anda akan menggunakan subdomain dari Upshare (misal: nama.upshare.id). Fitur custom domain (misal: nama-anda.com) tersedia untuk pelanggan paket Pro dan Business.",
  },
  {
    question: "Bagaimana sistem pembayaran untuk paket berlangganan?",
    answer: "Kami menerima berbagai metode pembayaran melalui payment gateway resmi, termasuk transfer bank (Virtual Account), e-wallet (GoPay, OVO, Dana), dan kartu kredit. Pembayaran diproses secara instan dan aman.",
  },
  {
    question: "Apakah saya bisa membatalkan langganan kapan saja?",
    answer: "Tentu. Anda dapat membatalkan perpanjangan langganan otomatis kapan saja melalui menu penagihan di dashboard Anda. Layanan akan tetap aktif hingga akhir periode penagihan yang sedang berjalan.",
  },
];

export default function FaqPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <MarketingNavbar />
      <main className="flex-1 py-20 sm:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Pertanyaan yang Sering Diajukan
            </h1>
            <p className="text-muted-foreground text-lg">
              Temukan jawaban untuk pertanyaan umum seputar layanan Upshare. Tidak menemukan apa yang Anda cari? Jangan ragu untuk menghubungi kami.
            </p>
          </div>

          <div className="bg-card border border-border/60 rounded-2xl p-6 sm:p-10 mb-12 shadow-sm">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-base sm:text-lg font-medium py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          <div className="text-center bg-primary/5 rounded-2xl p-8 sm:p-12 border border-primary/10">
            <h3 className="text-xl sm:text-2xl font-bold mb-4">Masih punya pertanyaan?</h3>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Tim support kami selalu siap membantu Anda. Hubungi kami melalui email atau WhatsApp.
            </p>
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/contact">Hubungi Kami</Link>
            </Button>
          </div>
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
