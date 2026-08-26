export class InventoryPage {
	constructor(page) {
		this.page = page;

		this.productsHeading = page.locator('[data-test="title"]');
		this.inventoryList = page.locator('[data-test="inventory-list"]');
		this.productCards = page.locator('[data-test="inventory-item"]');
		this.productNames = page.locator('[data-test="inventory-item-name"]');
		this.productPrices = page.locator('[data-test="inventory-item-price"]');
		this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
		this.shoppingCart = page.locator('[data-test="shopping-cart-link"]');
	}

	getProduct(productName) {
		return this.productCards.filter({
			hasText: productName,
		});
	}

	async addProductToCart(productName) {
		const product = this.getProduct(productName);

		await product
			.getByRole('button', {
				name: /add to cart/i,
			})
			.click();
	}

	async removeProductFromCart(productName) {
		const product = this.getProduct(productName);

		await product
			.getByRole('button', {
				name: /remove/i,
			})
			.click();
	}

	async openCart() {
		await this.shoppingCart.click();
	}

	async openProduct(productName) {
		const product = this.getProduct(productName);

		await product.locator('[data-test="inventory-item-name"]').click();
	}
}
