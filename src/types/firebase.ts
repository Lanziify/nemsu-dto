export interface DtoUser {
	uid: string;
	email: string;
	displayName: string;
	role: DtoUserRole;
	createdAt?: Date | number;
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
	Admin = "admin",
	Staff = "staff",
}

export enum RequestType {
	Repair = "repair",
}

export enum DtoRequestStatus {
	Pending = "pending",
	Confirmed = "confirmed",
	Rejected = "rejected",
	Canceled = "canceled",
	Completed = "completed",
}
