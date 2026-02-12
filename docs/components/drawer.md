# Drawer

A Vue UI kit component for Baklava's `bl-drawer` component for side drawers. The Drawer component provides a slide-in panel for supplemental content with support for caption, embedded iframe content, external link, and programmable width. The underlying bl-drawer has a fixed header with title and close button; content is provided via the default slot or an iframe when using `embedUrl`.

## Basic Usage

Use `v-model:open` for two-way binding. Trigger the drawer with a button.

<div class="component-demo">

<DrawerBasicDemo />

</div>

```vue
<template>
  <div>
    <BvButton @click="showDrawer = true">Open Drawer</BvButton>
    <BvDrawer v-model:open="showDrawer">
      <p>Drawer content goes here.</p>
    </BvDrawer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { BvDrawer, BvButton } from "@baklavue/ui";

const showDrawer = ref(false);
</script>
```

## Caption

Use the `caption` prop for the drawer title. This maps to Baklava's `bl-drawer` caption attribute.

<div class="component-demo">

<DrawerCaptionDemo />

</div>

```vue
<template>
  <div>
    <BvButton @click="showDrawer = true">Open Drawer</BvButton>
    <BvDrawer v-model:open="showDrawer" caption="Drawer Title">
      <p>Use the caption prop for the drawer title.</p>
    </BvDrawer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { BvDrawer, BvButton } from "@baklavue/ui";

const showDrawer = ref(false);
</script>
```

## Width

Use the `width` prop to control the drawer width. Accepts `"small"` (320px), `"medium"` (424px, default), `"large"` (560px), or a custom CSS value (e.g. `"500px"`).

```vue
<template>
  <BvDrawer v-model:open="showDrawer" width="large" caption="Wide Drawer">
    <p>Wider drawer content.</p>
  </BvDrawer>
</template>
```

## Embed URL

When you need to display external content in an iframe, use the `embedUrl` prop. The drawer will render an iframe instead of the default slot content.

```vue
<template>
  <BvDrawer v-model:open="showDrawer" embed-url="https://example.com" />
</template>
```

## External Link

Use the `externalLink` prop to add a button in the drawer header that opens a URL in a new tab.

```vue
<template>
  <BvDrawer
    v-model:open="showDrawer"
    caption="Documentation"
    external-link="https://docs.example.com"
  >
    <p>Drawer content with external link in header.</p>
  </BvDrawer>
</template>
```

## Programmatic Control

Access drawer methods programmatically using template refs. Call `open()` to show the drawer and `close()` to hide it.

<div class="component-demo">

<DrawerProgrammaticDemo />

</div>

```vue
<template>
  <div>
    <div style="margin-bottom: 1rem; display: flex; gap: 0.5rem;">
      <BvButton @click="drawerRef?.open()">Open</BvButton>
      <BvButton @click="drawerRef?.close()">Close</BvButton>
    </div>
    <BvDrawer ref="drawerRef" caption="Programmatically Controlled">
      <p>
        This drawer can be opened and closed via button clicks or
        programmatically.
      </p>
    </BvDrawer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { BvDrawer, BvButton } from "@baklavue/ui";

const drawerRef = ref();
</script>
```

## Props

| Prop           | Type      | Default     | Description                                                                    |
| -------------- | --------- | ----------- | ------------------------------------------------------------------------------ |
| `open`         | `boolean` | `false`     | Whether the drawer is visible (use with `v-model:open`)                         |
| `caption`      | `string`  | `undefined` | Drawer title. Maps to bl-drawer's caption attribute                            |
| `embedUrl`     | `string`  | `undefined` | Iframe URL for embedded content. When set, drawer shows iframe instead of slot |
| `externalLink` | `string`  | `undefined` | External link URL - adds a button in the header                                |
| `width`        | `string`  | `undefined` | Drawer width (`"small"`, `"medium"`, `"large"` or custom CSS value)            |

## Events

| Event         | Payload   | Description                                               |
| ------------- | --------- | --------------------------------------------------------- |
| `update:open` | `boolean` | Emitted when visibility changes. Use for two-way binding. |
| `open`        | -         | Emitted when the drawer is opened                         |
| `close`       | -         | Emitted when the drawer is closed                         |

## Methods

You can access these methods via template refs:

| Method    | Description                        |
| --------- | ---------------------------------- |
| `open()`  | Opens the drawer programmatically  |
| `close()` | Closes the drawer programmatically |

## Slots

| Slot      | Props | Description                                          |
| --------- | ----- | ---------------------------------------------------- |
| `default` | -     | Main drawer content. Ignored when `embedUrl` is set. |

## Types

```typescript
import type { DrawerProps } from "@baklavue/ui";

interface DrawerProps {
  open?: boolean;
  caption?: string;
  embedUrl?: string;
  externalLink?: string;
  width?: string;
}
```

## Usage Notes

- **Two-way binding**: Use `v-model:open` to control visibility. Alternatively, use a template ref and call `open()` / `close()`.

- **Slot vs embedUrl**: When `embedUrl` is set, the drawer uses an iframe instead of the default slot. The slot content is ignored in that case.

- **Accessibility**: The component follows Baklava's accessibility guidelines and includes proper ARIA attributes for screen readers.

- **Styling**: The component uses Baklava's default styling. Custom styling can be applied through CSS variables such as `--bl-drawer-animation-duration` (default: 250ms).
