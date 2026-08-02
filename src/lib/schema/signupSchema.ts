import { z } from "astro/zod";

export const signupSchema = z
	.object({
		signupEmail: z.email("Please enter a valid email"),
		signupPassword: z
			.string()
			.min(8, "Password must be at least 8 characters")
			.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
			.regex(/[0-9]/, "Password must contain at least one number")
			.regex(
				/[^a-zA-Z0-9]/,
				"Password must contain at least one special character",
			),
		signupConfirmPassword: z.string(),
	})
	.refine((data) => data.signupPassword === data.signupConfirmPassword, {
		message: "Password does not match",
		path: ["signupConfirmPassword"],
	});

export type signupSchema = z.infer<typeof signupSchema>;
