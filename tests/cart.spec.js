import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';

test.describe('Shopping Cart', () => {
	let loginPage;
	let inventoryPage;
	let cartPage;

	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPage(page);
		inventoryPage = new InventoryPage(page);
		cartPage = new CartPage(page);

		await loginPage.goto();
		await loginPage.login('standard_user', 'secret_sauce');
	});

	test('E016 - Open the Shopping Cart', async ({ page }) => {
		await inventoryPage.openCart();
		await expect(page).toHaveURL(/cart/);
	});

	test('E017 - Verify an empty cart', async ({ page }) => {
		await inventoryPage.openCart();

		await expect(page).toHaveURL(/cart/);
		await expect(cartPage.cartItems).toHaveCount(0);
	});

	test('E018 - Verify an added product appears in the cart', async () => {
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

	test('E019 - Remove a product from the Cart page', async () => {
		const productName = 'Sauce Labs Backpack';

		await inventoryPage.addProductToCart(productName);
		await inventoryPage.openCart();
		await cartPage.removeProduct(productName);
		await expect(cartPage.getProduct(productName)).toHaveCount(0);
	});

	test('E020 - Continue shopping from the Cart page', async ({ page }) => {
		await inventoryPage.openCart();
		await cartPage.continueShopping();
		await expect(page).toHaveURL(/inventory/);
	});
});
