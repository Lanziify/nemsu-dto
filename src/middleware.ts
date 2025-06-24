import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const sessionCookie = req.cookies.get('session')?.value

  // ✅ Redirect to /login (not /), and encode the callback URL
  if (!sessionCookie) {
    const callbackUrl = encodeURIComponent(req.nextUrl.pathname)
    return NextResponse.redirect(new URL(`/?callbackUrl=${callbackUrl}`, req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
  ],
}
