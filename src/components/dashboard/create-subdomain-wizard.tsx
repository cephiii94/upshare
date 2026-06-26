"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { claimSubdomain, checkSubdomainAvailability } from "@/app/actions/tenant";
import { validateSubdomainFormat } from "@/lib/subdomain";
import { toast } from "sonner";
import { Loader2, Globe, CheckCircle2, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export function CreateSubdomainWizard({ isFree }: { isFree: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // State for form and validation
  const [subdomain, setSubdomain] = useState("");
  const [subdomainAvailable, setSubdomainAvailable] = useState<boolean | null>(null);
  const [subdomainError, setSubdomainError] = useState<string | null>(null);
  const [checkingSubdomain, setCheckingSubdomain] = useState(false);
  const [targetUrl, setTargetUrl] = useState("");

  const category = "universal";

  // Debounce for live validation
  useEffect(() => {
    setSubdomainError(null);
    if (subdomain.length === 0) {
      setSubdomainAvailable(null);
      return;
    }
    
    if (subdomain.length > 0) {
      const formatCheck = validateSubdomainFormat(subdomain);
      if (!formatCheck.isValid) {
        setSubdomainError(formatCheck.message);
        setSubdomainAvailable(false);
        return;
      }
    }

    const delayDebounceFn = setTimeout(async () => {
      setCheckingSubdomain(true);
      const available = await checkSubdomainAvailability(subdomain);
      setSubdomainAvailable(available);
      if (!available) {
        setSubdomainError("Subdomain ini sudah digunakan orang lain.");
      }
      setCheckingSubdomain(false);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [subdomain]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subdomainAvailable) {
      toast.error("Subdomain tidak tersedia atau tidak valid.");
      return;
    }

    setLoading(true);
    
    const formData = new FormData();
    formData.set("subdomain", subdomain);
    formData.set("category", category);
    formData.set("target_url", targetUrl);

    const result = await claimSubdomain(formData);
    setLoading(false);

    if (result?.success) {
      toast.success(result.message);
      router.push("/dashboard/subdomains");
    } else if (result?.error) {
      toast.error(result.error);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit}>
        <Card className="glass shadow-md animate-in fade-in slide-in-from-bottom-4">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">Lengkapi Data Proxy</CardTitle>
            <CardDescription>
              Tentukan nama subdomain Anda dan masukkan URL target hosting Anda.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            
            {/* Live Validation Subdomain */}
            <div className="space-y-3">
              <Label htmlFor="subdomain" className="text-base font-semibold">Nama Subdomain</Label>
              <div className="flex items-center">
                <Input 
                  id="subdomain" 
                  placeholder="nama-proyek-keren" 
                  value={subdomain}
                  onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  className="rounded-r-none text-right focus-visible:ring-0 focus-visible:ring-offset-0 border-r-0 text-base sm:text-lg h-12"
                  maxLength={30}
                  required
                />
                <div className="bg-muted border border-l-0 px-4 rounded-r-md text-muted-foreground h-12 flex items-center font-medium">
                  .upshare.id
                </div>
              </div>
              
              {/* Validation Feedback */}
              <div className="h-6 flex items-center text-sm">
                {checkingSubdomain && (
                  <span className="flex items-center text-muted-foreground">
                    <Loader2 className="w-3 h-3 mr-2 animate-spin" /> Memeriksa ketersediaan...
                  </span>
                )}
                {!checkingSubdomain && subdomainAvailable === true && (
                  <span className="flex items-center text-green-600 font-medium">
                    <CheckCircle2 className="w-4 h-4 mr-1" /> Tersedia!
                  </span>
                )}
                {!checkingSubdomain && subdomainAvailable === false && subdomainError && (
                  <span className="flex items-center text-red-500 font-medium">
                    <XCircle className="w-4 h-4 mr-1" /> {subdomainError}
                  </span>
                )}
              </div>
            </div>

            {/* Target URL */}
            <div className="bg-muted/30 p-6 rounded-xl border">
              <div className="space-y-3">
                <Label htmlFor="target_url" className="font-semibold text-base">Target URL Asli (Hosting)</Label>
                <Input 
                  id="target_url" 
                  placeholder="Contoh: https://my-portfolio-app.vercel.app" 
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  className="h-12"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Masukkan URL lengkap website Anda. Kami akan menjadi perantara (proxy) agar terbuka melalui subdomain Anda.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col-reverse sm:flex-row justify-between border-t bg-muted/10 p-4 sm:p-6 gap-3 sm:gap-0">
            <Button type="button" variant="outline" onClick={() => router.push("/dashboard/subdomains")} className="w-full sm:w-auto">
              Batal
            </Button>
            <Button 
              type="submit" 
              disabled={loading || !subdomainAvailable || subdomain.length < 3 || !targetUrl} 
              className="w-full sm:w-auto gradient-brand text-white shadow-md"
            >
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Buat Sekarang
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

