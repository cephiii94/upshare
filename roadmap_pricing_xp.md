# Roadmap: Hybrid Pricing & Domain Expiration (XP)

Dokumen ini berisi rencana pengembangan untuk sistem _pricing_ Hybrid (Tier + Add-on Domain Rp 10.000) dan logika masa aktif (_expiration_ / XP) per domain secara independen.

---

## 🏗️ Fase 1: Pembaruan Database Schema (Supabase)

Fokus pada penambahan kolom untuk melacak masa aktif setiap domain secara terpisah (_decoupled expiration_) tanpa harus terikat pada langganan (subscription) utama user.

*   [ ] **Update Tabel `tenants` (Domains)**
    *   Tambah kolom `expires_at` (`TIMESTAMPTZ`, Nullable): Untuk mencatat kapan masa aktif domain add-on habis.
    *   Tambah kolom `is_addon` (`BOOLEAN`, Default `false`): Untuk membedakan mana domain bawaan dari tier (Free/Pro) dan mana domain yang dibeli satuan (seharga Rp 10.000).
*   [ ] **(Opsional/Rekomendasi) Buat Tabel `wallets` / Saldo**
    *   Tambah tabel untuk menyimpan saldo user. Ini bertujuan meminimalisir biaya admin _payment gateway_ dan mencegah _payment fatigue_ saat user memperpanjang banyak domain.
*   [ ] **Tabel `transactions` (Riwayat Add-on)**
    *   Mencatat riwayat pembelian domain add-on (misal: "Beli domain X selama 30 hari - Rp 10.000").

---

## ⚙️ Fase 2: Backend Logic & Scheduler (XP)

Fokus pada logika pengecekan masa aktif dan validasi apakah domain masih berhak aktif atau harus dimatikan.

*   [ ] **Cron Job / Scheduler Expired Domain**
    *   Buat API endpoint (misal menggunakan _Vercel Cron_ atau `pg_cron` di Supabase) yang berjalan setiap hari (atau setiap jam).
    *   Logika: Mencari semua `tenants` di mana `expires_at < now()` dan mengubah `is_active = false`.
*   [ ] **Penyesuaian Logic Subscription**
    *   Jika langganan utama (misal: Pro) habis, matikan semua domain bawaan tier tersebut (`is_addon = false`).
    *   **Penting:** Abaikan (jangan matikan) domain yang berstatus `is_addon = true` asalkan `expires_at`-nya masih di masa depan.
*   [ ] **API Perpanjangan Domain (Renew)**
    *   Buat endpoint untuk memperpanjang `expires_at` selama +30 hari setelah pembayaran/pemotongan saldo berhasil.

---

## 🖥️ Fase 3: Frontend Dashboard & UI Pembayaran

Fokus pada pengalaman pengguna saat melihat masa aktif domain dan saat melakukan pembelian tambahan domain.

*   [ ] **Pembaruan Halaman Pricing (Hybrid UI)**
    *   Update tabel harga di _Landing Page_ agar menampilkan keterangan: "Tambah domain kapan saja hanya Rp 10.000/bulan."
*   [ ] **UI "My Domains" di Dashboard**
    *   Tampilkan tanggal _expired_ untuk masing-masing domain (contoh: badge merah "Expired besok" atau hijau "Aktif sampai 15 Feb").
*   [ ] **UI Pembelian Add-on Domain**
    *   Buat modal/popup saat user klik tombol "Tambah Domain".
    *   Pilihan pembayaran: Potong dari Saldo Internal (jika menggunakan sistem dompet) atau bayar langsung via _Payment Gateway_ (Mayar).
*   [ ] **Email Notifikasi (Resend)**
    *   Kirim email pengingat H-3 sebelum masa aktif domain add-on habis ("Domain X Anda akan segera berakhir, perpanjang sekarang").
