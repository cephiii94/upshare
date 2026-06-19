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
  
  const [category] = useState<string>(defaultCategory);
  const [templateData, setTemplateData] = useState(defaultTemplateData);
  const [targetUrl, setTargetUrl] = useState(tenant.target_url || "");

  const handleAction = async (formData: FormData) => {
    // Inject the serialized template data if needed
    if (category === "undangan") {
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
                <div>
                  <h4 className="font-semibold text-base mb-4 flex items-center gap-2">
                    <LayoutTemplate className="w-4 h-4 text-rose-500" /> Ubah Desain Template
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
                      </Label>
                    </div>
                  </RadioGroup>

                  <h4 className="font-semibold text-sm pt-2 border-t">Data Mempelai</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
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
