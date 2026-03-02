import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import type { PluginOption } from "vite";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag: string) => tag.startsWith("bl-"),
        },
      },
    }),
    dts({
      tsconfigPath: "./tsconfig.build.json",
      insertTypesEntry: true,
      include: ["src/**/*.ts", "src/**/*.vue"],
      exclude: ["**/*.spec.ts", "**/*.test.ts"],
    }),
  ] as PluginOption[],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "BaklavueUI",
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: ["vue", "@trendyol/baklava", "@trendyol/baklava-icons"],
      output: {
        globals: {
          vue: "Vue",
          "@trendyol/baklava": "Baklava",
          "@trendyol/baklava-icons": "BaklavaIcons",
        },
      },
    },
    sourcemap: true,
    minify: false,
  },
});
