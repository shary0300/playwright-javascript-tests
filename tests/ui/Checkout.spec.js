import { test, expect } from "@playwright/test";
import { CheckoutPage } from "../../page-objects/CheckoutPage";
import { AddToCartPage } from "../../page-objects/addToCartPage";
import { LoginPage } from "../../page-objects/LoginPage";
import { BasePage } from "../../page-objects/BasePage";
import urls from "../../test-data/frontEnd/urls.json";
import users from "../../test-data/frontEnd/users.json";

test.describe("Checkout functionality @ui", () => {
    let loginPage;
    let basePage;
    let checkoutPage;
    let addToCartPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        basePage = new BasePage(page);
        checkoutPage = new CheckoutPage(page);
        addToCartPage = new AddToCartPage(page);

        await basePage.openURL(urls.baseURL);
    });

    test("Complete checkout successfully", async () => {
        const user = users.users[0];

        await loginPage.login(user.username, user.password);
        await basePage.validateURL(`${urls.baseURL}inventory.html`);

        await addToCartPage.addFirstItemToCart();
        await addToCartPage.verifyItemAddedToCart();

        await checkoutPage.goToCheckout();
        await checkoutPage.fillCheckoutForm("John", "Doe", "12345");
        await checkoutPage.continueCheckout();
        await checkoutPage.finishCheckout();

        await basePage.validateURL(`${urls.baseURL}checkout-complete.html`);
    });
});
