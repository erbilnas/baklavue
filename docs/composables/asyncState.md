# useAsyncState

A composable for generic async state (loading, error, data) without fetch. Complements `useFetch`/`useQuery` for non-HTTP async operations like IndexedDB, Web Worker, or custom logic.

## Basic Usage

```vue
<script setup>
import { useAsyncState } from "@baklavue/composables";

const { state, execute, isLoading, error } = useAsyncState(async () => {
  const data = await readFromIndexedDB();
  return data;
});

await execute();
</script>
```

## Lazy with Immediate

```vue
<script setup>
import { useAsyncState } from "@baklavue/composables";

const { state, execute, isLoading } = useAsyncState(() => fetchUser(userId), {
  immediate: true,
  initialData: null,
});
</script>
```

## With Callbacks

```vue
<script setup>
import { useAsyncState, useNotification } from "@baklavue/composables";

const { success, error } = useNotification();
const { state, execute } = useAsyncState(() => loadData(), {
  onSuccess: () => success({ description: "Loaded!" }),
  onError: (err) => error({ description: err.message }),
});
</script>
```

## API

### Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `immediate` | `boolean` | `false` | Execute immediately on mount |
| `initialData` | `T` | `undefined` | Initial data value |
| `onSuccess` | `(data: T) => void` | — | Callback on success |
| `onError` | `(error: Error) => void` | — | Callback on error |

### Return Value

| Property | Type | Description |
| --- | --- | --- |
| `state` | `ShallowRef<T \| undefined>` | The resolved data |
| `execute` | `() => Promise<T>` | Run the async function |
| `isLoading` | `Ref<boolean>` | True while executing |
| `error` | `Ref<Error \| null>` | Last error if any |

## TypeScript Support

```typescript
import { useAsyncState, type UseAsyncStateOptions } from "@baklavue/composables";

const { state, execute } = useAsyncState<User>(() => fetchUser(id));
// state: ShallowRef<User | undefined>
```
