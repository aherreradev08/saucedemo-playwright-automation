import { test as base } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
import { ProductPage } from '../pages/ProductPage.js';

export const test = base.extend({
	loginPage: async ({ page }, use) => {
		const loginPage = new LoginPage(page);
		await use(loginPage);
	},

	authenticatedPage: async ({ page }, use) => {
		const loginPage = new LoginPage(page);
		await loginPage.goto();
		await loginPage.login('standard_user', 'secret_sauce');
		await use(page);
	},

	inventoryPage: async ({ page }, use) => {
		const inventoryPage = new InventoryPage(page);
		await use(inventoryPage);
	},

	cartPage: async ({ page }, use) => {
		const cartPage = new CartPage(page);
		await use(cartPage);
	},

	checkoutPage: async ({ page }, use) => {
		const checkoutPage = new CheckoutPage(page);
		await use(checkoutPage);
	},

	productPage: async ({ page }, use) => {
		const productPage = new ProductPage(page);
		await use(productPage);
	},
});

export { expect } from '@playwright/test';
