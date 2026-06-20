# Panduan Menambahkan Template Baru (Sistem Registry)

Dokumen ini menjelaskan langkah-langkah untuk menambahkan desain template baru ke dalam platform Upshare tanpa merusak kode template lain yang sudah ada.

Sistem kita menggunakan arsitektur **Template Registry** yang terpusat di file koordinator `src/components/templates/index.tsx`.

---

## 🚀 Langkah 1: Buat File Komponen Template
Semua file desain template harus diletakkan di dalam direktori `src/components/templates/`.

1. Buat file baru, misalnya `tema-minimalis.tsx`.
2. Pastikan komponen menerima *props* `data` (yang berisi isi JSON dari database) dan `subdomain`.

**Contoh Struktur File `tema-minimalis.tsx`:**
```tsx
import React from 'react';

interface TemplateProps {
  data: any;
  subdomain: string;
}

export function TemaMinimalis({ data, subdomain }: TemplateProps) {
  // 1. Ambil data dari JSON (berikan nilai default jika kosong)
  const namaPria = data.nama_pria || "Pria";
  const namaWanita = data.nama_wanita || "Wanita";
  const tanggal = data.tanggal_acara || "Segera";

  // 2. Buat Tampilan Desain
  return (
    <div className="min-h-screen bg-white text-gray-800 flex items-center justify-center">
      <div className="text-center border p-10 rounded shadow-sm">
        <h3 className="text-sm uppercase tracking-widest text-gray-400">Pernikahan</h3>
        <h1 className="text-4xl font-serif mt-4">{namaPria} & {namaWanita}</h1>
        <p className="mt-4 text-gray-500">{tanggal}</p>
      </div>
    </div>
  );
}
```

---

## 🔌 Langkah 2: Daftarkan ke "Koordinator" (Registry)
Agar sistem mengenali template baru tersebut, Anda harus mendaftarkannya di file koordinator utama.

1. Buka file `src/components/templates/index.tsx`.
2. **Import** komponen baru Anda di bagian paling atas.
3. Tambahkan `case` baru ke dalam blok `switch` sesuai dengan ID Tema (*theme_id*) yang Anda inginkan.

**Contoh Perubahan di `index.tsx`:**
```tsx
import { PremiumWeddingTemplate } from "./premium-wedding";
// 1. Import komponen baru Anda:
import { TemaMinimalis } from "./tema-minimalis"; 

// ... (kode lainnya)

export function TemplateRenderer({ data, subdomain }: TemplateRendererProps) {
  const themeId = data.theme_id || "premium-wedding"; 
  
  switch (themeId) {
    case "premium-wedding":
      return <PremiumWeddingTemplate data={data} subdomain={subdomain} />;
      
    // 2. Tambahkan case baru untuk tema minimalis:
    case "tema-minimalis":
      return <TemaMinimalis data={data} subdomain={subdomain} />;

    default:
      return <PremiumWeddingTemplate data={data} subdomain={subdomain} />;
  }
}
```

---

## 💾 Langkah 3: Gunakan di Database (Dashboard)
Sekarang template baru Anda sudah siap dirender! 

Agar sebuah subdomain menggunakan *Tema Minimalis* ini, Anda hanya perlu memastikan bahwa pada saat data disimpan ke Supabase (tabel `tenants`, kolom `template_data`), Anda menyertakan `theme_id` yang cocok dengan nama di *case* koordinator tadi.

**Contoh Format JSON yang disimpan di Database:**
```json
{
  "theme_id": "tema-minimalis",
  "nama_pria": "Andi",
  "nama_wanita": "Budiwati",
  "tanggal_acara": "2027-01-01"
}
```

> **Selesai!** Ketika pengunjung membuka link subdomain tersebut, sistem otomatis membaca JSON di database dan mengarahkan tampilan ke file `tema-minimalis.tsx`.
