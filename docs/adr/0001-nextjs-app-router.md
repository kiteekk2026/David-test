# ADR 0001 — Next.js App Router

## Context

The dashboard has authenticated pages, server-side database reads, and forms that mutate data.

## Options

- Next.js App Router with Server Components and Server Actions.
- A separate React frontend and Node API.

## Decision

Keep Next.js App Router. It covers the course app's nested layouts, server-rendered data, and form submission in one application.

## Consequences

Database access stays on the server. Reviewers need to understand how updates invalidate page data and how authorization is enforced at each server entry point.
