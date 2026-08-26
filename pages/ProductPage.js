export class ProductPage {
	constructor(page) {
		this.page = page;

		this.productName = page.locator('[data-test="inventory-item-name"]');
		this.productPrice = page.locator('[data-test="inventory-item-price"]');
		this.productImage = page.locator('.inventory_details_img');
		this.productDescription = page.locator('[data-test="inventory-item-desc"]');
		this.backToProductsButton = page.locator('[data-test="back-to-products"]');
	}

	async backToProducts() {
		await this.backToProductsButton.click();
	}
}
