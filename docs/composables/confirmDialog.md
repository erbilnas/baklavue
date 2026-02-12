# useConfirmDialog

A composable for driving BvDialog confirm/cancel flows. Returns a promise that resolves to `true` when the user confirms, `false` when cancelled. Often used with `useNotification` for success/error feedback.

## Basic Usage

```vue
<template>
  <BvButton @click="handleDelete">Delete</BvButton>

  <BvDialog v-model:open="isOpen" :caption="caption">
    <p>{{ description }}</p>
    <template #footer>
      <BvButton variant="tertiary" @click="handleCancel">Cancel</BvButton>
      <BvButton variant="primary" @click="handleConfirm">Confirm</BvButton>
    </template>
  </BvDialog>
</template>

<script setup>
import { BvButton, BvDialog } from "@baklavue/ui";
import { useConfirmDialog, useNotification } from "@baklavue/composables";

const { success } = useNotification();
const {
  confirm,
  isOpen,
  caption,
  description,
  handleConfirm,
  handleCancel,
} = useConfirmDialog();

const handleDelete = async () => {
  const ok = await confirm({
    caption: "Delete item?",
    description: "Are you sure? This action cannot be undone.",
  });
  if (ok) {
    // Perform delete
    success({ description: "Deleted successfully" });
  }
};
</script>
```

## With Async Action

```vue
<script setup>
import { useConfirmDialog, useNotification } from "@baklavue/composables";

const { success, error } = useNotification();
const { confirm, isOpen, caption, description, handleConfirm, handleCancel, isPending } =
  useConfirmDialog();

const handleDelete = async () => {
  const ok = await confirm({
    caption: "Delete item?",
    description: "This cannot be undone.",
  });
  if (ok) {
    try {
      await api.deleteItem(id);
      success({ description: "Deleted" });
    } catch (e) {
      error({ description: e.message });
    }
  }
};
</script>
```

## API

### Return Value

| Property | Type | Description |
| --- | --- | --- |
| `confirm` | `(options?) => Promise<boolean>` | Opens dialog, returns promise |
| `isOpen` | `Ref<boolean>` | Dialog visibility |
| `caption` | `Ref<string>` | Dialog title |
| `description` | `Ref<string>` | Dialog body text |
| `isPending` | `Ref<boolean>` | True while dialog is open |
| `handleConfirm` | `() => void` | Wire to Confirm button |
| `handleCancel` | `() => void` | Wire to Cancel button |
| `close` | `(result: boolean) => void` | Close with result |

### Options

```typescript
interface ConfirmDialogOptions {
  caption?: string;   // Dialog title
  description?: string; // Dialog body
}
```

## TypeScript Support

```typescript
import { useConfirmDialog, type ConfirmDialogOptions } from "@baklavue/composables";

const { confirm } = useConfirmDialog();
const ok = await confirm({ caption: "Confirm?", description: "Sure?" });
```
