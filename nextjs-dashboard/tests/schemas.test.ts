import { describe, expect, it } from "vitest";
import { CUSTOMER_AVATARS, CustomerSchema, InvoiceSchema } from "../app/lib/schemas";

describe("InvoiceSchema", () => {
  const invoice = { customerId: "customer-id", amount: "12.50", status: "paid" };

  it("coerces the amount from the form", () => {
    expect(InvoiceSchema.parse(invoice)).toEqual({ ...invoice, amount: 12.5 });
  });

  it.each([
    ["customerId", "", "Please select a customer."],
    ["amount", "abc", "Please enter an amount."],
    ["amount", "0", "Please enter an amount greater than $0."],
    ["amount", "-1", "Please enter an amount greater than $0."],
    ["status", null, "Please select an invoice status."],
  ])("rejects %s value %s", (field, value, message) => {
    const result = InvoiceSchema.safeParse({ ...invoice, [field]: value });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toEqual([
        expect.objectContaining({ path: [field], message }),
      ]);
    }
  });
});

describe("CustomerSchema", () => {
  const customer = {
    name: "  Ada Lovelace  ",
    email: " ada@example.test ",
    image_url: CUSTOMER_AVATARS[0],
  };

  it("trims the name and email", () => {
    expect(CustomerSchema.parse(customer)).toEqual({
      ...customer,
      name: "Ada Lovelace",
      email: "ada@example.test",
    });
  });

  it.each([
    ["name", " ", "Enter the customer name."],
    ["name", "a".repeat(121), "Name must be 120 characters or fewer."],
    ["email", "invalid", "Enter a valid email address."],
    ["image_url", "/unknown.png", "Choose one of the available avatars."],
  ])("rejects invalid %s value %s", (field, value, message) => {
    const result = CustomerSchema.safeParse({ ...customer, [field]: value });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toEqual([
        expect.objectContaining({ path: [field], message }),
      ]);
    }
  });
});
