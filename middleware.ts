import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  // ✅ Protect only pages (not static files or APIs)
  const isDashboardPage = request.nextUrl.pathname.startsWith('/dashboard') &&
                          !request.nextUrl.pathname.startsWith('/dashboard/api');

  if (!token && isDashboardPage) {
    console.log('🔒 No token found. Redirecting to login.');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
