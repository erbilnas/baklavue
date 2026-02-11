# useIntersectionObserver

Detects when a target element enters or leaves the viewport. Useful for lazy loading, scroll-triggered animations, and "in view" detection.

## Basic Usage

```vue
<template>
  <div ref="target">
    <p v-if="isVisible">This content is visible!</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useIntersectionObserver } from "@baklavue/composables";

const target = ref(null);
const isVisible = useIntersectionObserver(target, {
  threshold: 0.5,
});
</script>
```

## Lazy Loading

```vue
<template>
  <div ref="target">
    <img v-if="isVisible" :src="imageSrc" alt="Lazy loaded" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useIntersectionObserver } from "@baklavue/composables";

const target = ref(null);
const isVisible = useIntersectionObserver(target, { threshold: 0 });
const imageSrc = ref("");
</script>
```

## API

```typescript
useIntersectionObserver(
  target: Ref<Element | null | undefined>,
  options?: UseIntersectionObserverOptions
): Ref<boolean>
```

### Options

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `root` | `Element \| Document \| null` | `null` | Root element (null = viewport) |
| `rootMargin` | `string` | `"0px"` | Margin around root |
| `threshold` | `number \| number[]` | `0` | Visibility threshold 0-1 |
| `immediate` | `boolean` | `true` | Start observing immediately |

### Return Value

Returns a `Ref<boolean>` that is `true` when the target is visible (intersecting).
