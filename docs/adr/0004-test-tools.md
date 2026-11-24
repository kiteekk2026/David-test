# ADR 0004 — Vitest and Playwright

## Context

The course requires isolated unit tests and browser tests for the dashboard. The existing app is TypeScript and uses Next.js.

## Options

- Vitest or Jest for functions and schemas.
- Playwright or Cypress for end-to-end tests.

## Decision

Use Vitest for utility and schema tests and Playwright for browser flows. Vitest runs the TypeScript test files directly, and Playwright supports role-based selectors and traces for CI failures.

## Consequences

Unit tests need no database. Browser tests need a seeded isolated database, an app process, and installed browser binaries.
