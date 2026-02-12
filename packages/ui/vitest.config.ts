import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag: string) => tag.startsWith("bl-"),
        },
      },
    }),
  ] as any,
  test: {
    environment: "happy-dom",
    globals: true,
    include: ["**/*.spec.ts", "**/*.test.ts"],
    setupFiles: ["./tests/setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/**/*.ts", "src/**/*.vue"],
      exclude: ["**/index.ts", "**/*.types.ts", "**/loadBaklavaResources.ts"],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
  },
});
