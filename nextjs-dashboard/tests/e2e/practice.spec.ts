import { expect, test } from "@playwright/test";

test("scores the lesson and restarts the exercise", async ({ page }) => {
  await page.goto("/practice/index.html");
  await expect(page.getByLabel("Question 1 of 6")).toBeVisible();
  await page.getByRole("radio", { name: "Paskaakin", exact: true }).check();
  await page.getByRole("button", { name: "Check answer" }).click();
  await expect(page.getByText(/The answer is Paskaa/)).toBeVisible();
  await page.getByRole("button", { name: "Next question" }).click();

  for (const answer of ["paskana", "helvetin", "saatana", "perkeleen", "helvettiin"]) {
    await page.getByRole("radio", { name: answer, exact: true }).check();
    await page.getByRole("button", { name: "Check answer" }).click();
    await expect(page.getByText(/^Correct\./)).toBeVisible();
    await page.getByRole("button", { name: /Next question|See results/ }).click();
  }

  await expect(page.getByText("You got 5 out of 6 correct.")).toBeVisible();
  await page.getByRole("button", { name: "Practise again" }).click();
  await expect(page.getByLabel("Question 1 of 6")).toBeVisible();
  await expect(page.getByRole("radio", { name: "Paskaa", exact: true })).not.toBeChecked();
});

test("reloads and answers a question offline on a narrow display", async ({ page, context }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("/practice/index.html");
  await expect(page.getByText("Ready for offline practice")).toBeVisible();
  await page.evaluate(() => new Promise<void>((resolve) => {
    if (navigator.serviceWorker.controller) resolve();
    else navigator.serviceWorker.addEventListener("controllerchange", () => resolve(), { once: true });
  }));

  await context.setOffline(true);
  await page.reload();
  await page.getByRole("radio", { name: "Paskaa", exact: true }).check();
  await page.getByRole("button", { name: "Check answer" }).click();
  await expect(page.getByText(/^Correct\./)).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
});
