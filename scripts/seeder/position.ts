import { DtoFirestoreCollection } from "@/lib/firestoreReference";
import { getFirestore, Timestamp } from "firebase-admin/firestore";

async function seedDefaultPositions() {
	const positions = [
		"Instructor I",
		"Instructor II",
		"Instructor II",
		"Assistant Professor I",
		"Assistant Professor II",
		"Assistant Professor III",
		"Assistant Professor IV",
		"Associate Professor I",
		"Associate Professor II",
		"Associate Professor III",
		"Associate Professor IV",
		"Professor I",
		"Professor II",
		"Professor III",
		"Professor IV",
		"Professor V",
		"Professor VI",
	];

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
