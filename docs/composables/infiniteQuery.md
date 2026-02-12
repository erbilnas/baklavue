# useInfiniteQuery

Composable for infinite scroll / cursor-based pagination. Fetches pages and accumulates them. Use with `useIntersectionObserver` for "load more" on scroll.

## Basic Usage

```vue
<script setup>
import { useInfiniteQuery } from "@baklavue/composables";

const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
  queryKey: ["items"],
  queryFn: ({ pageParam }) =>
    fetch(`/api/items?cursor=${pageParam ?? ""}`).then((r) => r.json()),
  initialPageParam: null,
  getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
});
</script>

<template>
  <div>
    <div v-for="(page, i) in data" :key="i">
      <div v-for="item in page.items" :key="item.id">{{ item.name }}</div>
    </div>
    <button
      :disabled="!hasNextPage || isFetchingNextPage"
      @click="fetchNextPage()"
    >
      {{ isFetchingNextPage ? "Loading..." : "Load more" }}
    </button>
  </div>
</template>
```

## With Intersection Observer

Load more when a sentinel element becomes visible:

```vue
<script setup>
import { useInfiniteQuery, useIntersectionObserver } from "@baklavue/composables";

const sentinel = ref(null);
const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
  queryKey: ["items"],
  queryFn: ({ pageParam }) =>
    fetch(`/api/items?cursor=${pageParam ?? ""}`).then((r) => r.json()),
  initialPageParam: null,
  getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
});

const isVisible = useIntersectionObserver(sentinel);
watch(isVisible, (visible) => {
  if (visible && hasNextPage.value && !isFetchingNextPage.value) {
    fetchNextPage();
  }
});
</script>

<template>
  <div>
    <div v-for="(page, i) in data" :key="i">
      <div v-for="item in page.items" :key="item.id">{{ item.name }}</div>
    </div>
    <div ref="sentinel" />
  </div>
</template>
```

## API

### useInfiniteQuery

```typescript
useInfiniteQuery<TData, TPageParam>(options): UseInfiniteQueryReturn<TData>
```

#### Options

| Property | Type | Description |
| --- | --- | --- |
| `queryKey` | `MaybeRefOrGetter<QueryKey>` | Unique key for caching |
| `queryFn` | `(context: { queryKey, pageParam }) => Promise<TData>` | Async function that fetches a page |
| `initialPageParam` | `TPageParam` | Initial page param for first fetch |
| `getNextPageParam` | `(lastPage: TData) => TPageParam \| undefined` | Extract next page param |
| `getPreviousPageParam` | `(firstPage: TData) => TPageParam \| undefined` | For bidirectional infinite scroll |
| `enabled` | `MaybeRefOrGetter<boolean>` | If false, query won't run |
| `retry` | `number \| boolean` | Retries on error |
| `refetchOnWindowFocus` | `boolean` | Refetch when window regains focus |
| `refetchOnReconnect` | `boolean` | Refetch when network reconnects |

#### Return Value

| Property | Type | Description |
| --- | --- | --- |
| `data` | `Ref<TData[] \| null>` | Array of fetched pages |
| `error` | `Ref<Error \| null>` | Error if request failed |
| `isFetching` | `Ref<boolean>` | True while initial fetch or refetch |
| `isFetchingNextPage` | `Ref<boolean>` | True while fetching next page |
| `hasNextPage` | `Ref<boolean>` | True if more pages available |
| `hasPreviousPage` | `Ref<boolean>` | True if previous pages available |
| `fetchNextPage` | `() => Promise<void>` | Fetch the next page |
| `fetchPreviousPage` | `() => Promise<void>` | Fetch the previous page |
| `refetch` | `() => Promise<void>` | Refetch from first page |
