import { TemplateRenderer } from "@/components/templates";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function PreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const theme = typeof resolvedParams.theme === "string" ? resolvedParams.theme : "modern-romance";

  // Dummy data untuk keperluan preview
  const dummyData = {
    theme_id: theme,
    nama_pria: "Romeo",
    nama_lengkap_pria: "Romeo Adiputra, S.T.",
    ortu_pria: "Putra dari Bapak & Ibu Adiputra",
    nama_wanita: "Juliet",
    nama_lengkap_wanita: "Juliet Maharani, S.E.",
    ortu_wanita: "Putri dari Bapak & Ibu Maharani",
    tanggal_akad: "2026-02-14T08:00:00",
    waktu_akad: "08:00 – 10:00 WIB",
    lokasi_akad: "Masjid Istiqlal, Jakarta",
    tanggal_acara: "2026-02-14T11:00:00",
    waktu_acara: "11:00 WIB – Selesai",
    lokasi_acara: "Grand Ballroom Hotel Indonesia, Jakarta",
    maps_url: "https://maps.google.com/?q=Masjid+Istiqlal+Jakarta",
    cover_url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop",
  };

  return (
    <div className="relative min-h-screen">
      {/* Floating Back Button & CTA */}
      <div className="fixed top-4 left-4 z-50">
        <Button variant="secondary" asChild className="rounded-full shadow-lg backdrop-blur bg-white/80 hover:bg-white border border-rose-100 text-rose-700">
          <Link href="/undangan-premium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Link>
        </Button>
      </div>
      
      <div className="fixed top-4 right-4 z-50">
        <Button asChild className="rounded-full shadow-lg bg-rose-600 hover:bg-rose-700 text-white">
          <Link href="/register">
            Gunakan Desain Ini
          </Link>
        </Button>
      </div>

      {/* Render Template dengan Data Dummy */}
      <TemplateRenderer data={dummyData} subdomain="preview" />
    </div>
  );
}
