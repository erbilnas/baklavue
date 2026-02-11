# useDisclosure

A minimal composable for open/close state used by Dialog, Drawer, Dropdown, Accordion, and Tooltip. Avoids repetitive `ref(false)`, `open()`, `close()`, `toggle()`.

## Basic Usage

```vue
<template>
  <BvButton @click="open">Open Dialog</BvButton>
  <BvDialog v-model:open="isOpen" caption="Dialog Title">
    <p>Content goes here.</p>
    <template #footer>
      <BvButton @click="close">Close</BvButton>
    </template>
  </BvDialog>
</template>

<script setup>
import { BvButton, BvDialog } from "@baklavue/ui";
import { useDisclosure } from "@baklavue/composables";

const { isOpen, open, close, toggle } = useDisclosure(false);
</script>
```

## With Toggle

```vue
<template>
  <BvButton @click="toggle">Toggle Drawer</BvButton>
  <BvDrawer v-model:open="isOpen" caption="Drawer">
    <p>Drawer content.</p>
  </BvDrawer>
</template>

<script setup>
import { BvButton, BvDrawer } from "@baklavue/ui";
import { useDisclosure } from "@baklavue/composables";

const { isOpen, toggle } = useDisclosure(false);
</script>
```

## API

### Return Value

| Property | Type | Description |
| --- | --- | --- |
| `isOpen` | `Ref<boolean>` | Reactive open state |
| `open` | `() => void` | Sets isOpen to true |
| `close` | `() => void` | Sets isOpen to false |
| `toggle` | `() => void` | Flips isOpen |

### Parameters

```typescript
useDisclosure(initialState?: boolean)
```

- `initialState` — Initial open state. Default: `false`

## TypeScript Support

```typescript
import { useDisclosure } from "@baklavue/composables";

const { isOpen, open, close, toggle } = useDisclosure(true);
```
