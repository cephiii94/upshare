import { createClient } from "@supabase/supabase-js";

// Digunakan khusus untuk server-side yang membutuhkan hak akses penuh (bypass RLS)
// seperti pada Webhook handlers
export const getSupabaseAdmin = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
  process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder"
);
