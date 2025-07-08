import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';

export async function createClient() {
  const cookieStore = await cookies();
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );
}

export async function getCurrentUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function getCurrentUserWithProfile() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return { user: null, profile: null };
  
  let { data: profile, error } = await supabase
  .from('users')
  .select('*')
  .eq('auth_user_id', user.id)
  .single();

// If profile doesn't exist, create it
if (!profile) {
  const { data: insertData, error: insertError } = await supabase
    .from('users')
    .insert([
      {
        auth_user_id: user.id,
        email: user.email,
        full_name: user.user_metadata?.full_name || '',
        role: 'learner',
      },
    ])
    .select()
    .single();

  if (insertError) {
    console.error('Failed to insert profile:', insertError.message);
    return { user, profile: null };
  }

  profile = insertData;
}

    
  return { user, profile };
}

export function createClientForRouteHandler(request: NextRequest) {
    return createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          // Route handlers can't set cookies directly here
          set() {},
          remove() {},
        },
      }
    );
  }