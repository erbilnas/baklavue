# UI & Feedback Composables

## useNotification

[useNotification](/composables/notification) · `import { useNotification } from "@baklavue/composables"`

Programmatically show toast notifications. Requires `<BvNotification />` in the DOM.

```typescript
const { success, error, warning, info } = useNotification();

// Each method accepts NotificationOptions
success({ caption?: string; description: string; duration?: number; permanent?: boolean });
error({ caption?: string; description: string; duration?: number; permanent?: boolean });
warning({ caption?: string; description: string; duration?: number; permanent?: boolean });
info({ caption?: string; description: string; duration?: number; permanent?: boolean });
```

Uses Baklava's `NotificationProps` (description required). Options include `primaryAction`, `secondaryAction` for buttons.

## useConfirmDialog

[useConfirmDialog](/composables/confirmDialog) · `import { useConfirmDialog } from "@baklavue/composables"`

Confirm/cancel dialog flow. Returns promise resolving to `true`/`false`.

```typescript
const { confirm, isOpen, caption, description, handleConfirm, handleCancel } =
  useConfirmDialog();
const ok = await confirm({ caption: "Delete?", description: "Sure?" });
```

## useDisclosure

[useDisclosure](/composables/disclosure) · `import { useDisclosure } from "@baklavue/composables"`

Open/close state for Dialog, Drawer, Dropdown, Accordion, Tooltip.

```typescript
const { isOpen, open, close, toggle } = useDisclosure(false);
```
