# useFocusTrap

A composable for trapping focus within a container (e.g. modals, dialogs). Tab cycles to next focusable element; Shift+Tab to previous. Prevents focus from escaping.

## Basic Usage

```vue
<template>
  <BvDialog v-model:open="isOpen" caption="Dialog">
    <div ref="dialogContentRef">
      <p>Tab cycles within this dialog.</p>
      <BvButton @click="close">Cancel</BvButton>
      <BvButton variant="primary">Confirm</BvButton>
    </div>
  </BvDialog>
</template>

<script setup>
import { ref, watch } from "vue";
import { BvButton, BvDialog } from "@baklavue/ui";
import { useFocusTrap } from "@baklavue/composables";

const dialogContentRef = ref(null);
const isOpen = ref(false);

const { activate, deactivate } = useFocusTrap({
  target: dialogContentRef,
  active: isOpen,
});

watch(isOpen, (open) => {
  if (open) activate();
  else deactivate();
});
</script>
```

## Manual Activation

```vue
<script setup>
import { ref } from "vue";
import { useFocusTrap } from "@baklavue/composables";

const containerRef = ref(null);
const { activate, deactivate, focusFirst, focusLast } = useFocusTrap({
  target: containerRef,
  initialFocus: true,
});

onMounted(() => {
  activate();
});
</script>
```

## API

### Return Value

| Property | Type | Description |
| --- | --- | --- |
| `activate` | `() => void` | Start trapping focus |
| `deactivate` | `() => void` | Stop trapping focus |
| `focusFirst` | `() => void` | Focus first focusable element |
| `focusLast` | `() => void` | Focus last focusable element |

### Options

```typescript
interface UseFocusTrapOptions {
  target: Ref<HTMLElement | null>; // Container element
  active?: Ref<boolean> | boolean; // Whether trap is active (default: true)
  initialFocus?: boolean; // Focus first element when activated (default: true)
}
```

## TypeScript Support

```typescript
import { useFocusTrap, type UseFocusTrapOptions } from "@baklavue/composables";

const { activate } = useFocusTrap({
  target: dialogRef,
  active: isOpen,
});
```
