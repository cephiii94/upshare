export const RESERVED_SUBDOMAINS = [
  // Sistem / Internal
  'admin', 'administrator', 'api', 'app', 'auth', 'beta',
  'billing', 'blog', 'cdn', 'dashboard', 'demo', 'dev',
  'docs', 'help', 'login', 'mail', 'payment', 'premium',
  'register', 'secure', 'settings', 'shop', 'staging',
  'support', 'test', 'www', 'upshare',
  
  // Mencegah Phishing / Penipuan
  'bank', 'bca', 'mandiri', 'bri', 'bni', 'bsi',
  'undian', 'promo', 'hadiah', 'cs', 'official', 
  'shopee', 'tokopedia', 'dana', 'ovo', 'gopay', 'paylater',
  
  // Kata kasar / tidak pantas
  'xxx', 'porn', 'sex', 'judi', 'slot', 'gacor'
];

export function isSubdomainReserved(subdomain: string): boolean {
  const lower = subdomain.toLowerCase();
  
  // 1. Cek kecocokan persis (Exact match)
  if (RESERVED_SUBDOMAINS.includes(lower)) return true;
  
  // 2. Cek per kata jika menggunakan tanda hubung (contoh: "admin-shopee")
  const parts = lower.split('-');
  if (parts.some(part => RESERVED_SUBDOMAINS.includes(part))) return true;
  
  // 3. Cek kata yang sangat dilarang untuk muncul di mana saja (Partial match)
  // Kata-kata ini akan diblokir meskipun berada di tengah kata lain
  const HIGH_RISK_PARTIALS = ['judi', 'slot', 'gacor', 'porn'];
  if (HIGH_RISK_PARTIALS.some(word => lower.includes(word))) return true;
  
  return false;
}

export function validateSubdomainFormat(subdomain: string): { isValid: boolean; message: string } {
  const lower = subdomain.toLowerCase();
  
  if (lower.length < 3) return { isValid: false, message: 'Minimal 3 karakter.' };
  if (lower.length > 30) return { isValid: false, message: 'Maksimal 30 karakter.' };
  
  const regex = /^[a-z0-9-]+$/;
  if (!regex.test(lower)) return { isValid: false, message: 'Hanya huruf kecil, angka, dan tanda hubung (-).' };
  
  if (isSubdomainReserved(lower)) {
    return { isValid: false, message: 'Nama subdomain ini dilarang atau tidak tersedia.' };
  }
  
  return { isValid: true, message: 'Tersedia' };
}
