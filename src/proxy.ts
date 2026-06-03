import {NextRequest, NextResponse} from 'next/server';
import {routing} from './i18n/routing';

export function proxy(request: NextRequest) {
  const {pathname} = request.nextUrl;
  const defaultLocale = routing.defaultLocale;

  if (pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Match all paths except API routes, Next.js internals, and static files.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
