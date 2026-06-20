-- 1. Buat tabel RSVP
CREATE TABLE IF NOT EXISTS public.invitation_rsvps (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    attendance TEXT NOT NULL,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Aktifkan RLS (Keamanan Tingkat Baris)
ALTER TABLE public.invitation_rsvps ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Siapa saja (Publik) boleh memasukkan data RSVP (karena tamu tidak login)
CREATE POLICY "Public can insert rsvps" ON public.invitation_rsvps
    FOR INSERT
    WITH CHECK (true);

-- 4. Policy: Hanya pemilik Tenant (pengantin) yang bisa melihat data RSVP-nya
CREATE POLICY "Owners can view their own tenant rsvps" ON public.invitation_rsvps
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.tenants 
            WHERE tenants.id = invitation_rsvps.tenant_id 
            AND tenants.user_id = auth.uid()
        )
    );
