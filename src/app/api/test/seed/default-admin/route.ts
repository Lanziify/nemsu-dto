// import { seedDefaultAdmin } from "@/lib/init";
import { DtoUser, DtoUserRole } from '@/types/firebase';
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from 'firebase-admin/firestore'
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const email = process.env.DEFAULT_ADMIN_EMAIL!;
        const password = process.env.DEFAULT_ADMIN_PASSWORD!;

        const admin = await getAuth().createUser({
            email,
            password,
            displayName: "admin",
        });

        await getAuth().setCustomUserClaims(admin.uid, { role: DtoUserRole.Admin });

        const adminData: DtoUser = {
            uid: admin.uid,
            email: admin.email as string,
            displayName: admin.displayName as string,
            role: DtoUserRole.Admin,
            createdAt: new Date(),
        };

        await getFirestore().collection('users').doc(admin.uid).set(adminData)

        return NextResponse.json({ success: true, message: `Default admin created: ${email}` })
    } catch {
        return NextResponse.json({ error: 'Something wen\'t wrong' }, { status: 401 })
    }
}
