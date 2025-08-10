import { DtoFirestoreCollection } from "@/lib/firestoreReference";
import { DtoUser, DtoUserRole } from "@/types/firebase";
import { faker } from "@faker-js/faker";
import { getFirestore, Timestamp } from "firebase-admin/firestore";

async function seedTestUsers(n = 1) {
  const positionsSnapshots = await getFirestore().collection("positions").get();
  const officesSnapshots = await getFirestore().collection("offices").get();
  const branchesSnapshots = await getFirestore().collection("branches").get();

  const positionsDocRefsPaths = positionsSnapshots.docs.map((doc) => doc.ref.path);
  const officesDocRefsPaths = officesSnapshots.docs.map((doc) => doc.ref.path);
  const branchesDocRefsPaths = branchesSnapshots.docs.map((doc) => doc.ref.path);

  for (let i = 0; i < n; i++) {
    const user: DtoUser = {
      uid: faker.string.alphanumeric({ length: 28, casing: "mixed" }),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      displayName: faker.person.firstName(),
      role: DtoUserRole.Staff,
      createdAt: Timestamp.now(),
      office: faker.helpers.arrayElement(officesDocRefsPaths),
      position: faker.helpers.arrayElement(positionsDocRefsPaths),
      branch: faker.helpers.arrayElement(branchesDocRefsPaths),
    };

    await getFirestore()
      .collection(DtoFirestoreCollection.USERS)
      .doc()
      .set(user);
  }
}

export { seedTestUsers };
