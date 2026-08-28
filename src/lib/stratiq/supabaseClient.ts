/**
 * Supabase Client & Storage Provider
 * 
 * Supports both Live Supabase Cloud backends and offline Guest Demo mode.
 */

export interface SupabaseConfig {
  url?: string;
  anonKey?: string;
  isLive: boolean;
}

export function getSupabaseConfig(): SupabaseConfig {
  const url = typeof import.meta !== 'undefined' ? import.meta.env?.VITE_SUPABASE_URL : undefined;
  const anonKey = typeof import.meta !== 'undefined' ? import.meta.env?.VITE_SUPABASE_ANON_KEY : undefined;

  return {
    url,
    anonKey,
    isLive: Boolean(url && anonKey),
  };
}

/**
 * Storage simulation / upload helper
 */
export async function uploadGameplayVideo(file: File | Blob, filename: string): Promise<{ storagePath: string; publicUrl?: string }> {
  const config = getSupabaseConfig();
  if (config.isLive) {
    // If Supabase is live, would upload to 'gameplay-videos' private bucket
    return {
      storagePath: `gameplay-videos/${Date.now()}_${filename}`,
    };
  }

  // Demo fallback: local object URL
  return {
    storagePath: `demo-local-storage/${filename}`,
    publicUrl: typeof URL !== 'undefined' ? URL.createObjectURL(file) : undefined,
  };
}
