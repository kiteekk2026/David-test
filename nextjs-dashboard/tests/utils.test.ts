import { describe, expect, it } from "vitest";
import {
  formatCurrency,
  formatDateToLocal,
  generatePagination,
} from "../app/lib/utils";

describe("formatCurrency", () => {
  it.each([
    [0, "$0.00"],
    [123456, "$1,234.56"],
    [-50, "-$0.50"],
  ])("formats %i cents", (cents, expected) => {
    expect(formatCurrency(cents)).toBe(expected);
  });
});

describe("formatDateToLocal", () => {
  // A local timestamp keeps the expected day stable across timezones.
  it("uses US English by default", () => {
    expect(formatDateToLocal("2026-02-10T12:00:00")).toBe("Feb 10, 2026");
  });

  it("accepts a locale", () => {
    expect(formatDateToLocal("2026-02-10T12:00:00", "en-GB")).toBe(
      "10 Feb 2026",
    );
  });
});

describe("generatePagination", () => {
  it("handles no results", () => {
    expect(generatePagination(1, 0)).toEqual([]);
  });

  it("shows each page for a short list", () => {
    expect(generatePagination(4, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("shows the first pages near the start", () => {
    expect(generatePagination(3, 12)).toEqual([1, 2, 3, "...", 11, 12]);
  });

  it("shows both gaps in the middle", () => {
    expect(generatePagination(6, 12)).toEqual([1, "...", 5, 6, 7, "...", 12]);
  });

  it("shows the last pages near the end", () => {
    expect(generatePagination(10, 12)).toEqual([1, 2, "...", 10, 11, 12]);
  });
});
