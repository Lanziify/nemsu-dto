import "dotenv/config";
import { adminAuth } from "@/lib/firebaseAdmin";
import { DtoUser, DtoUserRole } from "@/types/firebase";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { DtoFirestoreCollection } from "@/lib/firestoreReference";

export async function seedDefaultAdmin() {
	const email = process.env.DEFAULT_ADMIN_EMAIL!;
	const password = process.env.DEFAULT_ADMIN_PASSWORD!;

	const listUsers = await adminAuth.listUsers();
	const adminExists = listUsers.users.some(
		(user) => user.customClaims?.role === DtoUserRole.SuperAdmin
	);

	if (adminExists) {
		throw new Error("Skipped. SuperAdmin already exists.");
	}

	const admin = await adminAuth.createUser({
		email,
		password,
		displayName: DtoUserRole.SuperAdmin,
	});

	await adminAuth.setCustomUserClaims(admin.uid, {
		role: DtoUserRole.SuperAdmin,
	});

	const adminData: DtoUser = {
		uid: admin.uid,
		email: admin.email as string,
		avatar: "",
		displayName: admin.displayName as string,
		role: DtoUserRole.SuperAdmin,
		createdAt: Timestamp.now(),
		office: DtoUserRole.SuperAdmin,
		position: DtoUserRole.SuperAdmin,
	};

	await getFirestore()
		.collection(DtoFirestoreCollection.USERS)
		.doc(admin.uid)
		.set(adminData);
}
