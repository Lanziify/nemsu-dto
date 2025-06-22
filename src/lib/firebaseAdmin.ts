import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { firebaseAdminConfig } from "./firebaseConfig";

if (!getApps().length) {
	initializeApp({
		credential: cert(firebaseAdminConfig),
	});
}

const adminDb = getFirestore();
export { adminDb };
