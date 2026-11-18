import { test, expect } from '../fixtures/test.js';

test.describe('Checkout', () => {
	test.beforeEach(async ({ authenticatedPage, inventoryPage, cartPage }) => {
		await inventoryPage.addProductToCart('Sauce Labs Backpack');
		await inventoryPage.openCart();
		await cartPage.checkout();
	});
	test('E023 - Start checkout with a product in the cart', async ({
		checkoutPage,
	}) => {
		await expect(checkoutPage.pageTitle).toHaveText(
			'Checkout: Your Information',
		);
	});
	test('E024 - Enter valid checkout information', async ({ checkoutPage }) => {
		await checkoutPage.fillCheckoutInformation('John', 'Lur', '123');
		await checkoutPage.continueToOverview();
		await expect(checkoutPage.pageTitle).toHaveText('Checkout: Overview');
	});
	test('E025 - Checkout with an empty first name', async ({ checkoutPage }) => {
		await checkoutPage.fillCheckoutInformation('', 'Lur', '123');
		await checkoutPage.continueToOverview();
		await expect(checkoutPage.errorMessage).toHaveText(
			/First Name is required/i,
		);
	});
	test('E026 - Checkout with an empty last name', async ({ checkoutPage }) => {
		await checkoutPage.fillCheckoutInformation('John', '', '1234');
		await checkoutPage.continueToOverview();
		await expect(checkoutPage.errorMessage).toHaveText(
			/Last Name is required/i,
		);
	});
	test('E027 - Checkout with an empty postal code', async ({
		checkoutPage,
	}) => {
		await checkoutPage.fillCheckoutInformation('John', 'Lur', '');
		await checkoutPage.continueToOverview();
		await expect(checkoutPage.errorMessage).toHaveText(
			/Postal Code is required/i,
		);
	});
	test('E028 - Cancel checkout', async ({
		authenticatedPage,
		checkoutPage,
	}) => {
		await checkoutPage.cancelCheckout();
		await expect(authenticatedPage).toHaveURL(/cart/);
	});
	test('E029 - Complete a one-product purchase successfully', async ({
		checkoutPage,
	}) => {
		await checkoutPage.fillCheckoutInformation('John', 'Lur', '123');
		await checkoutPage.continueToOverview();
		await expect(checkoutPage.pageTitle).toHaveText('Checkout: Overview');
		await checkoutPage.finishCheckout();
		await expect(checkoutPage.successMessage).toHaveText(
			'Thank you for your order!',
		);
	});
});
