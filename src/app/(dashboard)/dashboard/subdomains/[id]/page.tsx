import { createClient } from "@/lib/supabase/server";
import { TenantSettingsForm } from "@/components/dashboard/tenant-settings-form";
import { Settings, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditSubdomainPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: tenant } = await supabase
    .from("tenants")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!tenant) {
    return notFound();
  }

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
              <Settings className="h-6 w-6 text-primary" />
            </div>
            Pengaturan Subdomain
          </h1>
          <p className="text-muted-foreground mt-1 text-lg">
            Atur rute proxy atau template undangan untuk subdomain <span className="font-semibold text-foreground">{tenant.subdomain}.upshare.id</span>.
          </p>
        </div>
      </div>

      <TenantSettingsForm tenant={tenant} />
    </div>
  );
}
