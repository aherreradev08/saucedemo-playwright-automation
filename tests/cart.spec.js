import { test, expect } from '../fixtures/test.js';

test.describe('Shopping Cart', () => {
	test('E016 - Open the Shopping Cart', async ({
		authenticatedPage,
		inventoryPage,
	}) => {
		await inventoryPage.openCart();
		await expect(authenticatedPage).toHaveURL(/cart/);
	});
	test('E017 - Verify an empty cart', async ({
		authenticatedPage,
		inventoryPage,
		cartPage,
	}) => {
		await inventoryPage.openCart();
		await expect(authenticatedPage).toHaveURL(/cart/);
		await expect(cartPage.cartItems).toHaveCount(0);
	});
	test('E018 - Verify an added product appears in the cart', async ({
		authenticatedPage,
		inventoryPage,
		cartPage,
	}) => {
		const productName = 'Sauce Labs Backpack';
		await inventoryPage.addProductToCart(productName);
		await inventoryPage.openCart();
		const product = cartPage.getProduct(productName);
		await expect(
			product.locator('[data-test="inventory-item-name"]'),
		).toHaveText(productName);
		await expect(
			product.locator('[data-test="inventory-item-price"]'),
		).toBeVisible();
	});
	test('E019 - Remove a product from the Cart page', async ({
		authenticatedPage,
		inventoryPage,
		cartPage,
	}) => {
		const productName = 'Sauce Labs Backpack';
		await inventoryPage.addProductToCart(productName);
		await inventoryPage.openCart();
		await cartPage.removeProduct(productName);
		await expect(cartPage.getProduct(productName)).toHaveCount(0);
	});
	test('E020 - Continue shopping from the Cart page', async ({
		authenticatedPage,
		inventoryPage,
		cartPage,
	}) => {
		await inventoryPage.openCart();
		await cartPage.continueShopping();
		await expect(authenticatedPage).toHaveURL(/inventory/);
	});
});
