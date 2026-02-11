# usePolling

Composable for polling with fetch state. Combines `useAsyncState` with `useIntervalFn` for non-query polling scenarios (e.g. when you don't need `useQuery` caching).

## Basic Usage

```vue
<script setup>
import { usePolling } from "@baklavue/composables";

const { data, isLoading, pause, resume } = usePolling(
  () => fetch("/api/status").then((r) => r.json()),
  { interval: 5000 }
);
</script>

<template>
  <div>
    <div v-if="data">Status: {{ data.status }}</div>
    <button @click="pause">Pause</button>
    <button @click="resume">Resume</button>
  </div>
</template>
```

## Pause in Background

By default, polling pauses when the tab is hidden:

```vue
<script setup>
import { usePolling } from "@baklavue/composables";

const { data } = usePolling(
  () => fetch("/api/live").then((r) => r.json()),
  { interval: 3000, pauseInBackground: true }
);
</script>
```

## API

### usePolling

```typescript
usePolling<T>(fetchFn: () => Promise<T>, options): UsePollingReturn<T>
```

#### Options

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `interval` | `number` | required | Polling interval in ms |
| `immediate` | `boolean` | `true` | Run first fetch immediately |
| `initialData` | `T` | - | Initial data before first fetch |
| `pauseInBackground` | `boolean` | `true` | Pause when tab is hidden |
| `onSuccess` | `(data: T) => void` | - | Callback on success |
| `onError` | `(error: Error) => void` | - | Callback on error |

#### Return Value

| Property | Type | Description |
| --- | --- | --- |
| `data` | `Ref<T \| undefined>` | Fetched data |
| `error` | `Ref<Error \| null>` | Error if fetch failed |
| `isLoading` | `Ref<boolean>` | True while fetch is in flight |
| `pause` | `() => void` | Pause polling |
| `resume` | `() => void` | Resume polling |
| `isActive` | `Ref<boolean>` | True when polling is active |

## usePolling vs useQuery refetchInterval

| | usePolling | useQuery refetchInterval |
| --- | --- | --- |
| Caching | No | Yes |
| Use case | Simple polling, non-cached data | Cached API data that needs periodic refresh |
