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

    await test.step("Login with valid credentials", async () => {
        await loginPage.login(
            validUser.username,
            validUser.password
        );
    });

    await test.step("Verify dashboard page", async () => {
        await dashboardPage.verifyDashboard();
    });

});

    // TEST 2 — Invalid Login
    // REMOVED test.only
  test("should show error for invalid credentials", async () => {

    await test.step("Login with invalid credentials", async () => {
        await loginPage.login(
            invalidUser.username,
            invalidUser.password
        );
    });

    await test.step("Verify error message is visible", async () => {
        await loginPage.expectErrorMessageVisible();
    });

    await test.step("Verify error message text", async () => {
        await loginPage.expectErrorMessageText("Invalid credentials");
    });

});

    // TEST 3 — Logout
   test("should logout successfully", async () => {

    await test.step("Login with valid credentials", async () => {
        await loginPage.login(validUser.username, validUser.password);
        //  Wait for any redirect to complete
        await loginPage.page.waitForLoadState('networkidle');
        await loginPage.page.waitForTimeout(3000);
        await loginPage.clickProfileIcon();

    });

    await test.step("Click logout from sidebar", async () => {
        await loginPage.clickLogoutButton();

    });

    await test.step("Verify logout message", async () => {
        await loginPage.expectLogoutMessageVisible();
    });
});

    // TEST 4 — Verify My Profile
    test.only("should navigate to My Profile and verify", async () => { 

        await test.step("Login with valid credentials", async () => {
        await loginPage.login(validUser.username, validUser.password);
        //  Wait for any redirect to complete
    
        await loginPage.page.waitForLoadState('networkidle');
        await loginPage.page.waitForTimeout(3000);
        await loginPage.clickProfileIcon();
    });

    await test.step("verify my profile page", async () => {})
    await loginPage.verifyMyProfile();
    })



});