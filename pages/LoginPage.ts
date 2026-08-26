import { Page } from "@playwright/test";

export class LoginPage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto("https://opensource-demo.orangehrmlive.com/");
  }

  async login(username: string, password: string) {
    await this.page.getByPlaceholder("Username").fill(username);

    await this.page.getByPlaceholder("Password").fill(password);

    await this.page.getByRole("button", { name: "Login" }).click();
  }
}
