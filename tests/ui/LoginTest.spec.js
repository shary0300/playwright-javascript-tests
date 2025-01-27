import { test, expect } from "@playwright/test";
import { LoginPage } from "../../page-objects/LoginPage";
import { BasePage } from "../../page-objects/BasePage";
import urls from "../../test-data/frontEnd/urls.json";
import userDetails from "../../test-data/frontEnd/users.json";

test.describe("Login functionality @ui", () => {
    let loginPage;
    let basePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        basePage = new BasePage(page);

        await basePage.openURL(urls.baseURL);
    });

    userDetails.users.forEach(({ username, password }) => {
        test(`testing with ${username}`, async ({ page }) => {
        await loginPage.login(username, password);
        await basePage.validateURL(`${urls.baseURL}inventory.html`);
        });
      });

    test("Login with invalid credentials", async () => {
        await loginPage.login("invalid_user", "invalid_password");
        await loginPage.validateErrorMessage(
            "Epic sadface: Username and password do not match any user in this service"
        );
    });

    test("Login without credentials", async () => {
        await loginPage.login("", "");
        await loginPage.validateErrorMessage("Epic sadface: Username is required");
    });
});
