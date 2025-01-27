import { Locator, Page } from '@playwright/test';

export class AddToCartPage {

    constructor(page) {
        this.page = page;
        this.firstItemAddToCartButton = page.locator('.inventory_item:first-child .btn_inventory');
        this.cartIcon = page.locator('.shopping_cart_link');
        this.cartItems = '.cart_item';
    }

    async addFirstItemToCart() {
        await this.firstItemAddToCartButton.click();
        await this.page.waitForTimeout(1500); // Delay after adding item
    }

    async verifyItemAddedToCart() {
        await this.cartIcon.click();
        await this.page.waitForTimeout(1500); // Delay before verifying cart
        await this.page.waitForSelector(this.cartItems);
    }

    async ensureItemInCart() {
        await this.addFirstItemToCart();
    }
}
