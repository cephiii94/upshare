import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Left Panel — Decorative */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero relative overflow-hidden flex-col justify-between p-12">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group relative w-fit">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl shadow-lg group-hover:scale-105 transition-transform overflow-hidden">
            <Image src="/logo.png" alt="Upshare Logo" width={36} height={36} className="w-full h-full object-cover" />
          </div>
          <span className="text-2xl font-bold text-foreground">
            Up<span className="text-gradient-brand">share</span>
          </span>
        </Link>

        {/* Testimonial */}
        <div className="relative">
          <div className="glass rounded-2xl p-6 shadow-xl">
            <p className="text-foreground text-lg leading-relaxed mb-4">
              &quot;Upshare mengubah cara saya berbagi portofolio. Sekarang klien
              bisa langsung akses semua file saya di satu tempat yang
              profesional.&quot;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full gradient-brand flex items-center justify-center text-white font-bold text-sm">
                A
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">
                  Ahmad Firmansyah
                </p>
                <p className="text-muted-foreground text-xs">
                  UI/UX Designer · ahmaddev.upshare.id
                </p>
              </div>
            </div>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {[
              { label: "Pengguna Aktif", value: "5K+" },
              { label: "File Dibagikan", value: "250K+" },
              { label: "Uptime", value: "99.9%" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass rounded-xl p-4 text-center"
              >
                <p className="text-xl font-bold text-gradient-brand">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 lg:px-12 bg-background">
        {/* Mobile Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group mb-10 lg:hidden"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg shadow-md overflow-hidden">
            <Image src="/logo.png" alt="Upshare Logo" width={32} height={32} className="w-full h-full object-cover" />
          </div>
          <span className="text-xl font-bold text-foreground">
            Up<span className="text-gradient-brand">share</span>
          </span>
        </Link>

        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              {title}
            </h1>
            <p className="text-muted-foreground mt-2">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
