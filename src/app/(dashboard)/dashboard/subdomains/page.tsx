import { createClient } from "@/lib/supabase/server";
import { Settings, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function SubdomainsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: tenants } = await supabase
    .from("tenants")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Settings className="h-6 w-6 text-primary" />
            </div>
            Kelola Subdomain
          </h1>
          <p className="text-muted-foreground mt-1 text-lg">
            Klaim subdomain kustom Anda dan atur rute proxy atau template undangannya.
          </p>
        </div>
        {tenants && tenants.length > 0 && (
          <Button asChild className="gradient-brand text-white shadow-md hover:shadow-lg transition-all">
            <Link href="/dashboard/subdomains/new">
              + Klaim Subdomain Baru
            </Link>
          </Button>
        )}
      </div>

      {!tenants || tenants.length === 0 ? (
        <Card className="glass shadow-sm border-dashed border-2">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center space-y-4">
            <div className="p-4 bg-muted rounded-full">
              <Globe className="h-10 w-10 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Anda belum memiliki Proyek</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Mulai buat undangan pernikahan digital atau arahkan subdomain proxy Anda ke website eksternal.
              </p>
            </div>
            <Button asChild className="gradient-brand text-white shadow-md hover:shadow-lg transition-all mt-4" size="lg">
              <Link href="/dashboard/subdomains/new">
                + Buat Subdomain Baru
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tenants.map((tenant) => (
            <Card key={tenant.id} className="glass shadow-sm hover:shadow-md transition-all border-border/50">
              <CardHeader className="pb-4 border-b bg-muted/20">
                <CardTitle className="text-xl font-bold text-primary flex items-center justify-between">
                  <a href={`http://${tenant.subdomain}.localhost:3000`} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    {tenant.subdomain}.upshare.id
                  </a>
                </CardTitle>
                <CardDescription>
                  Dibuat pada {new Date(tenant.created_at).toLocaleDateString("id-ID")}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Mode & Kategori</div>
                  <Badge variant="outline" className="capitalize">
                    {tenant.category}
                  </Badge>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Arah URL Target</div>
                  {tenant.target_url ? (
                    <a href={tenant.target_url} target="_blank" rel="noreferrer" className="text-sm font-mono text-primary hover:underline break-all">
                      {tenant.target_url}
                    </a>
                  ) : tenant.category === "undangan" && tenant.template_data ? (
                    <span className="text-sm font-semibold text-rose-600">Template Internal (Tanpa Proxy)</span>
                  ) : (
                    <span className="text-sm italic text-muted-foreground">Belum diatur</span>
                  )}
                </div>
              </CardContent>
              <CardFooter className="pt-0 flex justify-between border-t bg-muted/10 p-4">
                <form action={async () => {
                  "use server";
                  const { deleteSubdomain } = await import("@/app/actions/tenant");
                  const formData = new FormData();
                  formData.set("tenant_id", tenant.id);
                  await deleteSubdomain(formData);
                }}>
                  <Button type="submit" variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50" size="sm">
                    Hapus
                  </Button>
                </form>
                <Button asChild size="sm">
                  <Link href={`/dashboard/subdomains/${tenant.id}`}>
                    Edit Pengaturan
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
