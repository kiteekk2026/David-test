# Dashboard coursework status · 24 November 2026

The [coursework board](https://github.com/orgs/kiteekk2026/projects/26/views/1)
tracks verification and review. [PR #58](https://github.com/kiteekk2026/David-test/pull/58)
contains the initial combined implementation. Both required checks passed on its
dashboard-only revision. GitHub showed no recorded approval and no Vercel status
on that revision.

| Sprint | Evidence | Open work |
| --- | --- | --- |
| S1 | The linked board has all five required columns. Main requires one approval and the dashboard and browser jobs. The [README](../README.md), [contribution guide](../CONTRIBUTING.md), and PR template are available for review. | Record teacher approval. The teacher is reviewing individually as arranged by the student. |
| S2 | [Architecture, environments and lifecycle](architecture.md), [ADRs](adr/), and [SQL migrations](../supabase/migrations/) are present. Weekly npm updates are configured in the proposed Dependabot file. | Review the changes, then record the first actual Dependabot PR decision. Verify preview data isolation before applying migrations to a hosted environment. |
| S3 | [Current dashboard requirements](requirements.md) cover the functional baseline and five quality areas. [Six questions](https://github.com/kiteekk2026/David-test/issues/60) and [six proposed dashboard stories](https://github.com/kiteekk2026/David-test/issues?q=is%3Aissue+DASH-US) are on GitHub. | Obtain the dashboard brief and customer answers, agree on story scope, run planning poker, record actual effort and retrospective, and obtain desktop/mobile mockup feedback. |
| S4 | The [test plan](test-plan.md), test-tool ADR, environment example, fixture seed, and 21 unit tests are present. CI verified the Supabase reset and browser flows. | Obtain the teacher's test-plan review. |
| S5 | CI and branch protection are active. [Coverage and gate evidence](test-report.md) include the failing-then-passing run and screenshot. | Connect or verify the Vercel preview for the organization PR using an isolated preview database. |
| S6 | The [OpenAPI contract](openapi.yaml) and [authentication proposal](adr/0005-api-authentication.md) are available for review. The [interoperability client](api-interoperability.md) supports list, create, and read-back. | Obtain the design review, implement the route handlers and request validation, add isolated API tests, and run the client against a partner test environment. |

Stand-ups, demos, group estimates, and actual time entries require records from
the activities themselves. The [retrospective](retro.md) records the work
observed so far.

## Focused reviews

| Task | Pull request |
| --- | --- |
| T1.4 — PR template | [#72](https://github.com/kiteekk2026/David-test/pull/72) |
| T1.5 — Contribution guide | [#73](https://github.com/kiteekk2026/David-test/pull/73) |
| T2.5 — Dependabot | [#74](https://github.com/kiteekk2026/David-test/pull/74) |
| T6.1 and T6.4 — OpenAPI and authentication design review | [#75](https://github.com/kiteekk2026/David-test/pull/75) |
| T6.6 — Partner client | [#76](https://github.com/kiteekk2026/David-test/pull/76) |

These branches start from the organization’s current main. Their review can
begin now. Required CI is introduced in the combined baseline PR, so the
focused branches need the reviewed baseline on main before those checks are
available to them.
