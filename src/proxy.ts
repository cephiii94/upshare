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

  const isLocalhost = hostname.endsWith("localhost");

  // Extract the subdomain
  let subdomain = "";
  if (isLocalhost) {
    subdomain = hostname.replace(/\.?localhost$/, "");
  } else if (hostname.endsWith(".vercel.app")) {
    subdomain = "";
  } else {
    const baseDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "upshare.id";
    subdomain = hostname.replace(new RegExp(`\\.?${baseDomain}$`), "");
  }

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
      const { data: rawData } = await supabase
        .rpc("get_tenant_with_details", { p_subdomain: subdomain })
        .single();
      const data = rawData as any;

      // Karena rpc get_tenant_with_details sudah memfilter is_active = true,
      // kita cukup cek target_url
      if (data && data.target_url) {
        // Gunakan URL API untuk memecah host dan path dari target_url
        const targetUrlObj = new URL(data.target_url);
        const targetHost = targetUrlObj.origin;
        // Hapus trailing slash jika ada, misal /hello-world/ jadi /hello-world
        // Jika root "/", jadinya string kosong ""
        const targetBasePath = targetUrlObj.pathname === "/" ? "" : targetUrlObj.pathname.replace(/\/$/, "");

        let proxyPath = url.pathname;
        
        // Cek jika path yang direquest sudah mengandung basePath dari target (mencegah duplikasi /hello-world/hello-world/...)
        // Ini sering terjadi jika web builder menggunakan tag <base href="...">
        const alreadyHasBasePath = targetBasePath !== "" && (proxyPath === targetBasePath || proxyPath.startsWith(targetBasePath + "/"));
        
        if (alreadyHasBasePath) {
          // Biarkan proxyPath apa adanya
        } else {
          // Gabungkan basePath dengan proxyPath
          if (proxyPath === "/") {
            proxyPath = targetBasePath;
          } else {
            proxyPath = targetBasePath + proxyPath;
          }
        }

        // Buat URL proxy final
        const proxyUrl = new URL(`${targetHost}${proxyPath}${url.search}`);
        

        
        // Cek paket langganan (anggap null/undefined sebagai free)
        // Admin selalu bebas watermark (dianggap premium)
        const isFree = !data.is_admin && (!data.plan || data.plan === 'free' || data.sub_status !== 'active');

        // Hanya intercept HTML jika paket Free dan metode GET
        if (isFree && req.method === 'GET') {
          try {
            // Lakukan fetch manual untuk mencegat response
            const res = await fetch(proxyUrl.toString(), {
              headers: {
                "User-Agent": req.headers.get("user-agent") || "",
              }
            });

            const contentType = res.headers.get("content-type");
            
            // Hanya modifikasi jika responsenya adalah HTML
            if (contentType && contentType.includes("text/html")) {
              let html = await res.text();

              // 1. Inject OpenGraph Image (Timpa sebelum </head>)
              const metaTags = `
                <meta property="og:image" content="https://upshare.id/logo.png" />
                <meta name="twitter:image" content="https://upshare.id/logo.png" />
              `;
              if (html.includes('</head>')) {
                html = html.replace('</head>', `${metaTags}</head>`);
              } else if (html.includes('</HEAD>')) {
                html = html.replace('</HEAD>', `${metaTags}</HEAD>`);
              }

              // 2. Inject Watermark sebelum </body>
              const category = data.category || 'universal';
              let watermarkText = "Powered by Upshare - buat disini";
              let watermarkLink = "https://upshare.id";

              if (category === 'undangan') {
                watermarkText = "Dibuat dengan Upshare - Buat Undanganmu Sekarang";
                watermarkLink = "https://upshare.id/undangan-premium";
              }

              const watermarkHtml = `
                <div style="position: fixed; bottom: 16px; right: 16px; background-color: rgba(255, 255, 255, 0.95); padding: 8px 14px; border-radius: 99px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 2147483647; font-family: system-ui, -apple-system, sans-serif; display: flex; align-items: center; gap: 8px; border: 1px solid #fce7f3; backdrop-filter: blur(8px);">
                  <span style="font-size: 14px;">⚡</span>
                  <a href="${watermarkLink}" target="_blank" style="text-decoration: none; color: #e11d48; font-weight: 600; font-size: 13px;">
                    ${watermarkText}
                  </a>
                </div>
              `;
              if (html.includes('</body>')) {
                html = html.replace('</body>', `${watermarkHtml}</body>`);
              } else if (html.includes('</BODY>')) {
                html = html.replace('</BODY>', `${watermarkHtml}</BODY>`);
              } else {
                // Fallback jika tidak ada tag body
                html += watermarkHtml;
              }

              // Buat NextResponse baru dengan HTML yang dimodifikasi
              const modifiedResponse = new NextResponse(html, {
                status: res.status,
                statusText: res.statusText,
              });

              // Salin headers penting dari response asli
              res.headers.forEach((value, key) => {
                const lowerKey = key.toLowerCase();
                // Hapus encoding & length karena body telah diubah
                if (lowerKey !== 'content-encoding' && lowerKey !== 'content-length' && lowerKey !== 'transfer-encoding') {
                  modifiedResponse.headers.set(key, value);
                }
              });

              return modifiedResponse;
            }
          } catch (error) {
            console.error("Error intercepting HTML:", error);
            // Fallback ke proxy normal jika terjadi error saat fetch/parsing
          }
        }

        // Jalur Eksekusi Cepat:
        // Jika Premium, atau request aset (bukan GET), atau fallback dari catch error
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
