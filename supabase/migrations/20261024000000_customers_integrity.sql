-- Customers feature hardening.
-- 1) Check and resolve duplicate email addresses before creating the unique index:
-- SELECT lower(email), count(*) FROM customers GROUP BY lower(email) HAVING count(*) > 1;
-- 2) Check for orphan invoices before adding the FK:
-- SELECT i.id, i.customer_id FROM invoices i LEFT JOIN customers c ON c.id = i.customer_id WHERE c.id IS NULL;
-- Resolve any rows returned by either check before applying this migration.

CREATE UNIQUE INDEX IF NOT EXISTS customers_email_unique_ci
  ON public.customers (lower(email));

-- Protect the refusal-on-delete policy against races and prevent future orphan invoices.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.invoices'::regclass
      AND conname = 'invoices_customer_id_fkey'
  ) THEN
    ALTER TABLE public.invoices
      ADD CONSTRAINT invoices_customer_id_fkey
      FOREIGN KEY (customer_id) REFERENCES public.customers(id) ON DELETE RESTRICT
      NOT VALID;
  END IF;
END
$$;

ALTER TABLE public.invoices VALIDATE CONSTRAINT invoices_customer_id_fkey;
