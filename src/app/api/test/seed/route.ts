import { DefaultPositions } from '@/lib/constants';
import { DtoFirestoreCollection } from "@/lib/firestoreReference";
import { DtoRequestStatus, DtoUserRole } from "@/types/firebase";
import { getFirestore } from "firebase-admin/firestore";
import { NextResponse } from "next/server";

export function POST(req: Request) {
	if (req.headers.get("secret") !== process.env.SEED_SECRET_KEY) {
		return NextResponse.json(
			{ message: "Cannot access this resource with unauthorized credential." },
			{ status: 401 }
		);
	}

	const DtoPositions = DefaultPositions.reduce((acc, key) => {
		acc[key] = key;
		return acc;
	}, {} as Record<(typeof DefaultPositions)[number], string>);

	const seedMap = {
		[DtoFirestoreCollection.STATUS]: DtoRequestStatus,
		[DtoFirestoreCollection.ROLES]: DtoUserRole,
		[DtoFirestoreCollection.POSITIONS]: DtoPositions,
	};

	Object.entries(seedMap).forEach(async ([collection, item]) => {
		for (const value in item) {
			await getFirestore().collection(collection).doc().set({ name: value });
		}
	});

	return NextResponse.json({ success: true });
}
