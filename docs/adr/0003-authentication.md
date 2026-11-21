# ADR 0003 — Supabase Auth and Auth.js

## Context

The assignment calls for Supabase Auth. The tracked app uses Auth.js with credentials backed by PostgreSQL and optional GitHub and Google OAuth.

## Options

- Supabase Auth for managed identities and migration toward an identity that can be represented in Supabase policies.
- Auth.js for the current credentials, OAuth, and session implementation.

## Decision

Use Supabase Auth as the target to meet the assignment. Treat the move from Auth.js as a migration covering accounts, callbacks, session enforcement, and deployment.

## Consequences

The migration needs an account transition plan and verified callback configuration for local, preview, and production. App-side SQL access still needs authorization even after login moves to Supabase.
