import { Page, Locator, expect } from "@playwright/test";

export class BasePage {

    //  protected — so child classes  can access it
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // every page uses this
    async goto(url: string) {
        await this.page.goto(url);
        //  Wait for page to fully load 
        await this.page.waitForLoadState("domcontentloaded");
    }

    //  Reusable fill — clears first, then fills
    async fillField(locator: Locator, value: string) {
        await locator.waitFor({ state: "visible" });
        await locator.clear();
        await locator.fill(value);
    }

    //  Reusable click — waits before clicking
    async clickElement(locator: Locator) {
        //  Wait for element — your code was missing this
        await locator.waitFor({ state: "visible" });
        await locator.click();
    }

    //  — waits and returns text
    async getText(locator: Locator): Promise<string> {
        await locator.waitFor({ state: "visible" });
        return await locator.textContent() ?? "";
    }

    // Reusable URL verify
    async verifyUrl(expectedUrl: string | RegExp) {
        await expect(this.page).toHaveURL(expectedUrl);
    }
}