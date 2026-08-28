import { test, expect } from "@playwright/test";

test.describe("Newsletter Subscription Flow", () => {
	test.beforeEach(async ({ page }) => {
		// Go to root page
		await page.goto("/");

		// Scroll to the form element
		await page
			.getByRole("heading", { name: "Stay up-to-date with what we’re doing" })
			.scrollIntoViewIfNeeded();

		// Wait for the form component to be hydrated
		await expect(page.getByLabel("Newsletter Email")).toBeEditable;
	});

	test("should display validation error for invalid email format", async ({
		page,
	}) => {
		// Fill form
		await page.getByLabel("Newsletter Email").fill("invalid@email");

		// Click submit button
		await page.getByRole("button", { name: "Contact Us" }).click();

		// Verify error message
		await expect(
			page.getByLabel("Newsletter Email"),
		).toHaveAccessibleDescription("Whoops, make sure it's an email");
	});

	test("should display validation error for duplicate email", async ({
		page,
	}) => {
		const duplicateEmail = `dup-${Date.now()}@example.com`;
		const emailInput = page.getByLabel("Newsletter Email");
		const submitButton = page.getByRole("button", { name: "Contact Us" });

		// first submit
		await emailInput.fill(duplicateEmail);
		await submitButton.click();

		// Verify form is reset
		await expect(emailInput).toHaveValue("");

		// second submit with same email
		await emailInput.fill(duplicateEmail);
		await submitButton.click();

		// Verify error message
		await expect(emailInput).toHaveAccessibleDescription(
			"You have already subscribed!",
			{ timeout: 10000 },
		);
	});

	test("should successfully subscribe with a new email address", async ({
		page,
	}) => {
		const uniqueEmail = `e2e-${Date.now()}@example.com`;
		const emailInput = page.getByLabel("Newsletter Email");

		// Fill form
		await emailInput.fill(uniqueEmail);

		// Click submit button
		await page.getByRole("button", { name: "Contact Us" }).click();

		// Verify form reset after submit succesfully
		await expect(emailInput).toHaveValue("");

		// Verify toast message show correct message from server
		await expect(page.getByRole("status")).toContainText(
			"Thanks for subscribing",
			{ timeout: 10000 },
		);
	});
});
