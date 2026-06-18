import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function DashboardPage() {
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

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .single();

  const isPro = subscription?.status === "active";

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Overview</h1>
        <p className="text-muted-foreground mt-2">
          Selamat datang kembali. Kelola subdomain dan proxy Anda di sini.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Status Paket</CardTitle>
            <CardDescription>Paket berlangganan Anda saat ini</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold uppercase">
                {subscription?.plan || "Gratis"}
              </span>
              <Badge variant={isPro ? "default" : "secondary"}>
                {isPro ? "Active" : "Free"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subdomain Aktif</CardTitle>
            <CardDescription>Jumlah subdomain yang Anda kelola</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{tenant ? "1" : "0"}</div>
          </CardContent>
        </Card>
      </div>

      {tenant ? (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Subdomain Anda</CardTitle>
            <CardDescription>
              Detail subdomain utama Anda.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">URL Subdomain</p>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold">{tenant.subdomain}.upshare.id</span>
                  <Badge variant={tenant.is_active ? "default" : "destructive"}>
                    {tenant.is_active ? "Aktif" : "Menunggu Pembayaran"}
                  </Badge>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <p className="text-sm font-medium text-muted-foreground mb-1">Target URL (Proxy Ke)</p>
                {tenant.target_url ? (
                  <a href={tenant.target_url} target="_blank" rel="noreferrer" className="text-primary hover:underline font-mono">
                    {tenant.target_url}
                  </a>
                ) : (
                  <p className="text-sm italic text-muted-foreground">Belum ada target URL yang diatur. Silakan ke menu Subdomains untuk mengatur.</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Belum Ada Subdomain</CardTitle>
            <CardDescription>
              Anda belum mengklaim subdomain. Silakan menuju ke halaman Subdomains.
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}
