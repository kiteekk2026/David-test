# API interoperability

Use a partner's isolated API environment and a fixture customer agreed with the
reviewer. Obtain the test API key through the agreed credential channel.
Set `PARTNER_API_KEY` in the shell environment before running the client.

From the repository root, list invoices without changing data:

```sh
node scripts/partner-invoices.mjs --base https://partner-preview.example
```

Add both creation flags when the fixture owner has approved a test write:

```sh
node scripts/partner-invoices.mjs --base https://partner-preview.example --create-for 11111111-1111-4111-8111-111111111111 --amount-cents 1250
```

The client compares the list status, paging fields, and record shape with the
OpenAPI contract. In create mode, it submits a pending invoice and reads it
back by ID. Record the ID in the test evidence so the fixture owner can clean
up the invoice afterward.

## Results

A loopback fixture verified the list, create, and read-back requests and the
submitted JSON. The client rejected an incomplete create command before
sending any request.

Partner execution awaits an approved test URL, key, and fixture customer.
Record the date, endpoint, expected behavior, observed behavior, and any
contract mismatch here after the run.
