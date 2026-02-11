import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "happy-dom",
    globals: true,
    include: ["**/*.spec.ts", "**/*.test.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["*.ts"],
      exclude: ["*.spec.ts", "*.test.ts", "index.ts", "tests/**"],
      thresholds: {
        statements: 88,
        branches: 76,
        functions: 89,
        lines: 91,
      },
    },
  },
});
