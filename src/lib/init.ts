import { addDoc } from "firebase/firestore";
import { getAuth } from "firebase-admin/auth";
import { DtoRepair, DtoUser, DtoUserRole } from "@/types/firebase";
import { faker } from "@faker-js/faker";
import { adminDb } from "./firebaseAdmin";
import { DtoFirestoreCollection, getCollection } from "./firestoreReference";

export async function seedDefaultAdmin() {
	const email = process.env.DEFAULT_ADMIN_EMAIL!;
	const password = process.env.DEFAULT_ADMIN_PASSWORD!;

	const admin = await getAuth().createUser({
		email,
		password,
		displayName: "admin",
	});

	await getAuth().setCustomUserClaims(admin.uid, { admin: true });

	const userCollectionRef = getCollection(DtoFirestoreCollection.USERS);

	const adminData: DtoUser = {
		uid: admin.uid,
		email: admin.email as string,
		displayName: admin.displayName as string,
		role: DtoUserRole.Admin,
		createdAt: new Date(),
	};

	await addDoc(userCollectionRef, adminData);

	console.log(`Default admin created: ${email}`);
}

export function seedFakeUser() {
	return {};
}

export function seedFakeRequest(count: number = 10): DtoRepair[] {
	const transactionsColRef = getCollection(DtoFirestoreCollection.TRANSACTIONS);

	const fakerData: DtoRepair[] = [];

	for (let i = 0; i < count; i++) {
		const fakeRepairRequest: DtoRepair = {
			device: faker.commerce.product(),
			brand: faker.company.name(),
			model: faker.commerce.productName(),
			serial: faker.string.alphanumeric(10),
			property: faker.string.uuid(),
			complaints: faker.lorem.sentence(),
		};

		addDoc(transactionsColRef, fakeRepairRequest);
	}

	return fakerData;
}

export function seedFakePost() {
	return {};
}

export function pruneTransaction(batchSize: number = 10) {
	const transactionsColRef = adminDb.collection("transactions");
	const query = transactionsColRef.limit(batchSize);

	return new Promise<void>((resolve, reject) => {
		deleteQueryBatch(query, resolve).catch(reject);
	});
}

async function deleteQueryBatch(
	query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData>,
	resolve: () => void
) {
	const snapshot = await query.get();

	if (snapshot.empty) {
		resolve();
		return;
	}

	const batch = adminDb.batch();
	snapshot.docs.forEach((doc) => {
		batch.delete(doc.ref);
	});

	await batch.commit();

	process.nextTick(() => {
		deleteQueryBatch(query, resolve);
	});
}
