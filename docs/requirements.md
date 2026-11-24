# Dashboard requirements

| ID | Functional requirement | Status |
| --- | --- | --- |
| F1 | Sign in using credentials, with GitHub and Google available when configured | Implemented in Auth.js. The course's Supabase Auth target remains open |
| F2 | Show an overview with monthly paid and pending invoice values and recent invoices | Implemented |
| F3 | Search and page through invoices and create, edit, and delete them | Implemented. Browser verification tracked in S7 |
| F4 | Find, create, view, edit, and delete customers | Implemented. Customers with invoices cannot be deleted |
| F5 | Confirm and explain invalid form values and missing records | Inline validation and record-not-found pages implemented |

| Category | Requirement | Gap or evidence |
| --- | --- | --- |
| Performance | Page through lists so the server returns a bounded number of rows | Server pagination exists. A preview performance baseline is pending |
| Accessibility | Name actionable controls and announce validation and exercise feedback | Labels and live regions exist. Automated axe checks are configured |
| Security | Require authentication inside invoice and customer mutation actions | Session checks added. Hosted role and policy verification remains open |
| Data protection | Keep production credentials and data away from automated tests | Unit tests use no database and browser tests target loopback fixtures |
| Usability | Offer readable empty/error states and forms usable on laptop and phone | Verify the dashboard on real phones before release |

## Customer discovery

The [customer questions](https://github.com/kiteekk2026/David-test/issues/60)
ask for the dashboard brief, target users, invoice rules, export scope, and
mobile priorities. The proposed stories are ready to discuss after those
answers arrive.

- [Invoice filtering](https://github.com/kiteekk2026/David-test/issues/66)
- [Search with no results](https://github.com/kiteekk2026/David-test/issues/67)
- [Invoice deletion confirmation](https://github.com/kiteekk2026/David-test/issues/68)
- [Customer contact validation](https://github.com/kiteekk2026/David-test/issues/69)
- [Overdue invoice visibility](https://github.com/kiteekk2026/David-test/issues/70)
- [Invoice export](https://github.com/kiteekk2026/David-test/issues/71)

Use the confirmed scope for planning poker and mockups. Record the outcomes
on the story issues and actual hours in the retrospective once the work is done.
