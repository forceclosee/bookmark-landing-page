import { describe, it, expect } from "vitest";

import { contactUsSchema } from "./contactUsSchema";

describe("contact Us Schema Validation", () => {
	it("should pass validation with a valid email address", () => {
		const result = contactUsSchema.safeParse({
			contactUsEmail: "user@example.com",
		});

		expect(result.success).toBe(true);
	});

	it("should fail validation with invalid email format", () => {
		const result = contactUsSchema.safeParse({
			contactUsEmail: "invalid.email",
		});

		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.issues[0].message).toBe(
				"Whoops, make sure it's an email",
			);
		}
	});

	it("should fail validation with empty email", () => {
		const result = contactUsSchema.safeParse({
			contactUsEmail: "",
		});

		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.issues[0].message).toBe(
				"Whoops, make sure it's an email",
			);
		}
	});
	it("should fail validation with empty object", () => {
		const result = contactUsSchema.safeParse({});

		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.issues[0].message).toBe(
				"Whoops, make sure it's an email",
			);
		}
	});
});
