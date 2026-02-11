# Alert

A Vue UI kit component for Baklava's `bl-alert` component for displaying alert messages.

## Basic Alert

Use the Alert component with the `description` prop for simple alert messages.

<div class="component-demo">

<BvAlert variant="info" description="This is an info alert" />

</div>

```vue
<template>
  <BvAlert variant="info" description="This is an info alert" />
</template>

<script setup>
import { BvAlert } from "@baklavue/ui";
</script>
```

## Variants

The Alert component supports four variants: info, success, warning, and danger.

<div class="component-demo" style="display: flex; flex-direction: column; gap: 1rem">

<BvAlert variant="info" description="Info message" />

<BvAlert variant="success" description="Success message" />

<BvAlert variant="warning" description="Warning message" />

<BvAlert variant="danger" description="Danger message" />

</div>

```vue
<template>
  <BvAlert variant="info" description="Info message" />
  <BvAlert variant="success" description="Success message" />
  <BvAlert variant="warning" description="Warning message" />
  <BvAlert variant="danger" description="Danger message" />
</template>

<script setup>
import { BvAlert } from "@baklavue/ui";
</script>
```

## With Icon

Add an icon to the alert using the `icon` prop. Use a boolean to show the default variant icon, or pass a specific icon name.

<div class="component-demo" style="display: flex; flex-direction: column; gap: 1rem">

<BvAlert variant="info" description="Alert with default icon" :icon="true" />
<BvAlert variant="success" description="Alert with settings icon" icon="settings" />

</div>

```vue
<template>
  <BvAlert variant="info" description="Alert with default icon" :icon="true" />
  <BvAlert
    variant="success"
    description="Alert with settings icon"
    icon="settings"
  />
</template>

<script setup>
import { BvAlert } from "@baklavue/ui";
</script>
```

## With Caption

Add a caption (title) to the alert using the `caption` prop.

<div class="component-demo">

<BvAlert
  variant="info"
  caption="Important notice"
  description="Please review the terms and conditions before proceeding."
/>

</div>

```vue
<template>
  <BvAlert
    variant="info"
    caption="Important notice"
    description="Please review the terms and conditions before proceeding."
  />
</template>

<script setup>
import { BvAlert } from "@baklavue/ui";
</script>
```

## Closable

Display a close button on the alert using the `closable` prop. Listen to the `close` event to handle when the user dismisses the alert.

<div class="component-demo">

<ClosableAlertDemo />

</div>

```vue
<template>
  <BvAlert
    variant="info"
    description="This alert can be closed"
    closable
    @close="handleClose"
  />
</template>

<script setup>
import { BvAlert } from "@baklavue/ui";

const handleClose = () => {
  console.log("Alert closed");
};
</script>
```

## Custom Content with Slots

Use the `#default`, `#caption`, or `#action` slots to customize the alert content. The default slot provides custom content in place of the `description` prop. The caption slot overrides the `caption` prop. The action slot adds content to the action area.

<div class="component-demo">

<BvAlert variant="info" caption="Custom Slots">
  <template #default>
    <p style="color: black">This content is rendered via the default slot instead of the description prop.</p>
  </template>
  <template #action>
    <BvButton size="small">Learn more</BvButton>
  </template>
</BvAlert>

</div>

```vue
<template>
  <BvAlert variant="info" caption="Custom Slots">
    <template #default>
      <p>
        This content is rendered via the default slot instead of the description
        prop.
      </p>
    </template>
    <template #action>
      <BvButton variant="tertiary" size="small">Learn more</BvButton>
    </template>
  </BvAlert>
</template>

<script setup>
import { BvAlert, BvButton } from "@baklavue/ui";
</script>
```

## Props

| Prop          | Type                     | Default     | Description                                                              |
| ------------- | ------------------------ | ----------- | ------------------------------------------------------------------------ |
| `variant`     | `AlertVariant`           | `'info'`    | Alert variant (info, success, warning, danger)                           |
| `description` | `string`                 | `undefined` | Alert message text                                                       |
| `icon`        | `boolean \| BaklavaIcon` | `undefined` | Icon configuration - boolean to show default icon, or specific icon name |
| `closable`    | `boolean`                | `false`     | Show close button                                                        |
| `caption`     | `string`                 | `undefined` | Optional caption (title) for the alert                                   |
| `closed`      | `boolean`                | `false`     | Whether the alert is closed/hidden. Use with programmatic control.       |

## Events

| Event   | Payload | Description                              |
| ------- | ------- | ---------------------------------------- |
| `close` | `void`  | Emitted when the close button is clicked |

## Methods

Access these methods via template refs:

| Method    | Description                       |
| --------- | --------------------------------- |
| `open()`  | Opens the alert programmatically  |
| `close()` | Closes the alert programmatically |

## Slots

| Slot      | Props | Description                                        |
| --------- | ----- | -------------------------------------------------- |
| `default` | -     | Custom content (alternative to `description` prop) |
| `caption` | -     | Custom caption (alternative to `caption` prop)     |
| `action`  | -     | Action area content (e.g. buttons, links)          |

## Types

```typescript
import type { AlertProps } from "@baklavue/ui";

// AlertVariant: "info" | "success" | "warning" | "danger"

interface AlertProps {
  variant?: AlertVariant;
  description?: string;
  icon?: boolean | BaklavaIcon;
  closable?: boolean;
  caption?: string;
  closed?: boolean;
}
```

## Usage Notes

- **Description vs Default Slot**: Use the `description` prop for simple text alerts. Use the `#default` slot when you need custom markup (e.g. links, formatted text, or multiple paragraphs).

- **Programmatic Control**: Use the `closed` prop to control visibility, and call `open()` or `close()` via a template ref. Sync state by listening to the `close` event when the user clicks the close button.

- **Accessibility**: The component follows Baklava's accessibility guidelines and includes proper ARIA attributes for screen readers.

- **Styling**: The component uses Baklava's default styling. Custom styling can be applied through CSS variables or by overriding the component styles.
