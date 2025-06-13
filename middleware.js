import { NextResponse } from 'next/server'
const AUTH_COOKIE = 'auth=true'

export function middleware(req) {
  const { pathname } = req.nextUrl

  // allow login and API routes
  if (
    pathname.startsWith('/api/') ||
    pathname === '/login'
  ) return NextResponse.next()

  // if no auth cookie, redirect to /login
  if (!req.headers.get('cookie')?.includes(AUTH_COOKIE)) {
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }
  return NextResponse.next()
}

export const config = { matcher: ['/((?!_next).*)'] }
