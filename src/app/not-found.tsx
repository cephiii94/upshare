import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-center px-4">
      <div className="space-y-6 max-w-md">
        <div className="space-y-2">
          <h1 className="text-8xl font-bold tracking-tighter text-muted-foreground">
            404
          </h1>
          <h2 className="text-2xl font-semibold tracking-tight">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-muted-foreground">
            Subdomain atau halaman yang Anda cari tidak tersedia, belum aktif,
            atau telah dihapus.
          </p>
        </div>
        <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
          <Button asChild>
            <Link href={process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}>
              Kembali ke Beranda
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
