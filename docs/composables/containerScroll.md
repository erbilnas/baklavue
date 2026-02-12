# useContainerScroll

A composable for reactive scroll position inside a scrollable container. Uses scroll event with RAF throttling. Useful for virtual lists, custom scroll UIs, and horizontal scroll indicators.

## Basic Usage

```vue
<template>
  <div ref="container" class="overflow-auto h-64">
    <div class="p-4">Content</div>
  </div>
  <p>Scroll: {{ scrollTop }}px, {{ scrollLeft }}px</p>
</template>

<script setup>
import { ref } from "vue";
import { useContainerScroll } from "@baklavue/composables";

const container = ref<HTMLElement | null>(null);
const { scrollTop, scrollLeft } = useContainerScroll(container);
</script>
```

## Scroll Shadow Indicator

```vue
<template>
  <div class="relative">
    <div
      v-show="scrollLeft > 0"
      class="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-white to-transparent"
    />
    <div ref="scroll" class="overflow-x-auto">
      <div class="flex gap-4 p-4">...</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useContainerScroll } from "@baklavue/composables";

const scroll = ref<HTMLElement | null>(null);
const { scrollLeft } = useContainerScroll(scroll);
</script>
```

## Options

```vue
<script setup>
import { useContainerScroll } from "@baklavue/composables";

const container = ref<HTMLElement | null>(null);
const { scrollTop, scrollLeft } = useContainerScroll(container, {
  passive: true,
});
</script>
```

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `passive` | `boolean` | `true` | Use passive scroll listener |

## API

### Parameters

- `target` — `Ref<Element | null | undefined>` — Ref to the scrollable element
- `options` — Optional `UseContainerScrollOptions`

### Return Value

| Property | Type | Description |
| --- | --- | --- |
| `scrollTop` | `Ref<number>` | Scroll position from top |
| `scrollLeft` | `Ref<number>` | Scroll position from left |

## TypeScript Support

```typescript
import {
  useContainerScroll,
  type UseContainerScrollOptions,
} from "@baklavue/composables";

const container = ref<HTMLElement | null>(null);
const { scrollTop, scrollLeft } = useContainerScroll(container);
```
