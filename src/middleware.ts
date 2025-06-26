import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
    const sessionCookie = req.cookies.get('session')?.value
    const authPaths = ['/login']

    if (!sessionCookie && !authPaths.includes(req.nextUrl.pathname)) {
        const res = NextResponse.redirect(new URL('/login', req.url))

        res.cookies.set('callbackUrl', req.nextUrl.pathname, {
            path: '/',
            httpOnly: false,
            sameSite: 'lax',
        })

        return res
    }

    if (sessionCookie && authPaths.includes(req.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/admin/:path*',
        '/login/:path*'
    ],
}
