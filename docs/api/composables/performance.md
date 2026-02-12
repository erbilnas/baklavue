# Performance Composables

## useDebounceFn / useDebouncedRef

[useDebounceFn](/composables/debounce) · [useDebouncedRef](/composables/debounce) · `import { useDebounceFn, useDebouncedRef } from "@baklavue/composables"`

Debounce function execution or ref value. Useful for search inputs, autocomplete.

```typescript
const debouncedSearch = useDebounceFn((q: string) => fetchResults(q), 300);
const debouncedQuery = useDebouncedRef(searchQuery, 300);
```

## useThrottleFn / useThrottledRef

[useThrottleFn](/composables/throttle) · [useThrottledRef](/composables/throttle) · `import { useThrottleFn, useThrottledRef } from "@baklavue/composables"`

Throttle function execution or ref value. Useful for scroll, resize handlers.

```typescript
const throttledHandler = useThrottleFn(() => updateScroll(), 100);
const throttledScrollY = useThrottledRef(scrollY, 100);
```

## useIntervalFn / useTimeoutFn

[useIntervalFn](/composables/timer) · [useTimeoutFn](/composables/timer) · `import { useIntervalFn, useTimeoutFn } from "@baklavue/composables"`

Pausable interval and cancellable timeout.

```typescript
const { pause, resume, isActive } = useIntervalFn(() => fetchData(), 5000);
const { run, cancel, isPending } = useTimeoutFn(
  () => showToast("Saved!"),
  2000,
);
```

## useRafFn

[useRafFn](/composables/raf) · `import { useRafFn } from "@baklavue/composables"`

Calls a function on every requestAnimationFrame. Animation loops, smooth updates.

```typescript
const { pause, resume } = useRafFn(({ delta }) => {
  position.value += velocity * (delta / 1000);
});
```
