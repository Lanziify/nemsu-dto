export interface DtoUser {
	uid: string;
	email: string;
	avatar: string;
	displayName: string;
	role: DtoUserRole;
	office: string;
	position: string;
	createdAt?: FirebaseFirestore.Timestamp;
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

export enum DtoUserRole {
	SuperAdmin = "super-admin",
	Admin = "admin",
	Staff = "staff",
}

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
