# useFetch

Reactive fetch with loading state, error handling, and abort support. Useful for API calls.

## Basic Usage

```vue
<script setup>
import { useFetch } from "@baklavue/composables";

const { data, error, isFetching, execute } = useFetch("/api/users", {
  immediate: true,
});

// Refetch manually
const refresh = () => execute();
</script>

<template>
  <div v-if="isFetching">Loading...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <div v-else-if="data">{{ data }}</div>
</template>
```

## Reactive URL

Pass a getter function for reactive URLs (e.g. when URL depends on route params):

```vue
<script setup>
import { useFetch } from "@baklavue/composables";

const userId = ref("1");
const { data, execute } = useFetch(
  () => `https://api.example.com/users/${userId.value}`,
  { immediate: true }
);

watch(userId, () => execute());
</script>
```

## Manual Execute

Set `immediate: false` to prevent the request from firing until `execute()` is called:

```vue
<script setup>
import { useFetch } from "@baklavue/composables";

const { data, execute } = useFetch("/api/users", {
  immediate: false,
});

const loadUsers = () => execute();
</script>
```

## API

```typescript
useFetch<T>(
  url: string | (() => string),
  options?: UseFetchOptions
): UseFetchReturn<T>
```

### Options

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `immediate` | `boolean` | `true` | Run fetch immediately on creation |
| `initialData` | `unknown` | `null` | Initial data before request completes |
| `timeout` | `number` | `0` | Timeout in ms to abort (0 = no timeout) |

### Return Value

| Property | Type | Description |
| --- | --- | --- |
| `data` | `Ref<T \| null>` | Response data on success |
| `error` | `Ref<Error \| null>` | Error if request failed |
| `isFetching` | `Ref<boolean>` | True while request is in flight |
| `isFinished` | `Ref<boolean>` | True when request has finished |
| `execute` | `(throwOnFailed?: boolean) => Promise<void>` | Execute the fetch manually |
| `abort` | `() => void` | Abort the current request |
