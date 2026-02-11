# useRafFn

Calls a function on every requestAnimationFrame. Returns pause and resume controls. Useful for animation loops and smooth updates.

## Basic Usage

```vue
<script setup>
import { ref, onMounted } from "vue";
import { useRafFn } from "@baklavue/composables";

const position = ref(0);
const velocity = 100;

const { pause, resume } = useRafFn(({ delta }) => {
  position.value += velocity * (delta / 1000);
});

// Pause when tab is hidden
onMounted(() => {
  document.addEventListener("visibilitychange", () => {
    document.hidden ? pause() : resume();
  });
});
</script>

<template>
  <div :style="{ transform: `translateX(${position}px)` }">
    Animated content
  </div>
</template>
```

## With FPS Limit

Limit the frame rate to reduce CPU usage:

```vue
<script setup>
import { useRafFn } from "@baklavue/composables";

const { pause, resume } = useRafFn(
  ({ delta }) => {
    // Update animation
  },
  { fpsLimit: 60 }
);
</script>
```

## API

```typescript
useRafFn(
  callback: (args: RafCallbackArgs) => void,
  options?: UseRafFnOptions
): { pause: () => void; resume: () => void; isActive: Ref<boolean> }
```

### Callback Args

- `delta` — Time elapsed since last frame in milliseconds
- `timestamp` — High-resolution timestamp

### Options

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `immediate` | `boolean` | `true` | Start the loop immediately |
| `fpsLimit` | `number` | `undefined` | Max FPS (no limit if undefined) |

### Return Value

| Property | Type | Description |
| --- | --- | --- |
| `pause` | `() => void` | Pause the animation loop |
| `resume` | `() => void` | Resume the animation loop |
| `isActive` | `Ref<boolean>` | True when the loop is running |
