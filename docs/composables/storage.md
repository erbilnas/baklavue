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

## Options

`useLocalStorage` and `useSessionStorage` accept an optional third parameter.

```typescript
interface UseStorageOptions<T> {
  /** Merge default with stored value when both are objects. Default: false */
  mergeDefaults?: boolean | ((storageValue: T, defaults: T) => T);
  /** Listen to storage events for cross-tab sync. Default: true for localStorage, false for sessionStorage */
  listenToStorageChanges?: boolean;
  /** Custom serializer. Default: JSON */
  serializer?: { read: (raw: string) => T; write: (value: T) => string };
  /** Error callback. Default: silent */
  onError?: (error: unknown) => void;
}
```

### mergeDefaults

When you add new properties to your default object, existing stored values won't have them. Enable `mergeDefaults: true` for a shallow merge:

```vue
<script setup>
import { useLocalStorage } from "@baklavue/composables";

// If storage has { theme: "vue" } but default adds compact, merged result includes both
const prefs = useLocalStorage("prefs", { theme: "vue", compact: false }, {
  mergeDefaults: true,
});
</script>
```

Or pass a custom merge function for deep merge:

```typescript
import { useLocalStorage } from "@baklavue/composables";

const prefs = useLocalStorage("prefs", defaultPrefs, {
  mergeDefaults: (stored, defaults) => ({ ...defaults, ...stored }),
});
```

### listenToStorageChanges

Changes in other tabs update the ref automatically. Enabled by default for `useLocalStorage`; disabled for `useSessionStorage` (sessionStorage is tab-scoped).

### Custom serializer

Store `Map`, `Set`, `Date`, or custom formats:

```typescript
import { useLocalStorage } from "@baklavue/composables";

const count = useLocalStorage("count", 0, {
  serializer: {
    read: (v) => parseFloat(v) || 0,
    write: (v) => String(v),
  },
});

const lastVisit = useLocalStorage("last-visit", new Date(), {
  serializer: {
    read: (v) => new Date(v),
    write: (v) => v.toISOString(),
  },
});
```

### onError

Handle quota exceeded or parse errors:

```typescript
const prefs = useLocalStorage("prefs", {}, {
  onError: (e) => console.error("Storage error:", e),
});
```

## API

### useLocalStorage

```typescript
useLocalStorage<T>(key: string, defaultValue: T): Ref<T>
useLocalStorage<T>(key: string, defaultValue: T, options: UseStorageOptions<T>): Ref<T>
```

| Parameter | Type | Description |
| --- | --- | --- |
| `key` | `string` | Storage key |
| `defaultValue` | `T` | Default when key is missing or on SSR |
| `options` | `UseStorageOptions<T>` | Optional: mergeDefaults, listenToStorageChanges, serializer, onError |

### useSessionStorage

```typescript
useSessionStorage<T>(key: string, defaultValue: T): Ref<T>
useSessionStorage<T>(key: string, defaultValue: T, options: UseStorageOptions<T>): Ref<T>
```

| Parameter | Type | Description |
| --- | --- | --- |
| `key` | `string` | Storage key |
| `defaultValue` | `T` | Default when key is missing or on SSR |
| `options` | `UseStorageOptions<T>` | Optional: mergeDefaults, listenToStorageChanges, serializer, onError |

### Notes

- Values are JSON-serialized by default. Primitives, objects, and arrays are supported.
- On SSR, returns `defaultValue` (storage is not available).
- Changes to the ref are written to storage (with `{ deep: true }` for objects).
- Cross-tab sync is enabled for `useLocalStorage` by default.

## TypeScript Support

```typescript
import { useLocalStorage, useSessionStorage, type UseStorageOptions } from "@baklavue/composables";

const pageSize = useLocalStorage<number>("page-size", 10);
const prefs = useLocalStorage("prefs", { theme: "vue", compact: false });
const draft = useSessionStorage<string | null>("draft", null);

// With options
const prefsWithMerge = useLocalStorage("prefs", { theme: "vue", compact: false }, {
  mergeDefaults: true,
});
```
