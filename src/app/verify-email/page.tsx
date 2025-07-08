'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<'checking' | 'pending' | 'verified' | 'error'>('checking');
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type');
  const emailParam = searchParams.get('email');
  const next = searchParams.get('next') || '/profile/setup';

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    async function checkVerification() {
      try {
        // If we have a token_hash in the URL, verify it
        if (token_hash && type === 'signup') {
            const { error: verifyError } = await supabase.auth.verifyOtp({
              token_hash,
              type: 'signup',
            });
          
            if (verifyError) throw verifyError;
          
            // Get user session after verification
            const { data: { user }, error: userError } = await supabase.auth.getUser();
            if (userError || !user) throw userError || new Error('User not found after verification');
          
            setEmail(user.email as string);
          
            // Create profile in DB
            const { error: insertError } = await supabase.from('users').insert([
              {
                auth_user_id: user.id,
                email: user.email as string,
                full_name: user.user_metadata?.full_name || '',
                role: 'learner',
              },
            ]);
            if (insertError) throw insertError;
          
            setStatus('verified');
            setTimeout(() => {
              router.push(next);
            }, 3000);
            return;
          }
          

        // If we have an email param, set it and show pending state
        if (emailParam) {
          setEmail(emailParam);
          setStatus('pending');
          return;
        }

        // If no token_hash and no email, check current session
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError) throw userError;

        if (user?.email) {
          setEmail(user.email as string);
          if (user.email_confirmed_at) {
            setStatus('verified');
            setTimeout(() => {
              router.push(next);
            }, 1000);
          } else {
            setStatus('pending');
          }
        } else {
          // No user session and no email provided, redirect to login
          router.push(`/login?redirectTo=/verify-email`);
        }
      } catch (err) {
        console.error('Verification error:', err);
        setError(err instanceof Error ? err.message : 'Failed to verify email');
        setStatus('error');
      }
    }

    checkVerification();
  }, [token_hash, type, emailParam, next, router]);

  const resendVerification = async () => {
    if (!email) return;
    
    try {
      setIsResending(true);
      setError(null);
      
      // First, send the verification email
      const { error: resendError } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/verify-email?next=${next}`,
        },
      });

      if (resendError) throw resendError;

      setStatus('pending');
    } catch (err) {
      console.error('Error resending verification:', err);
      setError(err instanceof Error ? err.message : 'Failed to resend verification email');
    } finally {
      setIsResending(false);
    }
  };

  if (status === 'checking') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying your email...</p>
        </div>
      </div>
    );
  }

  if (status === 'verified') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="mt-3 text-lg font-medium text-gray-900">Email Verified!</h2>
          <p className="mt-2 text-sm text-gray-600">
            Your email has been successfully verified. Redirecting you now...
          </p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="mt-3 text-lg font-medium text-gray-900">Verification Failed</h2>
          <p className="mt-2 text-sm text-gray-600">{error}</p>
          <div className="mt-6">
            <button
              onClick={() => router.push('/login')}
              className="text-indigo-600 hover:text-indigo-500 font-medium"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default pending state
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-6 px-4">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
            <svg
              className="h-6 w-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h2 className="mt-3 text-2xl font-bold text-gray-900">Check your email</h2>
          <p className="mt-2 text-sm text-gray-600">
            We've sent a verification link to <span className="font-medium">{email}</span>
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Please click the link in the email to verify your account.
          </p>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-600">
            Didn't receive the email?{' '}
            <button
              type="button"
              onClick={resendVerification}
              disabled={isResending}
              className="font-medium text-indigo-600 hover:text-indigo-500 disabled:opacity-50"
            >
              {isResending ? 'Sending...' : 'Resend verification email'}
            </button>
          </p>
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </div>

        <div className="text-sm text-center mt-6">
          <button
            type="button"
            onClick={() => router.push('/login')}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}