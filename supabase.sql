-- ============================================================
-- UPSHARE — Supabase Database Schema
-- Jalankan di Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- ── Extensions ─────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABLE: profiles
-- Extends auth.users dari Supabase Auth
-- ============================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name   TEXT,
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.profiles IS 'Profil publik pengguna, terhubung ke auth.users';

-- ── Auto-create profile saat user baru daftar ──────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.raw_user_meta_data ->> 'avatar_url'
  );
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ── Auto-update updated_at ─────────────────────────────────
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();


-- ============================================================
-- TABLE: tenants
-- Menyimpan data subdomain setiap pengguna
-- ============================================================
CREATE TABLE IF NOT EXISTS public.tenants (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  subdomain     TEXT NOT NULL UNIQUE,
  display_name  TEXT,
  bio           TEXT,
  avatar_url    TEXT,
  is_active     BOOLEAN NOT NULL DEFAULT false,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- Validasi subdomain: lowercase, hanya huruf/angka/strip, 3-30 karakter
  CONSTRAINT subdomain_format CHECK (
    subdomain ~ '^[a-z0-9][a-z0-9\-]{1,28}[a-z0-9]$'
  ),
  -- Satu user hanya boleh punya satu subdomain (untuk paket Free/Pro)
  CONSTRAINT unique_user_subdomain UNIQUE (user_id)
);

COMMENT ON TABLE public.tenants IS 'Data subdomain milik setiap pengguna';
COMMENT ON COLUMN public.tenants.is_active IS 'True jika tenant sudah bayar dan aktif';

CREATE OR REPLACE TRIGGER tenants_updated_at
  BEFORE UPDATE ON public.tenants
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Index untuk lookup cepat berdasarkan subdomain
CREATE INDEX IF NOT EXISTS idx_tenants_subdomain ON public.tenants(subdomain);
CREATE INDEX IF NOT EXISTS idx_tenants_user_id ON public.tenants(user_id);


-- ============================================================
-- TABLE: subscriptions
-- Menyimpan data langganan & status pembayaran Mayar.id
-- ============================================================
CREATE TYPE public.subscription_plan AS ENUM ('free', 'pro', 'business');
CREATE TYPE public.subscription_status AS ENUM ('active', 'inactive', 'past_due', 'canceled');

CREATE TABLE IF NOT EXISTS public.subscriptions (
  id                      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id                 UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  tenant_id               UUID REFERENCES public.tenants(id) ON DELETE SET NULL,
  plan                    public.subscription_plan NOT NULL DEFAULT 'free',
  status                  public.subscription_status NOT NULL DEFAULT 'inactive',
  mayar_subscription_id   TEXT UNIQUE,
  mayar_payment_id        TEXT,
  current_period_start    TIMESTAMPTZ,
  current_period_end      TIMESTAMPTZ,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT one_active_sub_per_user UNIQUE (user_id)
);

COMMENT ON TABLE public.subscriptions IS 'Status langganan dan data pembayaran Mayar.id';

CREATE OR REPLACE TRIGGER subscriptions_updated_at
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Index
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_mayar_id ON public.subscriptions(mayar_subscription_id);


-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- ── profiles ───────────────────────────────────────────────
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Semua orang bisa baca profil (untuk halaman publik subdomain)
CREATE POLICY "profiles_select_public"
  ON public.profiles FOR SELECT
  USING (true);

-- Hanya pemilik yang bisa update profilnya sendiri
CREATE POLICY "profiles_update_own"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ── tenants ────────────────────────────────────────────────
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;

-- Semua orang bisa baca tenant aktif (untuk halaman subdomain publik)
CREATE POLICY "tenants_select_active"
  ON public.tenants FOR SELECT
  USING (is_active = true OR auth.uid() = user_id);

-- Hanya pemilik yang bisa insert tenant miliknya
CREATE POLICY "tenants_insert_own"
  ON public.tenants FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Hanya pemilik yang bisa update tenant miliknya
CREATE POLICY "tenants_update_own"
  ON public.tenants FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Hanya pemilik yang bisa hapus tenant miliknya
CREATE POLICY "tenants_delete_own"
  ON public.tenants FOR DELETE
  USING (auth.uid() = user_id);

-- ── subscriptions ──────────────────────────────────────────
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Hanya pemilik yang bisa baca subscriptionnya sendiri
CREATE POLICY "subscriptions_select_own"
  ON public.subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- Insert & Update hanya via service role (webhook Mayar.id)
-- Tidak ada policy INSERT/UPDATE untuk authenticated user biasa
-- Gunakan Supabase Service Role Key di API route webhook


-- ============================================================
-- HELPER FUNCTIONS
-- ============================================================

-- Cek apakah subdomain tersedia
CREATE OR REPLACE FUNCTION public.is_subdomain_available(p_subdomain TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN NOT EXISTS (
    SELECT 1 FROM public.tenants WHERE subdomain = p_subdomain
  );
END;
$$;

-- Ambil data tenant lengkap beserta profil & subscription
CREATE OR REPLACE FUNCTION public.get_tenant_with_details(p_subdomain TEXT)
RETURNS TABLE (
  tenant_id     UUID,
  subdomain     TEXT,
  display_name  TEXT,
  bio           TEXT,
  avatar_url    TEXT,
  is_active     BOOLEAN,
  full_name     TEXT,
  plan          public.subscription_plan,
  sub_status    public.subscription_status
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT
    t.id,
    t.subdomain,
    t.display_name,
    t.bio,
    COALESCE(t.avatar_url, p.avatar_url),
    t.is_active,
    p.full_name,
    s.plan,
    s.status
  FROM public.tenants t
  JOIN public.profiles p ON p.id = t.user_id
  LEFT JOIN public.subscriptions s ON s.user_id = t.user_id
  WHERE t.subdomain = p_subdomain AND t.is_active = true;
END;
$$;