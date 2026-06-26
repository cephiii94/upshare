import { createClient } from "@/lib/supabase/server";
import { CreateSubdomainWizard } from "@/components/dashboard/create-subdomain-wizard";
import { Globe, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function NewSubdomainPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  // Cek profile dan langganan untuk validasi kuota
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("status")
    .eq("user_id", user.id)
    .single();

  const isAdmin = profile?.is_admin || false;
  const isPro = subscription?.status === "active";
  const hasUnlimited = isAdmin || isPro;

  // Kita tidak lagi me-redirect pengguna yang tidak "hasUnlimited".
  // Karena sekarang pengguna diperbolehkan membuat lebih dari kuota (yang akan otomatis menjadi Add-on).
  // Logika kuota ditangani secara aman di backend (tenant.ts -> claimSubdomain).

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-4">
        <Button asChild variant="ghost" className="w-fit -ml-4 text-muted-foreground hover:text-foreground">
          <Link href="/dashboard/subdomains">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Daftar Subdomain
          </Link>
        </Button>
        
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            Klaim Subdomain Proxy Baru
          </h1>
          <p className="text-muted-foreground mt-1 text-lg">
            Klaim subdomain kustom Anda untuk diarahkan (proxy) ke hosting eksternal Anda.
          </p>
        </div>
      </div>

      <CreateSubdomainWizard isFree={!isPro} />
    </div>
  );
}
