import { expect, Page } from "@playwright/test";

export class EmployeePage {
  constructor(private readonly page: Page) {}

  async gotoEmployeeList() {
    await this.page.getByRole("link", { name: "PIM" }).click();
  }

  async searchEmployee(employeeName: string) {
    const employeeNameInput = this.page
      .locator(".oxd-input-group")
      .filter({ hasText: "Employee Name" })
      .getByPlaceholder("Type for hints...");

    await employeeNameInput.fill(employeeName);

    await this.page.getByRole("button", { name: "Search" }).click();
  }

  async verifyEmployeeDisplayed(employeeName: string) {
    const employeeRow = this.page
      .getByRole("row")
      .filter({ hasText: employeeName })
      .first();

    await expect(employeeRow).toBeVisible();
  }
}
