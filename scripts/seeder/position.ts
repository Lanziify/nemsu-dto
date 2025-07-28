import { DtoFirestoreCollection } from "@/lib/firestoreReference";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { positions } from "../contstants";

async function seedDefaultPositions() {
	const positionCollectionSize = (
		await getFirestore().collection(DtoFirestoreCollection.POSITIONS).get()
	).size;

	if (positionCollectionSize > 0) {
		throw new Error("Skipped. Position data already exists.");
	}

	for await (const position of positions) {
		await getFirestore()
			.collection(DtoFirestoreCollection.POSITIONS)
			.doc()
			.set({
				name: position,
				createdAt: Timestamp.now(),
				updatedAt: Timestamp.now(),
			});
	}
}

export { seedDefaultPositions };
