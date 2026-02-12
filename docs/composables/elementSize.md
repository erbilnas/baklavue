# useElementSize

A composable for reactive element width and height using ResizeObserver. Useful for layout calculations, charts, responsive containers, and dynamic sizing based on element dimensions.

## Basic Usage

```vue
<template>
  <div ref="target">Content</div>
  <p>Width: {{ width }}px, Height: {{ height }}px</p>
</template>

<script setup>
import { ref } from "vue";
import { useElementSize } from "@baklavue/composables";

const target = ref<HTMLElement | null>(null);
const { width, height } = useElementSize(target);
</script>
```

## Options

```vue
<script setup>
import { ref } from "vue";
import { useElementSize } from "@baklavue/composables";

const target = ref<HTMLElement | null>(null);
const { width, height } = useElementSize(target, {
  initialWidth: 0,
  initialHeight: 0,
});
</script>
```

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `initialWidth` | `number` | `0` | Initial width when no element is observed |
| `initialHeight` | `number` | `0` | Initial height when no element is observed |

## With Charts

```vue
<template>
  <div ref="chartContainer" class="chart-wrapper">
    <canvas :width="width" :height="height" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useElementSize } from "@baklavue/composables";

const chartContainer = ref<HTMLElement | null>(null);
const { width, height } = useElementSize(chartContainer);
</script>
```

## API

### Parameters

- `target` — `Ref<Element | null | undefined>` — Ref to the element to observe
- `options` — Optional `UseElementSizeOptions`

### Return Value

| Property | Type | Description |
| --- | --- | --- |
| `width` | `Ref<number>` | Element content width |
| `height` | `Ref<number>` | Element content height |

## TypeScript Support

```typescript
import {
  useElementSize,
  type UseElementSizeOptions,
} from "@baklavue/composables";

const target = ref<HTMLElement | null>(null);
const { width, height } = useElementSize(target);
```
