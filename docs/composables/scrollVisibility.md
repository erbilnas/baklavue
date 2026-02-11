# useScrollVisibility

A composable for scroll-based visibility. Detects when scroll position exceeds a threshold. RAF-throttled for performance. Use with BvScrollToTop or custom scroll-to-top and sticky UI.

## Basic Usage

```vue
<template>
  <div>
    <BvButton v-if="isVisible" @click="scrollToTop">Scroll to top</BvButton>
  </div>
</template>

<script setup>
import { BvButton } from "@baklavue/ui";
import { useScrollVisibility } from "@baklavue/composables";

const { isVisible, scrollY, scrollToTop } = useScrollVisibility({ threshold: 300 });
</script>
```

## Custom Threshold

```vue
<script setup>
import { useScrollVisibility } from "@baklavue/composables";

const { isVisible } = useScrollVisibility({ threshold: 500 });
// isVisible is true when user scrolls past 500px
</script>
```

## API

### Return Value

| Property | Type | Description |
| --- | --- | --- |
| `isVisible` | `Ref<boolean>` | True when scroll exceeds threshold |
| `scrollY` | `Ref<number>` | Current scroll position |
| `scrollToTop` | `() => void` | Smooth scroll to top |

### Options

```typescript
interface UseScrollVisibilityOptions {
  threshold?: number; // pixels (default: 300)
}
```

## TypeScript Support

```typescript
import {
  useScrollVisibility,
  type UseScrollVisibilityOptions,
} from "@baklavue/composables";

const { isVisible, scrollToTop } = useScrollVisibility({ threshold: 400 });
```
