# Vitest coverage needs a writable temporary cache

The first coverage run collected no tests. Both suites reported an EPERM error
while renaming files inside the sandbox temporary cache.

The same command ran successfully with access to the temporary directory. It
executed 21 tests and produced a V8 coverage summary. [Recorded coverage](../test-plan.md#unit-baseline)
