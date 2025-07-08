import { createClientForRouteHandler } from '@/lib/supabase/server';
import { NextResponse, type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const supabase = createClientForRouteHandler(request);

  // Check if we have a session
  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    await supabase.auth.signOut();
  }

  // Redirect to home page after sign out
  return NextResponse.redirect(requestUrl.origin, {
    status: 302,
  });
}
