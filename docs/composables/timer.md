# useIntervalFn / useTimeoutFn

Pausable interval and cancellable timeout. Useful for polling, countdown timers, and delayed execution.

## Basic Usage

### useIntervalFn

Returns an object with `pause`, `resume`, and `isActive`. Useful for polling and auto-refresh.

```vue
<script setup>
import { onMounted } from "vue";
import { useIntervalFn } from "@baklavue/composables";

const { pause, resume, isActive } = useIntervalFn(() => {
  fetchLatestData();
}, 5000);

// Pause when tab is hidden
onMounted(() => {
  document.addEventListener("visibilitychange", () => {
    document.hidden ? pause() : resume();
  });
});
</script>
```

### useTimeoutFn

Returns an object with `run`, `cancel`, and `isPending`. Useful for delayed execution.

```vue
<script setup>
import { useNotification } from "@baklavue/composables";
import { useTimeoutFn } from "@baklavue/composables";

const { success } = useNotification();
const { run } = useTimeoutFn(() => {
  success({ description: "Saved!" });
}, 2000);

const handleSave = async () => {
  await saveData();
  run();
};
</script>
```

## API

### useIntervalFn

```typescript
useIntervalFn(
  callback: () => void,
  interval: number,
  options?: { immediate?: boolean }
): { pause: () => void; resume: () => void; isActive: Ref<boolean> }
```

- `callback` — Function to execute on each tick
- `interval` — Interval in milliseconds
- `options.immediate` — Run callback on start. Default: true
- Returns `{ pause, resume, isActive }`

### useTimeoutFn

```typescript
useTimeoutFn(
  callback: () => void,
  delay: number
): { run: () => void; cancel: () => void; isPending: Ref<boolean> }
```

- `callback` — Function to execute after delay
- `delay` — Delay in milliseconds
- Returns `{ run, cancel, isPending }`
