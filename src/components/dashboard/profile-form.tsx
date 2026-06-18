"use client";

import { useState, useRef } from "react";
import { updateProfile } from "@/app/actions/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Save } from "lucide-react";

interface ProfileFormProps {
  initialName: string;
  email: string;
}

export function ProfileForm({ initialName, email }: ProfileFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");
    setMessage("");

    const result = await updateProfile(formData);

    if (!result.success) {
      setError(result.error || "Gagal memperbarui profil.");
    } else {
      setMessage(result.message || "Profil berhasil diperbarui!");
      // Hapus pesan sukses setelah 5 detik agar tidak mengganggu
      setTimeout(() => setMessage(""), 5000);
    }
    
    setLoading(false);
  }

  return (
    <Card className="glass border-primary/20 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          Informasi Profil
        </CardTitle>
        <CardDescription>
          Perbarui nama lengkap dan tinjau alamat email akun Anda.
        </CardDescription>
      </CardHeader>
      <form ref={formRef} action={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground" htmlFor="email">
              Alamat Email (Read-only)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input
                id="email"
                type="email"
                value={email}
                readOnly
                className="pl-9 bg-muted/50 cursor-not-allowed text-muted-foreground"
              />
            </div>
            <p className="text-xs text-muted-foreground">Email digunakan sebagai identitas utama login dan tidak dapat diubah.</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground" htmlFor="full_name">
              Nama Lengkap
            </label>
            <Input
              id="full_name"
              name="full_name"
              defaultValue={initialName}
              placeholder="Masukkan nama lengkap Anda"
              minLength={2}
              maxLength={50}
              required
              className="focus-visible:ring-primary/30"
            />
          </div>

          {error && (
            <div className="p-3 bg-destructive/10 text-destructive text-sm font-medium rounded-lg border border-destructive/20 animate-in fade-in">
              {error}
            </div>
          )}
          
          {message && (
            <div className="p-3 bg-emerald-500/10 text-emerald-600 text-sm font-medium rounded-lg border border-emerald-500/20 animate-in fade-in">
              {message}
            </div>
          )}
        </CardContent>
        <CardFooter className="bg-muted/10 pt-6 border-t">
          <Button type="submit" disabled={loading} className="gradient-brand text-white shadow-md hover:scale-105 transition-all">
            {loading ? "Menyimpan..." : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Simpan Perubahan
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
