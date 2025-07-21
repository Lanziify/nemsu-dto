import { app } from "@/lib/firebaseClient";
import { UserLoginField } from "@/types/user";
import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";
import axios from "axios";
import { useRouter } from "next/navigation";

export const useAuth = () => {
	const auth = getAuth(app);
	const router = useRouter();

	const loginUser = async ({ email, password }: UserLoginField) => {
		try {
			const callbackUrl =
				document.cookie
					.split("; ")
					.find((r) => r.startsWith("callbackUrl="))
					?.split("=")[1] || "/dashboard";
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			const token = await userCredential.user.getIdToken(true);
			const result = await axios.post("/api/auth/login", {
				token,
			});

			if (!result) {
				throw new Error("Error while trying to login your account");
			}

			router.push(decodeURIComponent(callbackUrl));
		} catch (error) {
			throw error;
		}
	};

	const logoutUser = async () => {
		try {
			await axios.post("/api/auth/logout");
			router.push("/");
		} catch (error) {
			throw error;
		}
	};

	return {
		loginUser,
		logoutUser,
	};
};
