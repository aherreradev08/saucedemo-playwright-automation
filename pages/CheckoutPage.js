export class CheckoutPage {
	constructor(page) {
		this.page = page;

		this.pageTitle = page.locator('[data-test="title"]');
		this.firstNameInput = page.locator('[data-test="firstName"]');
		this.lastNameInput = page.locator('[data-test="lastName"]');
		this.postalCodeInput = page.locator('[data-test="postalCode"]');
		this.continueButton = page.locator('[data-test="continue"]');
		this.cancelButton = page.locator('[data-test="cancel"]');
		this.finishButton = page.locator('[data-test="finish"]');
		this.errorMessage = page.locator('[data-test="error"]');
		this.successMessage = page.locator('[data-test="complete-header"]');
	}

	async fillCheckoutInformation(firstName, lastName, postalCode) {
		await this.firstNameInput.fill(firstName);
		await this.lastNameInput.fill(lastName);
		await this.postalCodeInput.fill(postalCode);
	}

	async continueToOverview() {
		await this.continueButton.click();
	}

	async cancelCheckout() {
		await this.cancelButton.click();
	}

	async finishCheckout() {
		await this.finishButton.click();
	}
}
