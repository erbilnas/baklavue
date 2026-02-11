# useSticky

A composable to detect when a sticky element is "stuck" at the top of the viewport. Uses scroll position and `getBoundingClientRect`. The target should have `position: sticky` and `top: 0` (or similar).

## Basic Usage

```vue
<template>
  <header
    ref="header"
    class="sticky top-0 transition-shadow"
    :class="{ 'shadow-md': isSticky }"
  >
    Header
  </header>
</template>

<script setup>
import { ref } from "vue";
import { useSticky } from "@baklavue/composables";

const header = ref<HTMLElement | null>(null);
const { isSticky } = useSticky(header);
</script>
```

## With Custom Scroll Container

```vue
<template>
  <div ref="scrollContainer" class="overflow-auto h-64">
    <div ref="stickyHeader" class="sticky top-0">Sticky header</div>
    <div>Content</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useSticky } from "@baklavue/composables";

const stickyHeader = ref<HTMLElement | null>(null);
const scrollContainer = ref<HTMLElement | null>(null);
const { isSticky } = useSticky(stickyHeader, {
  scrollTarget: scrollContainer,
});
</script>
```

## Options

```vue
<script setup>
import { useSticky } from "@baklavue/composables";

const header = ref<HTMLElement | null>(null);
const { isSticky } = useSticky(header, {
  threshold: 0,
  scrollTarget: undefined,
});
</script>
```

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `threshold` | `number` | `0` | Pixels. `isSticky` is true when element top is at or above this |
| `scrollTarget` | `Ref<Element \| null \| undefined>` | `undefined` | Scroll container. Default: window |

## API

### Parameters

- `target` — `Ref<Element | null | undefined>` — Ref to the sticky element
- `options` — Optional `UseStickyOptions`

### Return Value

| Property | Type | Description |
| --- | --- | --- |
| `isSticky` | `Ref<boolean>` | `true` when element is stuck |

## TypeScript Support

```typescript
import {
  useSticky,
  type UseStickyOptions,
} from "@baklavue/composables";

const header = ref<HTMLElement | null>(null);
const { isSticky } = useSticky(header, { threshold: 0 });
```
