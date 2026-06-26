import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Mengecek apakah kredensial ada dan bukan nilai default/placeholder
const hasRedisCredentials = 
  !!process.env.UPSTASH_REDIS_REST_URL && 
  !!process.env.UPSTASH_REDIS_REST_TOKEN &&
  !process.env.UPSTASH_REDIS_REST_URL.includes("[YOUR-REGION]");

// Membuat instance Redis jika kredensial tersedia
const redis = hasRedisCredentials 
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;

/**
 * Fallback limiter kosong jika Redis belum dikonfigurasi (misalnya saat di lokal/dev)
 * Ini memastikan aplikasi tetap bisa jalan meskipun .env.local belum diisi.
 */
const mockRatelimit = {
  limit: async (identifier: string) => ({ success: true, pending: Promise.resolve() })
} as any;

// Pelindung Login & Register: Maksimal 5 percobaan setiap 1 menit
export const authRateLimit = redis 
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "1 m"),
      analytics: true,
      prefix: "@upstash/ratelimit/auth",
    })
  : mockRatelimit;

// Pelindung Operasi Subdomain (Klaim, Hapus, dsb): Maksimal 5 percobaan setiap 10 menit
export const tenantRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "10 m"),
      analytics: true,
      prefix: "@upstash/ratelimit/tenant",
    })
  : mockRatelimit;
