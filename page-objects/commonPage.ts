import { expect, Locator, Page } from "@playwright/test";

export class CommonPage {
    readonly page: Page;
    readonly ContactUs: Locator;

    constructor(page: Page) {
        this.page = page;
        this.ContactUs = page.locator('xpath=//*[text()="Contact Us"]');
    }

    async openURL(url: string) {
        await this.page.goto(url);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async validateURL(url: string) {
        await expect(this.page.url()).toContain(url);
    }

    async scrollIntoViewIfNeeded() {
        const maxScrollAttempts = 50;
        let foundContactUs = false;
        for (let i = 0; i < maxScrollAttempts; i++) {
            await this.page.evaluate(() => {
                window.scrollBy(0, 1000);
            });
            if (await this.ContactUs.isVisible()) {
                foundContactUs = true;
                break;
            }
            await this.page.waitForTimeout(500);
        }
        if (!foundContactUs) {
            throw new Error("Contact Us link not found.");
        }
    }
}
