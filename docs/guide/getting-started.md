# Getting Started

::: tip Disclaimer
BaklaVue builds on [@trendyol/baklava](https://www.npmjs.com/package/@trendyol/baklava) v3.4.2. Not all Baklava components and features are yet available in BaklaVue. Check the [components list](/components/) for what's supported. Contributions welcome.
:::

BaklaVue is a Vue 3 UI kit that brings the [Trendyol Baklava Design System](https://baklava.design) to Vue applications. It provides Vue-native wrappers around Baklava's web components, offering full TypeScript support, Vue 3 Composition API patterns, and composables for common use cases.

This guide walks you through setting up BaklaVue in a new or existing Vue 3 project and building your first components.

## What is BaklaVue?

BaklaVue consists of two packages:

| Package | Purpose |
| ------- | ------- |
| `@baklavue/ui` | Vue components that wrap Baklava web components (`bl-*` custom elements) |
| `@baklavue/composables` | Vue composables for theming, notifications, CSV parsing, form validation, and more |

Each UI component loads Baklava resources (script and styles) when mounted, so you don't need to manually include them in your app. Components use the `Bv` prefix (e.g. `BvButton`, `BvInput`) to avoid naming conflicts and follow a consistent convention.

## Prerequisites

Before installing BaklaVue, ensure your project meets these requirements:

- **Vue 3.0+** — BaklaVue targets Vue 3 and uses the Composition API
- **Node.js 18+** or **Bun** — For package installation and builds
- **TypeScript 5.9.2+** (recommended) — Full type definitions are provided
- **Vite** or **Nuxt 3** — Officially supported; Vue CLI works with additional configuration

## Installation

Install both packages with your preferred package manager:

```bash
# Using npm
npm install @baklavue/ui @baklavue/composables

# Using yarn
yarn add @baklavue/ui @baklavue/composables

# Using pnpm
pnpm add @baklavue/ui @baklavue/composables

# Using bun
bun add @baklavue/ui @baklavue/composables
```

For detailed installation steps, framework-specific setup, and troubleshooting, see the [Installation Guide](/guide/installation).

## Basic Usage

### 1. Import and Use Components

Components are imported individually. Use the `Bv` prefix when importing:

```vue
<template>
  <div>
    <BvButton variant="primary" @click="handleClick">Click me</BvButton>
  </div>
</template>

<script setup>
import { BvButton } from "@baklavue/ui";

const handleClick = () => {
  console.log("Button clicked!");
};
</script>
```

All components follow the same pattern: import from `@baklavue/ui` and use the `Bv` prefix in templates.

### 2. Use Composables

Composables provide reusable logic that works seamlessly with BaklaVue components. For example, `useNotification` controls the notification toast:

```vue
<template>
  <div>
    <BvButton @click="showNotification">Show Notification</BvButton>
    <BvNotification />
  </div>
</template>

<script setup>
import { BvButton, BvNotification } from "@baklavue/ui";
import { useNotification } from "@baklavue/composables";

const { success } = useNotification();

const showNotification = () => {
  success({
    caption: "Success!",
    description: "Operation completed successfully",
  });
};
</script>
```

The `<BvNotification />` component must be present in your app layout for notifications to appear. See [useNotification](/composables/notification) for the full API.

### 3. Customize Theme (Optional)

Use `useBaklavaTheme` to apply design tokens and brand colors. Built-in presets include `vue` (Vue.js brand colors) and `default`:

```vue
<script setup>
import { useBaklavaTheme } from "@baklavue/composables";

// Apply Vue.js brand preset
useBaklavaTheme().applyTheme({ preset: "vue" });
</script>
```

You can also override specific tokens:

```vue
<script setup>
import { useBaklavaTheme } from "@baklavue/composables";

useBaklavaTheme().applyTheme({
  preset: "vue",
  borderRadius: { m: "0.5rem" },
  typography: { fontFamily: "'Inter', sans-serif" },
});
</script>
```

See [useBaklavaTheme](/composables/theme) and [Design Tokens](/guide/design-tokens) for customization options.

## Loading Baklava Resources

BaklaVue components automatically load Baklava JavaScript and CSS when they mount. In most cases, you don't need to do anything.

If you need to load resources manually (e.g. before any component mounts, or in a non-Vue context), call `loadBaklavaResources`:

```vue
<script setup>
import { onMounted } from "vue";
import { loadBaklavaResources } from "@baklavue/ui";

onMounted(() => {
  loadBaklavaResources();
});
</script>
```

## TypeScript Support

BaklaVue is written in TypeScript and ships with full type definitions. Import types for props and composables:

```typescript
import type { ButtonProps, InputProps } from "@baklavue/ui";

const buttonProps: ButtonProps = {
  variant: "primary",
  size: "medium",
  disabled: false,
};
```

Types are exported from `@baklavue/ui` and `@baklavue/composables`. Check the [API Reference](/api/reference) for available types.

## Component Naming Convention

All UI components use the `Bv` prefix:

- `BvButton`, `BvInput`, `BvCheckbox`, `BvSelect`, etc.
- `BvDialog`, `BvDrawer`, `BvDropdown`, etc.

This convention helps avoid conflicts with native HTML elements and other libraries.

## Next Steps

- **[Components](/components/)** — Browse all available components with examples
- **[Composables](/composables/)** — Explore composables for notifications, theming, CSV, and more
- **[Design Tokens](/guide/design-tokens)** — Customize colors, typography, spacing, and more
- **[API Reference](/api/reference)** — Full API documentation
- **[Contributing](/guide/contributing)** — Help improve BaklaVue
