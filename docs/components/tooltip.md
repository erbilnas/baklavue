# Tooltip

A Vue wrapper for Baklava's `bl-tooltip` component for displaying contextual information on hover or focus. The trigger is provided via the default slot; content can be set via the `content` prop or the `#content` slot.

## Basic Usage

Wrap a trigger element and set the tooltip text with the `content` prop.

<div class="component-demo">

<TooltipBasicDemo />

</div>

```vue
<template>
  <BvTooltip content="This is a tooltip">
    <BvButton>Hover me</BvButton>
  </BvTooltip>
</template>

<script setup>
import { BvTooltip, BvButton } from "@baklavue/ui";
</script>
```

## Placement

Control where the tooltip appears with the `placement` prop.

<div class="component-demo">

<TooltipPlacementDemo />

</div>

```vue
<template>
  <div style="display: flex; gap: 1rem; flex-wrap: wrap">
    <BvTooltip content="Tooltip on top" placement="top">
      <BvButton>Top</BvButton>
    </BvTooltip>
    <BvTooltip content="Tooltip on bottom" placement="bottom">
      <BvButton>Bottom</BvButton>
    </BvTooltip>
    <BvTooltip content="Tooltip on left" placement="left">
      <BvButton>Left</BvButton>
    </BvTooltip>
    <BvTooltip content="Tooltip on right" placement="right">
      <BvButton>Right</BvButton>
    </BvTooltip>
  </div>
</template>

<script setup>
import { BvTooltip, BvButton } from "@baklavue/ui";
</script>
```

## Custom Content Slot

Use the `#content` slot for rich or dynamic tooltip content.

```vue
<template>
  <BvTooltip>
    <template #content>
      <div style="padding: 0.5rem">
        <strong>Custom content</strong>
        <p>You can add HTML or components here.</p>
      </div>
    </template>
    <span>Hover for custom content</span>
  </BvTooltip>
</template>

<script setup>
import { BvTooltip } from "@baklavue/ui";
</script>
```

## Disabled

Disable the tooltip to prevent it from showing.

```vue
<template>
  <BvTooltip content="This won't show" :disabled="true">
    <BvButton>Disabled tooltip</BvButton>
  </BvTooltip>
</template>

<script setup>
import { BvTooltip, BvButton } from "@baklavue/ui";
</script>
```

## Props

| Prop        | Type               | Default     | Description                              |
| ----------- | ------------------ | ----------- | ---------------------------------------- |
| `content`   | `string`           | `undefined` | Tooltip content text                     |
| `placement` | `TooltipPlacement` | `undefined` | Placement: top, bottom, left, right, etc. |
| `trigger`   | `string`           | `undefined` | Trigger type: hover, click, etc.         |
| `disabled`  | `boolean`          | `undefined` | Disabled state                           |
| `delay`     | `number`           | `undefined` | Delay before showing (ms)                 |

## Events

| Event  | Payload | Description                    |
| ------- | ------- | ------------------------------ |
| `show`  | -       | Emitted when tooltip is shown  |
| `hide`  | -       | Emitted when tooltip is hidden |

## Slots

| Slot      | Description                         |
| --------- | ----------------------------------- |
| `default` | Trigger element (hover/focus target) |
| `content` | Custom tooltip content (overrides `content` prop) |

## Types

```typescript
import type { TooltipProps, TooltipPlacement } from "@baklavue/ui";

type TooltipPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";

interface TooltipProps {
  content?: string;
  placement?: TooltipPlacement;
  trigger?: string;
  disabled?: boolean;
  delay?: number;
}
```

## Usage Notes

- **Trigger**: The default slot content is the element that triggers the tooltip on hover or focus.
- **Content**: Use the `content` prop for simple text, or the `#content` slot for custom markup.
- **Placement**: Default is `top`. Use `placement` to control position relative to the trigger.
- **Accessibility**: The component follows Baklava's accessibility guidelines; tooltips are announced to screen readers.
