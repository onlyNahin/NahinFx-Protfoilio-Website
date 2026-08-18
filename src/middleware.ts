import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';

const SESSION_COOKIE = 'admin_session';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /admin_21 routes except the login page itself
  if (pathname.startsWith('/admin_21') && !pathname.startsWith('/admin_21/login')) {
    const sessionValue = request.cookies.get(SESSION_COOKIE)?.value;
    const expectedValue = process.env.ADMIN_SESSION_SECRET;

    if (!sessionValue || !expectedValue || sessionValue !== expectedValue) {
      const loginUrl = new URL('/admin_21/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
