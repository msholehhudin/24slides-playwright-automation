import { Given, When, Then } from "@cucumber/cucumber";

import { CustomWorld } from "../support/world";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";

Given("I am on the OrangeHRM login page", async function (this: CustomWorld) {
  this.loginPage = new LoginPage(this.page);

  await this.loginPage.goto();
});

When(
  "I log in with valid administrator credentials",
  async function (this: CustomWorld) {
    await this.loginPage.login(
      process.env.ORANGEHRM_USERNAME!,
      process.env.ORANGEHRM_PASSWORD!,
    );
  },
);

When("I log in with invalid credentials", async function (this: CustomWorld) {
  await this.loginPage.login(process.env.ORANGEHRM_USERNAME!, "wrong-password");
});

Then(
  "I should see the OrangeHRM dashboard",
  async function (this: CustomWorld) {
    this.dashboardPage = new DashboardPage(this.page);

    await this.dashboardPage.verifyDashboardIsDisplayed();
  },
);

Then(
  "I should see the login error message",
  async function (this: CustomWorld) {
    await this.loginPage.verifyLoginErrorMessage();
  },
);
