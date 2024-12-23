import { test, expect } from "@playwright/test";
import { CommonPage } from "../../page-objects/commonPage";
import { SearchFuncModal } from "../../page-objects/searchFuncModal";
import urlData from "../../test-data/urls.json";
import teamData from "../../test-data/teams.json";

test.describe("Search Functionality", () => {
    test("Verify should be able to reach any team via search option", async ({ page }) => {
        const commonPage = new CommonPage(page);
        const searchFuncPage = new SearchFuncModal(page);

        const homepageURL = `${urlData.baseURL}${urlData.lang.english}`;
        await commonPage.openURL(homepageURL);
        console.log("Navigated to Homepage.");

        await searchFuncPage.clickEpicSearch();

        for (const team of teamData.teams) {
            console.log(`Searching for team: ${team}`);
            await searchFuncPage.searchForTeam(team);
            const isValid = await searchFuncPage.validateSearchResult(team);
            expect(isValid).toBe(true);
        }
    });
});
