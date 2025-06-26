import { getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase-admin/auth";
import { DtoUser } from '@/types/firebase';
import { cookies } from "next/headers";
import { db } from './firebaseClient';
import { DtoFirestoreCollection } from './firestoreReference';

export async function getCurrentUser(): Promise<DtoUser | null> {
    const auth = getAuth();
    const session = (await cookies()).get("session")?.value;

    if (!session) return null;

    try {
        const decoded = await auth.verifySessionCookie(session, true);
        const profileDoc = await getDoc(
            doc(db, DtoFirestoreCollection.USERS, decoded.uid)
        );

        return profileDoc.data() as DtoUser;
    } catch {
        return null;
    }
}