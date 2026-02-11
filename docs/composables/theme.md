# useBaklavaTheme

A composable for overwriting Baklava design system tokens. Use the Vue preset, pass your own preset object, or override specific colors, border radius, size/spacing, typography, and z-index.

## Basic Usage

### Vue Preset

Apply Vue.js brand colors (Mint #41B883, Police Blue #34495E) to Baklava components:

```vue
<script setup>
import { useBaklavaTheme } from "@baklavue/composables";

useBaklavaTheme().applyTheme({ preset: "vue" });
</script>

<template>
  <BvButton variant="primary">Primary Button</BvButton>
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

### Border Radius

Override border radius tokens:

```vue
<script setup>
import { useBaklavaTheme } from "@baklavue/composables";

useBaklavaTheme().applyTheme({
  borderRadius: {
    s: "0.5rem",
    m: "0.75rem",
    l: "1rem",
  },
});
</script>
```

### Size & Spacing

Override size and spacing tokens:

```vue
<script setup>
import { useBaklavaTheme } from "@baklavue/composables";

useBaklavaTheme().applyTheme({
  size: {
    s: "0.875rem",
    m: "1rem",
    l: "1.25rem",
  },
});
</script>
```

### Typography

Override typography tokens:

```vue
<script setup>
import { useBaklavaTheme } from "@baklavue/composables";

useBaklavaTheme().applyTheme({
  typography: {
    fontFamily: "'Inter', sans-serif",
    fontSize: { s: "0.75rem", m: "0.875rem", l: "1rem" },
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
  preset?: "vue" | "default" | BaklavaThemePresetRecord;
  colors?: Partial<BaklavaThemeColors>;
  borderRadius?: Partial<BaklavaThemeBorderRadius>;
  size?: Partial<BaklavaThemeSize>;
  typography?: Partial<BaklavaThemeTypography>;
  zIndex?: Partial<BaklavaThemeZIndex>;
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

### BaklavaThemeBorderRadius

| Key      | Baklava Variable            |
| -------- | --------------------------- |
| `xs`     | `--bl-border-radius-xs`     |
| `s`      | `--bl-border-radius-s`      |
| `m`      | `--bl-border-radius-m`      |
| `l`      | `--bl-border-radius-l`      |
| `pill`   | `--bl-border-radius-pill`   |
| `circle` | `--bl-border-radius-circle` |

### BaklavaThemeSize

| Key         | Baklava Variable                        |
| ----------- | --------------------------------------- |
| `4xs`–`6xl` | `--bl-size-4xs` through `--bl-size-6xl` |

### BaklavaThemeTypography

| Key          | Baklava Variable         |
| ------------ | ------------------------ |
| `fontFamily` | `--bl-font-family`       |
| `fontSize`   | `--bl-font-size-{key}`   |
| `fontWeight` | `--bl-font-weight-{key}` |

### BaklavaThemeZIndex

| Key            | Baklava Variable          |
| -------------- | ------------------------- |
| `deep`         | `--bl-index-deep`         |
| `base`         | `--bl-index-base`         |
| `popover`      | `--bl-index-popover`      |
| `tooltip`      | `--bl-index-tooltip`      |
| `sticky`       | `--bl-index-sticky`       |
| `overlay`      | `--bl-index-overlay`      |
| `dialog`       | `--bl-index-dialog`       |
| `notification` | `--bl-index-notification` |

## Vue Preset Colors

The `vue` preset applies:

- **Primary**: #41B883 (Vue Mint)
- **Primary Highlight**: #3aa876 (darker mint)
- **Primary Contrast**: #e7f9ef (light mint background)
- **Success**: Same as primary (Vue green)
- **Neutral Darker**: #34495E (Police Blue)
- **Neutral Darkest**: #2c3e50

## Design Tokens Reference

For a full reference of all Baklava design tokens with live preview examples, see [Design Tokens](/guide/design-tokens).

## TypeScript Support

```typescript
import {
  useBaklavaTheme,
  type ApplyThemeOptions,
  type BaklavaThemeBorderRadius,
  type BaklavaThemeColors,
  type BaklavaThemePreset,
  type BaklavaThemePresetRecord,
  type BaklavaThemeSize,
  type BaklavaThemeTypography,
  type BaklavaThemeZIndex,
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

// Full customization
applyTheme({
  colors: { primary: "#41B883" },
  borderRadius: { m: "0.5rem" },
  size: { m: "1rem" },
});
```
