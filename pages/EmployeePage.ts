import { expect, Page } from "@playwright/test";

export class EmployeePage {
  constructor(private readonly page: Page) {}

  async addNewEmployee(
    firstName: string,
    middleName: string,
    lastName: string,
  ) {
    await this.page.getByRole("link", { name: "PIM" }).click();

    await this.page.getByRole("link", { name: "Add Employee" }).click();

    await this.page.getByPlaceholder("First Name").fill(firstName);
    await this.page.getByPlaceholder("Middle Name").fill(middleName);
    await this.page.getByPlaceholder("Last Name").fill(lastName);

    await this.page.getByRole("button", { name: "Save" }).click();
  }

  // async verifyEmployeeCreated() {}

  async gotoEmployeeList() {
    await this.page.getByRole("link", { name: "PIM" }).click();
  }

  getEmployeeNameInput() {
    return this.page
      .getByRole("textbox", { name: "Type for hints..." })
      .first();
  }

  async searchEmployee(employeeName: string) {
    const employeeNameInput = this.page
      .locator(".oxd-input-group")
      .filter({ hasText: "Employee Name" })
      .getByPlaceholder("Type for hints...");

    await employeeNameInput.fill(employeeName);

    await this.page.getByRole("button", { name: "Search" }).click();
  }

  async openEmployeeDetails(employeeName: string) {
    const employeeRow = this.page
      .getByRole("row")
      .filter({ hasText: employeeName })
      .first();

    await employeeRow.click();
  }

  async verifyEmployeeDetailsPage() {
    await expect(this.page).toHaveURL(/viewPersonalDetails\/empNumber\/\d+/);
  }

  async resetEmployeeSearch() {
    await this.page.getByRole("button", { name: "Reset" }).click();
  }

  async verifyEmployeeDisplayed(employeeName: string) {
    const employeeRow = this.page
      .getByRole("row")
      .filter({ hasText: employeeName })
      .first();

    await expect(employeeRow).toBeVisible();
  }

  async verifyEmployeeCreated(firstName: string, lastName: string) {
    await expect(this.page).toHaveURL(/viewPersonalDetails/);

    await expect(this.page.getByPlaceholder("First Name")).toHaveValue(
      firstName,
    );

    await expect(this.page.getByPlaceholder("Last Name")).toHaveValue(lastName);
  }

  async verifyNoEmployeeResults() {
    await expect(
      this.page.getByText("No Records Found", { exact: true }),
    ).toBeVisible();
  }
}
