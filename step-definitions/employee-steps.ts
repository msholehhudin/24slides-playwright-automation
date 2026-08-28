import { Given, When, Then } from "@cucumber/cucumber";

import { CustomWorld } from "../support/world";
import { LoginPage } from "../pages/LoginPage";
import { EmployeePage } from "../pages/EmployeePage";
import { expect } from "@playwright/test";

Given("I am logged in to OrangeHRM", async function (this: CustomWorld) {
  this.loginPage = new LoginPage(this.page);

  await this.loginPage.goto();

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

When("I reset the employee search", async function (this: CustomWorld) {
  await this.employeePage.resetEmployeeSearch();
});

When(
  "I open the employee details for {string}",
  async function (this: CustomWorld, employeeName: string) {
    await this.employeePage.openEmployeeDetails(employeeName);
  },
);

Then(
  "I should see employee {string} in the search results",
  async function (this: CustomWorld, employeeName: string) {
    await this.employeePage.verifyEmployeeDisplayed(employeeName);
  },
);

Then(
  "the employee search field should be empty",
  async function (this: CustomWorld) {
    await expect(this.employeePage.getEmployeeNameInput()).toHaveValue("");
  },
);

Then(
  "I should see the employee details page",
  async function (this: CustomWorld) {
    await this.employeePage.verifyEmployeeDetailsPage();
  },
);

When(
  "I add a new employee with valid information",
  async function (this: CustomWorld) {
    this.employeePage = new EmployeePage(this.page);

    await this.employeePage.addNewEmployee("Automation", "Test", "Sholehhudin");
  },
);

Then(
  "I should see the employee personal details page",
  async function (this: CustomWorld) {
    await this.employeePage.verifyEmployeeDetailsPage();
  },
);

Then(
  "the employee should be successfully created",
  async function (this: CustomWorld) {
    await this.employeePage.verifyEmployeeCreated("Automation", "Sholehhudin");
  },
);

Then("I should see no employee results", async function (this: CustomWorld) {
  await this.employeePage.verifyNoEmployeeResults();
});
