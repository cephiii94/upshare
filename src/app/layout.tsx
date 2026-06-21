import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Upshare — Platform Berbagi File Profesional",
    template: "%s | Upshare",
  },
  description:
    "Upshare adalah platform berbagi file SaaS modern dengan subdomain kustom, manajemen konten, dan integrasi pembayaran mudah.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://upshare.id"
  ),
  openGraph: {
    title: "Upshare — Platform Berbagi File Profesional",
    description:
      "Buat subdomain kustom Anda dan mulai berbagi file secara profesional bersama Upshare.",
    url: "https://upshare.id",
    siteName: "Upshare",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Upshare — Platform Berbagi File Profesional",
    description:
      "Buat subdomain kustom Anda dan mulai berbagi file secara profesional bersama Upshare.",
  },
};

import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
