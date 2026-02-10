# Badge

A Vue wrapper for Baklava's `bl-badge` component for displaying status badges.

## Basic Badge

Use the Badge component with the default slot for simple badge content.

<div class="component-demo">

<BvBadge>New</BvBadge>

</div>

```vue
<template>
  <BvBadge>New</BvBadge>
</template>

<script setup>
import { BvBadge } from "@baklavue/ui";
</script>
```

## Sizes

The Badge component supports three sizes: small, medium, and large.

<div class="component-demo" style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap">

<BvBadge size="small">Small</BvBadge>

<BvBadge size="medium">Medium</BvBadge>

<BvBadge size="large">Large</BvBadge>

</div>

```vue
<template>
  <BvBadge size="small">Small</BvBadge>
  <BvBadge size="medium">Medium</BvBadge>
  <BvBadge size="large">Large</BvBadge>
</template>

<script setup>
import { BvBadge } from "@baklavue/ui";
</script>
```

## With Icon

Add an icon to the badge using the `icon` prop.

<div class="component-demo" style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap">

<BvBadge icon="notification">Updates</BvBadge>

<BvBadge icon="settings" size="small">Settings</BvBadge>

</div>

```vue
<template>
  <BvBadge icon="notification">Updates</BvBadge>
  <BvBadge icon="settings" size="small">Settings</BvBadge>
</template>

<script setup>
import { BvBadge } from "@baklavue/ui";
</script>
```

## Props

| Prop   | Type                     | Default     | Description                        |
| ------ | ------------------------ | ----------- | ---------------------------------- |
| `size` | `BadgeSize`              | `'medium'`  | Badge size (small, medium, large)  |
| `icon` | `BaklavaIcon \| undefined` | `undefined` | Optional icon name for the badge   |

## Types

```typescript
import type { BadgeProps } from "@baklavue/ui";

// BadgeSize: "small" | "medium" | "large"

interface BadgeProps {
  size?: BadgeSize;
  icon?: BaklavaIcon;
}
```

## Usage Notes

- **Default Slot**: The badge content is provided via the default slot. Place text or simple content between the opening and closing tags.

- **Styling**: The component uses Baklava's default styling. Custom colors can be applied through CSS variables (`--bl-badge-bg-color`, `--bl-badge-color`) or by overriding the component styles.

- **Accessibility**: The component follows Baklava's accessibility guidelines and includes proper ARIA attributes for screen readers.
