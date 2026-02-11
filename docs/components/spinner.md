# Spinner

A Vue wrapper for Baklava's `bl-spinner` web component for loading indicators. Use the Spinner component to show loading states during async operations.

## Basic Usage

<div class="component-demo">

<SpinnerBasicDemo />

</div>

```vue
<template>
  <div style="display: flex; align-items: center; gap: 1rem;">
    <BvSpinner />
    <span>Loading...</span>
  </div>
</template>

<script setup>
import { BvSpinner } from "@baklavue/ui";
</script>
```

## Sizes

Control the spinner size using the `size` prop. Use CSS variables for consistent sizing.

<div class="component-demo">

<SpinnerSizesDemo />

</div>

```vue
<template>
  <div style="display: flex; align-items: center; gap: 2rem;">
    <BvSpinner size="var(--bl-font-size-s)" />
    <BvSpinner size="var(--bl-font-size-m)" />
    <BvSpinner size="var(--bl-font-size-l)" />
  </div>
</template>

<script setup>
import { BvSpinner } from "@baklavue/ui";
</script>
```

## With Label

Add a `label` for accessibility. The label is exposed to screen readers via `aria-label`.

<div class="component-demo">

<SpinnerVariantsDemo />

</div>

```vue
<template>
  <BvSpinner label="Loading content..." />
</template>

<script setup>
import { BvSpinner } from "@baklavue/ui";
</script>
```

## Props

| Prop      | Type     | Default     | Description                                 |
| --------- | -------- | ----------- | ------------------------------------------- |
| `size`    | `string` | `undefined` | Spinner size (e.g. CSS variable or length)  |
| `variant` | `string` | `undefined` | Spinner variant/style                       |
| `label`   | `string` | `undefined` | Accessible label for screen readers         |

## Types

```typescript
import type { SpinnerProps } from "@baklavue/ui";

interface SpinnerProps {
  size?: string;
  variant?: string;
  label?: string;
}
```

## Usage Notes

- **Accessibility**: Provide a `label` when the spinner is the primary indicator of loading state so screen readers can announce it. The label is set as `aria-label` on the spinner element.
- **Sizing**: Use Baklava CSS variables (`--bl-font-size-s`, `--bl-font-size-m`, `--bl-font-size-l`) for consistent sizing with the design system.
