# Skeleton

Animated placeholder for content loading states. Displays a shimmer effect with configurable variants.

## Basic Usage

<div class="component-demo">

<SkeletonBasicDemo />

</div>

```vue
<template>
  <BvSkeleton />
  <BvSkeleton variant="text" :count="3" />
</template>

<script setup>
import { BvSkeleton } from "@baklavue/ui";
</script>
```

## Variants

Use the `variant` prop for different placeholder shapes: rectangle (default), text lines, or circle (for avatars).

<div class="component-demo">

<SkeletonVariantsDemo />

</div>

```vue
<template>
  <!-- Rectangle (default) -->
  <BvSkeleton width="200px" height="120px" />

  <!-- Text lines -->
  <BvSkeleton variant="text" :count="3" />

  <!-- Circle for avatar -->
  <BvSkeleton variant="circle" />
</template>

<script setup>
import { BvSkeleton } from "@baklavue/ui";
</script>
```

## Props

| Prop      | Type             | Default      | Description                                    |
| --------- | ---------------- | ------------ | ---------------------------------------------- |
| `variant` | `SkeletonVariant` | `"rectangle"` | Shape: text, rectangle, circle                 |
| `width`   | `string`         | varies       | Width as CSS value (100% for text/rect, 40px for circle) |
| `height`  | `string`         | varies       | Height as CSS value (1rem default)            |
| `count`   | `number`         | `1`          | Number of skeleton elements (for text lines)   |

## Types

```typescript
import type { SkeletonProps, SkeletonVariant } from "@baklavue/ui";

type SkeletonVariant = "text" | "rectangle" | "circle";

interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: string;
  height?: string;
  count?: number;
}
```

## Usage Notes

- **Design tokens**: The skeleton uses `--bl-color-neutral-light` and `--bl-border-radius-s` for consistent styling with the Baklava design system.
- **Accessibility**: The component has `role="status"` and `aria-label="Loading"` for screen readers.
- **Content patterns**: Use text variant for paragraph placeholders, rectangle for cards/images, and circle for avatars and profile pictures.
