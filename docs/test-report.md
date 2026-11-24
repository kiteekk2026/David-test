# Dashboard test report

## Recorded results

| Level | Tests | Result |
| --- | ---: | --- |
| Unit | 21 | Passed without a database |
| API | 0 | YAML, internal references, and ten operations checked. Implementation awaits teacher review of the contract |
| End to end | 9 | The dashboard cases passed in GitHub Actions after fixing two initial accessibility failures |
| Manual | 0 | Preview, OAuth, and exploratory testing pending |

Vitest measured 63.63% line coverage across the utility and validation modules.
See the [test plan](test-plan.md) for the other coverage figures.

## Open items

- The browser CI job started and reset isolated Supabase successfully. The dashboard CI job passed. GitHub requires both checks and an approval on `main`.
- The database configured for the app had RLS disabled. See the [security review](security-review.md) for the metadata findings and remaining rollout work.
- The current Vercel production URL returned HTTP 200. Sign-in, invoice lifecycle, new feature deployment, and real handset coverage are pending.

Hold release until the teacher approves the PR and the Vercel preview passes
sign-in and invoice lifecycle smoke tests.

## CI observations

- The first coursework run passed dashboard checks and seven dashboard browser cases. The two axe audits identified repeatable markup and contrast defects. [Initial run and trace artifact](https://github.com/kiteekk2026/David-test/actions/runs/44918917191)
- The follow-up run passed both jobs and all nine dashboard browser cases. [Passing run](https://github.com/kiteekk2026/David-test/actions/runs/44919874901)
- The CI gate exercise deliberately failed one unit test. GitHub reported the exercise PR's merge state as blocked. The same run hit the GitHub release lookup rate limit for the unpinned Supabase CLI, so the workflow now pins the CLI version. [Exercise PR](https://github.com/kiteekk2026/David-test/pull/59) · [Failed required check](https://github.com/kiteekk2026/David-test/actions/runs/44919955432/job/136893609634) · [CI screenshot](evidence/ci-gate-failing-check.png)
- Fewer than ten coursework runs were available at this point. The observed browser assertion failures had diagnosed causes and no intermittent test result was established.
