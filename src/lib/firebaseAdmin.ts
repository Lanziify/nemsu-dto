import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from 'firebase-admin/auth';
import { firebaseAdminConfig } from "./firebaseConfig";

if (!firebaseAdminConfig.projectId) {
	throw new Error("Missing FIREBASE_PROJECT_ID in environment");
}

if (!getApps().length) {
	initializeApp({
		credential: cert(firebaseAdminConfig),
	});
}

const adminAuth = getAuth();
const adminDb = getFirestore();
export { adminAuth, adminDb };
