# useBaklavaTheme

A composable for overwriting Baklava design system colors. Use the Vue preset, pass your own preset object, or override specific colors.

## Basic Usage

### Vue Preset

Apply Vue.js brand colors (Mint #41B883, Police Blue #34495E) to Baklava components:

```vue
<script setup>
import { useBaklavaTheme } from "@baklavue/composables";

useBaklavaTheme().applyTheme({ preset: "vue" });
</script>

<template>
  <Button variant="primary">Primary Button</Button>
</template>
```

### Custom Preset

Pass your own preset object mapping CSS variable names to values:

```vue
<script setup>
import { useBaklavaTheme } from "@baklavue/composables";

useBaklavaTheme().applyTheme({
  preset: {
    "--bl-color-primary": "#ea4c89",
    "--bl-color-primary-highlight": "#d6427a",
    "--bl-color-primary-contrast": "#fce8ee",
  },
});
</script>
```

### Custom Colors

Override specific Baklava color tokens:

```vue
<script setup>
import { useBaklavaTheme } from "@baklavue/composables";

useBaklavaTheme().applyTheme({
  colors: {
    primary: "#41B883",
    primaryHighlight: "#3aa876",
    primaryContrast: "#e7f9ef",
  },
});
</script>
```

### With VitePress or App Setup

Call `applyTheme` when your app mounts (e.g. in `main.ts` or VitePress `enhanceApp`):

```ts
import { createApp } from "vue";
import App from "./App.vue";
import { useBaklavaTheme } from "@baklavue/composables";

const app = createApp(App);
useBaklavaTheme().applyTheme({ preset: "vue" });
app.mount("#app");
```

## API

### applyTheme

Applies theme overrides by injecting CSS variables into the document.

```typescript
applyTheme(options?: ApplyThemeOptions): void
```

### ApplyThemeOptions

```typescript
interface ApplyThemeOptions {
  preset?: "vue" | "default" | BaklavaThemePresetRecord; // Built-in or your own preset
  colors?: Partial<BaklavaThemeColors>; // Custom color overrides
}

// Custom preset: map of CSS variable names to values
type BaklavaThemePresetRecord = Record<string, string>;
```

### BaklavaThemeColors

Custom color keys map to Baklava's `--bl-color-*` CSS variables:

| Key                                                    | Baklava Variable               |
| ------------------------------------------------------ | ------------------------------ |
| `primary`                                              | `--bl-color-primary`           |
| `primaryHighlight`                                     | `--bl-color-primary-highlight` |
| `primaryContrast`                                      | `--bl-color-primary-contrast`  |
| `success`, `successHighlight`, `successContrast`       | `--bl-color-success-*`         |
| `danger`, `warning`, `info`                            | `--bl-color-{semantic}-*`      |
| `neutralDarkest`, `neutralDarker`, `neutralDark`, etc. | `--bl-color-neutral-*`         |

## Vue Preset Colors

The `vue` preset applies:

- **Primary**: #41B883 (Vue Mint)
- **Primary Highlight**: #3aa876 (darker mint)
- **Primary Contrast**: #e7f9ef (light mint background)
- **Success**: Same as primary (Vue green)
- **Neutral Darker**: #34495E (Police Blue)
- **Neutral Darkest**: #2c3e50

## TypeScript Support

```typescript
import {
  useBaklavaTheme,
  type BaklavaThemePreset,
  type BaklavaThemePresetRecord,
  type BaklavaThemeColors,
  type ApplyThemeOptions,
} from "@baklavue/composables";

const { applyTheme } = useBaklavaTheme();

// Built-in preset
applyTheme({ preset: "vue" });

// Custom preset
applyTheme({
  preset: {
    "--bl-color-primary": "#ea4c89",
    "--bl-color-primary-highlight": "#d6427a",
  },
});
```
