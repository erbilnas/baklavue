# useDebounceFn / useDebouncedRef

Debounce function execution or ref value. Useful for search inputs, autocomplete, and form validation.

## Basic Usage

### useDebounceFn

Returns a debounced version of a function. The function is called only after the specified delay has passed since the last invocation.

```vue
<template>
  <BvInput v-model="searchQuery" placeholder="Search..." />
</template>

<script setup>
import { ref, watch } from "vue";
import { BvInput } from "@baklavue/ui";
import { useDebounceFn } from "@baklavue/composables";

const searchQuery = ref("");

const debouncedSearch = useDebounceFn((query) => {
  if (query) fetchResults(query);
}, 300);

watch(searchQuery, (q) => debouncedSearch(q));
</script>
```

### useDebouncedRef

Returns a ref that updates only after the specified delay since the last change. Useful for debounced v-model.

```vue
<script setup>
import { ref, watch } from "vue";
import { useDebouncedRef } from "@baklavue/composables";

const searchQuery = ref("");
const debouncedQuery = useDebouncedRef(searchQuery, 300);

watch(debouncedQuery, (q) => {
  if (q) fetchResults(q);
});
</script>
```

## API

### useDebounceFn

```typescript
useDebounceFn<T>(fn: T, delay?: number): (...args: Parameters<T>) => void
```

- `fn` — Function to debounce
- `delay` — Delay in milliseconds. Default: 200
- Returns a debounced function

### useDebouncedRef

```typescript
useDebouncedRef<T>(value: Ref<T>, delay?: number): Ref<T>
```

- `value` — Ref to debounce
- `delay` — Delay in milliseconds. Default: 200
- Returns a ref with debounced value
