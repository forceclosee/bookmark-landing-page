import { test, expect, type Page } from "@playwright/test";

const userName = process.env.TEST_USER_NAME;
const userEmail = process.env.TEST_USER_EMAIL;
const userPassword = process.env.TEST_USER_PASSWORD;

if (!userName || !userEmail || !userPassword) {
	throw new Error("Name, Email, and Password is missing");
}

const [name, domain] = userEmail.split("@");

test.describe("Signup Flow", () => {
	// valid data object for base template
	const getValidData = () => ({
		signupName: `${userName}-${Date.now()}`,
		signupEmail: `${name}-${Date.now()}@${domain}`,
		signupPassword: userPassword,
		signupConfirmPassword: userPassword,
	});

	// Helper function to fill form
	async function fillSignupForm(
		page: Page,
		data: ReturnType<typeof getValidData>,
	) {
		await page
			.getByLabel("Name")
			.filter({ visible: true })
			.fill(data.signupName);
		await page
			.getByLabel("Email")
			.filter({ visible: true })
			.fill(data.signupEmail);
		await page.getByPlaceholder("Create a password").fill(data.signupPassword);
		await page
			.getByPlaceholder("Enter your password again")
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
		await expect(page.getByRole("status")).toContainText(
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
		await expect(
			page.getByLabel("Name").filter({ visible: true }),
		).toHaveAccessibleDescription("Name must be at least 2 characters");
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
		await expect(
			page.getByLabel("Email").filter({ visible: true }),
		).toHaveAccessibleDescription("Please enter a valid email address");
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
		await expect(
			page.getByPlaceholder("Create a password"),
		).toHaveAccessibleDescription(
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
		await expect(
			page.getByPlaceholder("Enter your password again"),
		).toHaveAccessibleDescription("Password does not match");
	});
});
