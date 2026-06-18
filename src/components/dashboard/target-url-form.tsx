"use client";

import { useRef, useState } from "react";
import { updateTargetUrl, deleteSubdomain } from "@/app/actions/tenant";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LinkIcon, ArrowRight, Globe, Activity, CheckCircle2, AlertTriangle } from "lucide-react";

interface TargetUrlFormProps {
  initialUrl: string;
  subdomain: string;
}

export function TargetUrlForm({ initialUrl, subdomain }: TargetUrlFormProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  // Deletion state
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setMessage("");
    setError("");

    const result = await updateTargetUrl(formData);

    if (!result.success) {
      setError(result.error);
    } else {
      setMessage(result.message || "Berhasil disimpan.");
      setTimeout(() => setMessage(""), 5000); // Clear success message after 5 seconds
    }

    setLoading(false);
  }

  const handleDelete = async () => {
    if (confirmText !== "HAPUS") return;
    setDeleteLoading(true);
    setError("");
    const result = await deleteSubdomain();
    if (!result.success) {
      setError(result.error);
      setDeleteLoading(false);
    }
  };

  const fullDomain = `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN || "upshare.id"}`;

  return (
    <div className="space-y-8">
      {/* Configuration Card */}
      <Card className="glass border-primary/20 shadow-lg max-w-4xl overflow-hidden relative">
        <div className="h-1.5 w-full gradient-brand" />
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl flex items-center gap-2">
            <Activity className="h-6 w-6 text-primary" />
            Target URL (Proxy Destination)
          </CardTitle>
          <CardDescription className="text-base mt-2">
            Tentukan URL target ke mana pengunjung subdomain <strong>{fullDomain}</strong> akan diteruskan secara otomatis di *background*.
          </CardDescription>
        </CardHeader>
        <form ref={formRef} action={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="bg-muted/30 border border-border/50 rounded-xl p-6 shadow-sm relative overflow-hidden">
              {/* Connecting line decorative bg */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -z-10 hidden md:block" />
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 z-10">
                
                {/* Source Node */}
                <div className="flex-1 w-full bg-background border shadow-sm rounded-lg p-4 relative">
                  <span className="absolute -top-3 left-4 px-2 bg-background text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                    <Globe className="h-3 w-3" />
                    URL Publik Anda
                  </span>
                  <a 
                    href={`https://${fullDomain}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-sm sm:text-base font-semibold text-primary hover:underline flex items-center gap-2 truncate mt-1"
                  >
                    <Globe className="h-4 w-4 shrink-0" />
                    {fullDomain}
                  </a>
                </div>

                {/* Arrow Connector */}
                <div className="flex flex-col items-center justify-center shrink-0 bg-background md:bg-transparent px-2 py-1 md:p-0 rounded-full">
                  <div className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full mb-1 hidden md:block shadow-sm border border-primary/20">
                    PROXY ROUTE
                  </div>
                  <ArrowRight className="h-6 w-6 text-muted-foreground md:text-primary rotate-90 md:rotate-0" />
                </div>

                {/* Target Node (Input) */}
                <div className="flex-1 w-full bg-background border-2 border-primary/20 focus-within:border-primary shadow-sm rounded-lg p-4 relative transition-colors">
                  <span className="absolute -top-3 left-4 px-2 bg-background text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                    <Activity className="h-3 w-3" />
                    URL Target Hosting (Private)
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <LinkIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                    <Input
                      name="target_url"
                      placeholder="https://my-project.netlify.app"
                      defaultValue={initialUrl}
                      className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-0 h-auto font-mono text-sm sm:text-base bg-transparent"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              {error && (
                <div className="p-3 bg-destructive/10 text-destructive text-sm font-medium rounded-lg border border-destructive/20 animate-in fade-in zoom-in-95">
                  {error}
                </div>
              )}
              {message && (
                <div className="p-3 bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-medium rounded-lg border border-green-500/20 animate-in fade-in zoom-in-95 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  {message}
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="bg-muted/10 pt-6 border-t flex flex-col sm:flex-row gap-3">
            <Button type="submit" disabled={loading} size="lg" className="w-full sm:w-auto gradient-brand text-white shadow-md hover:scale-105 transition-all">
              {loading ? "Menyimpan Perubahan..." : "Simpan Konfigurasi"}
            </Button>
            <p className="text-xs text-muted-foreground sm:ml-auto flex-1 sm:text-right max-w-xs">
              Perubahan biasanya akan langsung aktif, namun DNS global mungkin membutuhkan waktu beberapa menit untuk merespons.
            </p>
          </CardFooter>
        </form>
      </Card>

      {/* Danger Zone Card */}
      <Card className="border-destructive/30 shadow-sm max-w-4xl overflow-hidden relative bg-destructive/5">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Zona Berbahaya (Danger Zone)
          </CardTitle>
          <CardDescription>
            Hapus subdomain Anda jika Anda ingin mengganti nama atau mengakhiri project ini.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!showConfirm ? (
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <p className="text-sm text-muted-foreground max-w-lg">
                Tindakan ini bersifat permanen. Subdomain yang sudah dihapus tidak akan dapat digunakan oleh Anda maupun orang lain selama masa tunggu beberapa hari.
              </p>
              <Button variant="destructive" onClick={() => setShowConfirm(true)} className="shrink-0 shadow-sm hover:shadow-md transition-shadow">
                Hapus Subdomain
              </Button>
            </div>
          ) : (
            <div className="space-y-4 bg-background p-5 rounded-lg border border-destructive/30 animate-in fade-in slide-in-from-top-2 shadow-inner">
              <div className="flex gap-3 text-destructive bg-destructive/10 p-3 rounded-md">
                <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
                <p className="text-sm font-medium">
                  Peringatan: Anda akan menghapus subdomain <strong className="font-mono">{fullDomain}</strong>. Subdomain ini tidak akan bisa diklaim ulang selama beberapa hari ke depan.
                </p>
              </div>
              <div className="space-y-2 mt-4">
                <label className="text-sm font-semibold text-foreground">
                  Ketik <strong className="text-destructive font-mono select-none">HAPUS</strong> untuk mengonfirmasi:
                </label>
                <Input 
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder="HAPUS"
                  className="max-w-xs font-mono bg-muted/50 focus-visible:ring-destructive"
                />
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-4">
                <Button 
                  variant="destructive" 
                  disabled={confirmText !== "HAPUS" || deleteLoading}
                  onClick={handleDelete}
                  className="shadow-md"
                >
                  {deleteLoading ? "Menghapus..." : "Ya, Hapus Permanen"}
                </Button>
                <Button variant="ghost" onClick={() => { setShowConfirm(false); setConfirmText(""); }} disabled={deleteLoading}>
                  Batal
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
