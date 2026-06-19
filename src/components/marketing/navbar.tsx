"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/use-user";

const navLinks = [
  { label: "Fitur", href: "#features" },
  { label: "Harga", href: "#pricing" },
  { label: "Tentang", href: "#about" },
];

export function MarketingNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user, loading } = useUser();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg group-hover:scale-105 transition-transform duration-200 overflow-hidden">
              <Image src="/logo-v2.png" alt="Upshare Logo" width={32} height={32} className="w-full h-full object-cover" />
            </div>
            <span className="text-xl font-bold text-foreground">
              Up<span className="text-gradient-brand">share</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <div className="relative group">
              <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent transition-all duration-200 flex items-center gap-1">
                Produk
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70"><path d="m6 9 6 6 6-6"/></svg>
              </button>
              <div className="absolute top-full left-0 mt-0 w-48 bg-background border border-border/50 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                <Link href="/" className="block px-4 py-2.5 text-sm hover:bg-accent text-foreground font-medium">Upshare Proxy</Link>
                <Link href="/undangan-premium" className="block px-4 py-2.5 text-sm hover:bg-rose-50 dark:hover:bg-rose-950/30 text-rose-600 font-medium">Upshare Undangan</Link>
              </div>
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {!mounted || loading ? (
              <div className="w-32 h-9 bg-muted/30 animate-pulse rounded-lg" />
            ) : user ? (
              <Button size="sm" className="gradient-brand text-white border-0 shadow-md hover:opacity-90 hover:scale-105 transition-all duration-200" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">Masuk</Link>
                </Button>
                <Button size="sm" className="gradient-brand text-white border-0 shadow-md hover:opacity-90 hover:scale-105 transition-all duration-200" asChild>
                  <Link href="/register">Mulai Gratis</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-border/50 py-4 space-y-1">
            <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Produk</div>
            <Link
              href="/"
              className="block px-4 py-2.5 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-all"
              onClick={() => setIsOpen(false)}
            >
              Upshare Proxy
            </Link>
            <Link
              href="/undangan-premium"
              className="block px-4 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-all"
              onClick={() => setIsOpen(false)}
            >
              Upshare Undangan
            </Link>
            <div className="px-4 py-2 mt-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Lainnya</div>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-all"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 flex flex-col gap-2 px-1">
              {!mounted || loading ? (
                <div className="w-full h-9 bg-muted/30 animate-pulse rounded-lg" />
              ) : user ? (
                <Button className="gradient-brand text-white border-0 w-full" asChild>
                  <Link href="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
                </Button>
              ) : (
                <>
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/login" onClick={() => setIsOpen(false)}>Masuk</Link>
                  </Button>
                  <Button className="gradient-brand text-white border-0 w-full" asChild>
                    <Link href="/register" onClick={() => setIsOpen(false)}>Mulai Gratis</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
