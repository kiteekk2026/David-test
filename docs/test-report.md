# Dashboard test report

## Recorded results

| Level | Tests | Result |
| --- | ---: | --- |
| Unit | 28 | All passed locally without a database, including seven Finnish practice content checks |
| API | 0 | Contract drafted, implementation pending partner review |
| End to end | 11 | First GitHub Actions run passed nine and failed two dashboard accessibility checks. Both Finnish practice tests also passed locally in Chromium |
| Manual | 0 | Preview, OAuth, and exploratory testing pending |

Vitest measured 63.63% line coverage across the utility and validation modules.
See the [test plan](test-plan.md) for the other coverage figures.

## Open items

- The first CI run started and reset Supabase successfully. Rerun the browser suite to verify the dashboard accessibility fixes.
- The dashboard CI job passed. GitHub requires the dashboard and browser jobs on `main`.
- Review the [security findings](security-review.md) and verify hosted database permissions.
- The current Vercel production URL returned HTTP 200. Sign-in, invoice lifecycle, new feature deployment, and real handset coverage are pending.

Release recommendation is pending CI, browser testing, and preview smoke testing.

[Initial browser job and trace artifact](https://github.com/kiteekk2026/David-test/actions/runs/44918917191)
