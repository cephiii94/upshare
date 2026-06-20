import { createClient } from "@/lib/supabase/server";
import { Settings, Globe, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  const universalTenants = tenants?.filter(t => t.category === "universal") || [];
  const undanganTenants = tenants?.filter(t => t.category === "undangan") || [];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Settings className="h-6 w-6 text-primary" />
          </div>
          Kelola Proyek Anda
        </h1>
        <p className="text-muted-foreground mt-1 text-lg">
          Klaim subdomain kustom Anda untuk Proxy Eksternal atau Undangan Digital.
        </p>
      </div>

      <Tabs defaultValue="undangan" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8 h-14">
          <TabsTrigger value="undangan" className="text-base font-semibold data-[state=active]:text-rose-600 data-[state=active]:bg-rose-50">
            <Heart className="w-4 h-4 mr-2" /> Undangan Digital
          </TabsTrigger>
          <TabsTrigger value="universal" className="text-base font-semibold data-[state=active]:text-primary data-[state=active]:bg-primary/10">
            <Globe className="w-4 h-4 mr-2" /> Proxy Universal
          </TabsTrigger>
        </TabsList>

        {/* TAB UNDANGAN */}
        <TabsContent value="undangan" className="space-y-6">
          <div className="flex justify-end">
            <Button asChild className="bg-rose-600 hover:bg-rose-700 text-white shadow-md hover:shadow-lg transition-all">
              <Link href="/dashboard/undangan/templates">
                <Heart className="w-4 h-4 mr-2" /> + Buat Undangan Baru
              </Link>
            </Button>
          </div>

          {undanganTenants.length === 0 ? (
            <Card className="glass shadow-sm border-dashed border-2 border-rose-200 bg-rose-50/50">
              <CardContent className="flex flex-col items-center justify-center p-12 text-center space-y-4">
                <div className="p-4 bg-white rounded-full shadow-sm">
                  <Heart className="h-10 w-10 text-rose-500 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-rose-900">Belum ada Undangan</h3>
                  <p className="text-rose-700 max-w-md mx-auto">
                    Mulai buat undangan pernikahan digital Anda yang indah dan modern dengan editor live-preview kami.
                  </p>
                </div>
                <Button asChild className="bg-rose-600 hover:bg-rose-700 text-white shadow-md hover:shadow-lg transition-all mt-4" size="lg">
                  <Link href="/dashboard/undangan/templates">
                    + Buat Undangan Sekarang
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {undanganTenants.map((tenant) => (
                <Card key={tenant.id} className="glass shadow-sm hover:shadow-md transition-all border-rose-100 overflow-hidden group">
                  <div className="h-2 w-full bg-gradient-to-r from-rose-400 to-rose-600" />
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center justify-between">
                      <span className="truncate">{tenant.subdomain}.upshare.id</span>
                    </CardTitle>
                    <CardDescription>
                      Dibuat pada {new Date(tenant.created_at).toLocaleDateString("id-ID")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                     <span className="text-sm font-semibold text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
                       Tema: {tenant.template_data?.theme_id || "Premium Elegance"}
                     </span>
                  </CardContent>
                  <CardFooter className="pt-4 flex justify-between border-t bg-slate-50 p-4">
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
                    <div className="flex gap-2">
                       <Button asChild size="sm" variant="outline" className="border-rose-200 text-rose-700 hover:bg-rose-50">
                        <a href={`http://${tenant.subdomain}.localhost:3000`} target="_blank" rel="noreferrer">
                           Lihat
                        </a>
                      </Button>
                      <Button asChild size="sm" className="bg-rose-600 hover:bg-rose-700 text-white">
                        <Link href={`/dashboard/undangan/${tenant.id}/edit`}>
                          Edit
                        </Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* TAB UNIVERSAL / PROXY */}
        <TabsContent value="universal" className="space-y-6">
          <div className="flex justify-end">
            <Button asChild className="gradient-brand text-white shadow-md hover:shadow-lg transition-all">
              <Link href="/dashboard/subdomains/new">
                <Globe className="w-4 h-4 mr-2" /> + Buat Proxy Baru
              </Link>
            </Button>
          </div>

          {universalTenants.length === 0 ? (
            <Card className="glass shadow-sm border-dashed border-2">
              <CardContent className="flex flex-col items-center justify-center p-12 text-center space-y-4">
                <div className="p-4 bg-muted rounded-full">
                  <Globe className="h-10 w-10 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Belum ada Proxy</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Klaim subdomain dan arahkan ke website Anda yang di-host di platform lain (Vercel, Netlify, dll).
                  </p>
                </div>
                <Button asChild className="gradient-brand text-white shadow-md hover:shadow-lg transition-all mt-4" size="lg">
                  <Link href="/dashboard/subdomains/new">
                    + Buat Proxy Sekarang
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {universalTenants.map((tenant) => (
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
                      <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Arah URL Target</div>
                      {tenant.target_url ? (
                        <a href={tenant.target_url} target="_blank" rel="noreferrer" className="text-sm font-mono text-primary hover:underline break-all">
                          {tenant.target_url}
                        </a>
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
                        Pengaturan Proxy
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

      </Tabs>
    </div>
  );
}
