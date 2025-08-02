import { branches } from "@/lib/constants";
import { DtoFirestoreCollection } from "@/lib/firestoreReference";
import { getFirestore, Timestamp } from "firebase-admin/firestore";

async function seedDefaultBranches() {
	const officeCollectionSize = (
		await getFirestore().collection(DtoFirestoreCollection.BRANCHES).get()
	).size;

	if (officeCollectionSize > 0) {
		throw new Error("Skipped. Campus branch data already exists.");
	}

	for await (const branch of branches) {
		await getFirestore()
			.collection(DtoFirestoreCollection.BRANCHES)
			.doc()
			.set({
				name: branch,
				createdAt: Timestamp.now(),
				updatedAt: Timestamp.now(),
			});
	}
}

export { seedDefaultBranches };
