import { expect } from '@playwright/test';

export class BasePage {

    constructor(page) {
        this.page = page;
    }

    async openURL(url) {
        await this.page.goto(url);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async validateURL(url) {
        await expect(this.page.url()).toContain(url);
    }
}
