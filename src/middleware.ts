import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
    const sessionCookie = req.cookies.get('session')?.value

    if (!sessionCookie) {
        const res = NextResponse.redirect(new URL('/', req.url))

        res.cookies.set('callbackUrl', req.nextUrl.pathname, {
            path: '/',
            httpOnly: false,
            sameSite: 'lax',
        })

        return res
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/admin/:path*',
    ],
}
