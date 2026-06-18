import { createClient } from "@/lib/supabase/server";
import { TargetUrlForm } from "@/components/dashboard/target-url-form";
import { ClaimSubdomainForm } from "@/components/dashboard/claim-subdomain-form";

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
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Kelola Subdomain</h1>
        <p className="text-muted-foreground mt-2">
          Atur ke mana pengunjung subdomain Anda akan diarahkan.
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
