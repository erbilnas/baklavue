# useFetch

Reactive fetch with loading state, error handling, and abort support. Axios-like API with method, headers, body, params, baseURL, interceptors, retries, and refetch triggers.

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

## POST Request

```vue
<script setup>
import { useFetch } from "@baklavue/composables";

const { data, error, isFetching, execute } = useFetch("/api/users", {
  method: "POST",
  body: { name: "John", email: "john@example.com" },
  immediate: false,
});

const createUser = () => execute();
</script>
```

## Base URL and Params

Use `baseURL` and `params` for a cleaner API:

```vue
<script setup>
import { useFetch } from "@baklavue/composables";

const { data } = useFetch("/users", {
  baseURL: "https://api.example.com",
  params: { page: 1, limit: 10 },
});
</script>
```

## Preconfigured Instance (createFetch)

Create a reusable fetch instance with default options, similar to `axios.create()`:

```vue
<script setup>
import { createFetch } from "@baklavue/composables";

const useApiFetch = createFetch({
  baseURL: "/api",
  headers: { "X-Custom-Header": "value" },
});

// All requests use baseURL and headers
const { data } = useApiFetch("/users", { params: { page: 1 } });
</script>
```

## Auth Interceptor

Use `beforeFetch` to add auth or modify the request:

```vue
<script setup>
import { createFetch } from "@baklavue/composables";

const token = ref("your-jwt-token");

const useAuthFetch = createFetch({
  beforeFetch: ({ options }) => {
    (options.headers as Record<string, string>)["Authorization"] =
      `Bearer ${token.value}`;
  },
});

const { data } = useAuthFetch("/me");
</script>
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

## Retry

Configure retries for transient failures (network errors, 5xx). By default only GET retries; set `retryOnNonIdempotent: true` for POST/PUT/PATCH:

```vue
<script setup>
import { useFetch } from "@baklavue/composables";

const { data, error } = useFetch("/api/users", {
  retry: 3,
  retryDelay: (attempt) => 1000 * 2 ** attempt,
});
</script>
```

## Refetch Triggers

Opt-in refetch on window focus or network reconnect:

```vue
<script setup>
import { useFetch } from "@baklavue/composables";

const { data } = useFetch("/api/config", {
  refetchOnWindowFocus: true,
  refetchOnReconnect: true,
});
</script>
```

## Refetch on URL Change

When using a reactive URL getter, auto-refetch when the URL changes:

```vue
<script setup>
import { useFetch } from "@baklavue/composables";

const userId = ref("1");
const { data } = useFetch(
  () => `https://api.example.com/users/${userId.value}`,
  { refetchOnUrlChange: true }
);
</script>
```

## Execute with Overrides

Pass dynamic url, body, or params at execute time:

```vue
<script setup>
import { useFetch } from "@baklavue/composables";

const { data, execute } = useFetch("/api/users", {
  method: "POST",
  immediate: false,
});

const createUser = (name: string) =>
  execute({ body: { name }, throwOnFailed: true });
</script>
```

## Error Interceptor

Use `onFetchError` to log, transform, or handle errors:

```vue
<script setup>
import { useFetch } from "@baklavue/composables";

const { data, error } = useFetch("/api/users", {
  onFetchError: ({ response, error }) => {
    console.error("Fetch failed:", response?.status, error.message);
  },
});
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

createFetch(defaultOptions: UseFetchOptions): (url, options?) => UseFetchReturn<T>
```

### Options

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `immediate` | `boolean` | `true` | Run fetch immediately on creation |
| `initialData` | `unknown` | `null` | Initial data before request completes |
| `timeout` | `number` | `0` | Timeout in ms to abort (0 = no timeout) |
| `method` | `'GET' \| 'POST' \| 'PUT' \| 'PATCH' \| 'DELETE'` | `'GET'` | HTTP method |
| `headers` | `Record<string, string>` | `{}` | Request headers |
| `body` | `unknown` | - | Request body (JSON, FormData, string, etc.) |
| `params` | `Record<string, string \| number \| boolean \| array>` | - | URL query params |
| `baseURL` | `string` | - | Base URL prepended to relative URLs |
| `validateStatus` | `(status: number) => boolean` | `200-299` | Custom status validation |
| `beforeFetch` | `(ctx: { url, options }) => void \| Promise<void>` | - | Hook to modify request before fetch |
| `afterFetch` | `(ctx: { response, data }) => unknown \| Promise<unknown>` | - | Hook to transform response data |
| `onFetchError` | `(ctx: { response, error }) => void \| Promise<void>` | - | Hook called on fetch error |
| `retry` | `number \| boolean` | `0` | Number of retries (or false for none) |
| `retryDelay` | `number \| (attempt, error) => number` | exponential backoff | Delay between retries |
| `retryCondition` | `(error, response) => boolean` | network/5xx | When to retry |
| `retryOnNonIdempotent` | `boolean` | `false` | Retry POST/PUT/PATCH/DELETE |
| `refetchOnWindowFocus` | `boolean` | `false` | Refetch when window regains focus |
| `refetchOnReconnect` | `boolean` | `false` | Refetch when network reconnects |
| `refetchOnUrlChange` | `boolean` | `false` | Refetch when URL (getter) changes |
| `responseType` | `'json' \| 'text' \| 'blob' \| 'arraybuffer'` | auto | Response parsing |
| `credentials` | `RequestCredentials` | - | CORS credentials |

### Return Value

| Property | Type | Description |
| --- | --- | --- |
| `data` | `Ref<T \| null>` | Response data on success |
| `error` | `Ref<Error \| null>` | Error if request failed |
| `statusCode` | `Ref<number \| null>` | HTTP status of last response |
| `isFetching` | `Ref<boolean>` | True while request is in flight |
| `isFinished` | `Ref<boolean>` | True when request has finished |
| `execute` | `(options?) => Promise<void>` | Execute manually; pass `{ url?, body?, params?, throwOnFailed? }` for overrides |
| `abort` | `() => void` | Abort the current request |
