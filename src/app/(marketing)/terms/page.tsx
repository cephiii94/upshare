import type { Metadata } from "next";
import { MarketingNavbar } from "@/components/marketing/navbar";
import { MarketingFooter } from "@/components/marketing/footer";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan",
  description: "Syarat dan Ketentuan penggunaan layanan Upshare.",
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <MarketingNavbar />
      <main className="flex-1 py-20 sm:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">Syarat & Ketentuan Layanan</h1>
            <p className="text-muted-foreground text-lg">Terakhir diperbarui: 30 Juni 2026</p>
          </div>

          <div className="space-y-10 text-foreground/80 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Penerimaan Syarat</h2>
              <p className="mb-4">
                Dengan mendaftar, mengakses, dan menggunakan layanan Upshare ("Layanan"), Anda menyatakan bahwa Anda telah membaca, memahami, dan menyetujui untuk terikat oleh Syarat dan Ketentuan ini. Jika Anda tidak menyetujui seluruh syarat dan ketentuan perjanjian ini, maka Anda tidak diizinkan untuk mengakses atau menggunakan layanan kami.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Deskripsi Layanan</h2>
              <p className="mb-4">
                Upshare menyediakan platform SaaS (Software as a Service) yang memungkinkan pengguna untuk membuat, mempublikasikan, dan mengelola berbagai jenis halaman web (seperti web proxy, undangan digital, biolink, dan landing page) menggunakan subdomain yang disediakan oleh sistem kami (misalnya: nama.upshare.id) atau domain kustom.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Pendaftaran dan Keamanan Akun</h2>
              <ul className="list-disc pl-6 space-y-3">
                <li>Anda harus memberikan informasi yang akurat, terkini, dan lengkap saat membuat akun di platform kami.</li>
                <li>Anda sepenuhnya bertanggung jawab untuk menjaga kerahasiaan kata sandi Anda dan segala aktivitas yang terjadi di bawah akun Anda.</li>
                <li>Anda harus segera memberi tahu kami jika Anda mencurigai adanya penggunaan tidak sah atas akun Anda.</li>
                <li>Upshare berhak menolak layanan, menangguhkan akun, atau menghapus konten jika terdapat pelanggaran terhadap Syarat dan Ketentuan ini tanpa pemberitahuan sebelumnya.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Penggunaan Layanan dan Konten Pengguna</h2>
              <p className="mb-4">
                Anda memegang hak cipta atas semua konten yang Anda buat, unggah, atau tampilkan di layanan kami. Namun, dengan menggunakan layanan kami, Anda memberikan lisensi kepada Upshare (non-eksklusif, bebas royalti) untuk menampilkan, menyimpan, dan mendistribusikan konten tersebut semata-mata untuk tujuan penyediaan layanan.
              </p>
              <p className="mb-3 font-medium text-foreground">
                Anda setuju untuk tidak menggunakan Layanan untuk:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>Mengunggah atau mendistribusikan konten yang melanggar hukum yang berlaku di Republik Indonesia maupun hukum internasional.</li>
                <li>Menyebarkan konten yang mengandung unsur pornografi, perjudian, kekerasan, kebencian, diskriminasi SARA, atau pelecehan.</li>
                <li>Melanggar hak cipta, merek dagang, rahasia dagang, atau hak kekayaan intelektual pihak lain.</li>
                <li>Menyebarkan malware, virus, trojan, atau kode berbahaya lainnya.</li>
                <li>Melakukan aktivitas penipuan, seperti phishing, scamming, atau pencurian identitas.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Kebijakan Subdomain</h2>
              <p className="mb-4">
                Kami menyediakan fasilitas subdomain secara gratis (misalnya: nama.upshare.id) untuk pengguna. Subdomain ini tetap menjadi milik Upshare. Kami berhak secara sepihak mencabut, mengubah, atau mengambil alih subdomain kapan saja dengan alasan yang sah, termasuk namun tidak terbatas pada: pelanggaran Syarat dan Ketentuan, ketidakaktifan akun dalam waktu yang sangat lama, indikasi spam, atau permintaan sah dari pihak berwenang.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Pembayaran dan Kebijakan Pengembalian Dana (Refund)</h2>
              <p className="mb-4">
                Layanan tertentu (seperti paket Pro, Business, atau Add-on Subdomain) mewajibkan pembayaran. Pembayaran ditagih sesuai dengan ketentuan yang tertera saat Anda melakukan pembelian.
              </p>
              <p className="mb-4">
                Semua pembayaran bersifat final dan tidak dapat dikembalikan (non-refundable) kecuali jika layanan tidak dapat kami berikan karena kesalahan teknis yang fatal dari pihak kami, atau jika diwajibkan oleh hukum konsumen yang berlaku di Republik Indonesia.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Pembatasan Tanggung Jawab</h2>
              <p className="mb-4">
                Layanan kami disediakan secara "sebagaimana adanya" (as is) dan "sebagaimana tersedia" (as available). Upshare tidak memberikan jaminan eksplisit maupun implisit bahwa layanan akan 100% bebas dari gangguan (uptime), sepenuhnya aman dari serangan siber, atau bebas dari kesalahan (error-free).
              </p>
              <p className="mb-4">
                Dalam keadaan apa pun, Upshare, termasuk jajaran direksi, karyawan, atau afiliasinya, tidak akan bertanggung jawab atas segala kerugian langsung, tidak langsung, insidental, khusus, atau konsekuensial (termasuk hilangnya keuntungan, data, atau reputasi) yang timbul dari penggunaan atau ketidakmampuan menggunakan layanan.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Perubahan pada Syarat dan Ketentuan</h2>
              <p className="mb-4">
                Kami berhak atas kebijakan kami sendiri untuk mengubah atau mengganti Syarat dan Ketentuan ini kapan saja. Jika revisi bersifat material, kami akan berusaha memberikan pemberitahuan sebelumnya melalui email atau pengumuman di dashboard Anda. Penggunaan layanan secara berkelanjutan setelah perubahan tersebut berlaku akan dianggap sebagai penerimaan Anda terhadap syarat dan ketentuan yang baru.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Hubungi Kami</h2>
              <p className="mb-4">
                Jika Anda memiliki pertanyaan tentang Syarat dan Ketentuan ini, silakan hubungi tim dukungan kami melalui email di: <a href="mailto:hello.brichdigital@gmail.com" className="text-primary hover:underline font-medium">hello.brichdigital@gmail.com</a>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
