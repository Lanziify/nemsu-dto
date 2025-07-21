import { clsx, type ClassValue } from "clsx";
import { FirebaseError } from "firebase-admin/app";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type Success<T> = {
	data: T;
	error: null;
};

type Failure<E> = {
	data: null;
	error: E;
};

type Result<T, E> = Success<T> | Failure<E>;

export async function safeCatch<T, E>(
	fn: () => Promise<T>
): Promise<Result<T, E>> {
	try {
		return { data: await fn(), error: null };
	} catch (error) {
		return { data: null, error: error as E };
	}
}

export function parseFirebaseErrorMessage(error: FirebaseError) {
	let errorMessage;

	switch (error.code) {
		case "auth/invalid-credential":
			errorMessage = "Incorrect email or password.";
			break;
		case "auth/too-many-requests":
			errorMessage = "Too many attempts. Please try again.";
      break;
		default:
			errorMessage = "Something went wrong. Please try again.";
			break;
	}

	return errorMessage;
}
