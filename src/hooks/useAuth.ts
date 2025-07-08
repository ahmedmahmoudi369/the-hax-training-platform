'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { User, Session } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';
import { UserProfile } from '@/types/database.types';

export function useAuth(requiredRole?: 'learner' | 'admin') {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Fetch user profile from the database
  const fetchUserProfile = useCallback(async (userId: string) => {
    try {
      const { data, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('auth_user_id', userId)
        .single();

      if (profileError) throw profileError;
      return data;
    } catch (err) {
      console.error('Error fetching user profile:', err);
      return null;
    }
  }, [supabase]);

  // Handle auth state changes
  useEffect(() => {
    // Get the current user session
    const getSession = async () => {
      setLoading(true);
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          const userProfile = await fetchUserProfile(session.user.id);
          setProfile(userProfile);
        } else {
          setProfile(null);
        }

        // Redirect based on authentication status and required role
        if (requiredRole) {
          if (!session) {
            // Not logged in - redirect to login with return URL
            router.push(`/login?redirectTo=${encodeURIComponent(pathname)}`);
          } else if (profile?.role !== requiredRole) {
            // Logged in but wrong role - redirect to unauthorized
            router.push('/unauthorized');
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Auth error:', err);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        const userProfile = await fetchUserProfile(session.user.id);
        setProfile(userProfile);
      } else {
        setProfile(null);
      }

      // Handle specific auth events
      if (event === 'SIGNED_IN') {
        const redirectTo = searchParams.get('redirectTo');
        if (redirectTo) {
          router.push(redirectTo);
        } else if (requiredRole && profile?.role !== requiredRole) {
          router.push('/unauthorized');
        }
      } else if (event === 'SIGNED_OUT') {
        router.push('/login');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, pathname, searchParams, requiredRole, fetchUserProfile]);

  // Sign out function
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push('/login');
    } catch (err) {
      console.error('Error signing out:', err);
      setError('Failed to sign out');
    }
  };

  // Check if user has required role
  const hasRole = (role: string) => {
    return profile?.role === role;
  };

  return {
    user,
    session,
    profile,
    loading,
    error,
    signOut,
    hasRole,
    isAuthenticated: !!user,
    isAdmin: profile?.role === 'admin',
    isLearner: profile?.role === 'learner',
  };
}