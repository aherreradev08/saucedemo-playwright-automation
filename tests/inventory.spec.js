import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';

test.describe('Inventory', () => {
	let loginPage;
	let inventoryPage;

	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPage(page);
		inventoryPage = new InventoryPage(page);

		await loginPage.goto();
		await loginPage.login('standard_user', 'secret_sauce');
	});

	test('E011 - Verify all expected products are displayed', async () => {
		await expect(inventoryPage.productCards).toHaveCount(6);
	});

	test('E012 - Verify product name is displayed', async () => {
		await expect(inventoryPage.productNames.first()).toBeVisible();
	});

	test('E013 - Verify product price is displayed', async () => {
		await expect(inventoryPage.productPrices.first()).toBeVisible();
	});

	test('E014 - Add one product to the cart', async () => {
		await inventoryPage.addProductToCart('Sauce Labs Backpack');
		await expect(inventoryPage.shoppingCartBadge).toHaveText('1');
	});

	test('E015 - Remove a product from the Inventory page', async ({ page }) => {
		const productName = 'Sauce Labs Backpack';

		await inventoryPage.addProductToCart(productName);
		await inventoryPage.removeProductFromCart(productName);

		const product = inventoryPage.getProduct(productName);

		await expect(
			product.getByRole('button', {
				name: /add to cart/i,
			}),
		).toBeVisible();
	});

	test('E021 - Open a product detail page', async ({ page }) => {
		await inventoryPage.openProduct('Sauce Labs Backpack');
		await expect(page).toHaveURL(/inventory-item/);
	});
});
