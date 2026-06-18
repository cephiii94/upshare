"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const highlights = [
  "Subdomain kustom gratis",
  "Setup dalam 2 menit",
  "Tanpa batas upload",
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden gradient-hero py-20 sm:py-28 lg:py-36">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-accent/30 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-secondary/40 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Badge */}
          <Badge
            variant="secondary"
            className="mb-6 gap-1.5 px-4 py-1.5 text-sm font-medium border border-primary/20 bg-primary/10 text-primary hover:bg-primary/15 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Platform berbagi file #1 di Indonesia
          </Badge>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
            Bagikan File Anda{" "}
            <span className="text-gradient-brand">Secara Profesional</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed">
            Buat subdomain kustom Anda sendiri di{" "}
            <span className="font-semibold text-foreground">upshare.id</span>{" "}
            dan mulai berbagi file, portofolio, atau konten digital dengan tampilan
            yang elegan dan profesional.
          </p>

          {/* Highlights */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10">
            {highlights.map((item) => (
              <div
                key={item}
                className="flex items-center gap-1.5 text-sm text-muted-foreground"
              >
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button
              size="lg"
              className="gradient-brand text-white border-0 shadow-lg hover:opacity-90 hover:scale-105 transition-all duration-200 px-8 text-base h-12"
              asChild
            >
              <Link href="/register">
                Mulai Gratis Sekarang
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border/60 hover:bg-accent px-8 text-base h-12"
              asChild
            >
              <Link href="#features">Pelajari Lebih Lanjut</Link>
            </Button>
          </div>

          {/* Social Proof */}
          <p className="mt-10 text-sm text-muted-foreground">
            Dipercaya oleh{" "}
            <span className="font-semibold text-foreground">5.000+</span>{" "}
            pengguna aktif di seluruh Indonesia
          </p>
        </div>

        {/* Hero Visual - Mock UI */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="glass rounded-2xl shadow-2xl overflow-hidden border border-border/50">
            {/* Browser Bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border/50">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-background rounded-md px-3 py-1 text-xs text-muted-foreground flex items-center gap-2 max-w-xs mx-auto">
                  <span className="w-3 h-3 text-green-500">🔒</span>
                  nama-anda.upshare.id
                </div>
              </div>
            </div>
            {/* Mock Content */}
            <div className="p-8 bg-gradient-to-br from-background to-secondary/20 min-h-[240px] flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl gradient-brand mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <span className="text-white text-2xl font-bold">A</span>
                </div>
                <h2 className="text-xl font-bold text-foreground mb-1">Ahmad Firmansyah</h2>
                <p className="text-sm text-muted-foreground mb-4">UI/UX Designer · ahmaddev.upshare.id</p>
                <div className="flex gap-3 justify-center flex-wrap">
                  {["Portofolio 2024.pdf", "CV Terbaru.pdf", "Design Kit.zip"].map((f) => (
                    <div key={f} className="flex items-center gap-2 bg-primary/10 text-primary text-xs px-3 py-1.5 rounded-full border border-primary/20">
                      <span>📄</span> {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
