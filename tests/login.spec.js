import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

test.describe('Login', () => {
	let loginPage;

	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPage(page);
		await loginPage.goto();
	});

	test('E001 - Verify SauceDemo login page loads successfully', async () => {
		await expect(loginPage.usernameInput).toBeVisible();
		await expect(loginPage.passwordInput).toBeVisible();
		await expect(loginPage.loginButton).toBeVisible();
	});

	test('E002 - Verify page title is "Swag Labs"', async ({ page }) => {
		await expect(page).toHaveTitle('Swag Labs');
	});

	test('E003 - Login with invalid username', async () => {
		await loginPage.login('standard_user1', 'secret_sauce');
		await expect(loginPage.errorMessage).toHaveText(
			'Epic sadface: Username and password do not match any user in this service',
		);
	});

	test('E004 - Login with invalid password', async () => {
		await loginPage.login('standard_user', 'secret_sauce1');
		await expect(loginPage.errorMessage).toHaveText(
			'Epic sadface: Username and password do not match any user in this service',
		);
	});

	test('E005 - Login with valid credentials', async ({ page }) => {
		await loginPage.login('standard_user', 'secret_sauce');
		await expect(page).toHaveURL(/inventory/);
	});

	test('E006 - Login with empty username', async () => {
		await loginPage.login('', 'secret_sauce');
		await expect(loginPage.errorMessage).toHaveText(
			'Epic sadface: Username is required',
		);
	});

	test('E007 - Login with empty password', async () => {
		await loginPage.login('standard_user', '');
		await expect(loginPage.errorMessage).toHaveText(
			'Epic sadface: Password is required',
		);
	});

	test('E008 - Login with both username and password empty', async () => {
		await loginPage.login('', '');
		await expect(loginPage.errorMessage).toHaveText(
			'Epic sadface: Username is required',
		);
	});

	test('E009 - Login with locked-out user', async () => {
		await loginPage.login('locked_out_user', 'secret_sauce');
		await expect(loginPage.errorMessage).toHaveText(
			'Epic sadface: Sorry, this user has been locked out.',
		);
	});

	test('E010 - Verify Inventory page is displayed after successful login', async ({
		page,
	}) => {
		await loginPage.login('standard_user', 'secret_sauce');
		await expect(page).toHaveURL(/inventory/);
	});
});
