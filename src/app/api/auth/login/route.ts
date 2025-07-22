import { adminAuth } from "@/lib/firebaseAdmin";
import { DtoUserRole } from "@/types/firebase";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token } = await req.json();

  try {
    const cookie = await cookies();
    const decoded = await adminAuth.verifyIdToken(token);

    if (!decoded) {
      throw new Error("Cannot verify id token");
    }

    const sessionCookie = await adminAuth.createSessionCookie(token, {
      expiresIn: 60 * 60 * 24 * 7 * 1000,
    });

    cookie.set("session", sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    const defaultRedirect = [DtoUserRole.Admin, DtoUserRole.SuperAdmin].includes(
      decoded?.role,
    ) ? "/admin/dashboard" : "/requests";

    return NextResponse.json({ success: true, redirect: defaultRedirect });
  } catch (error) {
    return NextResponse.json(
      { message: "Something wen't wrong", error: error },
      { status: 401 },
    );
  }
}
