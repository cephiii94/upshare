export type ActionState<T = any> = 
  | { success: true; data?: T; message?: string }
  | { success: false; error: string };

/**
 * Membungkus Server Action untuk menangkap error mentah yang tidak terduga
 * dan memastikan format kembalian selalu standar: { success, data?, error?, message? }
 */
export function safeAction<TArgs extends any[], TReturn>(
  handler: (...args: TArgs) => Promise<ActionState<TReturn>>
): (...args: TArgs) => Promise<ActionState<TReturn>> {
  return async (...args: TArgs) => {
    try {
      return await handler(...args);
    } catch (error: any) {
      // Mengamankan internal error Next.js (seperti redirect dan notFound) 
      // agar tidak ditangkap sebagai error biasa dan tetap berfungsi
      const isRedirect = 
        error?.message === 'NEXT_REDIRECT' || 
        (error && typeof error === 'object' && 'digest' in error && typeof error.digest === 'string' && error.digest.startsWith('NEXT_REDIRECT'));
        
      if (isRedirect) {
        throw error; // Biarkan Next.js memproses redirect-nya
      }

      // Log error mentah (misal: kebocoran query database, sintaks salah) ke console server
      console.error("SafeAction caught an unhandled error:", error);
      
      // Kembalikan error yang ramah pengguna ke klien (tanpa membocorkan detail server)
      return { 
        success: false, 
        error: "Terjadi kesalahan internal server. Tim kami telah mencatatnya, silakan coba lagi nanti." 
      };
    }
  };
}
