export interface DtoUser {
  uid: string;
  email: string;
  avatar: string;
  displayName: string;
  role: (typeof DtoUserRole)[keyof typeof DtoUserRole];
  office: string | Office;
  position: string | Position;
  branch: string | Branch;
  createdAt?: FirebaseFirestore.Timestamp;
}

export interface DefaultProperty<T = string> {
  name: T;
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}

export interface DefaultPropertyWithId extends DefaultProperty {
  refId: string;
}

export interface Office {
  name: string;
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}

export interface Position {
  name: string;
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}

export interface Branch {
  name: string;
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}

export interface FirestoreRepair extends DtoRepair {
  id: string;
  client: string;
  status: DtoRequestStatus;
}

export interface DtoRepair {
  device: string;
  brand: string;
  model: string;
  serial: string;
  property: string;
  complaints: string;
}

export interface DtoRepairResponse {
  action: string;
  recommendation: string;
  equipment: string;
}

export const DtoUserRole = {
  SuperAdmin: "super-admin",
  Admin: "admin",
  Staff: "staff",
};

export enum RequestType {
  Repair = "Repair",
}

export enum DtoRequestStatus {
  Pending = "Pending",
  Confirmed = "Confirmed",
  Rejected = "Rejected",
  Canceled = "Canceled",
  Completed = "Completed",
}
