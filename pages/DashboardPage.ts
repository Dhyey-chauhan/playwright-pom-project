import { Page, expect } from '@playwright/test';
import BasePage from './BasePage';

class DashboardPage extends BasePage {

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    //  locators object like reference pattern
    locators = {
        pageHeading:    'post-hero-title',
        successMessage: '[role="status"]',
    };

    //  getter methods like reference pattern
    getPageHeading() {
        return this.page.getByTestId(this.locators.pageHeading);
    }

    getSuccessMessage() {
        return this.page.locator(this.locators.successMessage);
    }

    //  using expect directly like reference pattern
    async verifyDashboard(): Promise<void> {
        await expect(this.getSuccessMessage()).toBeVisible();
        await expect(this.getSuccessMessage())
            .toContainText("Logged in successfully");
    }

    //  using expect directly like reference pattern
    async verifyHeading(text: string): Promise<void> {
        await expect(this.getPageHeading()).toBeVisible();
        await expect(this.getPageHeading()).toContainText(text);
    }

    //  verify page title using BasePage method
    async verifyPageTitle(title: string): Promise<void> {
        const pageTitle = await this.getPageTitle();
        expect(pageTitle).toContain(title);
    }
}

//  export default like reference
export default DashboardPage;