"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { claimSubdomain, checkSubdomainAvailability } from "@/app/actions/tenant";
import { toast } from "sonner";
import { Loader2, Globe, Heart, CheckCircle2, XCircle, LayoutTemplate } from "lucide-react";
import { useRouter } from "next/navigation";

export function CreateSubdomainWizard({ isFree }: { isFree: boolean }) {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  
  // Step 1 State
  const [category, setCategory] = useState<"universal" | "undangan">("universal");
  
  // Step 2 State
  const [subdomain, setSubdomain] = useState("");
  const [subdomainAvailable, setSubdomainAvailable] = useState<boolean | null>(null);
  const [checkingSubdomain, setCheckingSubdomain] = useState(false);
  const [targetUrl, setTargetUrl] = useState("");
  const [templateData, setTemplateData] = useState({
    theme: "rustic", // Default theme
    nama_pria: "",
    nama_wanita: "",
    tanggal_acara: "",
    lokasi_acara: ""
  });

  // Debounce for live validation
  useEffect(() => {
    if (subdomain.length < 3) {
      setSubdomainAvailable(null);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setCheckingSubdomain(true);
      const available = await checkSubdomainAvailability(subdomain);
      setSubdomainAvailable(available);
      setCheckingSubdomain(false);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [subdomain]);

  const handleNext = () => {
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

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

    if (category === "undangan") {
      formData.set("template_data", JSON.stringify(templateData));
    } else {
      formData.set("target_url", targetUrl);
    }

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
      {/* Progress Indicator */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${step >= 1 ? 'border-primary bg-primary text-primary-foreground' : 'border-muted text-muted-foreground'}`}>
          1
        </div>
        <div className={`h-1 w-16 rounded ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
        <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${step >= 2 ? 'border-primary bg-primary text-primary-foreground' : 'border-muted text-muted-foreground'}`}>
          2
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <Card className="glass shadow-md animate-in fade-in slide-in-from-bottom-4">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Pilih Jenis Proyek</CardTitle>
              <CardDescription>
                Apa yang ingin Anda buat dengan subdomain ini?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                value={category} 
                onValueChange={(val) => setCategory(val as "universal" | "undangan")}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div>
                  <RadioGroupItem value="undangan" id="undangan" className="peer sr-only" />
                  <Label
                    htmlFor="undangan"
                    className="flex flex-col items-center justify-center rounded-2xl border-2 border-muted bg-popover p-8 hover:bg-rose-50 hover:text-accent-foreground peer-data-[state=checked]:border-rose-500 peer-data-[state=checked]:bg-rose-50 [&:has([data-state=checked])]:border-rose-500 cursor-pointer transition-all h-full"
                  >
                    <Heart className="mb-4 h-12 w-12 text-rose-500" />
                    <span className="font-bold text-xl text-center mb-2">Undangan Digital</span>
                    <span className="text-sm text-muted-foreground text-center">
                      Gunakan template elegan bawaan kami untuk membuat website pernikahan instan.
                    </span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="universal" id="universal" className="peer sr-only" />
                  <Label
                    htmlFor="universal"
                    className="flex flex-col items-center justify-center rounded-2xl border-2 border-muted bg-popover p-8 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all h-full"
                  >
                    <Globe className="mb-4 h-12 w-12 text-primary" />
                    <span className="font-bold text-xl text-center mb-2">Proxy Web Bebas</span>
                    <span className="text-sm text-muted-foreground text-center">
                      Arahkan (Proxy) subdomain ke website Anda yang di-host di platform lain.
                    </span>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
            <CardFooter className="flex justify-end pt-4 pb-8 px-6">
              <Button type="button" onClick={handleNext} className="w-full sm:w-auto" size="lg">
                Lanjutkan <Globe className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 2 && (
          <Card className="glass shadow-md animate-in fade-in slide-in-from-right-4">
            <CardHeader>
              <CardTitle>Lengkapi Data Proyek</CardTitle>
              <CardDescription>
                Tentukan nama subdomain Anda dan isi informasi yang diperlukan.
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
                  {subdomain.length > 0 && subdomain.length < 3 && (
                    <span className="text-muted-foreground">Minimal 3 karakter.</span>
                  )}
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
                  {!checkingSubdomain && subdomainAvailable === false && subdomain.length >= 3 && (
                    <span className="flex items-center text-red-500 font-medium">
                      <XCircle className="w-4 h-4 mr-1" /> Sudah dipakai orang lain.
                    </span>
                  )}
                </div>
              </div>

              {/* Dynamic Form based on Category */}
              <div className="bg-muted/30 p-6 rounded-xl border">
                {category === "universal" ? (
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
                ) : (
                  <div className="space-y-6">
                    {/* Upsell Banner for Free Users */}
                    {isFree && (
                      <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 flex items-start gap-3">
                        <div className="p-2 bg-white rounded-full shrink-0 mt-0.5">
                          <Heart className="w-4 h-4 text-rose-500" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-rose-900 text-sm">Informasi Paket Gratis</h4>
                          <p className="text-sm text-rose-700 mt-1">
                            Karena Anda menggunakan paket Gratis, undangan ini akan memiliki watermark (logo Upshare). Untuk menghilangkannya, Anda bisa <b>Upgrade ke Premium</b> nanti.
                          </p>
                        </div>
                      </div>
                    )}

                    <div>
                      <h4 className="font-semibold text-base mb-4 flex items-center gap-2">
                        <LayoutTemplate className="w-4 h-4 text-rose-500" /> Pilih Desain Template
                      </h4>
                      <RadioGroup 
                        value={templateData.theme} 
                        onValueChange={(val) => setTemplateData({...templateData, theme: val})}
                        className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6"
                      >
                        {/* Template 1 */}
                        <div>
                          <RadioGroupItem value="rustic" id="theme-rustic" className="peer sr-only" />
                          <Label
                            htmlFor="theme-rustic"
                            className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-rose-50 hover:text-accent-foreground peer-data-[state=checked]:border-rose-500 peer-data-[state=checked]:bg-rose-50 [&:has([data-state=checked])]:border-rose-500 cursor-pointer transition-all h-full"
                          >
                            <div className="w-full aspect-[3/4] bg-orange-100 rounded-md mb-3 flex items-center justify-center overflow-hidden border border-orange-200">
                               <span className="text-orange-800 font-serif text-sm">Rustic</span>
                            </div>
                            <span className="font-semibold text-sm">Rustic Floral</span>
                            <span className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">Gratis</span>
                          </Label>
                        </div>
                        {/* Template 2 */}
                        <div>
                          <RadioGroupItem value="modern" id="theme-modern" className="peer sr-only" />
                          <Label
                            htmlFor="theme-modern"
                            className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-rose-50 hover:text-accent-foreground peer-data-[state=checked]:border-rose-500 peer-data-[state=checked]:bg-rose-50 [&:has([data-state=checked])]:border-rose-500 cursor-pointer transition-all h-full"
                          >
                            <div className="w-full aspect-[3/4] bg-slate-900 rounded-md mb-3 flex items-center justify-center overflow-hidden border border-slate-700">
                               <span className="text-slate-200 font-sans font-light tracking-widest text-sm">MODERN</span>
                            </div>
                            <span className="font-semibold text-sm">Dark Modern</span>
                            <span className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">Gratis</span>
                          </Label>
                        </div>
                        {/* Template 3 */}
                        <div>
                          <RadioGroupItem value="elegant" id="theme-elegant" className="peer sr-only" />
                          <Label
                            htmlFor="theme-elegant"
                            className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-rose-50 hover:text-accent-foreground peer-data-[state=checked]:border-rose-500 peer-data-[state=checked]:bg-rose-50 [&:has([data-state=checked])]:border-rose-500 cursor-pointer transition-all h-full"
                          >
                            <div className="w-full aspect-[3/4] bg-rose-50 rounded-md mb-3 flex items-center justify-center overflow-hidden border border-rose-200">
                               <span className="text-rose-600 font-serif italic text-sm">Elegant</span>
                            </div>
                            <span className="font-semibold text-sm">Rose Elegant</span>
                            <span className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">Premium</span>
                          </Label>
                        </div>
                      </RadioGroup>

                      <h4 className="font-semibold text-base mb-4 flex items-center gap-2 pt-4 border-t">
                        <Heart className="w-4 h-4 text-rose-500" /> Data Mempelai
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Nama Panggilan Pria</Label>
                          <Input 
                            placeholder="Budi" 
                            value={templateData.nama_pria}
                            onChange={(e) => setTemplateData({...templateData, nama_pria: e.target.value})}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Nama Panggilan Wanita</Label>
                          <Input 
                            placeholder="Ani" 
                            value={templateData.nama_wanita}
                            onChange={(e) => setTemplateData({...templateData, nama_wanita: e.target.value})}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Tanggal Acara</Label>
                          <Input 
                            type="date"
                            value={templateData.tanggal_acara}
                            onChange={(e) => setTemplateData({...templateData, tanggal_acara: e.target.value})}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Lokasi / Alamat Lengkap</Label>
                          <Input 
                            placeholder="Gedung XYZ, Jakarta" 
                            value={templateData.lokasi_acara}
                            onChange={(e) => setTemplateData({...templateData, lokasi_acara: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col-reverse sm:flex-row justify-between border-t bg-muted/10 p-4 sm:p-6 gap-3 sm:gap-0">
              <Button type="button" variant="outline" onClick={handleBack} className="w-full sm:w-auto">
                Kembali
              </Button>
              <Button 
                type="submit" 
                disabled={loading || !subdomainAvailable || subdomain.length < 3 || (category === 'universal' && !targetUrl)} 
                className="w-full sm:w-auto gradient-brand text-white shadow-md"
              >
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Buat Sekarang
              </Button>
            </CardFooter>
          </Card>
        )}
      </form>
    </div>
  );
}
