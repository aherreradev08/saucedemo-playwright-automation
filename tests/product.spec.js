import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { ProductPage } from '../pages/ProductPage.js';

test.describe('Product Details', () => {
	let loginPage;
	let inventoryPage;
	let productPage;

	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPage(page);
		inventoryPage = new InventoryPage(page);
		productPage = new ProductPage(page);

		await loginPage.goto();
		await loginPage.login('standard_user', 'secret_sauce');
	});

	test('E021 - Open a product detail page', async () => {
		await inventoryPage.openProduct('Sauce Labs Backpack');
		await expect(productPage.productName).toHaveText('Sauce Labs Backpack');
		await expect(productPage.productPrice).toHaveText('$29.99');
		await expect(productPage.productImage).toBeVisible();
		await expect(productPage.productDescription).toBeVisible();
	});

	test('E022 - Return from Product Details to Inventory', async ({ page }) => {
		await inventoryPage.openProduct('Sauce Labs Backpack');
		await productPage.backToProducts();
		await expect(page).toHaveURL(/inventory/);
		await expect(inventoryPage.inventoryList).toBeVisible();
	});
});
