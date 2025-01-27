import { Locator, Page, expect } from "@playwright/test";

export class CheckoutPage {

    constructor(page) {
        this.page = page;
        this.checkoutButton = page.locator('.checkout_button');
        this.firstNameField = page.locator('#first-name');
        this.lastNameField = page.locator('#last-name');
        this.postalCodeField = page.locator('#postal-code');
        this.continueButton = page.locator('.cart_button');
        this.finishButton = page.locator('#finish');
        this.errorMessage = page.locator('.error-message');
    }

    async goToCheckout() {
        await this.checkoutButton.click();
    }

    async fillCheckoutForm(firstName, lastName, postalCode) {
        await this.firstNameField.fill(firstName);
        await this.lastNameField.fill(lastName);
        await this.postalCodeField.fill(postalCode);
    }

    async continueCheckout() {
        await this.continueButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async finishCheckout() {
        await this.page.waitForSelector('#finish', { state: 'visible' });
        await this.page.waitForLoadState('domcontentloaded');
        
        if (this.page.isClosed()) {
            throw new Error("The page was unexpectedly closed before interacting with the finish button.");
        }

        await this.finishButton.click();
        await this.page.waitForLoadState('load');
    }

    async validateErrorMessage(expectedMessage) {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toHaveText(expectedMessage);
    }
}
