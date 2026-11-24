import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/**/*.test.ts"],
    coverage: {
      include: ["app/lib/utils.ts", "app/lib/schemas.ts"],
      reporter: ["text"],
    },
  },
});
