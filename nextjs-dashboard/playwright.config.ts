import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e",
  workers: 1,
  use: {
    ...devices["Desktop Chrome"],
    baseURL: "http://127.0.0.1:3100",
    trace: "retain-on-failure",
  },
  webServer: {
    command: process.env.PLAYWRIGHT_USE_BUILD === "1"
      ? "pnpm start --hostname 127.0.0.1 --port 3100"
      : "pnpm dev --hostname 127.0.0.1 --port 3100",
    url: "http://127.0.0.1:3100/practice/index.html",
    timeout: 120_000,
    env: {
      DATABASE_SESSION_URL: "postgresql://postgres:postgres@127.0.0.1:54322/postgres",
      AUTH_SECRET: "playwright-local-only-session-fixture",
      SKIP_DB_DURING_BUILD: "false",
    },
  },
});
