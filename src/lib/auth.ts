import { getAuth } from "firebase-admin/auth";
import { DtoUser } from '@/types/firebase';
import { cookies } from "next/headers";
import { DtoFirestoreCollection } from './firestoreReference';
import { adminDb } from './firebaseAdmin';

export async function getCurrentUser(): Promise<DtoUser | null> {
    const auth = getAuth();
    const session = (await cookies()).get("session")?.value;

    if (!session) return null;

    try {
        const decoded = await auth.verifySessionCookie(session, true);

        const profileDoc = await adminDb
            .collection(DtoFirestoreCollection.USERS)
            .doc(decoded.uid)
            .get()

        if (!profileDoc.exists) return null;

        return profileDoc.data() as DtoUser;
    } catch {
        return null;
    }
}