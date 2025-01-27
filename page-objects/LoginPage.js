import { Locator, Page, expect } from "@playwright/test";

export class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameField = page.locator('#user-name');
        this.passwordField = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.errorMessage = page.locator('//h3[@data-test="error"]');
    }

    async login(username, password) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }

    async validateErrorMessage(expectedMessage) {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toHaveText(expectedMessage);
    }
}
