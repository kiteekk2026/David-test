# Contributing

## Issue and pull request workflow

1. Open an issue with the course task ID in the title. Include the acceptance criteria, priority, sprint, estimated hours, and test approach.
2. Branch from current `main`. Use `feat/t4-3-vitest`, `fix/...`, `docs/...`, or `test/...`.
3. Make small commits with an imperative message such as `Add invoice validation tests`.
4. Open a pull request using the template. Write `Closes #123` with the actual issue number and request the teacher's review.
5. Address review feedback, wait for green CI, and squash merge after approval. All changes to `main` go through reviewed pull requests.
6. Record actual hours on the issue when closing it.

Post two stand-ups each week with done, next, and blocked. Demo at sprint end and add the sprint retrospective to `docs/retro.md`. After resolving a blocker that took more than 30 minutes, record it in `docs/til/`.

## Definition of Ready

The checklist follows the assignment and awaits confirmation of any additions agreed by the class. Keep an issue in Backlog until its applicable boxes are checked.

- [ ] User story and value are clear.
- [ ] Acceptance criteria are testable.
- [ ] Out-of-scope work and dependencies are listed.
- [ ] The design is agreed where applicable.
- [ ] The work is estimated and small enough for one sprint.
- [ ] The test approach and reviewer are agreed.

## Definition of Done

- [ ] The acceptance criteria are met and test evidence is recorded.
- [ ] The teacher has approved the pull request.
- [ ] Required CI checks pass and the changes are squash merged.
- [ ] The change is deployed and verified where applicable.
- [ ] Documentation and actual hours are recorded.

## CI credentials

The dashboard checks use build-only placeholders and run unit tests without a
database. This job requires no repository secrets. Keep deployment credentials in
Vercel environment settings. If a future CI job needs a credential, use GitHub
Actions secrets and scope it to the isolated environment used by that job.

## Code review checklist

Use this checklist for individual review with the teacher.

- Check correctness against acceptance criteria and look for missing edge cases.
- Check naming and verify that error messages are understandable.
- Read the relevant tests and CI results.
- Check authentication, database access, and environment variable handling.
- Check labels, focus, contrast, and keyboard interaction for UI changes.
