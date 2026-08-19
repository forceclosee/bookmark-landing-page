import { describe, it, expect } from "vitest";

import { loginSchema } from "./loginSchema";

describe("Login Schema Validations", () => {
	// valid data object for base template
	const validData = {
		loginEmail: "e@example.com",
		loginPassword: "Password123!",
	};

	it("should pass validation when all field match the schema", () => {
		const result = loginSchema.safeParse({
			...validData,
		});

		expect(result.success).toBe(true);
	});

	describe("Email Validation", () => {
		it.each([
			"plainaddress",
			"#@%^%#$@#$@#.com",
			"@example.com",
			"Joe Smith <email@example.com>",
			"email.example.com",
			"email@example@example.com",
		])(
			"should fail validation when email address is invalid",
			(invalidEmail) => {
				const result = loginSchema.safeParse({
					...validData,
					loginEmail: invalidEmail,
				});

				expect(result.success).toBe(false);
				if (!result.success) {
					expect(result.error.issues[0].message).toBe(
						"Please enter a valid email address",
					);
				}
			},
		);

		it("should fail validation when email is missing", () => {
			const result = loginSchema.safeParse({
				loginPassword: validData.loginPassword,
			});
			expect(result.success).toBe(false);
		});
	});

	describe("Password Validation Rules", () => {
		it("should fail validation when password is empty", () => {
			const result = loginSchema.safeParse({
				...validData,
				loginPassword: "",
			});

			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues[0].message).toBe("Password cannot empty");
			}
		});

		it("should fail validation when password is missing", () => {
			const result = loginSchema.safeParse({
				loginEmail: validData.loginEmail,
			});
			expect(result.success).toBe(false);
		});
	});
});
