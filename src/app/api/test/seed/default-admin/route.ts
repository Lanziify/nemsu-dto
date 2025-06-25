import { adminAuth } from '@/lib/firebaseAdmin';
import { DtoUser, DtoUserRole } from '@/types/firebase';
import { getFirestore } from 'firebase-admin/firestore'
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const email = process.env.DEFAULT_ADMIN_EMAIL!;
        const password = process.env.DEFAULT_ADMIN_PASSWORD!;

        const listUsersResult = await adminAuth.listUsers(1)

        if (listUsersResult.users.length > 0) {
            return NextResponse.json({ error: 'Already exist. Cannot create another instance.' }, { status: 400 })
        }

        const admin = await adminAuth.createUser({
            email,
            password,
            displayName: DtoUserRole.SuperAdmin,
        });

        await adminAuth.setCustomUserClaims(admin.uid, { role: DtoUserRole.SuperAdmin });

        const adminData: DtoUser = {
            uid: admin.uid,
            email: admin.email as string,
            avatar: '',
            displayName: admin.displayName as string,
            role: DtoUserRole.SuperAdmin,
            createdAt: new Date(),
            office: DtoUserRole.SuperAdmin,
            position: DtoUserRole.SuperAdmin
        };

        await getFirestore().collection('users').doc(admin.uid).set(adminData)

        return NextResponse.json({ success: true, message: `Default admin created: ${email}` })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Something wen\'t wrong' }, { status: 401 })
    }
}
