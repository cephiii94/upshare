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
  const userGreetingName = user.email?.split("@")[0] || "User";

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            Selamat datang, <span className="capitalize">{userGreetingName}</span> 👋
          </h1>
          <p className="text-muted-foreground mt-2 flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            All systems operational. Kelola subdomain proxy Anda di sini.
          </p>
        </div>
        {tenant ? (
          <Button asChild className="gradient-brand text-white shadow-md hover:shadow-lg transition-all hover:scale-105">
            <Link href="/dashboard/subdomains">
              <Globe className="mr-2 h-4 w-4" />
              Kelola Subdomain
            </Link>
          </Button>
        ) : (
          <Button asChild className="gradient-brand text-white shadow-md hover:shadow-lg transition-all hover:scale-105">
            <Link href="/dashboard/subdomains">
              <Zap className="mr-2 h-4 w-4" />
              Klaim Subdomain
            </Link>
          </Button>
        )}
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
              {subscription?.plan || "Gratis"}
              <Badge variant={isPro ? "default" : "secondary"} className="ml-auto">
                {isPro ? "Active" : "Free"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              {isPro ? "Anda menikmati fitur premium." : "Upgrade untuk fitur lebih banyak."}
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
              {tenant ? "1" : "0"} <span className="text-muted-foreground text-sm font-normal">/ 1 Kuota</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Satu subdomain per akun saat ini.
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

      {/* Main Core Asset: Proxy Visualizer */}
      {tenant ? (
        <Card className="border-primary/20 shadow-lg shadow-primary/5 overflow-hidden">
          <div className="h-1.5 w-full gradient-brand" />
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Subdomain Utama Anda
              </span>
              <Badge variant={tenant.is_active ? "default" : "destructive"}>
                {tenant.is_active ? "Aktif" : "Menunggu Pembayaran"}
              </Badge>
            </CardTitle>
            <CardDescription>
              Detail rute proxy (forwarding) dari subdomain Upshare ke hosting Anda.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/30 rounded-xl p-6 border border-border/50 mt-2">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                
                {/* Source Subdomain */}
                <div className="flex-1 w-full flex flex-col items-center md:items-start">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                    <Globe className="h-3.5 w-3.5" />
                    URL Anda (Public)
                  </span>
                  <div className="bg-background border shadow-sm rounded-lg py-3 px-4 w-full flex items-center justify-between">
                    <span className="font-mono text-sm font-semibold truncate text-primary">
                      {tenant.subdomain}.upshare.id
                    </span>
                    <div className="flex items-center gap-1 ml-2">
                      <CopyButton textToCopy={`https://${tenant.subdomain}.upshare.id`} />
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" asChild>
                        <a href={`https://${tenant.subdomain}.upshare.id`} target="_blank" rel="noreferrer" title="Buka URL">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Arrow Visualizer */}
                <div className="hidden md:flex flex-col items-center justify-center shrink-0 mt-6 text-muted-foreground">
                  <div className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full mb-1">PROXY</div>
                  <ArrowRight className="h-6 w-6" />
                </div>
                <div className="flex md:hidden items-center justify-center text-muted-foreground">
                  <ArrowRight className="h-5 w-5 rotate-90" />
                </div>

                {/* Target Host */}
                <div className="flex-1 w-full flex flex-col items-center md:items-start">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                    <Activity className="h-3.5 w-3.5" />
                    Target Hosting (Private)
                  </span>
                  <div className="bg-background border shadow-sm rounded-lg py-3 px-4 w-full flex items-center justify-between">
                    {tenant.target_url ? (
                      <>
                        <span className="font-mono text-sm truncate text-foreground/80">
                          {tenant.target_url}
                        </span>
                        <div className="flex items-center gap-1 ml-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" asChild>
                            <a href={tenant.target_url} target="_blank" rel="noreferrer" title="Buka Target">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      </>
                    ) : (
                      <span className="text-sm italic text-muted-foreground py-1">Belum diatur</span>
                    )}
                  </div>
                </div>

              </div>
              
              {!tenant.target_url && (
                <div className="mt-6 text-center">
                  <Button asChild variant="outline" size="sm" className="border-dashed border-primary/50 text-primary hover:bg-primary/5">
                    <Link href="/dashboard/subdomains">Atur Target URL Sekarang</Link>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
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
