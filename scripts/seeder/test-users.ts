import { DtoFirestoreCollection } from "@/lib/firestoreReference";
import { DtoUser, DtoUserRole } from "@/types/firebase";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { faker } from "@faker-js/faker";
import { offices, positions, branches } from "@/lib/constants";

async function seedTestUsers(n = 1) {
  for (let i = 0; i < n; i++) {
    const user: DtoUser = {
      uid: faker.string.alphanumeric({ length: 28, casing: "mixed" }),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      displayName: faker.person.firstName(),
      role: DtoUserRole.Staff,
      createdAt: Timestamp.now(),
      office: faker.helpers.arrayElement(offices),
      position: faker.helpers.arrayElement(positions),
      branch: faker.helpers.arrayElement(branches),
    };

    await getFirestore()
      .collection(DtoFirestoreCollection.USERS)
      .doc()
      .set(user);
  }
}

export { seedTestUsers };
