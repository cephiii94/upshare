"use server";

import { createClient } from "@/lib/supabase/server";

export async function submitRsvp(formData: FormData) {
  const subdomain = formData.get("subdomain") as string;
  const name = formData.get("name") as string;
  const attendance = formData.get("attendance") as string;
  const message = formData.get("message") as string;

  if (!subdomain || !name || !attendance) {
    return { error: "Harap isi semua kolom yang wajib." };
  }

  const supabase = await createClient();
  
  // Cari tenant berdasarkan subdomain
  const { data: tenant } = await supabase
    .from("tenants")
    .select("id")
    .eq("subdomain", subdomain)
    .single();
    
  if (!tenant) {
    return { error: "Undangan tidak ditemukan." };
  }

  // Karena ini diakses public, pastikan RLS sudah dikonfigurasi 
  // (atau gunakan service_role key jika insert public tidak diizinkan di DB,
  // tapi kita sudah set policy 'Public can insert rsvps' di SQL).
  
  const { error } = await supabase
    .from("invitation_rsvps")
    .insert([
      {
        tenant_id: tenant.id,
        name,
        attendance,
        message,
      }
    ]);

  if (error) {
    console.error("Error submitting RSVP:", error);
    return { error: "Gagal mengirim RSVP. Coba lagi." };
  }

  return { success: true };
}
