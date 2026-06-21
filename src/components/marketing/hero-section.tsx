"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/hooks/use-user";

const highlights = [
  "Subdomain kustom premium",
  "Setup dalam 2 menit",
  "Arahkan ke Netlify & Vercel",
];

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const { user, loading } = useUser();

  useEffect(() => {
    setMounted(true);
  }, []);

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
            Platform Subdomain Proxy #1 di Indonesia
          </Badge>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground leading-[1.2] sm:leading-[1.1] mb-4 sm:mb-6">
            Pusatkan Project Anda di{" "}
            <span className="text-gradient-brand">Satu Subdomain</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mb-8 sm:mb-10 leading-relaxed px-2 sm:px-0">
            Klaim subdomain kustom premium di{" "}
            <span className="font-semibold text-foreground">upshare.id</span>{" "}
            dan arahkan secara instan ke website Anda yang di-hosting di Netlify, Vercel, atau Github Pages.
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
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center w-full sm:w-auto gap-3 sm:gap-4">
            {!mounted || loading ? (
              <div className="w-full sm:w-48 h-12 bg-muted/30 animate-pulse rounded-lg" />
            ) : user ? (
              <Button
                size="lg"
                className="gradient-brand w-full sm:w-auto text-white border-0 shadow-lg hover:opacity-90 hover:scale-[1.02] sm:hover:scale-105 transition-all duration-200 px-8 text-base h-12"
                asChild
              >
                <Link href="/dashboard">
                  Ke Dashboard
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            ) : (
              <Button
                size="lg"
                className="gradient-brand w-full sm:w-auto text-white border-0 shadow-lg hover:opacity-90 hover:scale-[1.02] sm:hover:scale-105 transition-all duration-200 px-8 text-base h-12"
                asChild
              >
                <Link href="/register">
                  Klaim Subdomain Sekarang
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            )}
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-border/60 hover:bg-accent px-8 text-base h-12"
              asChild
            >
              <Link href="#features">Pelajari Lebih Lanjut</Link>
            </Button>
          </div>

          {/* Social Proof */}
          <p className="mt-10 text-sm text-muted-foreground">
            Dipercaya oleh{" "}
            <span className="font-semibold text-foreground">5.000+</span>{" "}
            developer aktif di seluruh Indonesia
          </p>
        </div>

        {/* Hero Visual - Mock UI */}
        <div className="mt-12 sm:mt-16 max-w-4xl mx-auto w-full">
          <div className="glass rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden border border-border/50">
            {/* Browser Bar */}
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-muted/50 border-b border-border/50">
              <div className="flex gap-1.5">
                <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-red-400" />
                <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-yellow-400" />
                <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 mx-2 sm:mx-4 overflow-hidden">
                <div className="bg-background rounded-md px-2 sm:px-3 py-1 text-[10px] sm:text-xs text-muted-foreground flex items-center justify-center gap-1 sm:gap-2 max-w-xs mx-auto truncate">
                  <span className="text-green-500 shrink-0">🔒</span>
                  <span className="truncate">cecep.upshare.id</span>
                </div>
              </div>
            </div>
            {/* Mock Content */}
            <div className="p-4 sm:p-8 bg-gradient-to-br from-background to-secondary/20 min-h-[180px] sm:min-h-[240px] flex items-center justify-center">
              <div className="text-center w-full">
                <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-4 bg-background p-4 sm:px-6 sm:py-3 rounded-2xl sm:rounded-full shadow-lg border border-border/50 max-w-full overflow-hidden">
                  <span className="text-foreground font-semibold truncate max-w-[200px] sm:max-w-none">cecep.upshare.id</span>
                  <ArrowRight className="text-primary w-5 h-5 rotate-90 sm:rotate-0" />
                  <span className="text-muted-foreground font-mono text-xs sm:text-sm truncate max-w-[200px] sm:max-w-none">cecep-project.netlify.app</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

