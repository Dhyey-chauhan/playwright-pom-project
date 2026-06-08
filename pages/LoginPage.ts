import { expect, Page } from '@playwright/test';
import BasePage from './BasePage';
import { validUser } from '../utils/testData';

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
        profileIcon: 'header-user-icon',
        myProfile: 'my-profile-title',
        myProfileEmailInput: 'my-profile-email-input',
        logoutButton:  'Log Out',
        logoutMessage: 'Logged out successfully'
    };

    async goto(): Promise<void> {
        await this.navigateTo(`${process.env.BASE_URL}` );
    }

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

    getProfileIcon() {
        return this.page.getByTestId(this.locators.profileIcon);
    }

    getLogoutButton() {
        return this.page.getByText(this.locators.logoutButton);
    }

    getLogoutMessage() {
        return this.page.getByText(this.locators.logoutMessage);
    }

    getMyProfileTitle() {
        return this.page.getByTestId(this.locators.myProfile);
    }

    getMyProfileEmailInput() {
        return this.page.getByTestId(this.locators.myProfileEmailInput);
    }

    //  fillUsername like reference
    async fillUsername(value: string): Promise<void> {
        await expect(this.getUsernameInput()).toBeVisible();
        await this.getUsernameInput().pressSequentially(value, { delay: 100 });
    }

    // fillPassword like reference
    async fillPassword(value: string): Promise<void> {
        await expect(this.getPasswordInput()).toBeVisible();
        await this.getPasswordInput().pressSequentially(value, { delay: 100 })
    }

    //  clickLogin like reference
    async clickLogin(): Promise<void> {
        await expect(this.getLoginButton()).toBeVisible();
        await this.getLoginButton().click();

         await this.page.waitForLoadState('networkidle');
         console.log('After login URL:', this.page.url());
    }

    async clickProfileIcon(): Promise<void> {
    //  Wait for profile icon
    await expect(this.getProfileIcon()).toBeVisible({ timeout: 100000 });
    await this.getProfileIcon().click();
}

    async clickLogoutButton(): Promise<void> {
        await this.page.getByText('Log Out').waitFor({ state: 'visible' });
        await this.page.getByText('Log Out').click();
    }

    async verifyMyProfile(): Promise<void> {
    //  Verify title
    await expect(this.getMyProfileTitle())
        .toBeVisible({ timeout: 100000 });
    await expect(this.getMyProfileTitle())
        .toHaveText("My Profile");

    // toHaveValue not toHaveText for input
    await expect(this.getMyProfileEmailInput())
        .toBeVisible({ timeout: 100000 });
    await expect(this.getMyProfileEmailInput())
        .toHaveValue(validUser.username);
}

    //  combined login method
    async login(username: string, password: string): Promise<void> {

    await expect(this.getProfileIcon()).toBeVisible({ timeout: 10000 });
    await this.getProfileIcon().click();

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

    //  from reference
    async expectLogoutMessageVisible(): Promise<void> {
        await expect(this.getLogoutMessage()).toBeVisible();
    }
}

//  export default like reference
export default LoginPage;