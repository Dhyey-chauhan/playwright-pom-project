// tests/login.spec.ts

import { test, expect }     from "@playwright/test";
import { LoginPage }       from "../pages/LoginPage";
import { DashboardPage }    from "../pages/DashBoardPage";
import { validUser, invalidUser } from "../utils/testData";

test.describe("Login Test Suite", () => {

    //  Declare page objects
    let loginPage:     LoginPage;
    let dashboardPage: DashboardPage;

    //  Before each test — create fresh page objects
    test.beforeEach(async ({ page }) => {
        loginPage     = new LoginPage(page);
        dashboardPage = new DashboardPage(page);

        // Go to login page before each test
        await loginPage.goto();
    });

    // After each test — can be used for cleanup or logging
    test.afterEach(async () => {
        console.log("Test completed");
    });


    // TEST 1
    test("should login with valid credentials and verify dashboard", async () => {

        //  One line login!
        await loginPage.login(validUser.username, validUser.password);

        //  Verify dashboard
        await dashboardPage.verifyDashboard();

        console.log(" Combined login passed!");
    });

    // TEST 2 - Invalid Login
    test.only("should show error for invalid credentials", async () => {

        await loginPage.login(
            invalidUser.username,
            invalidUser.password
        );

        //  Verify error message
        const error = await loginPage.getErrorMessage();
        console.log("Error message:", error);

        expect(error).toContain("failed");
        console.log(" Invalid login test failed as expected!");
    });
});