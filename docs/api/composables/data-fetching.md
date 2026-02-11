# Data Fetching Composables

## useFetch

[useFetch](/composables/fetch) · `import { useFetch, createFetch } from "@baklavue/composables"`

Reactive fetch with loading/error/data. Axios-like API: method, headers, body, params, baseURL, retries, refetch triggers, execute overrides. Use `createFetch` for preconfigured instances.

```typescript
const { data, error, isFetching, execute, abort } = useFetch<User>(
  () => `https://api.example.com/users/${id.value}`,
  { immediate: true, timeout: 5000 },
);
```
