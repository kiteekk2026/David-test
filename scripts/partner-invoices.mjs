import { parseArgs } from "node:util";

const { values } = parseArgs({
  options: {
    base: { type: "string" },
    "create-for": { type: "string" },
    "amount-cents": { type: "string" },
  },
});

const key = process.env.PARTNER_API_KEY;
const uuid = /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i;

function apiOrigin(input) {
  if (!input) throw new Error("Supply the isolated partner API origin with --base.");
  const url = new URL(input);
  const localhost = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
  if ((url.protocol !== "https:" && !(localhost && url.protocol === "http:")) ||
    url.username || url.password || url.pathname !== "/" || url.search || url.hash) {
    throw new Error("Use a plain HTTPS origin or a loopback HTTP origin.");
  }
  return url;
}

async function request(url, expectedStatus, payload) {
  const response = await fetch(url, {
    method: payload ? "POST" : "GET",
    headers: {
      Accept: "application/json",
      "x-api-key": key,
      ...(payload && { "Content-Type": "application/json" }),
    },
    body: payload ? JSON.stringify(payload) : undefined,
    redirect: "error",
    signal: AbortSignal.timeout(10_000),
  });
  if (response.status !== expectedStatus) {
    const errorBody = await response.json().catch(() => null);
    const shape = typeof errorBody?.error?.code === "string" &&
      typeof errorBody?.error?.message === "string";
    throw new Error(`Expected HTTP ${expectedStatus}, received ${response.status}. Standard error body: ${shape ? "yes" : "no"}.`);
  }
  if (response.headers.get("content-type")?.split(";")[0].trim() !== "application/json") {
    throw new Error("The API did not return the documented JSON content type.");
  }
  return response.json();
}

function isInvoice(invoice) {
  return typeof invoice?.id === "string" && uuid.test(invoice.id) &&
    typeof invoice.customerId === "string" && uuid.test(invoice.customerId) &&
    Number.isSafeInteger(invoice.amount) &&
    ["pending", "paid"].includes(invoice.status) &&
    typeof invoice.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(invoice.date);
}

try {
  const origin = apiOrigin(values.base);
  if (!key?.trim()) throw new Error("Set PARTNER_API_KEY to the partner's test key.");
  const customerId = values["create-for"];
  const amountInput = values["amount-cents"];
  const amount = Number(amountInput);
  if ((customerId || amountInput) && (!uuid.test(customerId ?? "") ||
    !/^\d+$/.test(amountInput ?? "") || !Number.isSafeInteger(amount) ||
    amount < 1 || amount > 2147483647)) {
    throw new Error("To create a test invoice, supply --create-for <customer UUID> and --amount-cents <positive integer>.");
  }

  const list = await request(new URL("/api/v1/invoices?page=1&pageSize=5", origin), 200);
  if (!Array.isArray(list?.items) || list.items.length > 5 ||
    list.page !== 1 || list.pageSize !== 5 || !Number.isSafeInteger(list.total) ||
    list.total < list.items.length || !list.items.every(isInvoice)) {
    throw new Error("The invoice list did not match the documented page shape.");
  }
  console.log(`Invoice list matched the contract. Received ${list.items.length} of ${list.total} invoices.`);

  if (customerId) {
    const endpoint = new URL("/api/v1/invoices", origin);
    const invoice = await request(endpoint, 201, { customerId, amount, status: "pending" });
    if (!isInvoice(invoice) || invoice.customerId.toLowerCase() !== customerId.toLowerCase() ||
      invoice.amount !== amount || invoice.status !== "pending") {
      throw new Error("The created invoice did not match the documented response or submitted values.");
    }
    const saved = await request(new URL(`${endpoint.pathname}/${invoice.id}`, origin), 200);
    if (!isInvoice(saved) || saved.id !== invoice.id || saved.customerId !== invoice.customerId ||
      saved.amount !== invoice.amount || saved.status !== invoice.status || saved.date !== invoice.date) {
      throw new Error("The saved invoice did not match the create response.");
    }
    console.log(`Created and verified test invoice ${invoice.id}.`);
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : "The interoperability check failed.");
  process.exitCode = 1;
}
