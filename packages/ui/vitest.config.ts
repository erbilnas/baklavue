import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith("bl-"),
        },
      },
    }),
  ],
  test: {
    environment: "happy-dom",
    globals: true,
    include: ["**/*.spec.ts", "**/*.test.ts"],
    setupFiles: ["./tests/setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/**/*.ts", "src/**/*.vue"],
      exclude: ["**/*.spec.ts", "**/*.test.ts", "**/index.ts", "tests/**"],
    },
  },
});
