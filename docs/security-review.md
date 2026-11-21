# Dashboard security review

| Finding | Evidence | Status |
| --- | --- | --- |
| Write actions relied on page protection | The six invoice and customer mutation actions called PostgreSQL without independently checking the session | Added Auth.js session checks before validation or database access |
| Course helpers exposed database operations via GET | The seed and query handlers performed database operations without checking the session | Removed both routes. Supabase migrations and local seed files replace the seed handler |
| Hosted RLS and SQL role need verification | The baseline enables RLS and creates no public access policies. The hosted policy and role configuration still need inspection | Open |
| Workspace contains multiple copies of the app | The tracked app and untracked copies share one working directory | Inspect only approved files before staging. A historical secret scan remains pending |

The current model treats signed-in dashboard users as members of one trusted team.
Confirm this access model before inviting other users or exposing an integration
API. Direct SQL connections may bypass RLS depending on the database role.
