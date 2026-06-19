import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, Zap, Activity, ArrowRight, ExternalLink, ShieldCheck, HelpCircle } from "lucide-react";
import Link from "next/link";
import { CopyButton } from "@/components/dashboard/copy-button";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: latestTenants } = await supabase
    .from("tenants")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(3);

  const tenant = latestTenants?.[0] || null;

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .single();

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  const isAdmin = profile?.is_admin || false;
  const isPro = subscription?.status === "active" || isAdmin;
  const planDisplay = isAdmin ? "Admin (Unlimited)" : (subscription?.plan || "Gratis");
  const badgeDisplay = isAdmin ? "Admin" : (isPro ? "Active" : "Free");

  // Fetch all tenants to count subdomains
  const { data: allTenants } = await supabase
    .from("tenants")
    .select("id")
    .eq("user_id", user.id);
  
  const subdomainsCount = allTenants?.length || 0;

  const userGreetingName = user.email?.split("@")[0] || "User";

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            Selamat datang, <span className="capitalize">{userGreetingName}</span> 👋
            {isAdmin && <Badge variant="destructive" className="ml-2">Admin</Badge>}
          </h1>
          <p className="text-muted-foreground mt-2 flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            All systems operational. Kelola subdomain proxy Anda di sini.
          </p>
        </div>
        <Button asChild className="gradient-brand text-white shadow-md hover:shadow-lg transition-all hover:scale-105">
          <Link href="/dashboard/subdomains">
            <Globe className="mr-2 h-4 w-4" />
            {subdomainsCount > 0 ? "Kelola Subdomain" : "Klaim Subdomain"}
          </Link>
        </Button>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="glass border-border/50 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute -right-6 -top-6 text-primary/5">
            <Zap className="w-32 h-32" />
          </div>
          <CardHeader className="pb-2">
            <CardDescription className="font-medium">Status Paket</CardDescription>
            <CardTitle className="text-2xl flex items-center gap-2">
              <span className="capitalize">{planDisplay}</span>
              <Badge variant={isPro ? "default" : "secondary"} className="ml-auto">
                {badgeDisplay}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              {isAdmin ? "Admin bebas batasan kuota." : (isPro ? "Anda menikmati fitur premium." : "Upgrade untuk fitur lebih banyak.")}
            </p>
          </CardContent>
        </Card>

        <Card className="glass border-border/50 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute -right-6 -top-6 text-primary/5">
            <Globe className="w-32 h-32" />
          </div>
          <CardHeader className="pb-2">
            <CardDescription className="font-medium">Subdomain Aktif</CardDescription>
            <CardTitle className="text-2xl flex items-center gap-2">
              {subdomainsCount} <span className="text-muted-foreground text-sm font-normal">/ {isAdmin ? "∞ Kuota" : "1 Kuota"}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              {isAdmin ? "Anda bisa membuat banyak subdomain." : "Satu subdomain per akun saat ini."}
            </p>
          </CardContent>
        </Card>

        <Card className="glass border-border/50 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute -right-6 -top-6 text-primary/5">
            <Activity className="w-32 h-32" />
          </div>
          <CardHeader className="pb-2">
            <CardDescription className="font-medium">Status Routing</CardDescription>
            <CardTitle className="text-2xl flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-green-500" />
              Optimal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Proxy routing berjalan dengan stabil.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Core Asset: Proxy Visualizer List */}
      {latestTenants && latestTenants.length > 0 ? (
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Rute Subdomain Anda
          </h2>
          {latestTenants.map((t) => (
            <Card key={t.id} className="border-primary/20 shadow-lg shadow-primary/5 overflow-hidden">
              <div className="h-1.5 w-full gradient-brand" />
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-lg">
                  <span className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-primary" />
                    {t.subdomain}.upshare.id
                  </span>
                  <Badge variant={t.is_active ? "default" : "destructive"}>
                    {t.is_active ? "Aktif" : "Menunggu Pembayaran"}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/30 rounded-xl p-4 border border-border/50">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    
                    {/* Source Subdomain */}
                    <div className="flex-1 w-full flex flex-col items-center md:items-start">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                        <Globe className="h-3 w-3" />
                        URL Publik
                      </span>
                      <div className="bg-background border shadow-sm rounded-md py-2 px-3 w-full flex items-center justify-between">
                        <span className="font-mono text-sm font-semibold truncate text-primary">
                          {t.subdomain}.upshare.id
                        </span>
                        <div className="flex items-center gap-1 ml-2">
                          <CopyButton textToCopy={`https://${t.subdomain}.upshare.id`} />
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary" asChild>
                            <a href={`https://${t.subdomain}.upshare.id`} target="_blank" rel="noreferrer" title="Buka URL">
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Arrow Visualizer */}
                    <div className="hidden md:flex flex-col items-center justify-center shrink-0 mt-4 text-muted-foreground">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                    <div className="flex md:hidden items-center justify-center text-muted-foreground py-2">
                      <ArrowRight className="h-4 w-4 rotate-90" />
                    </div>

                    {/* Target Host */}
                    <div className="flex-1 w-full flex flex-col items-center md:items-start">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                        <Activity className="h-3 w-3" />
                        Target / Mode
                      </span>
                      <div className="bg-background border shadow-sm rounded-md py-2 px-3 w-full flex items-center justify-between">
                        {t.target_url ? (
                          <>
                            <span className="font-mono text-xs truncate text-foreground/80">
                              {t.target_url}
                            </span>
                            <div className="flex items-center gap-1 ml-2">
                              <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary" asChild>
                                <a href={t.target_url} target="_blank" rel="noreferrer" title="Buka Target">
                                  <ExternalLink className="h-3.5 w-3.5" />
                                </a>
                              </Button>
                            </div>
                          </>
                        ) : t.category === "undangan" && t.template_data ? (
                          <span className="text-xs font-semibold text-rose-600 flex items-center gap-1.5 py-1">
                            <Activity className="w-3.5 h-3.5" /> Template Internal ({t.template_data.theme || "Bawaan"})
                          </span>
                        ) : (
                          <span className="text-xs italic text-muted-foreground py-1">Belum diatur</span>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-dashed border-2 border-border/60 bg-muted/10">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-xl">Belum Ada Subdomain</CardTitle>
            <CardDescription className="max-w-md mx-auto">
              Anda belum mengklaim subdomain kustom Anda. Klaim sekarang dan arahkan ke website Anda dalam hitungan detik.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center pt-4 pb-8">
            <Button asChild size="lg" className="gradient-brand text-white hover:scale-105 transition-transform shadow-md">
              <Link href="/dashboard/subdomains">
                Klaim Subdomain Gratis
              </Link>
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Quick Links Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card className="bg-muted/20 border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-muted-foreground" />
              Butuh Bantuan?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Pelajari cara mengkonfigurasi subdomain Anda, mengatur DNS, atau menghubungkan platform seperti Netlify dan Vercel di pusat dokumentasi kami.
            </p>
            <Button variant="link" className="p-0 h-auto text-primary" asChild>
              <Link href="#">Baca Panduan Lengkap <ArrowRight className="ml-1 h-3 w-3" /></Link>
            </Button>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
