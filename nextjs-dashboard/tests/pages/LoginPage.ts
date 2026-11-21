import { expect, type Page } from "@playwright/test";

export class LoginPage {
  constructor(private readonly page: Page) {}

  async signIn(password = "local-fixture-password") {
    await this.page.goto("/login");
    await this.page.getByLabel("Email").fill("dashboard@example.test");
    await this.page.getByLabel("Password").fill(password);
    await this.page.getByRole("button", { name: "Log in", exact: true }).click();
  }

  async signInSuccessfully() {
    await this.signIn();
    await expect(this.page).toHaveURL(/\/dashboard\/?$/);
  }
}
