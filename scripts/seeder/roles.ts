import { DtoFirestoreCollection } from "@/lib/firestoreReference";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { roles } from "@/lib/constants";

async function seedDefaultRoles() {
  const rolesCollectionSize = (
    await getFirestore().collection(DtoFirestoreCollection.ROLES).get()
  ).size;

  if (rolesCollectionSize > 0) {
    throw new Error("Skipped. Office data already exists.");
  }

  for await (const role of roles) {
    await getFirestore().collection(DtoFirestoreCollection.ROLES).doc().set({
      name: role,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
  }
}

export { seedDefaultRoles };
