import { createClient } from "@/lib/supabase/server";
import { TargetUrlForm } from "@/components/dashboard/target-url-form";
import { ClaimSubdomainForm } from "@/components/dashboard/claim-subdomain-form";
import { Settings } from "lucide-react";

export default async function SubdomainsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: tenant } = await supabase
    .from("tenants")
    .select("*")
    .eq("user_id", user.id)
    .single();

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Settings className="h-6 w-6 text-primary" />
          </div>
          Kelola Subdomain
        </h1>
        <p className="text-muted-foreground mt-1 text-lg">
          Klaim subdomain kustom Anda dan atur rute proxy tujuannya.
        </p>
      </div>

      {tenant ? (
        <TargetUrlForm 
          initialUrl={tenant.target_url || ""} 
          subdomain={tenant.subdomain} 
        />
      ) : (
        <ClaimSubdomainForm />
      )}
    </div>
  );
}
