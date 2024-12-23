import { test, expect } from '@playwright/test'
import { SportsPage } from '../../page-objects/sportsPage'
import testData from '../../test-data/urls.json'
import { LiveSportsPage} from '../../page-objects/liveSportsPage'
import { CommonPage } from '../../page-objects/commonPage'

test.describe('Verify Live Odds', () => {
    let sportsPage: SportsPage
    let liveSportsPage: LiveSportsPage
    let commonPage: CommonPage


    test.beforeEach(async ({ page }) => {
        liveSportsPage = new LiveSportsPage(page);
        commonPage = new CommonPage(page);
        sportsPage = new SportsPage(page);
        await sportsPage.openURL(`${testData.baseURL}${testData.lang.english}${testData.liveBettingURL}`);
        await commonPage.validateURL(testData.liveBettingURL);
    });

    test('Verify the list of Live Odds showing', async () => {
        await commonPage.scrollIntoViewIfNeeded()
        await liveSportsPage.validateLiveOdds()
        
    })
});

