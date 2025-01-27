import { test, expect } from "@playwright/test";
import { LoginPage } from "../../page-objects/LoginPage";
import { BasePage } from "../../page-objects/BasePage";
import { AddToCartPage } from "../../page-objects/addToCartPage";
import { CheckoutPage } from "../../page-objects/CheckoutPage";
import urls from "../../test-data/frontEnd/urls.json";
import users from "../../test-data/frontEnd/users.json";

test.describe("End-to-End Product Purchase Flow @ui", () => {
    let loginPage;
    let basePage;
    let addToCartPage;
    let checkoutPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        basePage = new BasePage(page);
        addToCartPage = new AddToCartPage(page);
        checkoutPage = new CheckoutPage(page);

        await basePage.openURL(urls.baseURL);
    });

    const { username, password } = users.users.find(user => user.username === "standard_user");

    test(`E2E Purchase Flow for ${username}`, async ({ page }) => {
        await loginPage.login(username, password);
        await basePage.validateURL(`${urls.baseURL}inventory.html`);

        await addToCartPage.addFirstItemToCart();
        await addToCartPage.verifyItemAddedToCart();

        await checkoutPage.goToCheckout();
        await checkoutPage.fillCheckoutForm("John", "Doe", "12345");
        await checkoutPage.continueCheckout();
        await checkoutPage.finishCheckout();

        await basePage.validateURL(`${urls.baseURL}checkout-complete.html`);
    });

    test("E2E Purchase Flow with Invalid Login", async () => {
        const invalidUser = { username: "invalid_user", password: "invalid_password" };

        await loginPage.login(invalidUser.username, invalidUser.password);
        await loginPage.validateErrorMessage("Epic sadface: Username and password do not match any user in this service");
    });

    test("E2E Purchase Flow without Credentials", async () => {
        await loginPage.login("", "");
        await loginPage.validateErrorMessage("Epic sadface: Username is required");
    });
});
