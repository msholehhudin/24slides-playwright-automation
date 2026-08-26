import { Page } from "@playwright/test";

export class LoginPage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto(process.env.ORANGEHRM_BASE_URL!);
  }

  async login(username: string, password: string) {
    await this.page.getByPlaceholder("Username").fill(username);

    await this.page.getByPlaceholder("Password").fill(password);

    await this.page.getByRole("button", { name: "Login" }).click();
  }
}
