import { expect, Locator, Page } from "@playwright/test";


export class SportsPage {
    readonly page: Page
    readonly HomeCategory: Locator
    readonly LiveCategory: Locator
    readonly PromotionCategory: Locator
  

    constructor(page: Page) {
        this.page = page;
        this.HomeCategory = page.locator('[data-testid="category-lobby-tab-button"]');
        this.LiveCategory = page.locator('[data-testid="category-live-tab-button"]');
        this.PromotionCategory = page.locator('[data-testkey="user.account.promotions"]');
    
    }

    // Open the sports page URL
    async openURL(url: string) {
        await this.page.goto(url);
        await this.page.waitForLoadState('domcontentloaded');
    }

    // Validate if the sports page is loaded properly
    async validateSportsPage() {
        const pageTitle = await this.page.title();
        if (pageTitle !== 'Epicbet - Your favorite sportsbook.') {
            throw new Error(`Page title does not match. Expected: 'Epicbet - Your favorite sportsbook.', but found: ${pageTitle}`);
        }
        await this.HomeCategory.waitFor();
    
    }
}