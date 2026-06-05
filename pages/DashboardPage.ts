import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";           

export class DashboardPage extends BasePage {     

    private pageHeading:    Locator;
    private successMessage: Locator;

    constructor(page: Page) {
        super(page);                              

        this.pageHeading    = page.getByTestId("post-hero-title");
        this.successMessage = page.getByRole("status");
    }

    //  getText() from BasePage instead of expect directly
    async verifyDashboard() {
        const message = await this.getText(this.successMessage);
        expect(message).toContain("Logged in successfully");
    }

    //use the text parameter that was passed in
    async verifyHeading(text: string) {
        const heading = await this.getText(this.pageHeading);
        expect(heading).toContain(text);
    }
}