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
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 flex flex-col items-center justify-center py-8 text-center bg-white rounded-xl border border-rose-100">
                <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mb-2">
                  <Heart className="w-8 h-8 text-rose-500 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-bold text-xl text-slate-800 mb-2">Desain & Isi Undangan Anda</h4>
                  <p className="text-muted-foreground text-sm max-w-sm mx-auto mb-6">
                    Buka editor khusus undangan untuk memilih tema, mengisi data mempelai, jadwal acara, hingga rekening amplop digital dengan fitur Live Preview.
                  </p>
                  <Button asChild size="lg" className="bg-rose-600 hover:bg-rose-700 text-white rounded-full px-8 shadow-lg">
                    <a href={`/dashboard/undangan/${tenant.id}/edit`}>
                      <LayoutTemplate className="w-4 h-4 mr-2" /> Buka Editor Undangan
                    </a>
                  </Button>
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
