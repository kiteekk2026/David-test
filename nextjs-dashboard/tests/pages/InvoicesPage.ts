import { expect, type Page } from "@playwright/test";

export class InvoicesPage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.goto("/dashboard/invoices");
    await expect(this.page.getByRole("table")).toBeVisible();
  }

  async search(query: string) {
    await this.page.getByLabel("Search", { exact: true }).fill(query);
    await expect(this.page).toHaveURL(new RegExp("query="));
  }

  async submitAmount(amount: string, action: "Create Invoice" | "Edit Invoice") {
    await this.page.getByLabel(/amount/i).fill(amount);
    await this.page.getByRole("button", { name: action, exact: true }).click();
    await expect(this.page).toHaveURL(/\/dashboard\/invoices\/?$/);
  }
}
