export class CartPage {
	constructor(page) {
		this.page = page;

		this.cartItems = page.locator('[data-test="inventory-item"]');
		this.productNames = page.locator('[data-test="inventory-item-name"]');
		this.productPrices = page.locator('[data-test="inventory-item-price"]');
		this.checkoutButton = page.locator('[data-test="checkout"]');
		this.continueShoppingButton = page.locator(
			'[data-test="continue-shopping"]',
		);
	}

	getProduct(productName) {
		return this.cartItems.filter({
			hasText: productName,
		});
	}

	async removeProduct(productName) {
		const product = this.getProduct(productName);

		await product
			.getByRole('button', {
				name: /remove/i,
			})
			.click();
	}

	async checkout() {
		await this.checkoutButton.click();
	}

	async continueShopping() {
		await this.continueShoppingButton.click();
	}
}
