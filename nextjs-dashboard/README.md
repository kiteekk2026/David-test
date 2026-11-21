# Acme Dashboard

The dashboard tracks customers, invoices, and revenue. The overview shows paid
and pending totals. The invoices page supports search, pagination, and editing.
The customers page supports search, customer profiles, and customer management.

## Local setup

Install Node.js 24 and pnpm 11.5.1. From the repository root, run:

```sh
cd nextjs-dashboard
pnpm install --frozen-lockfile
```

With Docker and the Supabase CLI running, run `supabase start` and
`supabase db reset --local` from the repository root. The reset applies migrations
and provisions the disposable test account listed in `.env.test.example`.
Create `.env.local` in this app directory using the example for reference and
generate a local secret. Hosted PostgreSQL connections require TLS.

| Variable | Purpose |
| --- | --- |
| `DATABASE_SESSION_URL` | PostgreSQL session connection for dashboard data and credentials sign-in |
| `AUTH_SECRET` | Secret for Auth.js. Generate it with `node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"` |
| `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET` | Optional GitHub sign-in |
| `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET` | Optional Google sign-in |

Run `pnpm dev`, open [localhost:3000](http://localhost:3000), and sign in with
the development account. Run `pnpm lint`, `pnpm typecheck`, and `pnpm test`
to check the code. Run `pnpm coverage` for the unit coverage summary.

The landing page links to Finnish in Context. Open the practice page online
once and wait for its offline-ready message before disconnecting.

## OAuth sign-in

Email and password sign-in remains available. GitHub and Google sign-in are
enabled when their OAuth client ID and secret are configured.
Social sign-in creates a dashboard account on the first sign-in using the
provider's verified email. GitHub and Google emails must be verified. A
random password is generated for OAuth-only accounts, which can still use
OAuth to sign in:

| Provider | Environment variables | Callback URL |
| --- | --- | --- |
| GitHub | `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET` | `/api/auth/callback/github` |
| Google | `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET` | `/api/auth/callback/google` |

Register each callback URL with the provider using both the local origin
(`http://localhost:3000`) and the deployed origin. Add the matching environment
variables to the local `.env` file and the Vercel project settings, then restart
or redeploy the app. The provider buttons remain disabled until both variables
for that provider are configured.

Google sign-in always requests account selection. To switch dashboard users,
sign out of the dashboard first. GitHub OAuth uses the account currently signed
in to GitHub in the browser; sign out of GitHub or use a separate browser
profile to choose a different GitHub account.
