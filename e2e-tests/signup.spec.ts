import { test, expect, type Page } from "@playwright/test";

test.describe("Signup Flow", () => {
	// valid data object for base template
	const getValidData = () => ({
		signupName: "E2e Example",
		signupEmail: `e2e-signup-${Date.now()}@example.com`,
		signupPassword: "Password123!",
		signupConfirmPassword: "Password123!",
	});

	// Helper function to fill form
	async function fillSignupForm(
		page: Page,
		data: ReturnType<typeof getValidData>,
	) {
		await page.getByTestId("signup-name").fill(data.signupName);
		await page.getByTestId("signup-email").fill(data.signupEmail);
		await page.getByTestId("signup-password").fill(data.signupPassword);
		await page
			.getByTestId("signup-confirm-password")
			.fill(data.signupConfirmPassword);
	}

	test.beforeEach(async ({ page }) => {
		// Go to signup page
		await page.goto("/signup");
	});

	test("should successfully sign up with valid credentials", async ({
		page,
	}) => {
		const data = getValidData();

		// Fill form
		await fillSignupForm(page, data);

		// Click submit button
		await page.getByRole("button", { name: "Sign up" }).click();

		// Verify toast message
		const successToast = page
			.getByTestId("signup-page")
			.getByTestId("toast-message-text");
		await expect(successToast).toHaveText(
			`Thanks for Signing up ${data.signupName}`,
		);

		// Verify form is reset
		const testids = [
			"signup-name",
			"signup-email",
			"signup-password",
			"signup-confirm-password",
		];
		for (const testid of testids) {
			await expect(page.getByTestId(testid)).toHaveValue("");
		}

		// Verify redirect to homepage
		await expect(page).toHaveURL("/");
	});

	test("should fail validation when name less than 2 characters", async ({
		page,
	}) => {
		const data = { ...getValidData(), signupName: "a" };

		// Fill form
		await fillSignupForm(page, data);

		// Click submit button
		await page.getByRole("button", { name: "Sign up" }).click();

		// Verify error message
		const ErrorName = page
			.getByTestId("form-field")
			.filter({ has: page.getByTestId("signup-name") })
			.getByTestId("input-error-message");
		await expect(ErrorName).toHaveText("Name must be at least 2 characters");
	});

	test("should fail validation when email address is invalid", async ({
		page,
	}) => {
		// only test 1 scenario, all other scenario allready pass in unit test
		const data = { ...getValidData(), signupEmail: "@example.com" };

		// Fill form
		await fillSignupForm(page, data);

		// Click submit button
		await page.getByRole("button", { name: "Sign up" }).click();

		// Verify error message
		const ErrorEmail = page
			.getByTestId("form-field")
			.filter({ has: page.getByTestId("signup-email") })
			.getByTestId("input-error-message");
		await expect(ErrorEmail).toHaveText("Please enter a valid email address");
	});

	test("should fail validation when password didn't match schema", async ({
		page,
	}) => {
		// only test 1 scenario, all other scenario allready pass in unit test
		const data = { ...getValidData(), signupPassword: "lowercase1!" };

		// Fill form
		await fillSignupForm(page, data);

		// Click submit button
		await page.getByRole("button", { name: "Sign up" }).click();

		// Verify error message
		const ErrorPassword = page
			.getByTestId("form-field")
			.filter({ has: page.getByTestId("signup-password") })
			.getByTestId("input-error-message");
		await expect(ErrorPassword).toHaveText(
			"Password must contain at least one uppercase letter",
		);
	});

	test("should fail validation when password and confirm password didn't match", async ({
		page,
	}) => {
		const data = { ...getValidData(), signupConfirmPassword: "DiffPass123" };

		// Fill form
		await fillSignupForm(page, data);

		// Click submit button
		await page.getByRole("button", { name: "Sign up" }).click();

		// Verify error message
		const ErrorPassword = page
			.getByTestId("form-field")
			.filter({ has: page.getByTestId("signup-confirm-password") })
			.getByTestId("input-error-message");
		await expect(ErrorPassword).toHaveText("Password does not match");
	});
});
