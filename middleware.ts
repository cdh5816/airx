// © AIRX (individual business). All rights reserved.
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSessionFromCookies } from './lib/auth';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const path = url.pathname;

  // Allow public assets and auth routes
  if (path.startsWith('/_next') || path.startsWith('/api/bootstrap') || path.startsWith('/guest/login') || path.startsWith('/login')) {
    return NextResponse.next();
  }

  const cookieHeader = req.headers.get('cookie');
  const session = getSessionFromCookies(cookieHeader);

  if (!session) {
    // redirect to appropriate login
    if (path.startsWith('/guest')) return NextResponse.redirect(new URL('/guest/login', req.url));
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // enforce activeCompanyId for internal users (except SUPER without selection)
  if (session.type === 'INTERNAL') {
    // attach session info as header for server handlers to read
    const res = NextResponse.next();
    res.headers.set('x-lookup9-session', JSON.stringify(session));
    return res;
  }

  // guest session
  const res = NextResponse.next();
  res.headers.set('x-lookup9-session', JSON.stringify(session));
  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
