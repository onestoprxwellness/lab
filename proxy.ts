import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { routes } from './lib/routes';
import { decodeJwt } from './utils/decodeJwt';
import { getSafeRedirect } from './utils/getSafeRedirect';

const AUTH_ROUTES = [
  routes.signIn(),
  routes.signUp(),
  routes.forgotPassword(),
  routes.resetPassword(),
];

const EXPIRY_LEEWAY_MS = 30_000;

const isTokenValid = (token: string): boolean => {
  try {
    const { exp } = decodeJwt(token);
    return Boolean(exp) && exp * 1000 - EXPIRY_LEEWAY_MS > Date.now();
  } catch {
    return false;
  }
};

const isAuthRoute = (pathname: string) =>
  AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const token = request.cookies.get('access_token')?.value;
  const isAuthed = token ? isTokenValid(token) : false;

  if (!isAuthed && !isAuthRoute(pathname)) {
    const loginUrl = new URL(routes.signIn(), request.url);

    loginUrl.searchParams.set('redirectTo', `${pathname}${search}`);

    const response = NextResponse.redirect(loginUrl);

    response.cookies.delete('access_token');
    response.cookies.delete('refresh_token');

    return response;
  }

  if (isAuthed && isAuthRoute(pathname)) {
    const redirectTo = request.nextUrl.searchParams.get('redirectTo');

    return NextResponse.redirect(
      new URL(getSafeRedirect(redirectTo), request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
