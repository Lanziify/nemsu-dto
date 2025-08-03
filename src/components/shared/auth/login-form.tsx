"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { isAxiosError } from "axios";
// import { axiosErrorHandler } from "@/lib/utils";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import clsx from "clsx";
import { useAuth } from "@/hooks/use-auth";
import { parseFirebaseErrorMessage, safeCatch } from "@/lib/utils";
import { FirebaseAuthError } from "firebase-admin/auth";

function LoginForm() {
	const [loginError, setLoginError] = React.useState<string | null>(null);
	const { loginUser } = useAuth();

	const formSchema = z.object({
		email: z
			.string()
			.min(1, { message: "Please enter your email." })
			.email("This is not a valid email."),
		password: z.string().min(1, { message: "Please enter your password." }),
	});

	type FormValues = z.infer<typeof formSchema>;

	const form = useForm<FormValues>({
		defaultValues: { email: "", password: "" },
		resolver: zodResolver(formSchema),
	});

	const onSubmit = async (values: FormValues) => {
		const result = await safeCatch<void, FirebaseAuthError>(async () => {
			await loginUser(values);
		});

		if (result.error) {
			const errorMessage = parseFirebaseErrorMessage(result.error);
			setLoginError(errorMessage);
		}
	};

	return (
		<div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<FormField
						control={form.control}
						name="email"
						render={({ field, fieldState }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="Email"
										className={clsx({
											"border-red-500 placeholder:text-red-500":
												fieldState.error,
										})}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="password"
						render={({ field, fieldState }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										{...field}
										type="password"
										placeholder="Password"
										className={clsx({
											"border-red-500 placeholder:text-red-500":
												fieldState.error,
										})}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{loginError && (
						<Alert variant="destructive">
							<AlertCircle className="h-4 w-4" />
							<AlertDescription>{loginError}</AlertDescription>
						</Alert>
					)}

					<Button className="w-full" type="submit">
						Login
					</Button>
				</form>
			</Form>
		</div>
	);
}

export default LoginForm;
