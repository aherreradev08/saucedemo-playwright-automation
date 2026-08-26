import { test, expect } from '../fixtures/test.js';

test.describe('Product Details', () => {
	test('E021 - Open a product detail page', async ({
		authenticatedPage,
		inventoryPage,
		productPage,
	}) => {
		await inventoryPage.openProduct('Sauce Labs Backpack');
		await expect(productPage.productName).toHaveText('Sauce Labs Backpack');
		await expect(productPage.productPrice).toHaveText('$29.99');
		await expect(productPage.productImage).toBeVisible();
		await expect(productPage.productDescription).toBeVisible();
	});
	test('E022 - Return from Product Details to Inventory', async ({
		authenticatedPage,
		inventoryPage,
		productPage,
	}) => {
		await inventoryPage.openProduct('Sauce Labs Backpack');
		await productPage.backToProducts();
		await expect(authenticatedPage).toHaveURL(/inventory/);
		await expect(inventoryPage.inventoryList).toBeVisible();
	});
});
