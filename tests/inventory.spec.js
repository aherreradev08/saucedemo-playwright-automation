import { test, expect } from '../fixtures/test.js';

test.describe('Inventory', () => {
	test('E011 - Verify all expected products are displayed', async ({
		authenticatedPage,
		inventoryPage,
	}) => {
		await expect(inventoryPage.productCards).toHaveCount(6);
	});
	test('E012 - Verify product name is displayed', async ({
		authenticatedPage,
		inventoryPage,
	}) => {
		await expect(inventoryPage.productNames.first()).toBeVisible();
	});
	test('E013 - Verify product price is displayed', async ({
		authenticatedPage,
		inventoryPage,
	}) => {
		await expect(inventoryPage.productPrices.first()).toBeVisible();
	});
	test('E014 - Add one product to the cart', async ({
		authenticatedPage,
		inventoryPage,
	}) => {
		await inventoryPage.addProductToCart('Sauce Labs Backpack');
		await expect(inventoryPage.shoppingCartBadge).toHaveText('1');
	});
	test('E015 - Remove a product from the Inventory page', async ({
		authenticatedPage,
		inventoryPage,
	}) => {
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
});
