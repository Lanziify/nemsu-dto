import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';

export async function POST(req: Request) {
    const { token } = await req.json()
    const auth = getAuth()

    try {
        const cookie = await cookies()
        const decoded = await auth.verifyIdToken(token)

        if (!decoded) {
            throw new Error('Cannot verify id token')
        }

        const sessionCookie = await auth.createSessionCookie(token, {
            expiresIn: 60 * 60 * 24 * 7 * 1000
        })

        cookie.set('session', sessionCookie, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Something wen\'t wrong' }, { status: 401 })
    }
}