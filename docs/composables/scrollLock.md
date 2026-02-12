# useScrollLock

A composable for locking body scroll when modals or drawers are open. Supports stacking: multiple `lock()` calls require matching `unlock()` calls. Use with `useDisclosure` for BvDialog and BvDrawer.

## Basic Usage

```vue
<template>
  <BvButton @click="open">Open Dialog</BvButton>
  <BvDialog v-model:open="isOpen" caption="Dialog">
    <p>Content. Body scroll is locked when open.</p>
  </BvDialog>
</template>

<script setup>
import { BvButton, BvDialog } from "@baklavue/ui";
import { useDisclosure, useScrollLock } from "@baklavue/composables";

const { isOpen, open, close } = useDisclosure();
const { lock, unlock } = useScrollLock();

watch(isOpen, (opened) => {
  if (opened) lock();
  else unlock();
});
</script>
```

## API

### Return Value

| Property | Type | Description |
| --- | --- | --- |
| `isLocked` | `Ref<boolean>` | True when body scroll is locked |
| `lock` | `() => void` | Lock body scroll |
| `unlock` | `() => void` | Unlock body scroll |
| `toggleLock` | `() => void` | Toggle lock state |

## TypeScript Support

```typescript
import { useScrollLock } from "@baklavue/composables";

const { lock, unlock } = useScrollLock();
```
