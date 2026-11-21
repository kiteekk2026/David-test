-- Local reset fixtures. The hosted migration workflow must exclude this file.
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;

INSERT INTO public.users (id, name, email, password)
VALUES (
  '10000000-0000-4000-8000-000000000001',
  'Dashboard Test User',
  'dashboard@example.test',
  extensions.crypt('local-fixture-password', extensions.gen_salt('bf', 10))
);

INSERT INTO public.customers (id, name, email, image_url)
VALUES (
  '20000000-0000-4000-8000-000000000001',
  'Ada Example',
  'ada@example.test',
  '/customers/amy-burns.png'
);

INSERT INTO public.invoices (id, customer_id, amount, status, date)
SELECT
  ('30000000-0000-4000-8000-' || lpad(n::text, 12, '0'))::uuid,
  '20000000-0000-4000-8000-000000000001',
  1000 + n,
  CASE WHEN n % 2 = 0 THEN 'paid' ELSE 'pending' END,
  DATE '2026-01-01' + n
FROM generate_series(1, 8) AS n;
