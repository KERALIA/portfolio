import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { env } from './env';

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set. Check environment variables.');
}

/** Browser-safe client (anon key, RLS-protected). */
export function createBrowserSupabaseClient(): SupabaseClient {
  return createClient(env.supabaseUrl, env.supabaseAnonKey);
}

/** Server-only admin client (service role — never import in client components). */
export function createServerSupabaseClient(): SupabaseClient {
  return createClient(env.supabaseUrl, env.supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
