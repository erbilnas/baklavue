# useMutation

Composable for mutations (POST/PUT/PATCH/DELETE) with explicit trigger. Pairs with `useQuery` for cache invalidation after mutations.

## Basic Usage

```vue
<script setup>
import { useMutation, useQueryClient } from "@baklavue/composables";

const queryClient = useQueryClient();
const { mutate, mutateAsync, isPending, data } = useMutation({
  mutationFn: (user) =>
    fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    }).then((r) => r.json()),
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
});

const handleCreate = () => mutate({ name: "John", email: "john@example.com" });
</script>

<template>
  <button :disabled="isPending" @click="handleCreate">
    {{ isPending ? "Creating..." : "Create User" }}
  </button>
</template>
```

## mutateAsync

Use `mutateAsync` when you need to await the result:

```vue
<script setup>
import { useMutation } from "@baklavue/composables";

const { mutateAsync } = useMutation({
  mutationFn: (data) => fetch("/api/save", { method: "POST", body: JSON.stringify(data) }).then((r) => r.json()),
});

const handleSubmit = async () => {
  try {
    const result = await mutateAsync({ title: "New Post" });
    router.push(`/posts/${result.id}`);
  } catch (err) {
    console.error(err);
  }
};
</script>
```

## API

### useMutation

```typescript
useMutation<TData, TError, TVariables>(options): UseMutationReturn<TData, TVariables>
```

#### Options

| Property | Type | Description |
| --- | --- | --- |
| `mutationFn` | `(variables: TVariables) => Promise<TData>` | Async function that performs the mutation |
| `onSuccess` | `(data: TData, variables: TVariables) => void` | Callback on success |
| `onError` | `(error: TError, variables: TVariables) => void` | Callback on error |
| `onSettled` | `(data, error, variables) => void` | Callback when mutation settles |

#### Return Value

| Property | Type | Description |
| --- | --- | --- |
| `data` | `Ref<TData \| null>` | Fetched data on success |
| `error` | `Ref<Error \| null>` | Error if mutation failed |
| `isPending` | `Ref<boolean>` | True while mutation is in flight |
| `isSuccess` | `Ref<boolean>` | True when mutation succeeded |
| `isError` | `Ref<boolean>` | True when mutation failed |
| `mutate` | `(variables: TVariables) => void` | Execute mutation (fire-and-forget) |
| `mutateAsync` | `(variables: TVariables) => Promise<TData>` | Execute mutation (returns promise) |
| `reset` | `() => void` | Reset state to initial |
