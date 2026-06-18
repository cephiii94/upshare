import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProfileForm } from "@/components/dashboard/profile-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, Zap } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Settings | Upshare",
  description: "Kelola profil dan pengaturan langganan Anda.",
};

export default async function SettingsPage() {
  const supabase = await createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  // Tarik data profil untuk default value nama
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Tarik data langganan (jika ada)
  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .single();

  const planName = subscription?.plan || "free";
  const status = subscription?.status || "inactive";
  const periodEnd = subscription?.current_period_end;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Pengaturan</h1>
        <p className="text-muted-foreground mt-2">
          Kelola informasi pribadi dan paket berlangganan Anda.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 items-start">
        {/* Kolom Kiri: Profile Form */}
        <ProfileForm 
          initialName={profile?.full_name || ""} 
          email={user.email || ""} 
        />

        {/* Kolom Kanan: Subscription Info Card */}
        <Card className="glass border-primary/20 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Paket & Penagihan
            </CardTitle>
            <CardDescription>
              Tinjau status paket Upshare Anda saat ini.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-muted/30 border rounded-xl">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Paket Aktif</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl font-bold uppercase">{planName}</span>
                  {planName !== "free" && status === "active" && (
                    <Badge className="bg-emerald-500 hover:bg-emerald-600 border-0">Aktif</Badge>
                  )}
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Zap className="h-6 w-6 text-primary" />
              </div>
            </div>

            {planName !== "free" && periodEnd ? (
              <div className="text-sm">
                <span className="text-muted-foreground">Periode Berakhir: </span>
                <span className="font-semibold text-foreground">
                  {new Date(periodEnd).toLocaleDateString("id-ID", { dateStyle: "long" })}
                </span>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">
                Anda berada di paket gratis selamanya dengan batas maksimal mengklaim 1 subdomain.
              </div>
            )}
          </CardContent>
          <CardFooter className="bg-muted/10 pt-6 border-t">
            {planName === "free" ? (
              <Button asChild className="w-full gradient-brand text-white shadow-md hover:scale-105 transition-all">
                <Link href="/#pricing">
                  Upgrade Paket Sekarang
                </Link>
              </Button>
            ) : (
              <Button asChild variant="outline" className="w-full border-primary/20 hover:bg-primary/5">
                <Link href="/dashboard/subdomains">
                  Kelola Subdomain Anda
                </Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
