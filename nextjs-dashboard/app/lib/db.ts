import postgres from "postgres";

const databaseEndpoint = new URL(process.env.DATABASE_SESSION_URL!);

console.log("Database endpoint:", {
  host: databaseEndpoint.hostname,
  port: databaseEndpoint.port || "5432",
});
const globalForDb = globalThis as typeof globalThis & {
  __shared_sql?: ReturnType<typeof postgres>;
};

export const sql =
  globalForDb.__shared_sql ??
  (globalForDb.__shared_sql = postgres(process.env.DATABASE_SESSION_URL!, {
    ssl: ["localhost", "127.0.0.1", "[::1]"].includes(databaseEndpoint.hostname)
      ? false
      : "require",
    prepare: false,
    max: 1,
    // Reuse warm connections across brief pauses between page visits.
    idle_timeout: 60,
    connect_timeout: 10,
  }));
