import { test, expect } from "@playwright/test";

test.describe("Newsletter Subscription Flow", () => {
	test.beforeEach(async ({ page }) => {
		// 1. Go to root page
		await page.goto("/");

		// Scroll to the form element
		await page.locator(".contact-us").scrollIntoViewIfNeeded();

		// Wait for the component to be hydrated
		await page.locator(".contact-form[data-hydrated='true']").waitFor();
	});

	test("should display validation error for invalid email format", async ({
		page,
	}) => {
		const emailInput = page.getByLabel("Newsletter Email");
		await emailInput.fill("invalid.email");

		// Click submit button
		await page.getByRole("button", { name: "Contact Us" }).click();

		// Verify error message
		const errorMessage = page.locator(".input-group__error-message");
		await expect(errorMessage).toHaveText("Whoops, make sure it's an email");
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
		const errorMessage = page.locator(".input-group__error-message");
		await expect(errorMessage).toHaveText("You have already subscribed!");
	});

	test("should successfully subscribe with a new email address", async ({
		page,
	}) => {
		const uniqueEmail = `e2e-${Date.now()}@example.com`;
		const emailInput = page.getByLabel("Newsletter Email");
		await emailInput.fill(uniqueEmail);

		await page.getByRole("button", { name: "Contact Us" }).click();

		// Verify form reset after submit succesfully
		await expect(emailInput).toHaveValue("");

		// Verify toast message show correct message from server
		const successToast = page.locator(".toast-message__text");
		await expect(successToast).toHaveText(
			"You have been succesfully subscribed",
		);
	});
});
