"use client";

import { useRef, useState } from "react";
import { updateTargetUrl } from "@/app/actions/tenant";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LinkIcon, ArrowRight } from "lucide-react";

interface TargetUrlFormProps {
  initialUrl: string;
  subdomain: string;
}

export function TargetUrlForm({ initialUrl, subdomain }: TargetUrlFormProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setMessage("");
    setError("");

    const result = await updateTargetUrl(formData);

    if (result.error) {
      setError(result.error);
    } else if (result.success) {
      setMessage(result.message || "Berhasil disimpan.");
    }

    setLoading(false);
  }

  return (
    <Card className="border-primary/20 max-w-2xl">
      <CardHeader>
        <CardTitle>Target URL (Proxy)</CardTitle>
        <CardDescription>
          Masukkan URL dari platform hosting Anda (seperti Netlify, Vercel, Github Pages, dll). Pengunjung subdomain Anda akan otomatis diteruskan ke URL ini.
        </CardDescription>
      </CardHeader>
      <form ref={formRef} action={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 bg-muted/50 p-4 rounded-lg border">
            <a 
              href={`https://${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN || "upshare.id"}`}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-primary hover:underline truncate max-w-[200px]"
            >
              {subdomain}.{process.env.NEXT_PUBLIC_ROOT_DOMAIN || "upshare.id"}
            </a>
            <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            <div className="flex-1">
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  name="target_url"
                  placeholder="https://my-project.netlify.app"
                  defaultValue={initialUrl}
                  className="pl-9 bg-background"
                  required
                />
              </div>
            </div>
          </div>
          
          {error && <p className="text-sm font-medium text-destructive">{error}</p>}
          {message && <p className="text-sm font-medium text-green-600 dark:text-green-400">{message}</p>}
        </CardContent>
        <CardFooter className="bg-muted/30 pt-6">
          <Button type="submit" disabled={loading} className="w-full sm:w-auto">
            {loading ? "Menyimpan..." : "Simpan Pengaturan"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
