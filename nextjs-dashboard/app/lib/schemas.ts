import { z } from "zod";

export const InvoiceSchema = z.object({
  customerId: z
    .string({ invalid_type_error: "Please select a customer." })
    .min(1, { message: "Please select a customer." }),
  amount: z.preprocess(
    (value) => (value === null || value === "" ? undefined : value),
    z.coerce
      .number({ invalid_type_error: "Please enter an amount." })
      .gt(0, { message: "Please enter an amount greater than $0." }),
  ),
  status: z.enum(["pending", "paid"], {
    invalid_type_error: "Please select an invoice status.",
  }),
});

export const CUSTOMER_AVATARS = [
  '/customers/amy-burns.png',
  '/customers/balazs-orban.png',
  '/customers/delba-de-oliveira.png',
  '/customers/evil-rabbit.png',
  '/customers/lee-robinson.png',
  '/customers/michael-novotny.png',
] as const;

export const CustomerSchema = z.object({
  name: z.string().trim().min(1, 'Enter the customer name.').max(120, 'Name must be 120 characters or fewer.'),
  email: z.string().trim().email('Enter a valid email address.').max(254, 'Email is too long.'),
  image_url: z.string().refine((value) => CUSTOMER_AVATARS.includes(value as (typeof CUSTOMER_AVATARS)[number]), {
    message: 'Choose one of the available avatars.',
  }),
});
