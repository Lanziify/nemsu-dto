import {
  collection,
  CollectionReference,
  getDocs,
  query,
} from "firebase/firestore";
import { db } from "./firebaseClient";
import { DefaultProperty, DtoUser } from "@/types/firebase";
import { roles } from "./constants";

export const DtoFirestoreCollection = {
  USERS: "users",
  ROLES: "roles",
  OFFICES: "offices",
  POSITIONS: "positions",
  TRANSACTIONS: "transactions",
  BRANCHES: "branches",
} as const;

export type CollectionMap = {
  [DtoFirestoreCollection.USERS]: DtoUser;
  [DtoFirestoreCollection.ROLES]: DefaultProperty<(typeof roles)[number]>;
  [DtoFirestoreCollection.POSITIONS]: DefaultProperty;
  [DtoFirestoreCollection.OFFICES]: DefaultProperty;
  [DtoFirestoreCollection.BRANCHES]: DefaultProperty;
};

export function getCollection<T extends keyof CollectionMap>(
  name: T,
): CollectionReference<CollectionMap[T]> {
  return collection(db, name) as CollectionReference<CollectionMap[T]>;
}

export async function getCollectionData<T>(ref: CollectionReference<T>) {
  const q = query(ref);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    refId: doc.ref.path,
  }));
}
