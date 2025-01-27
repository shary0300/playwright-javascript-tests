import { test, expect, Page } from '@playwright/test';
import { LoginPage } from "../../page-objects/LoginPage";
import { BasePage } from "../../page-objects/BasePage";
import { AddToCartPage } from "../../page-objects/addToCartPage";
import urls from "../../test-data/frontEnd/urls.json";
import users from "../../test-data/frontEnd/users.json";

test.describe("Add to Cart functionality @ui", () => {
    let loginPage;
    let basePage;
    let addToCartPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page); 
        basePage = new BasePage(page);
        addToCartPage = new AddToCartPage(page);

        await basePage.openURL(urls.baseURL);
    });

    test("Add an item to the cart after login", async () => {
        const user = users.users[0];
        
        await loginPage.login(user.username, user.password); 
        await basePage.validateURL(`${urls.baseURL}inventory.html`);
        
        await addToCartPage.ensureItemInCart();
        await addToCartPage.verifyItemAddedToCart();
    });
});
