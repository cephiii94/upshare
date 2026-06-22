"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TemplateRenderer } from "@/components/templates";
import { ArrowLeft, Save, Loader2, Smartphone, Rocket, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateTenantSettings, claimSubdomain } from "@/app/actions/tenant";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function UndanganEditor({ tenant }: { tenant: any }) {
  const router = useRouter();
  const isDraft = !tenant.id;
  const defaultData = tenant.template_data || { theme_id: "modern-romance" };
  
  const [data, setData] = useState(defaultData);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("mempelai");
  
  // State for Publish Dialog
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const [newSubdomain, setNewSubdomain] = useState("");

  const handleChange = (field: string, value: string) => {
    setData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (isDraft) {
      setPublishDialogOpen(true);
      return;
    }

    setIsSaving(true);
    const formData = new FormData();
    formData.set("tenant_id", tenant.id);
    formData.set("category", "undangan");
    formData.set("template_data", JSON.stringify(data));

    try {
      const result = await updateTenantSettings(formData);
      if (result?.success) {
        toast.success("Perubahan template berhasil disimpan!");
      } else {
        toast.error(result?.error || "Gagal menyimpan perubahan.");
      }
    } catch (e) {
      toast.error("Terjadi kesalahan sistem.");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubdomain || newSubdomain.length < 3) {
      toast.error("Subdomain minimal 3 karakter.");
      return;
    }

    setIsSaving(true);
    const formData = new FormData();
    formData.set("subdomain", newSubdomain);
    formData.set("category", "undangan");
    formData.set("template_data", JSON.stringify(data));

    try {
      const result = await claimSubdomain(formData);
      if (!result?.success) {
        toast.error(result?.error || "Gagal mempublikasikan undangan.");
        setIsSaving(false);
        return;
      }

      if (result.data?.id) {
        toast.success("Undangan berhasil dipublikasikan!");
        setPublishDialogOpen(false);
        // Redirect to edit mode for the new tenant
        router.push(`/dashboard/undangan/${result.data.id}/edit`);
      } else {
        toast.error("Gagal mempublikasikan undangan: ID tidak ditemukan.");
        setIsSaving(false);
      }
    } catch (e) {
      toast.error("Terjadi kesalahan sistem.");
      setIsSaving(false);
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:h-[calc(100vh-2rem)] lg:overflow-hidden rounded-xl border bg-background shadow-lg">
        
        {/* KIRI: Editor Form */}
        <div className="w-full lg:w-1/2 flex flex-col lg:h-full border-b lg:border-b-0 lg:border-r bg-muted/10">
          <div className="flex flex-wrap items-center justify-between p-4 border-b bg-background gap-4">
            <Button asChild variant="ghost" size="sm" className="w-full sm:w-auto">
              <Link href={isDraft ? "/dashboard/undangan/templates" : "/dashboard/subdomains"}>
                <ArrowLeft className="w-4 h-4 mr-2" /> Kembali
              </Link>
            </Button>
            <div className="font-semibold text-sm w-full sm:w-auto text-center sm:text-left order-first sm:order-none">
              {isDraft ? "Draft Undangan" : `Editor: ${tenant.subdomain}.upshare.id`}
            </div>
            <div className="flex flex-1 sm:flex-none items-center gap-2 justify-end w-full sm:w-auto">
              {!isDraft && (
                <Button asChild variant="outline" size="sm" className="hidden xl:flex">
                  <Link href={`/dashboard/undangan/${tenant.id}/rsvp`}>
                    <Users className="w-4 h-4 mr-2" /> RSVP & Buku Tamu
                  </Link>
                </Button>
              )}
              <Button 
                size="sm" 
                onClick={handleSave} 
                disabled={isSaving} 
                className={isDraft ? "flex-1 sm:flex-none bg-primary hover:bg-primary/90 text-primary-foreground" : "flex-1 sm:flex-none bg-rose-600 hover:bg-rose-700 text-white"}
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : isDraft ? (
                  <Rocket className="w-4 h-4 mr-2" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                {isDraft ? "Publikasikan" : "Simpan"}
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-6 h-auto sm:h-10 gap-2 sm:gap-0">
                <TabsTrigger value="tema">Tema</TabsTrigger>
                <TabsTrigger value="mempelai">Mempelai</TabsTrigger>
                <TabsTrigger value="acara">Acara</TabsTrigger>
                <TabsTrigger value="fitur">Fitur</TabsTrigger>
              </TabsList>

              <TabsContent value="tema" className="space-y-4">
                 <div className="space-y-2">
                  <Label>Pilih Tema</Label>
                  <select 
                    className="w-full border rounded-md p-2"
                    value={data.theme_id || "modern-romance"}
                    onChange={(e) => handleChange("theme_id", e.target.value)}
                  >
                    <option value="modern-romance">Modern Romance (Free Tier / Gratis)</option>
                    <option value="premium-wedding">Premium Wedding (Premium)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>URL Cover Image</Label>
                  <Input 
                    placeholder="https://..." 
                    value={data.cover_url || ""}
                    onChange={(e) => handleChange("cover_url", e.target.value)}
                  />
                </div>
              </TabsContent>

              <TabsContent value="mempelai" className="space-y-6">
                <div className="space-y-4 p-4 border rounded-xl bg-white">
                  <h3 className="font-bold border-b pb-2">Mempelai Pria</h3>
                  <div className="space-y-2">
                    <Label>Nama Panggilan</Label>
                    <Input value={data.nama_pria || ""} onChange={(e) => handleChange("nama_pria", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Nama Lengkap</Label>
                    <Input value={data.nama_lengkap_pria || ""} onChange={(e) => handleChange("nama_lengkap_pria", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Nama Orang Tua</Label>
                    <Input value={data.ortu_pria || ""} placeholder="Putra dari Bpk X & Ibu Y" onChange={(e) => handleChange("ortu_pria", e.target.value)} />
                  </div>
                </div>

                <div className="space-y-4 p-4 border rounded-xl bg-white">
                  <h3 className="font-bold border-b pb-2">Mempelai Wanita</h3>
                  <div className="space-y-2">
                    <Label>Nama Panggilan</Label>
                    <Input value={data.nama_wanita || ""} onChange={(e) => handleChange("nama_wanita", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Nama Lengkap</Label>
                    <Input value={data.nama_lengkap_wanita || ""} onChange={(e) => handleChange("nama_lengkap_wanita", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Nama Orang Tua</Label>
                    <Input value={data.ortu_wanita || ""} placeholder="Putri dari Bpk X & Ibu Y" onChange={(e) => handleChange("ortu_wanita", e.target.value)} />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="acara" className="space-y-6">
                 <div className="space-y-4 p-4 border rounded-xl bg-white">
                  <h3 className="font-bold border-b pb-2">Akad Nikah</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Tanggal</Label>
                      <Input type="date" value={data.tanggal_akad || ""} onChange={(e) => handleChange("tanggal_akad", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Waktu (Jam)</Label>
                      <Input placeholder="08:00 - Selesai" value={data.waktu_akad || ""} onChange={(e) => handleChange("waktu_akad", e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Lokasi / Gedung</Label>
                    <Input value={data.lokasi_akad || ""} onChange={(e) => handleChange("lokasi_akad", e.target.value)} />
                  </div>
                </div>

                <div className="space-y-4 p-4 border rounded-xl bg-white">
                  <h3 className="font-bold border-b pb-2">Resepsi</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Tanggal</Label>
                      <Input type="date" value={data.tanggal_acara || ""} onChange={(e) => handleChange("tanggal_acara", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Waktu (Jam)</Label>
                      <Input placeholder="11:00 - Selesai" value={data.waktu_acara || ""} onChange={(e) => handleChange("waktu_acara", e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Lokasi / Gedung</Label>
                    <Input value={data.lokasi_acara || ""} onChange={(e) => handleChange("lokasi_acara", e.target.value)} />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="fitur" className="space-y-6">
                <div className="space-y-4 p-4 border rounded-xl bg-white">
                  <h3 className="font-bold border-b pb-2">Kutipan / Ayat Suci</h3>
                  <div className="space-y-2">
                    <Label>Isi Kutipan</Label>
                    <Textarea value={data.kutipan || ""} onChange={(e) => handleChange("kutipan", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Sumber</Label>
                    <Input placeholder="Ar-Rum: 21" value={data.sumber_kutipan || ""} onChange={(e) => handleChange("sumber_kutipan", e.target.value)} />
                  </div>
                </div>

                <div className="space-y-4 p-4 border rounded-xl bg-white">
                  <h3 className="font-bold border-b pb-2">Amplop Digital (Rekening)</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Nama Bank</Label>
                      <Input placeholder="BCA" value={data.bank_name || ""} onChange={(e) => handleChange("bank_name", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Nomor Rekening</Label>
                      <Input placeholder="123456789" value={data.rekening_no || ""} onChange={(e) => handleChange("rekening_no", e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Atas Nama</Label>
                    <Input value={data.rekening_nama || ""} onChange={(e) => handleChange("rekening_nama", e.target.value)} />
                  </div>
                </div>
              </TabsContent>

            </Tabs>
          </div>
        </div>

        {/* KANAN: Live Preview */}
        <div className="w-full lg:w-1/2 bg-slate-900 flex flex-col items-center justify-center p-4 sm:p-8 relative min-h-[600px] lg:min-h-0 lg:h-full">
          <div className="absolute top-4 left-4 flex items-center gap-2 text-white/50 text-sm font-medium z-10">
            <Smartphone className="w-4 h-4" /> Live Preview
          </div>
          
          {/* Mockup HP */}
          <div className="w-[375px] h-[812px] bg-white rounded-[3rem] border-[8px] border-slate-800 shadow-2xl overflow-hidden relative scale-[0.85] origin-center">
            {/* Notch Pura-pura */}
            <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-50">
               <div className="w-32 h-6 bg-slate-800 rounded-b-3xl"></div>
            </div>
            
            <div className="w-full h-full overflow-y-auto overflow-x-hidden relative no-scrollbar">
              <TemplateRenderer data={data} subdomain={tenant.subdomain} activeTab={activeTab} />
            </div>
          </div>
        </div>

      </div>

      {/* Dialog Publikasi untuk Draft Baru */}
      <Dialog open={publishDialogOpen} onOpenChange={setPublishDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Publikasikan Undangan</DialogTitle>
            <DialogDescription>
              Tentukan link subdomain yang akan digunakan untuk menyebarkan undangan ini.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePublish} className="space-y-6 pt-4">
            <div className="space-y-3">
              <Label htmlFor="subdomain" className="text-base font-semibold">Link Undangan Anda</Label>
              <div className="flex items-center">
                <Input 
                  id="subdomain" 
                  placeholder="romeo-juliet" 
                  value={newSubdomain}
                  onChange={(e) => setNewSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  className="rounded-r-none text-right focus-visible:ring-0 focus-visible:ring-offset-0 border-r-0 text-lg h-12"
                  maxLength={30}
                  required
                />
                <div className="bg-muted border border-l-0 px-4 rounded-r-md text-muted-foreground h-12 flex items-center font-medium">
                  .upshare.id
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full h-12 text-lg gradient-brand text-white" disabled={isSaving || newSubdomain.length < 3}>
              {isSaving ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Rocket className="mr-2 h-5 w-5" />}
              Klaim & Publikasikan
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
