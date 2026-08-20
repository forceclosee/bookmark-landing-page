import { describe, it, expect, vi, beforeEach } from "vitest";

import { contactUs } from "./contact-us";

// 1. Mock astro:actions
vi.mock("astro:actions", () => ({
	defineAction: vi.fn((config) => {
		const actionFn = (input: any) => {
			if (config.input) {
				config.input.parse(input);
			}
			return config.handler(input);
		};
		actionFn.handler = config.handler;
		return actionFn;
	}),
	ActionError: class extends Error {
		code: string;
		constructor(init: { code: string; message: string }) {
			super(init.message);
			this.code = init.code;
		}
	},
}));

// 2. helper variable to control return value db query
const mockSelectWhere = vi.fn();
const mockInsertValues = vi.fn();

// Mock database client
vi.mock("@db/index", () => ({
	db: {
		select: vi.fn(() => ({
			from: vi.fn(() => ({
				where: mockSelectWhere,
			})),
		})),
		insert: vi.fn(() => ({
			values: mockInsertValues,
		})),
	},
}));

describe("contactUs Action", () => {
	beforeEach(() => {
		vi.clearAllMocks(); // clear mock before each test run
	});

	it("should successfully subscribe a new email", async () => {
		// set mock to simulate email address is not exist in database
		mockSelectWhere.mockResolvedValue([]);
		mockInsertValues.mockResolvedValue([{ id: "mocked-uuid-123" }]);

		const result = await contactUs({
			contactUsEmail: "new-subscriber@example.com",
		});

		expect(result).toEqual({
			success: true,
			message: "Thanks for subscribing",
		});

		expect(mockInsertValues).toHaveBeenCalledWith({
			email: "new-subscriber@example.com",
		});
	});

	it("should throw a CONFLICT error if the email is already subscribed", async () => {
		// set mock to simulate email address is already exist in the database
		mockSelectWhere.mockResolvedValue([
			{
				id: "existing-uuid-123",
				email: "duplicate@example.com",
				createdAt: new Date(),
			},
		]);

		try {
			await contactUs({
				contactUsEmail: "duplicate@example.com",
			});

			expect.fail("Expected ActionError to be thrown");
		} catch (error: any) {
			expect(error.code).toBe("CONFLICT");
			expect(error.message).toBe("You have already subscribed!");
		}

		expect(mockInsertValues).not.toHaveBeenCalled();
	});
});
