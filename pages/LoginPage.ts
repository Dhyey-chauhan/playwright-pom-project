import { expect, Page } from '@playwright/test';
import BasePage from './BasePage';

class LoginPage extends BasePage {

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    //  locators object like reference
    locators = {
        usernameInput: 'login-email-input',
        passwordInput: 'login-password-input',
        loginButton:   'login-submit-button',
        errorMessage:  '[role="status"]',
    };

    // getter methods like reference
    getUsernameInput() {
        return this.page.getByTestId(this.locators.usernameInput);
    }

    getPasswordInput() {
        return this.page.getByTestId(this.locators.passwordInput);
    }

    getLoginButton() {
        return this.page.getByTestId(this.locators.loginButton);
    }

    getErrorMessage() {
        return this.page.locator(this.locators.errorMessage);
    }

    //   goto method
    async goto(): Promise<void> {
        await this.navigateTo('/login');
    }

    //  fillUsername like reference
    async fillUsername(value: string): Promise<void> {
        await expect(this.getUsernameInput()).toBeVisible();
        await this.getUsernameInput().pressSequentially(value, { delay: 100 });
    }

    // fillPassword like reference
    async fillPassword(value: string): Promise<void> {
        await expect(this.getPasswordInput()).toBeVisible();
        await this.getPasswordInput().pressSequentially(value, { delay: 100 });
    }

    //  clickLogin like reference
    async clickLogin(): Promise<void> {
        await expect(this.getLoginButton()).toBeVisible();
        await this.getLoginButton().click();
    }

    //  combined login method
    async login(username: string, password: string): Promise<void> {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLogin();
    }

    //  from reference
    async expectErrorMessageVisible(): Promise<void> {
        await expect(this.getErrorMessage()).toBeVisible();
    }

    // from reference
    async expectErrorMessageText(text: string): Promise<void> {
        await expect(this.getErrorMessage()).toHaveText(text);
    }
}

//  export default like reference
export default LoginPage;