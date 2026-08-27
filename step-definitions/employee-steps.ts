import { Given, When, Then } from "@cucumber/cucumber";

import { CustomWorld } from "../support/world";
import { LoginPage } from "../pages/LoginPage";
import { EmployeePage } from "../pages/EmployeePage";

Given("I am logged in to OrangeHRM", async function (this: CustomWorld) {
  console.log("1. Starting login");
  this.loginPage = new LoginPage(this.page);

  console.log("2. Going to login page");

  await this.loginPage.goto();

  console.log("3. Login page loaded");

  await this.loginPage.login(
    process.env.ORANGEHRM_USERNAME!,
    process.env.ORANGEHRM_PASSWORD!,
  );
});

When(
  "I search for employee {string}",
  async function (this: CustomWorld, employeeName: string) {
    this.employeePage = new EmployeePage(this.page);

    await this.employeePage.gotoEmployeeList();
    await this.employeePage.searchEmployee(employeeName);
  },
);

Then(
  "I should see employee {string} in the search results",
  async function (this: CustomWorld, employeeName: string) {
    await this.employeePage.verifyEmployeeDisplayed(employeeName);
  },
);
