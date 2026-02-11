# useLoading

A composable for generic loading state with optional delay to avoid flicker for fast operations. Use with BvSkeleton, BvSpinner, or loading overlays.

## Basic Usage

```vue
<template>
  <div>
    <BvSkeleton v-if="isLoading" variant="rectangle" />
    <div v-else>{{ data }}</div>
    <BvButton @click="fetchData" :loading="isLoading">Load</BvButton>
  </div>
</template>

<script setup>
import { BvButton, BvSkeleton } from "@baklavue/ui";
import { useLoading } from "@baklavue/composables";

const { isLoading, showLoading, hideLoading } = useLoading();

const fetchData = async () => {
  showLoading();
  try {
    const res = await fetch("/api/data");
    data.value = await res.json();
  } finally {
    hideLoading();
  }
};
</script>
```

## With Delay

```vue
<script setup>
import { useLoading } from "@baklavue/composables";

const { isLoading, showLoading, hideLoading } = useLoading({ delay: 200 });

// isLoading only becomes true after 200ms. Useful to avoid flicker for fast requests.
const quickFetch = async () => {
  showLoading();
  await api.getData();
  hideLoading();
};
</script>
```

## With Async Wrapper

```vue
<script setup>
import { useLoading } from "@baklavue/composables";

const { isLoading, withLoading } = useLoading();

const handleSave = () =>
  withLoading(async () => {
    await api.save();
  });
</script>
```

## API

### Return Value

| Property | Type | Description |
| --- | --- | --- |
| `isLoading` | `Ref<boolean>` | True when loading |
| `showLoading` | `() => void` | Start loading |
| `hideLoading` | `() => void` | Stop loading |
| `withLoading` | `(fn: () => Promise<T>) => Promise<T>` | Wraps async function with loading state |

### Options

```typescript
interface UseLoadingOptions {
  delay?: number; // ms before showing loading (default: 0)
}
```

## TypeScript Support

```typescript
import { useLoading, type UseLoadingOptions } from "@baklavue/composables";

const { isLoading, withLoading } = useLoading({ delay: 200 });
```
