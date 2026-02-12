# useThrottleFn / useThrottledRef

Throttle function execution or ref value. Useful for scroll, resize, and mousemove handlers.

## Basic Usage

### useThrottleFn

Returns a throttled version of a function. The function is called at most once per specified interval.

```vue
<script setup>
import { onMounted, onUnmounted } from "vue";
import { useThrottleFn } from "@baklavue/composables";

const throttledScroll = useThrottleFn(() => {
  updateScrollPosition();
}, 100);

onMounted(() => {
  window.addEventListener("scroll", throttledScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", throttledScroll);
});
</script>
```

### useThrottledRef

Returns a ref that updates at most once per specified interval.

```vue
<script setup>
import { ref, onMounted } from "vue";
import { useThrottledRef } from "@baklavue/composables";

const scrollY = ref(0);
const throttledScrollY = useThrottledRef(scrollY, 100);

onMounted(() => {
  window.addEventListener("scroll", () => {
    scrollY.value = window.scrollY;
  });
});
</script>
```

## API

### useThrottleFn

```typescript
useThrottleFn<T>(
  fn: T,
  delay?: number,
  options?: { leading?: boolean; trailing?: boolean }
): (...args: Parameters<T>) => void
```

- `fn` — Function to throttle
- `delay` — Minimum interval in milliseconds. Default: 200
- `options.leading` — Call on leading edge. Default: true
- `options.trailing` — Call on trailing edge. Default: true
- Returns a throttled function

### useThrottledRef

```typescript
useThrottledRef<T>(value: Ref<T>, delay?: number): Ref<T>
```

- `value` — Ref to throttle
- `delay` — Minimum interval in milliseconds. Default: 200
- Returns a ref with throttled value
