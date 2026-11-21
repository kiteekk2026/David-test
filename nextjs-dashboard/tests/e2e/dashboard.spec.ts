import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { InvoicesPage } from "../pages/InvoicesPage";
import { LoginPage } from "../pages/LoginPage";

test("logs in with fixture credentials", async ({ page }) => {
  await new LoginPage(page).signInSuccessfully();
});

test("logs out", async ({ page }) => {
  await new LoginPage(page).signInSuccessfully();
  await page.getByRole("button", { name: "Sign Out" }).click();
  await expect(page).toHaveURL("/");
  await page.goto("/dashboard");
  await expect(page).toHaveURL(/\/login/);
});

test("reports a wrong password", async ({ page }) => {
  await new LoginPage(page).signIn("wrong-password");
  await expect(page.getByText("Invalid credentials.")).toBeVisible();
});

test("redirects an unauthenticated visitor", async ({ page }) => {
  await page.goto("/dashboard/invoices");
  await expect(page).toHaveURL(/\/login/);
});

test("creates, edits, and deletes an invoice", async ({ page }) => {
  await new LoginPage(page).signInSuccessfully();
  const invoices = new InvoicesPage(page);
  await invoices.open();
  await page.getByRole("link", { name: "Create Invoice" }).click();
  await page.getByLabel(/customer/i).selectOption({ label: "Ada Example" });
  await page.getByRole("radio", { name: "Pending" }).check();
  await invoices.submitAmount("901.23", "Create Invoice");

  const invoice = page.getByRole("row").filter({ hasText: "$901.23" });
  await invoice.getByRole("link", { name: /edit/i }).click();
  await invoices.submitAmount("904.56", "Edit Invoice");

  const edited = page.getByRole("row").filter({ hasText: "$904.56" });
  await edited.getByRole("button", { name: "Delete invoice" }).click();
  await expect(edited).toHaveCount(0);
});

test("searches invoices by customer", async ({ page }) => {
  await new LoginPage(page).signInSuccessfully();
  const invoices = new InvoicesPage(page);
  await invoices.open();
  await invoices.search("ada@example.test");
  await expect(page.getByRole("table").getByText("ada@example.test").first()).toBeVisible();
});

test("opens the second invoice page", async ({ page }) => {
  await new LoginPage(page).signInSuccessfully();
  await new InvoicesPage(page).open();
  await page.getByRole("link", { name: "2", exact: true }).click();
  await expect(page).toHaveURL(/page=2/);
  await expect(page.getByRole("row")).toHaveCount(3);
});

for (const path of ["/dashboard", "/dashboard/invoices"]) {
  test(`checks accessibility on ${path}`, async ({ page }) => {
    await new LoginPage(page).signInSuccessfully();
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}
