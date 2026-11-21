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
    command: "pnpm dev --hostname 127.0.0.1 --port 3100",
    url: "http://127.0.0.1:3100/login",
    timeout: 120_000,
    env: {
      DATABASE_SESSION_URL: "postgresql://postgres:postgres@127.0.0.1:54322/postgres",
      AUTH_SECRET: "playwright-local-only-session-fixture",
      SKIP_DB_DURING_BUILD: "false",
    },
  },
});
