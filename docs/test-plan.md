# Dashboard test plan

| Level | Scope | Tool and environment |
| --- | --- | --- |
| Unit | Invoice and customer validation, currency and date formatting, pagination | Vitest, local and CI, no database |
| Integration and API | Auth, paging and search, record lifecycle, invalid input, missing records | HTTP tests, isolated PostgreSQL fixtures |
| End to end | Login and logout, protected pages, invoice CRUD, search and pagination | Playwright, seeded isolated app |
| Manual | Preview smoke test, keyboard navigation and focus, real OAuth redirects | Browser and Vercel preview |

Production customer data, real OAuth consent screens in automation, and provider infrastructure are outside this test plan.

## Entry and exit criteria

Start when acceptance criteria and test accounts are available and the test database can be reset. A release candidate exits with passing required checks, a successful preview smoke test, and any remaining defects recorded with their severity and owner.

## Roles and risks

The developer runs automated checks and records results. The reviewer checks acceptance criteria and test gaps. The product owner accepts the demo against the criteria. Database isolation limits accidental data changes, while deterministic fixtures and role-based locators reduce fragile tests.

## Unit baseline

The dashboard unit suite contains 21 tests.
Coverage for the two measured modules, `utils.ts` and `schemas.ts`, was
62.85% statements, 52.63% branches, 75% functions, and 63.63% lines.
