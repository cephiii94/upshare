import type { Metadata } from "next";
import { MarketingNavbar } from "@/components/marketing/navbar";
import { MarketingFooter } from "@/components/marketing/footer";

export const metadata: Metadata = {
  title: "Kebijakan Pengembalian Dana",
  description: "Kebijakan Pengembalian Dana (Refund Policy) layanan Upshare.",
};

export default function RefundPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <MarketingNavbar />
      <main className="flex-1 py-20 sm:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">Kebijakan Pengembalian Dana</h1>
            <p className="text-muted-foreground text-lg">Terakhir diperbarui: 30 Juni 2026</p>
          </div>

          <div className="space-y-10 text-foreground/80 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Kebijakan Umum</h2>
              <p className="mb-4">
                Di Upshare, kami berusaha memberikan layanan terbaik. Semua pembayaran untuk paket langganan (seperti Pro dan Business) dan Add-on (seperti kustom domain) bersifat final dan <strong>tidak dapat dikembalikan (non-refundable)</strong>, kecuali dinyatakan lain dalam dokumen ini atau diwajibkan oleh hukum yang berlaku.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Pengecualian Pengembalian Dana</h2>
              <p className="mb-4">
                Kami dapat mempertimbangkan pengembalian dana penuh atau sebagian secara eksklusif dalam keadaan berikut:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>Terjadi kesalahan penagihan ganda (double charge) akibat masalah teknis di sistem kami atau pihak payment gateway.</li>
                <li>Layanan inti yang dijanjikan pada paket berlangganan tidak dapat kami berikan secara permanen dalam waktu 7 hari pertama sejak transaksi.</li>
              </ul>
              <p className="mt-4">
                Pengecualian ini tidak berlaku jika kegagalan akses disebabkan oleh kelalaian pengguna, pelanggaran Syarat & Ketentuan (misalnya, akun ditangguhkan karena penyalahgunaan), atau kendala dari penyedia internet pihak ketiga.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Cara Mengajukan Pengembalian Dana</h2>
              <p className="mb-4">
                Jika Anda memenuhi salah satu kriteria pengecualian di atas, Anda dapat mengajukan permohonan pengembalian dana dalam waktu maksimal <strong>7 hari</strong> sejak tanggal transaksi. Harap kirimkan email ke <a href="mailto:hello.brichdigital@gmail.com" className="text-primary hover:underline font-medium">hello.brichdigital@gmail.com</a> dengan menyertakan:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>Alamat email akun Upshare Anda.</li>
                <li>Bukti pembayaran atau ID transaksi.</li>
                <li>Penjelasan detail mengenai alasan pengajuan pengembalian dana.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Proses dan Keputusan</h2>
              <p className="mb-4">
                Tim dukungan kami akan meninjau permohonan Anda dalam waktu 3-5 hari kerja. Keputusan yang diambil oleh manajemen Upshare bersifat mutlak. Jika disetujui, dana akan dikembalikan ke metode pembayaran awal Anda, yang mungkin memerlukan waktu 5-14 hari kerja tergantung pada kebijakan bank atau penyedia layanan pembayaran terkait.
              </p>
            </section>
          </div>
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
