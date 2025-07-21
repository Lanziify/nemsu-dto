import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "@/components/shared/auth/LoginForm";
import { signInWithEmailAndPassword } from "@firebase/auth";
import axios from "axios";
import { useRouter } from "next/navigation";

jest.mock("axios");
jest.mock("next/navigation", () => ({
	useRouter: jest.fn(),
}));
jest.mock("@firebase/auth", () => {
	const actual = jest.requireActual("@firebase/auth");
	return {
		...actual,
		signInWithEmailAndPassword: jest.fn(),
		getAuth: jest.fn(() => ({})),
	};
});

beforeEach(() => {
	jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
	jest.restoreAllMocks();
});

describe("LoginForm", () => {
	it("should have email field", () => {
		render(<LoginForm />);

		const emailField = screen.getByLabelText(/email/i);
		const passwordField = screen.getByLabelText(/password/i);
		const loginButton = screen.getByRole("button", { name: /login/i });

		expect(emailField).toBeInTheDocument();
		expect(passwordField).toBeInTheDocument();
		expect(loginButton).toBeInTheDocument();
	});

	// it("should show email format error", async () => {
	// 	render(<LoginForm />);

	// 	const emailField = screen.getByLabelText(/email/i);
	// 	const passwordField = screen.getByLabelText(/password/i);
	// 	const loginButton = screen.getByRole("button", { name: /login/i });

	// 	await userEvent.type(emailField, "invalid-email");
	// 	await userEvent.type(passwordField, "password123");
	// 	await userEvent.click(loginButton);

	// 	expect(
	// 		await screen.findByText(/Invalid email address/i)
	// 	).toBeInTheDocument();
	// });

	it("should validate errors on empty submit", async () => {
		render(<LoginForm />);

		const button = screen.getByRole("button", { name: /login/i });

		await userEvent.click(button);

		expect(
			await screen.findByText(/please enter your email/i)
		).toBeInTheDocument();
		expect(
			await screen.findByText(/please enter your password/i)
		).toBeInTheDocument();
	});

	it("should handle login submit", async () => {
		const push = jest.fn();
		(useRouter as jest.Mock).mockReturnValue({ push });

		const mockToken = "fake-id-token";
		const mockUser = {
			getIdToken: jest.fn().mockResolvedValue(mockToken),
		};

		(signInWithEmailAndPassword as jest.Mock).mockResolvedValueOnce({
			user: mockUser,
		});

		(axios.post as jest.Mock).mockResolvedValue({ data: {} });

		render(<LoginForm />);

		const emailField = screen.getByLabelText(/email/i);
		const passwordField = screen.getByLabelText(/password/i);
		const loginButton = screen.getByRole("button", { name: /login/i });

		await userEvent.type(emailField, "test@email.com");
		await userEvent.type(passwordField, "testpassword123");
		await userEvent.click(loginButton);

		await waitFor(() => {
			expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
				{},
				"test@email.com",
				"testpassword123"
			);
			expect(mockUser.getIdToken).toHaveBeenCalledWith(true);
			expect(axios.post).toHaveBeenCalledWith("/api/auth/login", {
				token: mockToken,
			});
			expect(push).toHaveBeenCalledWith("/dashboard");
		});
	});

	it("should handle login error", async () => {
		const push = jest.fn();
		(useRouter as jest.Mock).mockReturnValue({ push });

		(signInWithEmailAndPassword as jest.Mock).mockRejectedValueOnce(
			new Error("Error while trying to login your account")
		);

		render(<LoginForm />);

		const emailField = screen.getByLabelText(/email/i);
		const passwordField = screen.getByLabelText(/password/i);
		const loginButton = screen.getByRole("button", { name: /login/i });

		await userEvent.type(emailField, "fail@example.com");
		await userEvent.type(passwordField, "wrongpass");
		await userEvent.click(loginButton);

		expect(await screen.findByText(/login failed/i)).toBeInTheDocument();
		expect(push).not.toHaveBeenCalled();
	});
});
