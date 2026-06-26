import { createClient } from "@/lib/supabase/server";
import { Settings, Globe, Heart, Plus, ChevronDown, ShoppingBag, LayoutTemplate, FolderKanban } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DeleteSubdomainButton } from "@/components/dashboard/delete-subdomain-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default async function SubdomainsPage() {
  const supabase = await createClient();
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";
  const protocol = rootDomain.includes("localhost") ? "http" : "https";

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: tenants } = await supabase
    .from("tenants")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const allTenants = tenants || [];
  const universalTenants = allTenants.filter(t => t.category === "universal");
  const undanganTenants = allTenants.filter(t => t.category === "undangan");

  // Helper function to render Undangan Card
  const renderUndanganCard = (tenant: any) => {
    return (
      <Card key={tenant.id} className="glass shadow-sm hover:shadow-md transition-all border-rose-100 overflow-hidden group flex flex-col justify-between h-full">
        <div>
          <div className="h-1.5 w-full bg-gradient-to-r from-rose-400 to-rose-600" />
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between gap-2 mb-2">
              <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-100 border-0 flex items-center gap-1 w-fit px-2.5 py-0.5 font-medium text-xs">
                <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> Undangan Digital
              </Badge>
              {!tenant.is_active ? (
                <Badge className="text-[10px] px-1.5 py-0.5 bg-amber-100 text-amber-800 hover:bg-amber-100 border-0">
                  Nonaktif
                </Badge>
              ) : tenant.is_addon ? (
                <Badge variant="destructive" className="text-[10px] px-1.5 py-0.5">
                  Addon
                </Badge>
              ) : (
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0.5 bg-rose-50 text-rose-800 hover:bg-rose-50 border-0">
                  Bawaan Paket
                </Badge>
              )}
            </div>
            <CardTitle className="text-lg font-bold text-slate-800 break-all">
              {tenant.subdomain}.{rootDomain}
            </CardTitle>
            <CardDescription className="text-xs flex flex-col gap-0.5 mt-1">
              <span>Dibuat pada {new Date(tenant.created_at).toLocaleDateString("id-ID")}</span>
              {tenant.expires_at && (
                <span className="text-amber-600 font-semibold text-[11px]">
                  Exp: {new Date(tenant.expires_at).toLocaleDateString("id-ID")}
                </span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2 pb-4">
             <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100/50">
               Tema: {tenant.template_data?.theme_id || "Premium Elegance"}
             </span>
          </CardContent>
        </div>
        <CardFooter className="pt-4 flex justify-between border-t bg-slate-50 p-4 mt-auto">
          <DeleteSubdomainButton
             tenantId={tenant.id}
             deleteAction={async (formData) => {
               "use server";
               const { deleteSubdomain } = await import("@/app/actions/tenant");
               await deleteSubdomain(formData);
             }}
           />
          <div className="flex flex-wrap gap-2 justify-end">
            {tenant.is_addon && (
              <form action={async () => {
                "use server";
                const { buyAddonDomain } = await import("@/app/actions/checkout");
                const formData = new FormData();
                formData.set("tenant_id", tenant.id);
                await buyAddonDomain(formData);
              }}>
                <Button type="submit" size="sm" className="bg-amber-500 hover:bg-amber-600 text-white shadow-sm h-8 text-xs">
                  {tenant.is_active ? "Perpanjang" : "Aktifkan"} (Rp 10rb)
                </Button>
              </form>
            )}
            {!tenant.is_active && !tenant.is_addon && (
              <form action={async () => {
                "use server";
                const { activateSubdomain } = await import("@/app/actions/tenant");
                const formData = new FormData();
                formData.set("tenant_id", tenant.id);
                await activateSubdomain(formData);
              }}>
                <Button type="submit" size="sm" className="bg-rose-600 hover:bg-rose-700 text-white shadow-sm h-8 text-xs font-semibold">
                  Aktifkan
                </Button>
              </form>
            )}
             <Button asChild size="sm" variant="outline" className="border-rose-200 text-rose-700 hover:bg-rose-50 h-8 text-xs">
              <a href={`${protocol}://${tenant.subdomain}.${rootDomain}`} target="_blank" rel="noreferrer">
                 Lihat
              </a>
            </Button>
            <Button asChild size="sm" className="bg-rose-600 hover:bg-rose-700 text-white h-8 text-xs">
              <Link href={`/dashboard/undangan/${tenant.id}/edit`}>
                Edit
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  };

  // Helper function to render Proxy Card
  const renderProxyCard = (tenant: any) => {
    return (
      <Card key={tenant.id} className="glass shadow-sm hover:shadow-md transition-all border-border/50 overflow-hidden flex flex-col justify-between h-full">
        <div>
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-400 to-blue-600" />
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between gap-2 mb-2">
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-0 flex items-center gap-1 w-fit px-2.5 py-0.5 font-medium text-xs">
                <Globe className="w-3 h-3 text-blue-500" /> Proxy Universal
              </Badge>
              {!tenant.is_active ? (
                <Badge className="text-[10px] px-1.5 py-0.5 bg-amber-100 text-amber-800 hover:bg-amber-100 border-0">
                  Nonaktif
                </Badge>
              ) : tenant.is_addon ? (
                <Badge variant="destructive" className="text-[10px] px-1.5 py-0.5">
                  Addon
                </Badge>
              ) : (
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0.5 bg-green-50 text-green-800 hover:bg-green-50 border-0">
                  Bawaan Paket
                </Badge>
              )}
            </div>
            <CardTitle className="text-lg font-bold text-slate-850 break-all">
              <a href={`${protocol}://${tenant.subdomain}.${rootDomain}`} target="_blank" rel="noreferrer" className="hover:underline">
                {tenant.subdomain}.{rootDomain}
              </a>
            </CardTitle>
            <CardDescription className="text-xs flex flex-col gap-0.5 mt-1">
              <span>Dibuat pada {new Date(tenant.created_at).toLocaleDateString("id-ID")}</span>
              {tenant.expires_at && (
                <span className="text-amber-600 font-semibold text-[11px]">
                  Exp: {new Date(tenant.expires_at).toLocaleDateString("id-ID")}
                </span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2 pb-4 space-y-1">
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Arah URL Target</div>
            <div className="text-xs font-mono text-primary truncate hover:underline block max-w-full">
              {tenant.target_url ? (
                <a href={tenant.target_url} target="_blank" rel="noreferrer">
                  {tenant.target_url}
                </a>
              ) : (
                <span className="italic text-muted-foreground">Belum diatur</span>
              )}
            </div>
          </CardContent>
        </div>
        <CardFooter className="pt-4 flex justify-between border-t bg-muted/10 p-4 mt-auto">
           <DeleteSubdomainButton
             tenantId={tenant.id}
             deleteAction={async (formData) => {
               "use server";
               const { deleteSubdomain } = await import("@/app/actions/tenant");
               await deleteSubdomain(formData);
             }}
           />
           <div className="flex flex-wrap gap-2 justify-end">
             {tenant.is_addon && (
               <form action={async () => {
                 "use server";
                 const { buyAddonDomain } = await import("@/app/actions/checkout");
                 const formData = new FormData();
                 formData.set("tenant_id", tenant.id);
                 await buyAddonDomain(formData);
               }}>
                 <Button type="submit" size="sm" className="bg-amber-500 hover:bg-amber-600 text-white shadow-sm h-8 text-xs">
                   {tenant.is_active ? "Perpanjang" : "Aktifkan"} (Rp 10rb)
                 </Button>
               </form>
             )}
             {!tenant.is_active && !tenant.is_addon && (
               <form action={async () => {
                 "use server";
                 const { activateSubdomain } = await import("@/app/actions/tenant");
                 const formData = new FormData();
                 formData.set("tenant_id", tenant.id);
                 await activateSubdomain(formData);
               }}>
                 <Button type="submit" size="sm" className="bg-blue-650 hover:bg-blue-700 text-white shadow-sm h-8 text-xs font-semibold">
                   Aktifkan
                 </Button>
               </form>
             )}
             <Button asChild size="sm" className="h-8 text-xs">
               <Link href={`/dashboard/subdomains/${tenant.id}`}>
                 Pengaturan Proxy
               </Link>
             </Button>
           </div>
         </CardFooter>
      </Card>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Settings className="h-6 w-6 text-primary" />
            </div>
            Kelola Subdomain Anda
          </h1>
          <p className="text-muted-foreground text-base mt-1">
            Klaim subdomain kustom Anda untuk Proxy Eksternal, Undangan Digital, Biolink, dan Landing Page.
          </p>
        </div>

        {/* Unified "Buat Baru" Dropdown CTA */}
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="gradient-brand text-white shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 px-4 py-2.5 h-auto hover:scale-[1.02]">
                <Plus className="w-4 h-4" /> Buat Proyek Baru <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 p-2 rounded-xl shadow-xl">
              <DropdownMenuItem asChild className="focus:bg-rose-50/50 focus:text-rose-700 cursor-pointer rounded-lg p-2">
                <Link href="/dashboard/undangan/templates" className="flex items-center gap-2 w-full">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  <span className="font-medium text-slate-700 dark:text-slate-200">Undangan Digital</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="focus:bg-blue-50/50 focus:text-blue-700 cursor-pointer rounded-lg p-2">
                <Link href="/dashboard/subdomains/new" className="flex items-center gap-2 w-full">
                  <Globe className="w-4 h-4 text-blue-500" />
                  <span className="font-medium text-slate-700 dark:text-slate-200">Proxy Universal</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem disabled className="opacity-55 flex items-center justify-between p-2 rounded-lg">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-purple-500" />
                  <span className="font-medium text-slate-400">Biolink Toko</span>
                </div>
                <Badge variant="secondary" className="text-[9px] font-bold scale-90 px-1.5 py-0 bg-purple-50 text-purple-700 hover:bg-purple-50 border-0">Soon</Badge>
              </DropdownMenuItem>
              <DropdownMenuItem disabled className="opacity-55 flex items-center justify-between p-2 rounded-lg">
                <div className="flex items-center gap-2">
                  <LayoutTemplate className="w-4 h-4 text-amber-500" />
                  <span className="font-medium text-slate-400">Landing Page</span>
                </div>
                <Badge variant="secondary" className="text-[9px] font-bold scale-90 px-1.5 py-0 bg-amber-50 text-amber-700 hover:bg-amber-50 border-0">Soon</Badge>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        {/* Dynamic Responsive Tab Triggers */}
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-1.5 mb-8 h-auto p-1.5 bg-muted/40 rounded-xl">
          <TabsTrigger value="all" className="text-xs md:text-sm font-semibold py-2.5 rounded-lg data-[state=active]:text-slate-800 data-[state=active]:bg-background shadow-xs">
            <FolderKanban className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" /> Semua Proyek
          </TabsTrigger>
          <TabsTrigger value="undangan" className="text-xs md:text-sm font-semibold py-2.5 rounded-lg data-[state=active]:text-rose-600 data-[state=active]:bg-rose-50/50 shadow-xs">
            <Heart className="w-3.5 h-3.5 mr-1.5 text-rose-500" /> Undangan
          </TabsTrigger>
          <TabsTrigger value="biolink" className="text-xs md:text-sm font-semibold py-2.5 rounded-lg data-[state=active]:text-purple-600 data-[state=active]:bg-purple-50/50 shadow-xs">
            <ShoppingBag className="w-3.5 h-3.5 mr-1.5 text-purple-500" /> Biolink Toko
          </TabsTrigger>
          <TabsTrigger value="landing" className="text-xs md:text-sm font-semibold py-2.5 rounded-lg data-[state=active]:text-amber-600 data-[state=active]:bg-amber-50/50 shadow-xs">
            <LayoutTemplate className="w-3.5 h-3.5 mr-1.5 text-amber-500" /> Landing Page
          </TabsTrigger>
          <TabsTrigger value="universal" className="text-xs md:text-sm font-semibold py-2.5 rounded-lg data-[state=active]:text-blue-600 data-[state=active]:bg-blue-50/50 shadow-xs">
            <Globe className="w-3.5 h-3.5 mr-1.5 text-blue-500" /> Proxy Universal
          </TabsTrigger>
        </TabsList>

        {/* 1. TAB SEMUA PROYEK */}
        <TabsContent value="all" className="space-y-6 outline-none">
          {allTenants.length === 0 ? (
            <Card className="glass shadow-sm border-dashed border-2 border-border/70 bg-muted/5">
              <CardContent className="flex flex-col items-center justify-center p-14 text-center space-y-4">
                <div className="p-4 bg-background dark:bg-muted/30 rounded-full shadow-sm">
                  <FolderKanban className="h-10 w-10 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Belum Ada Proyek</h3>
                  <p className="text-muted-foreground max-w-md mx-auto text-sm">
                    Klaim subdomain kustom Anda. Buat undangan digital eksklusif atau gunakan sebagai proxy web universal.
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allTenants.map((tenant) => {
                if (tenant.category === "undangan") {
                  return renderUndanganCard(tenant);
                } else {
                  return renderProxyCard(tenant);
                }
              })}
            </div>
          )}
        </TabsContent>

        {/* 2. TAB UNDANGAN DIGITAL */}
        <TabsContent value="undangan" className="space-y-6 outline-none">
          {undanganTenants.length === 0 ? (
            <Card className="glass shadow-sm border-dashed border-2 border-rose-200 bg-rose-50/10">
              <CardContent className="flex flex-col items-center justify-center p-14 text-center space-y-4">
                <div className="p-4 bg-background dark:bg-rose-950/20 rounded-full shadow-sm">
                  <Heart className="h-10 w-10 text-rose-500 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-rose-900 dark:text-rose-300">Belum Ada Undangan</h3>
                  <p className="text-rose-700/80 dark:text-rose-400/80 max-w-md mx-auto text-sm">
                    Buat undangan pernikahan digital impian Anda dengan live-editor premium kami.
                  </p>
                </div>
                <Button asChild className="bg-rose-600 hover:bg-rose-700 text-white shadow-md transition-all mt-2">
                  <Link href="/dashboard/undangan/templates">
                    + Buat Undangan Baru
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {undanganTenants.map(tenant => renderUndanganCard(tenant))}
            </div>
          )}
        </TabsContent>

        {/* 3. TAB BIOLINK TOKO (SOON) */}
        <TabsContent value="biolink" className="outline-none">
          <Card className="glass border-dashed border-2 border-purple-200 bg-purple-50/5 relative overflow-hidden py-14">
            <div className="absolute right-4 top-4">
              <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 hover:bg-purple-100 border-0 font-semibold">Segera Hadir</Badge>
            </div>
            <CardContent className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="p-4 bg-purple-50 dark:bg-purple-950/40 rounded-full shadow-inner">
                <ShoppingBag className="h-10 w-10 text-purple-500" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-800 dark:text-purple-300">Biolink Toko Online</h3>
                <p className="text-muted-foreground max-w-md mx-auto text-sm">
                  Tampilkan katalog produk, link sosmed, kontak WhatsApp, dan lacak klik pengunjung dengan mudah di subdomain pribadi Anda.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 4. TAB LANDING PAGE (SOON) */}
        <TabsContent value="landing" className="outline-none">
          <Card className="glass border-dashed border-2 border-amber-200 bg-amber-50/5 relative overflow-hidden py-14">
            <div className="absolute right-4 top-4">
              <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 hover:bg-amber-100 border-0 font-semibold">Segera Hadir</Badge>
            </div>
            <CardContent className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="p-4 bg-amber-50 dark:bg-amber-950/40 rounded-full shadow-inner">
                <LayoutTemplate className="h-10 w-10 text-amber-500" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-800 dark:text-amber-300">Landing Page & Portofolio</h3>
                <p className="text-muted-foreground max-w-md mx-auto text-sm">
                  Bangun halaman promo, portofolio profesional, atau mini-website bisnis Anda tanpa coding menggunakan template interaktif.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 5. TAB PROXY UNIVERSAL */}
        <TabsContent value="universal" className="space-y-6 outline-none">
          {universalTenants.length === 0 ? (
            <Card className="glass shadow-sm border-dashed border-2 border-border/70 bg-muted/5">
              <CardContent className="flex flex-col items-center justify-center p-14 text-center space-y-4">
                <div className="p-4 bg-background dark:bg-muted/30 rounded-full shadow-sm">
                  <Globe className="h-10 w-10 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Belum Ada Proxy</h3>
                  <p className="text-muted-foreground max-w-md mx-auto text-sm">
                    Klaim subdomain dan hubungkan langsung ke situs web eksternal Anda (Vercel, Netlify, Github Pages, dll).
                  </p>
                </div>
                <Button asChild className="gradient-brand text-white shadow-md transition-all mt-2">
                  <Link href="/dashboard/subdomains/new">
                    + Buat Proxy Baru
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {universalTenants.map(tenant => renderProxyCard(tenant))}
            </div>
          )}
        </TabsContent>

      </Tabs>
    </div>
  );
}
