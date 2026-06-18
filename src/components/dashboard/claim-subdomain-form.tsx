"use client";

import { useRef, useState } from "react";
import { claimSubdomain } from "@/app/actions/tenant";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe } from "lucide-react";

export function ClaimSubdomainForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");

    const result = await claimSubdomain(formData);

    if (result.error) {
      setError(result.error);
    }
    
    // Jika berhasil, halaman akan direfresh otomatis oleh server action (revalidatePath)
    setLoading(false);
  }

  return (
    <Card className="border-primary/20 max-w-2xl">
      <CardHeader>
        <CardTitle>Klaim Subdomain Anda</CardTitle>
        <CardDescription>
          Pilih nama subdomain yang unik untuk project Anda. Nama ini tidak bisa diubah nanti.
        </CardDescription>
      </CardHeader>
      <form ref={formRef} action={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                name="subdomain"
                placeholder="nama-project-anda"
                className="pl-9 bg-background font-mono text-sm"
                pattern="^[a-z0-9-]+$"
                title="Hanya huruf kecil, angka, dan tanda hubung (-)"
                minLength={3}
                maxLength={30}
                required
              />
            </div>
            <div className="px-4 py-2 bg-muted/50 border rounded-md font-mono text-sm text-muted-foreground whitespace-nowrap">
              .upshare.id
            </div>
          </div>
          
          {error && <p className="text-sm font-medium text-destructive">{error}</p>}
        </CardContent>
        <CardFooter className="bg-muted/30 pt-6">
          <Button type="submit" disabled={loading} className="w-full sm:w-auto">
            {loading ? "Mengklaim..." : "Klaim Subdomain"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
