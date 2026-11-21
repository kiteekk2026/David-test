# Diagnose a CI accessibility failure with Playwright traces

The first browser run passed all seven dashboard behaviour tests.
Both axe audits failed. The uploaded traces identified the
failing `toEqual([])` assertions. The job output then showed contrast failures,
an unnamed pagination link, and a scrollable dashboard region without keyboard
focus.

I increased the text contrast, gave pagination arrows accessible names, and
moved scrolling to the page while keeping the desktop navigation sticky. The
same assertions run against the fix. [CI job and trace artifact](https://github.com/kiteekk2026/David-test/actions/runs/44918917191)
