import { createClient } from '@supabase/supabase-js';

// Retrieve Supabase environment variables safely across browser (Vite) and Node runtimes
const env = (typeof import.meta !== 'undefined' && import.meta.env)
  ? import.meta.env
  : (typeof process !== 'undefined' && process.env)
    ? (process.env as any)
    : {};

const supabaseUrl = env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes('your-project-id') &&
    !supabaseAnonKey.includes('your_publishable_key')
  );
};

if (!isSupabaseConfigured()) {
  console.warn(
    '⚠️ Supabase is not fully configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file to enable live database persistence.'
  );
}

// Fallback dummy URL so createClient does not throw on module initialization when .env is pending
const validUrl = supabaseUrl && supabaseUrl.startsWith('http')
  ? supabaseUrl
  : 'https://placeholder.supabase.co';

const validKey = supabaseAnonKey || 'placeholder-anon-key';

export const supabase = createClient(validUrl, validKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
