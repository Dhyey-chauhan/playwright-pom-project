import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";       


export class LoginPage extends BasePage {


  // locators specific to LoginPage
    private usernameInput: Locator;
    private passwordInput: Locator;
    private loginButton:   Locator;
    private errorMessage:  Locator;

    constructor(page: Page) {

      // base class constructor
        super(page);

        // locators initialization
        this.usernameInput = page.getByTestId("login-email-input");
        this.passwordInput = page.getByTestId("login-password-input");
        this.loginButton   = page.getByTestId("login-submit-button");
        this.errorMessage  = page.getByRole("status");
    }

    async goto() {
        await super.goto("/login");
    }

    async login(username: string, password: string) {

        
        await this.fillField(this.usernameInput, username);
        await this.fillField(this.passwordInput, password);

        //  use clickElement() from BasePage
        await this.clickElement(this.loginButton);
    }

    async getErrorMessage(): Promise<string> {
        return await this.getText(this.errorMessage);
    }
}