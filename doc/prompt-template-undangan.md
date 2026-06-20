# Prompt Generator Template Undangan

Gunakan *prompt* di bawah ini untuk diberikan kepada AI Assistant (seperti Claude, ChatGPT, atau Cursor) ketika Anda ingin membuat desain template undangan baru untuk platform Upshare.

---

**Copy bagian di bawah ini:**

```text
Buatkan saya sebuah file komponen React (Next.js Client Component) untuk Template Undangan Pernikahan Digital.

# Stack Teknologi:
- React (Next.js) dengan deklarasi "use client" di baris paling atas.
- Tailwind CSS untuk semua styling (wajib responsif mobile-first).
- lucide-react untuk ikon.

# Aturan Struktur Komponen:
1. Komponen harus bernama unik (misalnya: `RusticFloralTemplate`).
2. Komponen harus menerima props berikut:
   \```typescript
   interface TemplateProps {
     data: any;
     subdomain: string;
   }
   \```
3. Komponen HARUS memiliki **nilai fallback / default** untuk setiap data jika kosong, agar desain tetap terlihat cantik saat di-preview sebelum data diisi.

# Struktur Data JSON (`data` prop) yang tersedia:
- Mempelai Pria: `data.nama_pria`, `data.nama_lengkap_pria`, `data.ortu_pria`
- Mempelai Wanita: `data.nama_wanita`, `data.nama_lengkap_wanita`, `data.ortu_wanita`
- Akad Nikah: `data.tanggal_akad`, `data.waktu_akad`, `data.lokasi_akad`
- Resepsi: `data.tanggal_acara`, `data.waktu_acara`, `data.lokasi_acara`
- Ekstra: `data.kutipan` (isi ayat/quotes), `data.sumber_kutipan`, `data.cover_url` (URL gambar cover)
- Amplop Digital: `data.bank_name`, `data.rekening_no`, `data.rekening_nama`

# Aturan Fitur Spesifik:
1. **Salin Rekening**: Buat tombol fungsi sederhana menggunakan `navigator.clipboard.writeText(data.rekening_no)` beserta state "Copied" untuk UX yang baik.
2. **Form RSVP**: 
   - Harus mengimpor Server Action: `import { submitRsvp } from "@/app/actions/undangan";`
   - Form menggunakan `action={handleRSVPAction}`.
   - Buat fungsi handler:
     \```typescript
     const handleRSVPAction = async (formData: FormData) => {
       formData.set("subdomain", subdomain);
       const result = await submitRsvp(formData);
       if (result.error) alert(result.error);
       else alert("RSVP Terkirim!"); // atau gunakan state success
     };
     \```
   - Input wajib (atribut `name` sangat penting): `<input name="name">`, `<select name="attendance">` (value: "Hadir" atau "Tidak Hadir"), `<textarea name="message">`.

# Estetika Desain:
- Buat desainnya SANGAT MEWAH dan ELEGANT.
- Gunakan perpaduan font bawaan web yang di-import via CSS (misalnya font Serif untuk Judul, Sans untuk isi).
- Berikan animasi halus (fade-in, efek hover) menggunakan kelas bawaan Tailwind seperti `transition-all`, `duration-500`, `hover:scale-105`.
- Gunakan warna-warna pastel atau earth-tone yang estetis.

Tuliskan seluruh kode secara lengkap dalam satu file komponen.
```

---

## Langkah Selanjutnya (Setelah AI Memberikan Kode)

1. Buat file baru di dalam folder `src/components/templates/`, misalnya `nama-tema-baru.tsx`.
2. *Paste* (tempelkan) semua kode yang diberikan oleh AI ke dalam file tersebut.
3. Buka file **Registry Koordinator** di `src/components/templates/index.tsx`.
4. Import komponen baru tersebut di bagian atas file:
   ```tsx
   import { NamaTemaBaruTemplate } from "./nama-tema-baru";
   ```
5. Tambahkan komponen tersebut ke dalam `switch(themeId)`:
   ```tsx
   case "nama-tema-baru":
     return <NamaTemaBaruTemplate data={data} subdomain={subdomain} />;
   ```
6. Template siap digunakan! Anda bisa menambahkannya ke pilihan Radio Button di komponen `UndanganEditor` jika ingin muncul di UI Dashboard pengguna.
