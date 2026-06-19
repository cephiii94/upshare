"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { updateTenantSettings } from "@/app/actions/tenant";
import { toast } from "sonner";
import { Loader2, Globe, Heart, Link as LinkIcon, LayoutTemplate } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto gradient-brand text-white shadow-md">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Simpan Pengaturan
    </Button>
  );
}

export function TenantSettingsForm({ tenant }: { tenant: any }) {
  const defaultCategory = tenant.category || "universal";
  const defaultTemplateData = tenant.template_data || { nama_pria: "", nama_wanita: "", tanggal_acara: "", lokasi_acara: "" };
  
  const [category, setCategory] = useState<string>(defaultCategory);
  const [undanganMode, setUndanganMode] = useState<string>(
    tenant.template_data ? "template" : "proxy"
  );
  const [templateData, setTemplateData] = useState(defaultTemplateData);
  const [targetUrl, setTargetUrl] = useState(tenant.target_url || "");

  const handleAction = async (formData: FormData) => {
    // Inject the serialized template data if needed
    if (category === "undangan" && undanganMode === "template") {
      formData.set("template_data", JSON.stringify(templateData));
      formData.delete("target_url"); // we don't need target_url for internal template
    } else {
      formData.delete("template_data"); // clear template data
      formData.set("target_url", targetUrl);
    }
    formData.set("category", category);

    const result = await updateTenantSettings(formData);
    
    if (result?.success) {
      toast.success(result.message);
    } else if (result?.error) {
      toast.error(result.error);
    }
  };

  return (
    <form action={handleAction}>
      <input type="hidden" name="tenant_id" value={tenant.id} />
      <Card className="glass shadow-md">
        <CardHeader>
          <CardTitle>Pengaturan Subdomain ({tenant.subdomain}.upshare.id)</CardTitle>
          <CardDescription>
            Atur kemana subdomain Anda diarahkan dan pilih fitur khusus yang ingin digunakan.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Kategori Pemakaian */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Tipe Proyek</Label>
            <RadioGroup 
              value={category} 
              onValueChange={setCategory}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem value="universal" id="universal" className="peer sr-only" />
                <Label
                  htmlFor="universal"
                  className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                >
                  <Globe className="mb-3 h-6 w-6" />
                  <span className="font-semibold">Project Universal</span>
                  <span className="text-xs text-muted-foreground mt-1 text-center">Proxy murni tanpa fitur khusus.</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="undangan" id="undangan" className="peer sr-only" />
                <Label
                  htmlFor="undangan"
                  className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-rose-50 hover:text-accent-foreground peer-data-[state=checked]:border-rose-500 peer-data-[state=checked]:bg-rose-50 [&:has([data-state=checked])]:border-rose-500 cursor-pointer transition-all"
                >
                  <Heart className="mb-3 h-6 w-6 text-rose-500" />
                  <span className="font-semibold">Undangan Pernikahan</span>
                  <span className="text-xs text-muted-foreground mt-1 text-center">Fitur khusus undangan & template.</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Pengaturan Spesifik berdasarkan Kategori */}
          <div className="bg-muted/30 p-6 rounded-xl border">
            {category === "universal" && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                <div className="space-y-2">
                  <Label htmlFor="target_url" className="flex items-center gap-2 font-semibold">
                    <LinkIcon className="h-4 w-4 text-primary" /> Target URL (Hosting Asli)
                  </Label>
                  <Input 
                    id="target_url" 
                    name="target_url"
                    placeholder="Contoh: https://my-portfolio-app.vercel.app" 
                    value={targetUrl}
                    onChange={(e) => setTargetUrl(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Masukkan URL lengkap website Anda yang di-host di platform lain.
                  </p>
                </div>
              </div>
            )}

            {category === "undangan" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                
                <div className="space-y-3">
                  <Label className="font-semibold text-rose-600">Pilih Cara Pembuatan Undangan</Label>
                  <RadioGroup 
                    value={undanganMode} 
                    onValueChange={setUndanganMode}
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-2 bg-background p-3 rounded-lg border">
                      <RadioGroupItem value="proxy" id="mode-proxy" />
                      <Label htmlFor="mode-proxy" className="flex-1 cursor-pointer">
                        <div className="font-medium">Pakai Website Sendiri (Proxy)</div>
                        <div className="text-xs text-muted-foreground">Saya sudah punya web undangan di tempat lain (Sejoli, Canva, Netlify, dll)</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 bg-rose-50/50 p-3 rounded-lg border border-rose-100">
                      <RadioGroupItem value="template" id="mode-template" />
                      <Label htmlFor="mode-template" className="flex-1 cursor-pointer">
                        <div className="font-medium flex items-center gap-2">
                          Pakai Template Upshare <LayoutTemplate className="h-3 w-3" />
                        </div>
                        <div className="text-xs text-muted-foreground">Buat undangan instan dengan template elegan bawaan kami.</div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {undanganMode === "proxy" && (
                  <div className="space-y-2 pt-2 border-t">
                    <Label htmlFor="target_url_undangan" className="font-semibold">Target URL Web Undangan Anda</Label>
                    <Input 
                      id="target_url_undangan" 
                      name="target_url" // Same name since form action handles it
                      placeholder="Contoh: https://undangan-budi-ani.netlify.app" 
                      value={targetUrl}
                      onChange={(e) => setTargetUrl(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Watermark akan ditambahkan otomatis jika Anda menggunakan Paket Gratis.
                    </p>
                  </div>
                )}

                {undanganMode === "template" && (
                  <div className="space-y-4 pt-2 border-t">
                    <h4 className="font-semibold text-sm">Data Mempelai</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Nama Pria</Label>
                        <Input 
                          placeholder="Budi" 
                          value={templateData.nama_pria}
                          onChange={(e) => setTemplateData({...templateData, nama_pria: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Nama Wanita</Label>
                        <Input 
                          placeholder="Ani" 
                          value={templateData.nama_wanita}
                          onChange={(e) => setTemplateData({...templateData, nama_wanita: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Tanggal Acara</Label>
                        <Input 
                          type="date"
                          value={templateData.tanggal_acara}
                          onChange={(e) => setTemplateData({...templateData, tanggal_acara: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Lokasi / Alamat Lengkap</Label>
                        <Input 
                          placeholder="Gedung XYZ, Jakarta" 
                          value={templateData.lokasi_acara}
                          onChange={(e) => setTemplateData({...templateData, lokasi_acara: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                )}

              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="bg-muted/10 border-t px-6 py-4 flex justify-end">
          <SubmitButton />
        </CardFooter>
      </Card>
    </form>
  );
}
