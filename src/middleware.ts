import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const localeCookie = request.cookies.get('localeCookie')?.value;
  const pathnameLocale = request.nextUrl.pathname.split("/")[1];

const isValidLocale = (locale: string): locale is 'en' | 'ar' =>
  routing.locales.includes(locale as 'en' | 'ar');

  const defaultLocale = routing.defaultLocale;

  if (!isValidLocale(pathnameLocale)) {
    const localeToUse = localeCookie && isValidLocale(localeCookie)
      ? localeCookie
      : defaultLocale;

    const newUrl = new URL(`/${localeToUse}${request.nextUrl.pathname}`, request.url);
    return NextResponse.redirect(newUrl);
  }

  if (localeCookie !== pathnameLocale && isValidLocale(pathnameLocale)) {
    const response = intlMiddleware(request);
    response.cookies.set('localeCookie', pathnameLocale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365 
    });
    return response;
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};