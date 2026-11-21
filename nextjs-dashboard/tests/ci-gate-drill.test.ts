import { expect, it } from "vitest";

it("demonstrates that a failed test blocks the protected branch", () => {
  expect("failed test").toBe("passing test");
});