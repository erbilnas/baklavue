# Installation

This guide covers installation of BaklaVue in various setups: new projects, existing Vue 3 apps, Vite, Nuxt, and Vue CLI. It also includes configuration requirements and troubleshooting.

## Package Installation

### Core Packages

BaklaVue is split into two packages:

| Package | Description |
| ------- | ----------- |
| `@baklavue/ui` | Vue 3 components wrapping Baklava web components |
| `@baklavue/composables` | Vue composables (theme, notifications, CSV, scroll-to-error, etc.) |

Install both:

```bash
npm install @baklavue/ui @baklavue/composables
```

Or with other package managers:

```bash
# yarn
yarn add @baklavue/ui @baklavue/composables

# pnpm
pnpm add @baklavue/ui @baklavue/composables

# bun
bun add @baklavue/ui @baklavue/composables
```

### Peer Dependencies

BaklaVue expects these peer dependencies in your project:

| Dependency | Version | Notes |
| ---------- | ------- | ----- |
| `vue` | ^3.5.21 | Required for components |
| `typescript` | ^5.9.2 | Recommended for type support |

These are usually already present in a Vue 3 project. If not:

```bash
npm install vue@^3.5.21 typescript@^5.9.2
```

### Transitive Dependencies

BaklaVue brings in:

- `@trendyol/baklava` ^3.4.2 — Core design system
- `@trendyol/baklava-icons` ^1.1.0 — Icons (used by components)
- `papaparse` — Used by `useFile` for CSV/TSV (in `@baklavue/composables` only)
- `xlsx` — Used by `useFile` for Excel (in `@baklavue/composables` only)

You do not need to install these manually.

## Framework Integration

### Vite + Vue 3

BaklaVue works out of the box with Vite. Create a new project and add BaklaVue:

```bash
npm create vue@latest my-app
cd my-app
npm install @baklavue/ui @baklavue/composables
```

**Required Vite config:** BaklaVue components render Baklava web components (`bl-*` custom elements). Vue must treat these as custom elements, not Vue components. Add this to `vite.config.ts`:

```ts
// vite.config.ts
import { defineConfig } from "vite";
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
});
```

Without this, Vue may warn: `Failed to resolve component: bl-*`.

### Nuxt 3

For Nuxt 3:

```bash
npx nuxi@latest init my-app
cd my-app
npm install @baklavue/ui @baklavue/composables
```

Configure Nuxt to treat `bl-*` as custom elements. Create or edit `nuxt.config.ts`:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith("bl-"),
    },
  },
});
```

**Optional:** For tree-shaking and a smaller bundle, you can auto-import components via a Nuxt module or `components/` directory. The default approach is to import components explicitly where needed.

### Vue CLI

For Vue CLI projects:

```bash
vue create my-app
cd my-app
npm install @baklavue/ui @baklavue/composables
```

Add custom element configuration in `vue.config.js`:

```js
// vue.config.js
const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap((options) => {
        options.compilerOptions = {
          ...options.compilerOptions,
          isCustomElement: (tag) => tag.startsWith("bl-"),
        };
        return options;
      });
  },
});
```

## Vite Configuration (Detailed)

### Custom Element Detection

Baklava components are implemented as web components with tags like `bl-button`, `bl-input`, `bl-dialog`. Vue’s template compiler must not resolve these as Vue components. The `isCustomElement` option tells Vue to leave them as native custom elements:

```ts
vue({
  template: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith("bl-"),
    },
  },
});
```

### Path Aliases (Optional)

If you use `@` for `src`:

```ts
// vite.config.ts
import { resolve } from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
```

BaklaVue does not require path aliases; imports from `@baklavue/ui` and `@baklavue/composables` work as-is.

## TypeScript Configuration

For TypeScript, ensure your `tsconfig.json` supports module resolution and includes Vue types:

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "types": ["vite/client"],
    "strict": true
  },
  "include": ["src/**/*.ts", "src/**/*.vue"]
}
```

BaklaVue types are distributed with the packages; no extra `@types` packages are needed.

## Importing Styles

BaklaVue components load Baklava styles automatically when they mount. In typical usage you do not need to import anything manually.

If you prefer to load styles yourself (e.g. in the entry file):

```typescript
// main.ts or main.js
import "@trendyol/baklava/dist/themes/default.css";
```

When using the CDN (via `loadBaklavaResources`), styles are injected from jsDelivr; no manual import is needed.

## Verify Installation

Create a simple test component:

```vue
<template>
  <BvButton variant="primary">Test Button</BvButton>
</template>

<script setup>
import { BvButton } from "@baklavue/ui";
</script>
```

If the button renders with correct styling, installation is working.

## Troubleshooting

### "Failed to resolve component: bl-*" warning

**Cause:** Vue is trying to resolve `bl-*` tags as Vue components.

**Fix:** Add `isCustomElement` so Vue treats them as custom elements. See [Vite Configuration](#vite-configuration-detailed) above.

### Components not rendering or look unstyled

**Possible causes:**

1. **Baklava CSS not loaded** — Components load it on mount. If you render before components mount, styles may be missing. Ensure at least one BaklaVue component is mounted, or call `loadBaklavaResources()` manually.
2. **Wrong Vue version** — BaklaVue requires Vue 3.0+. Check with `npm list vue`.
3. **Incorrect imports** — Use `BvButton`, not `Button`, and import from `@baklavue/ui`.

### TypeScript errors

1. **Module not found** — Ensure `@baklavue/ui` and `@baklavue/composables` are installed.
2. **Type errors** — Use TypeScript 5.9.2+. Run `npm list typescript`.
3. **Vue types** — If using Vite, include `"types": ["vite/client"]` in `tsconfig.json`.

### Build errors

1. **Peer dependency warnings** — Install `vue` and `typescript` at the versions above.
2. **Version conflicts** — Try a clean install:

   ```bash
   rm -rf node_modules
   rm package-lock.json  # or bun.lock, pnpm-lock.yaml
   npm install
   ```

3. **Custom element errors** — Confirm `isCustomElement` is configured for your bundler.

### SSR (Nuxt, etc.)

BaklaVue components rely on Baklava web components, which are client-side. For SSR:

- Use `<ClientOnly>` (or equivalent) around BaklaVue components that must not run on the server.
- Or defer mounting until the client; the documentation site uses this approach.

## Version Compatibility

| BaklaVue | Vue | Baklava | Node |
| -------- | --- | ------- | ---- |
| 1.x      | ^3.5.21 | ^3.4.2 | 18+ |

See the [GitHub releases](https://github.com/erbilnas/baklavue/releases) for specific version notes.

## Next Steps

- [Getting Started](/guide/getting-started) — First steps with BaklaVue
- [Components](/components/) — Component catalog
- [API Reference](/api/) — Full API docs
