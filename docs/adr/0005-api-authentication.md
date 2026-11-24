# ADR 0005 — Integration API authentication

## Context

The proposed REST API serves a partner's client script as well as the dashboard team. It can read and write customer and invoice records.

## Options

- A dedicated integration key sent in the `x-api-key` header.
- An Auth.js session that the caller obtains through the dashboard login flow.

## Proposed decision

Use a dedicated integration key for the API contract. A client script can send the key over HTTPS without managing a browser session. Review this proposal with the OpenAPI specification before implementing it.

## Consequences

Store the integration key in server-side environment configuration and share it through the agreed credential channel. Use an isolated environment for partner interoperability. Rotate the key when access changes and exclude it from logs, errors, examples, and commits.
