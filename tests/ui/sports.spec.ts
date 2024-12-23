import { test, expect } from '@playwright/test'
import { SportsPage } from '../../page-objects/sportsPage'
import testData from '../../test-data/urls.json'
import { CommonPage } from '../../page-objects/commonPage'

test.describe('user flow functionality', () => {
    let sportsPage: SportsPage
    let commonPage: CommonPage


    test.beforeEach(async ({ page }) => {
        sportsPage = new SportsPage(page)
        commonPage = new CommonPage(page);
        await sportsPage.openURL(`${testData.baseURL}${testData.lang.english}${testData.sportsURL}`);
        await sportsPage.validateSportsPage()
       
    })

    test('Ensure that users can navigate to LiveCategory page.', async () => {
        await sportsPage.LiveCategory.click();
        await commonPage.validateURL(testData.liveBettingURL);
    })
    
    test('Ensure that users can navigate to PromotionCategory page.', async () => {
        await sportsPage.PromotionCategory.click();
        await commonPage.validateURL(testData.promotionURL);
    })

    test('Ensure that users can navigate to ContactUs page.', async () => {
        await commonPage.scrollIntoViewIfNeeded();
        await commonPage.ContactUs.click();
        await commonPage.validateURL(testData.contactUs);
    })

})