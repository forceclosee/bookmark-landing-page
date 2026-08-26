import { test, expect, type Page } from "@playwright/test";

test.describe("Login Flow", () => {
	// valid data object for base template
	const getValidData = () => ({
		loginName: "Example",
		loginEmail: "e@e.example",
		loginPassword: "aaaaa1W!",
	});

	// Helper function to fill form
	async function fillLoginForm(
		page: Page,
		data: ReturnType<typeof getValidData>,
	) {
		await page.getByTestId("login-email").fill(data.loginEmail);
		await page.getByTestId("login-password").fill(data.loginPassword);
	}

	test.beforeEach(async ({ page, context }) => {
		// Clear session cookie
		await context.clearCookies();

		// Go to home page
		await page.goto("/");

		// Open login modal
		await page.getByTestId("open-login-modal-button").first().click();

		// Verify modal is open
		const modal = page.getByTestId("login-modal");
		expect(modal).toBeVisible;
	});

	test("should successfully login with valid credentials", async ({ page }) => {
		const data = getValidData();

		// Fill form
		await fillLoginForm(page, data);

		// Click submit button
		await page
			.getByTestId("login-modal")
			.getByRole("button", { name: "Login" })
			.click();

		// Verify toast message
		const successToast = page
			.getByTestId("login-modal")
			.getByTestId("toast-message-text");
		await expect(successToast).toHaveText(`Welcome back ${data.loginName}`);
	});

	test("should fail validation when email address is invalid", async ({
		page,
	}) => {
		// only test 1 scenario, all other scenario allready pass in unit test
		const data = { ...getValidData(), loginEmail: "@example.com" };

		// Fill form
		await fillLoginForm(page, data);

		// Click submit button
		await page
			.getByTestId("login-modal")
			.getByRole("button", { name: "Login" })
			.click();

		// Verify error message
		const ErrorEmail = page
			.getByTestId("form-field")
			.filter({ has: page.getByTestId("login-email") })
			.getByTestId("input-error-message");
		await expect(ErrorEmail).toHaveText("Please enter a valid email address");
	});

	test("should fail validation when password is empty", async ({ page }) => {
		const data = { ...getValidData(), loginPassword: "" };

		// Fill form
		await fillLoginForm(page, data);

		// Click submit button
		await page
			.getByTestId("login-modal")
			.getByRole("button", { name: "Login" })
			.click();

		// Verify error message
		const ErrorPassword = page
			.getByTestId("form-field")
			.filter({ has: page.getByTestId("login-password") })
			.getByTestId("input-error-message");
		await expect(ErrorPassword).toHaveText("Password cannot empty");
	});
});
