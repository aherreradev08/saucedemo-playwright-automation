import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';

test.describe('Checkout', () => {
	let loginPage;
	let inventoryPage;
	let cartPage;
	let checkoutPage;

	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPage(page);
		inventoryPage = new InventoryPage(page);
		cartPage = new CartPage(page);
		checkoutPage = new CheckoutPage(page);

		await loginPage.goto();
		await loginPage.login('standard_user', 'secret_sauce');
		await inventoryPage.addProductToCart('Sauce Labs Backpack');
		await inventoryPage.openCart();
		await cartPage.checkout();
	});

	test('E023 - Start checkout with a product in the cart', async () => {
		await expect(checkoutPage.pageTitle).toHaveText(
			'Checkout: Your Information',
		);
	});

	test('E024 - Enter valid checkout information', async () => {
		await checkoutPage.fillCheckoutInformation('John', 'Lur', '123');
		await checkoutPage.continueToOverview();
		await expect(checkoutPage.pageTitle).toHaveText('Checkout: Overview');
	});

	test('E025 - Checkout with an empty first name', async () => {
		await checkoutPage.fillCheckoutInformation('', 'Lur', '123');
		await checkoutPage.continueToOverview();
		await expect(checkoutPage.errorMessage).toHaveText(
			/First Name is required/i,
		);
	});

	test('E026 - Checkout with an empty last name', async () => {
		await checkoutPage.fillCheckoutInformation('John', '', '123');
		await checkoutPage.continueToOverview();
		await expect(checkoutPage.errorMessage).toHaveText(
			/Last Name is required/i,
		);
	});

	test('E027 - Checkout with an empty postal code', async () => {
		await checkoutPage.fillCheckoutInformation('John', 'Lur', '');
		await checkoutPage.continueToOverview();
		await expect(checkoutPage.errorMessage).toHaveText(
			/Postal Code is required/i,
		);
	});

	test('E028 - Cancel checkout', async ({ page }) => {
		await checkoutPage.cancelCheckout();
		await expect(page).toHaveURL(/cart/);
	});

	test('E029 - Complete a one-product purchase successfully', async () => {
		await checkoutPage.fillCheckoutInformation('John', 'Lur', '123');
		await checkoutPage.continueToOverview();
		await expect(checkoutPage.pageTitle).toHaveText('Checkout: Overview');
		await checkoutPage.finishCheckout();
		await expect(checkoutPage.successMessage).toHaveText(
			'Thank you for your order!',
		);
	});
});
