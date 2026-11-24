# Clear stale Next.js route types after deleting handlers

Removing the former course seed and query endpoints caused TypeScript to resolve
imports to files that had already been removed. The errors came from a generated
`.next/dev/types/validator.ts` in the working copy. The failed build produced the
same error after compiling the application successfully.

Moving the stale development types out of the generated type path let
`pnpm typecheck` pass. A clean checkout generates validators for current
routes. [Database migration notes](../architecture.md#schema-changes)
