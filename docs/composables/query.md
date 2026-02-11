# useQuery

Data fetching with caching, stale-while-revalidate, retries, and refetch triggers. Inspired by TanStack Query. Use for API data that benefits from caching and invalidation.

## Basic Usage

```vue
<script setup>
import { useQuery } from "@baklavue/composables";

const { data, error, isFetching, isLoading, refetch } = useQuery({
  queryKey: ["users"],
  queryFn: () => fetch("/api/users").then((r) => r.json()),
});
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <div v-else-if="data">
    <ul>
      <li v-for="user in data" :key="user.id">{{ user.name }}</li>
    </ul>
  </div>
  <button @click="refetch">Refresh</button>
</template>
```

## Reactive Query Key

Use a `computed` or getter for reactive query keys (e.g. when key depends on route params):

```vue
<script setup>
import { useQuery } from "@baklavue/composables";

const userId = ref("1");
const { data } = useQuery({
  queryKey: () => ["users", userId.value],
  queryFn: ({ queryKey }) =>
    fetch(`/api/users/${queryKey[1]}`).then((r) => r.json()),
});

// Refetches automatically when userId changes
</script>
```

## Stale Time

Set `staleTime` to avoid refetching while data is fresh:

```vue
<script setup>
import { useQuery } from "@baklavue/composables";

const { data } = useQuery({
  queryKey: ["users"],
  queryFn: () => fetch("/api/users").then((r) => r.json()),
  staleTime: 60_000, // Data stays fresh for 1 minute
});
</script>
```

## Dependent Queries

Use `enabled` to run a query only when dependencies are ready:

```vue
<script setup>
import { useQuery } from "@baklavue/composables";

const userId = ref(null);
const { data } = useQuery({
  queryKey: () => ["users", userId.value],
  queryFn: ({ queryKey }) =>
    fetch(`/api/users/${queryKey[1]}`).then((r) => r.json()),
  enabled: () => userId.value != null,
});
</script>
```

## Cache Invalidation

Use `useQueryClient` to invalidate or update cached data:

```vue
<script setup>
import { useQuery, useQueryClient } from "@baklavue/composables";

const queryClient = useQueryClient();

// Invalidate all queries matching ["users"]
const invalidateUsers = () => {
  queryClient.invalidateQueries({ queryKey: ["users"] });
};

// Manually set cache data
const setUser = (id, user) => {
  queryClient.setQueryData(["users", id], user);
};

// Read cached data
const cachedUser = queryClient.getQueryData(["users", 1]);
</script>
```

## Refetch Triggers

By default, queries refetch when the window regains focus or when the network reconnects. Disable with options:

```vue
<script setup>
import { useQuery } from "@baklavue/composables";

const { data } = useQuery({
  queryKey: ["users"],
  queryFn: () => fetch("/api/users").then((r) => r.json()),
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
});
</script>
```

## Retries

Configure retry behavior:

```vue
<script setup>
import { useQuery } from "@baklavue/composables";

// Retry 3 times with exponential backoff (default)
const { data } = useQuery({
  queryKey: ["users"],
  queryFn: () => fetch("/api/users").then((r) => r.json()),
  retry: 3,
});

// No retries
const { data: data2 } = useQuery({
  queryKey: ["config"],
  queryFn: () => fetch("/api/config").then((r) => r.json()),
  retry: false,
});
</script>
```

## API

### useQuery

```typescript
useQuery<T>(options: UseQueryOptions<T>): UseQueryReturn<T>
```

#### Options

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `queryKey` | `MaybeRefOrGetter<QueryKey>` | required | Unique key for caching (array of values) |
| `queryFn` | `(context: { queryKey }) => Promise<T>` | required | Async function that fetches data |
| `staleTime` | `number` | `0` | ms until data is stale (0 = always stale) |
| `retry` | `number \| boolean` | `3` | Retries on error (`false` = none) |
| `retryDelay` | `number \| (attempt, error) => number` | exponential backoff | Delay between retries in ms |
| `enabled` | `MaybeRefOrGetter<boolean>` | `true` | If false, query won't run |
| `refetchOnWindowFocus` | `boolean` | `true` | Refetch when window regains focus |
| `refetchOnReconnect` | `boolean` | `true` | Refetch when network reconnects |
| `initialData` | `T \| (() => T)` | - | Initial data before first fetch |

#### Return Value

| Property | Type | Description |
| --- | --- | --- |
| `data` | `Ref<T \| null>` | Fetched data |
| `error` | `Ref<Error \| null>` | Error if request failed |
| `isFetching` | `Ref<boolean>` | True while request is in flight |
| `isLoading` | `Ref<boolean>` | True when no data yet and fetching |
| `isSuccess` | `Ref<boolean>` | True when data is available |
| `isError` | `Ref<boolean>` | True when error occurred |
| `refetch` | `() => Promise<void>` | Manual refetch |

### useQueryClient

```typescript
useQueryClient(): QueryClient
```

#### QueryClient Methods

| Method | Description |
| --- | --- |
| `invalidateQueries(options?)` | Remove matching entries from cache. `{ queryKey: ["users"] }` invalidates all keys starting with `["users"]` |
| `getQueryData<T>(queryKey)` | Get cached data for a key |
| `setQueryData<T>(queryKey, data)` | Manually set cache for a key |

## useQuery vs useFetch

| | useQuery | useFetch |
| --- | --- | --- |
| Caching | Yes, by query key | No |
| Stale / refetch | Yes | No |
| Retries | Configurable | Configurable (opt-in) |
| Refetch triggers | Window focus, reconnect (default on) | Window focus, reconnect, URL change (opt-in) |
| Invalidation | Via useQueryClient | N/A |
| Use case | Cached API data | One-off or non-cached requests |
