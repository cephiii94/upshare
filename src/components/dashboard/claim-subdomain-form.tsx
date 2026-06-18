"use client";

import { useRef, useState } from "react";
import { claimSubdomain } from "@/app/actions/tenant";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, AlertTriangle, ArrowRight } from "lucide-react";

export function ClaimSubdomainForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");

    const result = await claimSubdomain(formData);

    if (!result.success) {
      setError(result.error);
    }
    
    // Jika berhasil, halaman akan direfresh otomatis oleh server action (revalidatePath)
    setLoading(false);
  }

  return (
    <Card className="glass border-primary/20 shadow-lg max-w-2xl overflow-hidden relative">
      <div className="h-1.5 w-full gradient-brand" />
      <CardHeader className="pb-6">
        <CardTitle className="text-2xl flex items-center gap-2">
          <Globe className="h-6 w-6 text-primary" />
          Klaim Subdomain Anda
        </CardTitle>
        <CardDescription className="text-base mt-2">
          Pilih nama subdomain yang unik untuk project Anda dan tampil lebih profesional.
        </CardDescription>
      </CardHeader>
      <form ref={formRef} action={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 flex gap-3 text-sm text-primary/80">
            <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p><strong>Penting:</strong> Nama subdomain yang sudah diklaim <strong>tidak dapat diubah atau diedit</strong>.</p>
              <p>Jika Anda menghapus subdomain, sistem membutuhkan jeda waktu (beberapa hari) sebelum nama tersebut bisa digunakan atau diklaim kembali oleh siapa pun.</p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground" htmlFor="subdomain">
              URL Subdomain Pilihan
            </label>
            <div className="flex items-center shadow-sm rounded-lg border focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all bg-background overflow-hidden">
              <div className="pl-4 pr-2 text-muted-foreground">
                <Globe className="w-5 h-5" />
              </div>
              <Input
                id="subdomain"
                name="subdomain"
                placeholder="nama-project-anda"
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-2 py-6 font-mono text-lg bg-transparent rounded-none"
                pattern="^[a-z0-9-]+$"
                title="Hanya huruf kecil, angka, dan tanda hubung (-)"
                minLength={3}
                maxLength={30}
                required
              />
              <div className="px-4 py-6 bg-muted/30 font-mono text-lg text-muted-foreground whitespace-nowrap border-l select-none">
                .upshare.id
              </div>
            </div>
          </div>
          
          {error && (
            <div className="p-3 bg-destructive/10 text-destructive text-sm font-medium rounded-lg border border-destructive/20 animate-in fade-in zoom-in-95">
              {error}
            </div>
          )}
        </CardContent>
        <CardFooter className="bg-muted/10 pt-6 border-t">
          <Button type="submit" disabled={loading} size="lg" className="w-full sm:w-auto gradient-brand text-white shadow-md hover:scale-105 transition-all">
            {loading ? "Mengklaim..." : (
              <>
                Klaim Subdomain Sekarang
                <ArrowRight className="ml-2 w-5 h-5" />
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
