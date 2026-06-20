-- SQL Script untuk Tabel RSVP Undangan
-- Jalankan script ini di SQL Editor Supabase Anda

CREATE TABLE IF NOT EXISTS public.invitation_rsvps (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    attendance TEXT NOT NULL, -- 'Hadir', 'Tidak Hadir', 'Ragu-ragu'
    guest_count INTEGER DEFAULT 1,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Mengaktifkan Row Level Security (RLS)
ALTER TABLE public.invitation_rsvps ENABLE ROW LEVEL SECURITY;

-- Kebijakan (Policy) agar publik (anon) bisa INSERT data
CREATE POLICY "Public can insert rsvps"
ON public.invitation_rsvps
FOR INSERT
TO public
WITH CHECK (true);

-- Kebijakan agar publik (anon) bisa SELECT data (opsional, jika ingin daftar ucapan bisa dilihat umum)
CREATE POLICY "Public can view rsvps"
ON public.invitation_rsvps
FOR SELECT
TO public
USING (true);

-- Kebijakan agar pemilik undangan (authenticated user) bisa melihat dan menghapus RSVP mereka
CREATE POLICY "Users can manage their own tenant rsvps"
ON public.invitation_rsvps
FOR ALL
TO authenticated
USING (
    tenant_id IN (
        SELECT id FROM public.tenants WHERE user_id = auth.uid()
    )
);

-- Indexing untuk mempercepat query berdasarkan tenant_id
CREATE INDEX IF NOT EXISTS idx_invitation_rsvps_tenant_id ON public.invitation_rsvps(tenant_id);
