import { DtoFirestoreCollection } from "@/lib/firestoreReference";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { offices } from "../contstants";

async function seedDefaultOffices() {
	const officeCollectionSize = (
		await getFirestore().collection(DtoFirestoreCollection.OFFICES).get()
	).size;

	if (officeCollectionSize > 0) {
		throw new Error("Skipped. Office data already exists.");
	}

	for await (const office of offices) {
		await getFirestore()
			.collection(DtoFirestoreCollection.OFFICES)
			.doc()
			.set({
				name: office,
				createdAt: Timestamp.now(),
				updatedAt: Timestamp.now(),
			});
	}
}

export { seedDefaultOffices };
