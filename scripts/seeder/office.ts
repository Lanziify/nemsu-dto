import { DtoFirestoreCollection } from "@/lib/firestoreReference";
import { getFirestore, Timestamp } from "firebase-admin/firestore";

async function seedDefaultOffices() {
	const offices = [
		"Office of the Dean",
		"Department Chairperson's Office",
		"Office of the Registrar",
		"Office of the Academic Affairs/Vice President for Academic Affairs (VPAA)",
		"Office of the Research and Development",
		"Office of the President",
		"Office of the Vice President for Administration/Finance",
		"Budget and Finance Office",
		"Human Resource Management Office (HRMO)",
		"Supply and Procurement Office",
		"Office of Student Affairs (OSA)",
		"Guidance and Counseling Office",
		"Scholarship and Financial Assistance Office",
		"Office of the Student Government",
		"Medical and Dental Clinic",
		"Campus Security and Safety Office",
		"ICT/Management Information Systems (MIS) Office",
		"Library and Learning Resource Center",
		"Quality Assurance (QA) Office",
	];

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
