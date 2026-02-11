# useLocalStorage / useSessionStorage

Reactive sync with `localStorage` and `sessionStorage`. Persist user preferences like theme, table page size, or form drafts across sessions (localStorage) or within the current tab (sessionStorage).

## useLocalStorage

Persists across browser sessions. Use for theme, page size, sidebar state, etc.

```vue
<template>
  <BvSelect v-model="pageSize" :options="pageSizeOptions" />
</template>

<script setup>
import { BvSelect } from "@baklavue/ui";
import { useLocalStorage } from "@baklavue/composables";

const pageSize = useLocalStorage("table-page-size", 10);
const pageSizeOptions = [
  { value: 10, text: "10" },
  { value: 25, text: "25" },
  { value: 50, text: "50" },
];
</script>
```

## useSessionStorage

Persists only for the current tab/session. Use for form drafts, temporary filters, etc.

```vue
<script setup>
import { useSessionStorage } from "@baklavue/composables";

const draft = useSessionStorage("form-draft", null);
</script>
```

## With useBaklavaTheme

```vue
<script setup>
import { useBaklavaTheme, useLocalStorage } from "@baklavue/composables";

const themePreset = useLocalStorage("theme-preset", "vue");
const { applyTheme } = useBaklavaTheme();

watch(themePreset, (preset) => applyTheme({ preset }), { immediate: true });
</script>
```

## With usePagination

```vue
<script setup>
import { usePagination, useLocalStorage } from "@baklavue/composables";

const savedPageSize = useLocalStorage("pagination-page-size", 10);
const { currentPage, pageSize, totalItems, slice } = usePagination({
  pageSize: savedPageSize.value,
});

watch(pageSize, (size) => (savedPageSize.value = size));
</script>
```

## API

### useLocalStorage

```typescript
useLocalStorage<T>(key: string, defaultValue: T): Ref<T>
```

| Parameter | Type | Description |
| --- | --- | --- |
| `key` | `string` | Storage key |
| `defaultValue` | `T` | Default when key is missing or on SSR |

### useSessionStorage

```typescript
useSessionStorage<T>(key: string, defaultValue: T): Ref<T>
```

| Parameter | Type | Description |
| --- | --- | --- |
| `key` | `string` | Storage key |
| `defaultValue` | `T` | Default when key is missing or on SSR |

### Notes

- Values are JSON-serialized. Primitives, objects, and arrays are supported.
- On SSR, returns `defaultValue` (storage is not available).
- Changes to the ref are written to storage (with `{ deep: true }` for objects).

## TypeScript Support

```typescript
import { useLocalStorage, useSessionStorage } from "@baklavue/composables";

const pageSize = useLocalStorage<number>("page-size", 10);
const prefs = useLocalStorage("prefs", { theme: "vue", compact: false });
const draft = useSessionStorage<string | null>("draft", null);
```
