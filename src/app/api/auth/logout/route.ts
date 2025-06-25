import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
    const cookie = await cookies()
    const cookiesToExpire = ['session', 'callbackUrl'] as const

    cookiesToExpire.forEach(id => {
        cookie.set(id, '', {
            httpOnly: true,
            secure: true,
            path: '/',
            maxAge: 0
        })
    })
    return NextResponse.json({ success: true })
}