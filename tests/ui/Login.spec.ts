import { test, expect }  from "@playwright/test";
import LoginPage         from "../../pages/LoginPage";
import DashboardPage     from "../../pages/DashboardPage"
import { validUser, invalidUser } from "../../utils/testData";

test.describe("Login Test Suite", () => {

    let loginPage:      LoginPage;
    let dashboardPage:  DashboardPage;

    test.beforeEach(async ({ page }) => {
        loginPage     = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        await loginPage.goto();
    });

    test.afterEach(async () => {
        console.log("Test completed");
    });

    // TEST 1 — Valid Login
    test("should login with valid credentials and verify dashboard", async () => {

        // login
        await loginPage.login(validUser.username, validUser.password);

        // verify dashboard
        await dashboardPage.verifyDashboard();

        console.log("Valid login passed!");
    });

    // TEST 2 — Invalid Login
    // REMOVED test.only
    test("should show error for invalid credentials", async () => {

        await loginPage.login(
            invalidUser.username,
            invalidUser.password
        );

        //  CHANGED — use new methods from LoginPage
        await loginPage.expectErrorMessageVisible();
        await loginPage.expectErrorMessageText("Invalid credentials");

        console.log("Invalid login test passed!");
    });
});