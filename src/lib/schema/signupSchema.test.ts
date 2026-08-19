import { describe, it, expect } from "vitest";

import { signupSchema } from "./signupSchema";

describe("Sign Up Schema Validations", () => {
	// valid data object for base template
	const validData = {
		signupName: "Example",
		signupEmail: "e@example.com",
		signupPassword: "Password123!",
		signupConfirmPassword: "Password123!",
	};

	it("should pass validation with valid credentials", () => {
		const result = signupSchema.safeParse({
			...validData,
		});

		expect(result.success).toBe(true);
	});

	describe("Name Validation", () => {
		it("should fail validation when name less than 2 characters", () => {
			const result = signupSchema.safeParse({
				...validData,
				signupName: "a",
			});

			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues[0].message).toBe(
					"Name must be at least 2 characters",
				);
			}
		});
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
				const result = signupSchema.safeParse({
					...validData,
					signupEmail: invalidEmail,
				});

				expect(result.success).toBe(false);
				if (!result.success) {
					expect(result.error.issues[0].message).toBe(
						"Please enter a valid email address",
					);
				}
			},
		);
	});

	describe("Password Validation Rules", () => {
		it.each([
			{
				password: "Short1!",
				expectedError: "Password must be at least 8 characters",
			},
			{
				password: "lowercase1!",
				expectedError: "Password must contain at least one uppercase letter",
			},
			{
				password: "NO_NUMBER_UPPERCASE!",
				expectedError: "Password must contain at least one number",
			},
			{
				password: "NoSpecialChar123",
				expectedError: "Password must contain at least one special character",
			},
		])(
			"should fail validation when password is '$password'",
			({ password, expectedError }) => {
				const result = signupSchema.safeParse({
					...validData,
					signupPassword: password,
					signupConfirmPassword: password,
				});

				expect(result.success).toBe(false);
				if (!result.success) {
					const messages = result.error.issues.map((issue) => issue.message);
					expect(messages).toContain(expectedError);
				}
			},
		);
	});

	describe("Confirm Password Validation Rules", () => {
		it("should fail validation when password and confirm password didn't match", () => {
			const result = signupSchema.safeParse({
				...validData,
				signupConfirmPassword: "DiffPass123",
			});

			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues[0].message).toBe("Password does not match");
			}
		});
	});
});
