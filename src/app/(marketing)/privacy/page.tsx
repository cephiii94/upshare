import type { Metadata } from "next";
import { MarketingNavbar } from "@/components/marketing/navbar";
import { MarketingFooter } from "@/components/marketing/footer";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description: "Kebijakan Privasi perlindungan data dan privasi pengguna Upshare.",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <MarketingNavbar />
      <main className="flex-1 py-20 sm:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">Kebijakan Privasi</h1>
            <p className="text-muted-foreground text-lg">Terakhir diperbarui: 30 Juni 2026</p>
          </div>

          <div className="space-y-10 text-foreground/80 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Pendahuluan</h2>
              <p className="mb-4">
                Di Upshare, kami sangat menghargai privasi Anda dan berkomitmen untuk melindungi data pribadi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, mengungkapkan, dan menjaga informasi Anda ketika Anda mengunjungi website kami atau menggunakan layanan kami.
              </p>
              <p className="mb-4">
                Dengan menggunakan layanan Upshare, Anda menyetujui pengumpulan dan penggunaan informasi sesuai dengan kebijakan ini.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Informasi yang Kami Kumpulkan</h2>
              <p className="mb-3 font-medium text-foreground">Kami mengumpulkan beberapa jenis informasi untuk berbagai tujuan demi menyediakan dan meningkatkan layanan kami kepada Anda:</p>
              <ul className="list-disc pl-6 space-y-3">
                <li><strong>Data Pribadi:</strong> Saat mendaftar akun, kami mungkin meminta informasi yang dapat diidentifikasi secara pribadi, seperti nama, alamat email, dan nomor telepon.</li>
                <li><strong>Data Penggunaan:</strong> Kami dapat mengumpulkan informasi tentang bagaimana layanan diakses dan digunakan (misalnya: alamat IP, jenis browser, halaman yang dikunjungi, waktu dan tanggal kunjungan).</li>
                <li><strong>Data Transaksi:</strong> Jika Anda melakukan pembelian, kami atau penyedia pembayaran pihak ketiga kami akan mengumpulkan informasi pembayaran yang diperlukan untuk memproses transaksi.</li>
                <li><strong>Data yang Anda Unggah:</strong> Teks, gambar, dan konten lain yang Anda publikasikan ke subdomain Anda (seperti di undangan digital, biolink, atau landing page).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Penggunaan Informasi</h2>
              <p className="mb-3 font-medium text-foreground">Upshare menggunakan data yang terkumpul untuk berbagai tujuan:</p>
              <ul className="list-disc pl-6 space-y-3">
                <li>Untuk menyediakan dan memelihara layanan kami.</li>
                <li>Untuk memberi tahu Anda tentang perubahan layanan kami atau masalah keamanan.</li>
                <li>Untuk menyediakan dukungan pelanggan.</li>
                <li>Untuk mengumpulkan analisis atau informasi berharga sehingga kami dapat meningkatkan layanan.</li>
                <li>Untuk memantau penggunaan layanan dan mendeteksi serta mencegah masalah teknis.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Pengungkapan Data Pribadi</h2>
              <p className="mb-4">
                Kami tidak menjual, memperdagangkan, atau menyewakan informasi identifikasi pribadi pengguna kepada orang lain. Kami mungkin membagikan data Anda dalam situasi berikut:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li><strong>Kepada Penyedia Layanan:</strong> Kami mungkin mempekerjakan perusahaan dan individu pihak ketiga (seperti payment gateway, penyedia hosting, analitik) untuk memfasilitasi layanan kami atau menganalisis bagaimana layanan kami digunakan.</li>
                <li><strong>Kewajiban Hukum:</strong> Kami dapat mengungkapkan Data Pribadi Anda dengan itikad baik bahwa tindakan tersebut diperlukan untuk: (a) mematuhi kewajiban hukum, (b) melindungi dan membela hak atau properti Upshare, (c) mencegah atau menyelidiki kesalahan yang mungkin terjadi sehubungan dengan Layanan.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Keamanan Data</h2>
              <p className="mb-4">
                Keamanan data Anda penting bagi kami. Kami berusaha menggunakan cara yang dapat diterima secara komersial untuk melindungi Data Pribadi Anda, termasuk enkripsi (SSL/HTTPS). Namun, ingatlah bahwa tidak ada metode transmisi melalui Internet, atau metode penyimpanan elektronik yang 100% aman dan absolut.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Penggunaan Cookie</h2>
              <p className="mb-4">
                Kami menggunakan cookie dan teknologi pelacakan serupa untuk melacak aktivitas di layanan kami dan menyimpan informasi tertentu. Cookie adalah file dengan sejumlah kecil data yang dapat menyertakan pengidentifikasi unik anonim. Anda dapat menginstruksikan browser Anda untuk menolak semua cookie, namun mungkin Anda tidak akan dapat menggunakan beberapa bagian dari layanan kami jika menolaknya.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Tautan ke Situs Lain</h2>
              <p className="mb-4">
                Layanan kami (termasuk halaman yang dibuat pengguna) mungkin berisi tautan ke situs lain yang tidak dioperasikan oleh kami. Jika Anda mengklik tautan pihak ketiga, Anda akan diarahkan ke situs pihak ketiga tersebut. Kami sangat menyarankan Anda untuk meninjau Kebijakan Privasi setiap situs yang Anda kunjungi. Kami tidak memiliki kendali atas dan tidak bertanggung jawab atas konten atau kebijakan situs atau layanan pihak ketiga mana pun.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Privasi Anak-Anak</h2>
              <p className="mb-4">
                Layanan kami tidak ditujukan kepada siapa pun yang berusia di bawah 13 tahun. Kami tidak secara sadar mengumpulkan informasi yang dapat diidentifikasi secara pribadi dari siapa pun yang berusia di bawah 13 tahun. Jika Anda adalah orang tua atau wali dan Anda mengetahui bahwa Anak Anda telah memberi kami Data Pribadi, harap hubungi kami.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Hubungi Kami</h2>
              <p className="mb-4">
                Jika Anda memiliki pertanyaan lebih lanjut tentang Kebijakan Privasi ini atau ingin mengajukan permintaan penghapusan data, silakan hubungi kami di: <a href="mailto:hello.brichdigital@gmail.com" className="text-primary hover:underline font-medium">hello.brichdigital@gmail.com</a>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
