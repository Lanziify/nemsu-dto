import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseClientConfig } from "@/lib/firebaseConfig";

const app =
	getApps().length === 0 ? initializeApp(firebaseClientConfig) : getApps()[0];

const db = getFirestore(app);
export { app, db };
