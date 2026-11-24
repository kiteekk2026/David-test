# Developer onboarding

1. Get access to the GitHub repository and clone it. Use Node.js 24 and pnpm 11.5.1.
2. Install Docker and the Supabase CLI. From the repository root, run `supabase start` and `supabase db reset --local`. The reset recreates the local database and loads fixture rows and a test account.
3. Enter `nextjs-dashboard`, run `pnpm install --frozen-lockfile`, and use `.env.test.example` as the basis for `.env.local`. Generate a local Auth.js secret as shown in the [app README](../nextjs-dashboard/README.md).
4. Run `pnpm dev` and open `http://localhost:3000`. Sign in with the local fixture credentials from the example file.
5. Run `pnpm lint`, `pnpm typecheck`, and `pnpm test`. Install Chromium with `pnpm exec playwright install chromium` and run `pnpm test:e2e` against a freshly reset local database.

The repository root contains course documentation and the app lives in `nextjs-dashboard`. Apply local migrations from the repository root and run package commands inside the app directory. The Playwright runner launches its own app process on port 3100 and uses local PostgreSQL on port 54322.
