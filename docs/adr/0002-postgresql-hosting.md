# ADR 0002 — Supabase for PostgreSQL

## Context

The dashboard already uses PostgreSQL and connects using a session connection string. Local, preview, and production need isolated databases.

## Options

- Supabase-hosted PostgreSQL with the local Supabase stack for testing.
- Neon-hosted PostgreSQL with isolated branches.

## Decision

Use Supabase for planned database hosting and local testing. Confirm which provider currently serves production before changing its connection or migration history.

## Consequences

PostgreSQL queries stay portable. Supabase projects and test instances need separate credentials, and migrations must be validated against each target before deployment.
