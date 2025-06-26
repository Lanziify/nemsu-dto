import { addDoc } from "firebase/firestore";
import { DtoRepair } from "@/types/firebase";
import { faker } from "@faker-js/faker";
import { adminDb } from "./firebaseAdmin";
import { DtoFirestoreCollection, getCollection } from "./firestoreReference";


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