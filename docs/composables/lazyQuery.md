# useLazyQuery

Composable for lazy/on-demand queries. Does not fetch until `execute()` is called. Wraps `useQuery` with `enabled: false` initially.

## Basic Usage

```vue
<script setup>
import { ref } from "vue";
import { useLazyQuery } from "@baklavue/composables";

const userId = ref(1);
const { data, execute, isLoading } = useLazyQuery({
  queryKey: () => ["user", userId.value],
  queryFn: ({ queryKey }) =>
    fetch(`/api/users/${queryKey[1]}`).then((r) => r.json()),
});

const handleLoad = () => execute();
</script>

<template>
  <div>
    <button :disabled="isLoading" @click="handleLoad">Load User</button>
    <div v-if="data">{{ data.name }}</div>
  </div>
</template>
```

## Await Result

`execute()` returns a promise that resolves when the fetch completes:

```vue
<script setup>
import { useLazyQuery } from "@baklavue/composables";

const { data, execute } = useLazyQuery({
  queryKey: ["details"],
  queryFn: () => fetch("/api/details").then((r) => r.json()),
});

const handleLoad = async () => {
  await execute();
  // data is now populated
};
</script>
```

## API

### useLazyQuery

```typescript
useLazyQuery<T>(options: UseLazyQueryOptions<T>): UseLazyQueryReturn<T>
```

#### Options

Same as `useQuery` except `enabled` is always `false` (query starts disabled).

#### Return Value

Same as `useQuery` plus:

| Property | Type | Description |
| --- | --- | --- |
| `execute` | `() => Promise<void>` | Execute the query. First call fetches, subsequent calls refetch. |
