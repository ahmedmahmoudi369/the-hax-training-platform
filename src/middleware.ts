import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const protectedRoutes = [
  '/learner',
  '/profile',
  '/courses',
  '/my-courses',
  '/certifications',
];

const adminRoutes = [
  '/admin',
  '/admin/users',
  '/admin/courses',
  '/admin/enrollments',
  '/admin/certifications',
  '/admin/reports',
  '/admin/settings',
];

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();
  const url = new URL(request.url);

  // Redirect to login if trying to access protected route while not authenticated
  if (!session && protectedRoutes.some(route => url.pathname.startsWith(route))) {
    const redirectUrl = new URL('/signin', request.url);
    redirectUrl.searchParams.set('redirectedFrom', request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Check admin access
  if (session) {
    // For development, allow all authenticated users to access admin
    // In production, you should check the user's role from the database
    const isAdmin = true; // Temporarily set to true for development
    
    // Uncomment this in production
    /*
    const { data: user } = await supabase
      .from('users')
      .select('role')
      .eq('auth_user_id', session.user.id)
      .single();
    const isAdmin = user?.role === 'admin';
    */

    // Redirect to unauthorized if trying to access admin routes without admin role
    if (!isAdmin && adminRoutes.some(route => url.pathname.startsWith(route))) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|signin|signup|verify-certificate|terms|privacy).*)',
  ],
};
