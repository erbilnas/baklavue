# useBreakpoints / useMediaQuery

Composables for responsive breakpoints. Use `useBreakpoints` for predefined mobile/tablet/desktop flags, or `useMediaQuery` for custom media queries.

## useBreakpoints

Reactively detects viewport size. Useful for switching layouts (e.g. Drawer vs Dialog on mobile).

```vue
<template>
  <component :is="useDrawer ? BvDrawer : BvDialog" v-model:open="isOpen">
    <p>Content</p>
  </component>
</template>

<script setup>
import { computed } from "vue";
import { BvDrawer, BvDialog } from "@baklavue/ui";
import { useBreakpoints, useDisclosure } from "@baklavue/composables";

const { isMobile, isTablet, isDesktop } = useBreakpoints();
const { isOpen } = useDisclosure();

const useDrawer = computed(() => isMobile.value);
</script>
```

## Custom Breakpoints

```vue
<script setup>
import { useBreakpoints } from "@baklavue/composables";

const { isMobile, isTablet, isDesktop } = useBreakpoints({
  mobile: 640,   // < 640px = mobile
  tablet: 1280,  // 640-1279 = tablet, >= 1280 = desktop
});
</script>
```

## useMediaQuery

For a single media query:

```vue
<template>
  <div v-if="matches">Visible on small screens only</div>
</template>

<script setup>
import { useMediaQuery } from "@baklavue/composables";

const matches = useMediaQuery("(max-width: 768px)");
</script>
```

## API

### useBreakpoints

#### Return Value

| Property | Type | Description |
| --- | --- | --- |
| `isMobile` | `Ref<boolean>` | Viewport < mobile breakpoint |
| `isTablet` | `Ref<boolean>` | Viewport between mobile and tablet |
| `isDesktop` | `Ref<boolean>` | Viewport >= tablet breakpoint |

#### Options

```typescript
interface BreakpointOptions {
  mobile?: number;  // Default: 768 (px)
  tablet?: number;  // Default: 1024 (px)
}
```

Default breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1023px
- Desktop: >= 1024px

### useMediaQuery

#### Parameters

- `query` — Media query string (e.g. `"(max-width: 768px)"`)

#### Return Value

- `Ref<boolean>` — `true` when the query matches

## TypeScript Support

```typescript
import {
  useBreakpoints,
  useMediaQuery,
  type BreakpointOptions,
} from "@baklavue/composables";

const { isMobile } = useBreakpoints({ mobile: 640 });
const darkMode = useMediaQuery("(prefers-color-scheme: dark)");
```
