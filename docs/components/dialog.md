# Dialog

A Vue wrapper for Baklava's `bl-dialog` component for modal dialogs. The Dialog component provides a modal overlay for confirmations, forms, and important content with support for header and footer slots, controllable visibility, and programmatic open/close.

## Basic Usage

Use `v-model:open` for two-way binding. Trigger the dialog with a button.

<div class="component-demo">

<DialogBasicDemo />

</div>

```vue
<template>
  <div>
    <BvButton @click="showDialog = true">Open Dialog</BvButton>
    <BvDialog v-model:open="showDialog">
      <template #header>
        <span>Dialog Title</span>
      </template>
      <p>Dialog content goes here.</p>
    </BvDialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { BvDialog, BvButton } from "@baklavue/ui";

const showDialog = ref(false);
</script>
```

## Caption

Use the `caption` prop for a simple text title instead of the header slot. This maps to Baklava's `bl-dialog` caption attribute.

<div class="component-demo">

<DialogCaptionDemo />

</div>

```vue
<template>
  <div>
    <BvButton @click="showDialog = true">Open Dialog</BvButton>
    <BvDialog v-model:open="showDialog" caption="Simple Title">
      <p>Use the caption prop for a simple text title instead of the header slot.</p>
    </BvDialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { BvDialog, BvButton } from "@baklavue/ui";

const showDialog = ref(false);
</script>
```

## With Header and Footer

Use the `header` and `footer` slots to add a title and action buttons (e.g. Cancel, Confirm).

<div class="component-demo">

<DialogHeaderFooterDemo />

</div>

```vue
<template>
  <div>
    <BvButton @click="showDialog = true">Open Dialog</BvButton>
    <BvDialog v-model:open="showDialog">
      <template #header>
        <span>Confirm Action</span>
      </template>
      <p>Are you sure you want to proceed? This action cannot be undone.</p>
      <template #footer>
        <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
          <BvButton variant="tertiary" @click="showDialog = false">Cancel</BvButton>
          <BvButton variant="primary" @click="showDialog = false">Confirm</BvButton>
        </div>
      </template>
    </BvDialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { BvDialog, BvButton } from "@baklavue/ui";

const showDialog = ref(false);
</script>
```

## Closable and Backdrop

Control whether the dialog can be closed via the close button (`closable`) and whether clicking the backdrop closes it (`backdrop`). When `closable` is `true`, a close button is shown in the header. When `backdrop` is `true`, the dialog closes when clicking outside.

<div class="component-demo">

<DialogClosableDemo />

</div>

```vue
<template>
  <BvDialog v-model:open="showDialog" :closable="true">
    <template #header>
      <span>Closable Dialog</span>
    </template>
    <p>This dialog has a close button.</p>
  </BvDialog>
</template>

<script setup>
import { ref } from "vue";
import { BvDialog } from "@baklavue/ui";

const showDialog = ref(false);
</script>
```

## Size

Use the `size` prop to control the dialog width. Accepts values supported by the underlying `bl-dialog` (e.g. `"small"`, `"medium"`, `"large"` or custom CSS values).

## Programmatic Control

Access dialog methods programmatically using template refs. Call `open()` to show the dialog and `close()` to hide it.

<div class="component-demo">

<DialogProgrammaticDemo />

</div>

```vue
<template>
  <div>
    <div style="margin-bottom: 1rem; display: flex; gap: 0.5rem;">
      <BvButton @click="dialogRef?.open()">Open</BvButton>
      <BvButton @click="dialogRef?.close()">Close</BvButton>
    </div>
    <BvDialog ref="dialogRef">
      <template #header>
        <span>Programmatically Controlled</span>
      </template>
      <p>This dialog can be opened and closed via button clicks or programmatically.</p>
    </BvDialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { BvDialog, BvButton } from "@baklavue/ui";

const dialogRef = ref();
</script>
```

## Props

| Prop       | Type      | Default     | Description                                                    |
| ---------- | --------- | ----------- | -------------------------------------------------------------- |
| `open`     | `boolean` | `false`     | Whether the dialog is visible (use with `v-model:open`)        |
| `caption`  | `string`  | `undefined` | Optional dialog title. Maps to bl-dialog's caption attribute  |
| `closable` | `boolean` | `undefined` | Whether to show the close button in the header                 |
| `backdrop` | `boolean` | `undefined` | Whether clicking the backdrop closes the dialog                |
| `size`     | `string`  | `undefined` | Dialog width (e.g. `"small"`, `"medium"`, `"large"` or custom) |

## Events

| Event           | Payload   | Description                                                      |
| --------------- | --------- | ---------------------------------------------------------------- |
| `update:open`   | `boolean` | Emitted when visibility changes. Use for two-way binding.        |
| `open`          | -         | Emitted when the dialog is opened                                |
| `close`         | -         | Emitted when the dialog is closed                                |

## Methods

You can access these methods via template refs:

| Method   | Description                           |
| -------- | ------------------------------------- |
| `open()` | Opens the dialog programmatically     |
| `close()`| Closes the dialog programmatically    |

## Slots

| Slot      | Props | Description                           |
| --------- | ----- | ------------------------------------- |
| `header`  | -     | Content for the dialog header/title   |
| `default`| -     | Main dialog content                   |
| `footer` | -     | Content for the dialog footer         |

## Types

```typescript
import type { DialogProps } from "@baklavue/ui";

interface DialogProps {
  open?: boolean;
  caption?: string;
  closable?: boolean;
  backdrop?: boolean;
  size?: string;
}
```

## Usage Notes

- **Two-way binding**: Use `v-model:open` to control visibility. Alternatively, use a template ref and call `open()` / `close()`.

- **Caption vs header slot**: Use the `caption` prop for a simple text title. Use the `#header` slot for custom header content (icons, rich markup, etc.).

- **Accessibility**: The component follows Baklava's accessibility guidelines. The underlying `bl-dialog` uses the native HTML `<dialog>` element (or a polyfill) for proper focus management and ARIA attributes.

- **Styling**: The component uses Baklava's default styling. Custom styling can be applied through CSS variables such as `--bl-dialog-width` and `--bl-dialog-caption-line-clamp`.
