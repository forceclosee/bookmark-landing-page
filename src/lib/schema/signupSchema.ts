import { z } from "astro/zod";

export const passwordRules = [
	{
		id: "length",
		label: "Password must be at least 8 characters",
		regex: null,
		test: (val: string) => val.length >= 8,
	},
	{
		id: "uppercase",
		label: "Password must contain at least one uppercase letter",
		regex: /[A-Z]/,
		test: (val: string) => /[A-Z]/.test(val),
	},
	{
		id: "number",
		label: "Password must contain at least one number",
		regex: /[0-9]/,
		test: (val: string) => /[0-9]/.test(val),
	},
	{
		id: "special",
		label: "Password must contain at least one special character",
		regex: /[^a-zA-Z0-9]/,
		test: (val: string) => /[^a-zA-Z0-9]/.test(val),
	},
];

let passwordSchema = z.string();

for (const rule of passwordRules) {
	if (rule.id === "length") {
		passwordSchema = passwordSchema.min(8, rule.label);
	} else if (rule.regex) {
		passwordSchema = passwordSchema.regex(rule.regex, rule.label);
	}
}

export const signupSchema = z
	.object({
		signupEmail: z.email("Please enter a valid email address"),
		signupPassword: passwordSchema,
		signupConfirmPassword: z.string(),
	})
	.refine((data) => data.signupPassword === data.signupConfirmPassword, {
		message: "Password does not match",
		path: ["signupConfirmPassword"],
	});

export type signupSchema = z.infer<typeof signupSchema>;
