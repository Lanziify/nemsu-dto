import { collection, CollectionReference } from "firebase/firestore"
import { db } from "./firebaseClient"
import { DtoRepair, DtoUser, DtoUserRole } from "@/types/firebase";

export enum DtoFirestoreCollection  {
  USERS = 'users',
  ROLES = 'roles',
  OFFICE = 'office',
  POSITIONS = 'positions',
  TRANSACTIONS = 'transactions',
}

type CollectionMap = {
	[DtoFirestoreCollection.USERS]: DtoUser;
	[DtoFirestoreCollection.ROLES]: DtoUserRole;
	[DtoFirestoreCollection.TRANSACTIONS]: DtoRepair;
};

export function getCollection<T extends keyof CollectionMap>(
	name: T
): CollectionReference<CollectionMap[T]> {
	return collection(db, name) as CollectionReference<CollectionMap[T]>;
}