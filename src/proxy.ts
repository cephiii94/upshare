import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

import { createClient } from "@supabase/supabase-js";

export async function proxy(req: NextRequest) {
  const url = req.nextUrl;

  // Get hostname of request (e.g. cecep.upshare.id, cecep.localhost:3000)
  let hostname = req.headers.get("host") || "";

  // Remove port if exists (for localhost:3000)
  hostname = hostname.split(":")[0];

  // Define the base domain
  const isLocalhost = hostname.endsWith("localhost");
  const baseDomain = isLocalhost
    ? "localhost"
    : (process.env.NEXT_PUBLIC_ROOT_DOMAIN || "upshare.id");

  // Extract the subdomain
  const subdomain = hostname.replace(new RegExp(`\\.?${baseDomain}$`), "");

  // Ignore default subdomains or no subdomain
  const reservedSubdomains = ["www", "app", "api", "admin"];

  if (
    subdomain &&
    subdomain !== "" &&
    !reservedSubdomains.includes(subdomain)
  ) {
    // 1. Fetch target_url from Supabase
    // Menggunakan Anon Key karena data ini bisa diakses publik sesuai RLS
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { data } = await supabase
        .from("tenants")
        .select("target_url, is_active")
        .eq("subdomain", subdomain)
        .single();

      // Jika tenant aktif dan memiliki target_url, lakukan Reverse Proxy ke eksternal
      if (data && data.is_active && data.target_url) {
        // Hapus trailing slash jika ada
        const cleanTarget = data.target_url.replace(/\/$/, "");
        
        // Buat URL proxy dengan menggabungkan target + pathname saat ini
        const proxyUrl = new URL(`${cleanTarget}${url.pathname}${url.search}`);
        return NextResponse.rewrite(proxyUrl);
      }
    }

    // Fallback: Rewrite ke internal /[subdomain]/path jika target_url tidak ada (Misal untuk halaman Not Found kustom)
    return NextResponse.rewrite(
      new URL(`/${subdomain}${url.pathname}${url.search}`, req.url)
    );
  }

  return NextResponse.next();
}
