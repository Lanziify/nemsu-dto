import { collection, CollectionReference } from "firebase/firestore";
import { db } from "./firebaseClient";
import { DtoRepair, DtoUser, DtoUserRole } from "@/types/firebase";

export const DtoFirestoreCollection = {
  USERS: "users",
  ROLES: "roles",
  OFFICES: "offices",
  POSITIONS: "positions",
  TRANSACTIONS: "transactions",
  BRANCHES: "branches",
} as const

export type CollectionMap = {
  [DtoFirestoreCollection.USERS]: DtoUser;
  [DtoFirestoreCollection.ROLES]: (typeof DtoUserRole)[keyof typeof DtoUserRole];
  [DtoFirestoreCollection.TRANSACTIONS]: DtoRepair;
};

export function getCollection<T extends keyof CollectionMap>(
  name: T,
): CollectionReference<CollectionMap[T]> {
  return collection(db, name) as CollectionReference<CollectionMap[T]>;
}
