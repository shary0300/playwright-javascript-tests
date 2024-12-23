import { Locator, Page } from "@playwright/test";

export class SearchFuncModal {
    readonly page: Page;
    readonly EpicSearchButton: Locator;
    readonly SearchModalInput: Locator;
    readonly SearchResult: Locator;

    constructor(page: Page) {
        this.page = page;
        this.EpicSearchButton = page.locator('[data-testid="search-button"]'); 
        this.SearchModalInput = page.locator('[data-testid="search-input"]'); 
        this.SearchResult = page.locator('div._1i2drbw0');
    }

    async clickEpicSearch() {
        await this.EpicSearchButton.click();
        console.log("Clicked on the Epic Search button.");
    }

    async searchForTeam(teamName: string) {
        await this.SearchModalInput.fill(teamName);
        console.log(`Entered "${teamName}" in the search input.`);
    }

    async validateSearchResult(expectedResult: string) {
        // await this.SearchResult.waitFor({ state: 'visible', timeout: 15000 });
        // await this.page.waitForTimeout(1000); 
        const resultText = await this.SearchResult.textContent();
        if (resultText) {
            console.log(`Search result validated: ${resultText}`);
            return resultText.trim() === expectedResult;
        }
        return false;
    }
}
