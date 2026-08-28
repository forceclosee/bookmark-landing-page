import { test, expect, type Page } from "@playwright/test";

const userName = process.env.TEST_USER_NAME;
const userEmail = process.env.TEST_USER_EMAIL;
const userPassword = process.env.TEST_USER_PASSWORD;

if (!userName || !userEmail || !userPassword) {
	throw new Error("Name, Email, and Password is missing");
}

test.describe("Login Flow", () => {
	// valid data object for base template
	const getValidData = () => ({
		loginName: userName,
		loginEmail: userEmail,
		loginPassword: userPassword,
	});

	// Helper function to fill form
	async function fillLoginForm(
		page: Page,
		data: ReturnType<typeof getValidData>,
	) {
		await page.getByRole("dialog").getByLabel("Email").fill(data.loginEmail);
		await page
			.getByRole("dialog")
			.getByPlaceholder("Enter your password")
			.fill(data.loginPassword);
	}

	test.beforeEach(async ({ page, context, isMobile }) => {
		// Clear session cookie
		await context.clearCookies();

		// Go to home page
		await page.goto("/");

		// login button
		const openLoginModalButton = page
			.getByRole("button", { name: "Login" })
			.filter({ visible: true });

		// Open login modal mobile
		if (isMobile) {
			await page.getByRole("button", { name: "Open menu" }).click();
			await openLoginModalButton.click();
		}

		// Open login modal desktop
		if (!isMobile) {
			await openLoginModalButton.click();
		}

		// Verify modal is open
		await expect(page.getByRole("dialog")).toBeVisible;
	});

	test("should successfully login with valid credentials", async ({ page }) => {
		const data = getValidData();

		// Fill form
		await fillLoginForm(page, data);

		// Click submit button
		await page
			.getByRole("dialog")
			.getByRole("button", { name: "Login" })
			.click();

		// Verify toast message
		await expect(page.getByRole("dialog").getByRole("status")).toContainText(
			`Welcome back ${data.loginName}`,
		);
	});

	test("should fail validation when email address is invalid", async ({
		page,
	}) => {
		// only test 1 scenario, all other scenario allready pass in unit test
		const data = { ...getValidData(), loginEmail: "invalid@email" };

		// Fill form
		await fillLoginForm(page, data);

		// Click submit button
		await page
			.getByRole("dialog")
			.getByRole("button", { name: "Login" })
			.click();

		// Verify error message
		await expect(
			page.getByRole("dialog").getByLabel("Email"),
		).toHaveAccessibleDescription("Please enter a valid email address");
	});

	test("should fail validation when password is empty", async ({ page }) => {
		const data = { ...getValidData(), loginPassword: "" };

		// Fill form
		await fillLoginForm(page, data);

		// Click submit button
		await page
			.getByRole("dialog")
			.getByRole("button", { name: "Login" })
			.click();

		// Verify error message
		await expect(
			page.getByRole("dialog").getByPlaceholder("Enter your password"),
		).toHaveAccessibleDescription("Password cannot empty");
	});
});
