import { Locator, Page, expect } from "@playwright/test";

export class LiveSportsPage {
    readonly page: Page;
    readonly activeOdds: Locator;
    readonly inactiveOdds: Locator;

    constructor(page: Page) {
        this.page = page;
        this.activeOdds = page.locator('//*[@data-testid="outcome-button"]/span[2]');
    }

    // Fetch all active odds as an array of strings
    async getActiveOdds(): Promise<string[]> {
        const activeOddsTexts = await this.activeOdds.allInnerTexts();
        console.log(`Active Odds: ${activeOddsTexts}`);
        return activeOddsTexts;
    }


    // Fetch all inactive odds as an array of strings
    async getInactiveOdds(): Promise<string[]> {
        const inactiveOddsTexts = await this.inactiveOdds.allInnerTexts();
        console.log(`Inactive Odds: ${inactiveOddsTexts}`);
        return inactiveOddsTexts;
    }

    async validateLiveOdds() {
        const odds = await this.activeOdds.allTextContents();
        odds.forEach((odd, index) => {
            const isValid = /^\d+(\.\d+)?$/.test(odd); // Regex for decimal format
            expect(isValid, `Active Odd at index ${index} (${odd}) is not in valid decimal format`).toBeTruthy();
        });
        console.log(`Validated ${odds.length} live Active odds:`, odds);



    }
}


