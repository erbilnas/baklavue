# Chip

An indicator of a numeric value or a state. Wraps another element and displays a badge positioned at a corner.

## Basic

Wrap a button or icon with a Chip to display a notification count or label.

<div class="component-demo">

<ChipBasicDemo />

</div>

```vue
<template>
  <BvChip :text="5">
    <BvButton kind="neutral" variant="tertiary" icon="mail" />
  </BvChip>
</template>

<script setup>
import { BvButton, BvChip } from "@baklavue/ui";
</script>
```

## Colors

Use the `color` prop to change the chip color.

<div class="component-demo" style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center">

<ChipColorsDemo />

</div>

```vue
<template>
  <BvChip color="primary" :text="5">...</BvChip>
  <BvChip color="success" :text="3">...</BvChip>
  <BvChip color="danger" :text="12">...</BvChip>
  <BvChip color="warning" :text="!">...</BvChip>
  <BvChip color="info" :text="2">...</BvChip>
  <BvChip color="neutral" :text="9">...</BvChip>
</template>
```

## Sizes

Use the `size` prop to change the chip size.

<div class="component-demo">

<ChipSizesDemo />

</div>

```vue
<template>
  <BvChip size="xs" :text="1">...</BvChip>
  <BvChip size="sm" :text="5">...</BvChip>
  <BvChip size="md" :text="12">...</BvChip>
  <BvChip size="lg" :text="99">...</BvChip>
</template>
```

## Position

Use the `position` prop to change where the chip appears relative to the wrapped element.

<div class="component-demo">

<ChipPositionDemo />

</div>

```vue
<template>
  <BvChip position="top-right" :text="5">...</BvChip>
  <BvChip position="bottom-right" :text="5">...</BvChip>
  <BvChip position="top-left" :text="5">...</BvChip>
  <BvChip position="bottom-left" :text="5">...</BvChip>
</template>
```

## Inset

Use the `inset` prop to keep the chip inside rounded elements like avatars.

<div class="component-demo">

<ChipInsetDemo />

</div>

```vue
<template>
  <BvChip :text="5" inset color="primary">
    <div
      class="avatar"
      style="width: 40px; height: 40px; border-radius: 50%; ..."
    />
  </BvChip>
</template>
```

## Standalone

Use the `standalone` prop to display the chip inline without wrapping any content.

<div class="component-demo">

<ChipStandaloneDemo />

</div>

```vue
<template>
  <BvChip standalone :text="5" />
  <BvChip standalone text="New" color="success" />
  <BvChip standalone text="99+" color="danger" size="lg" />
</template>

<script setup>
import { BvChip } from "@baklavue/ui";
</script>
```

## Control Visibility

Use the `show` prop to control when the chip is visible.

<div class="component-demo">

<ChipShowDemo />

</div>

```vue
<template>
  <BvChip :text="5" :show="show">
    <BvButton kind="neutral" variant="tertiary" icon="mail" />
  </BvChip>
  <BvButton @click="show = !show">{{ show ? "Hide" : "Show" }} chip</BvButton>
</template>

<script setup>
import { ref } from "vue";
import { BvButton, BvChip } from "@baklavue/ui";

const show = ref(true);
</script>
```

## Props

| Prop         | Type               | Default       | Description                                                      |
| ------------ | ------------------ | ------------- | ---------------------------------------------------------------- |
| `text`       | `string \| number` | -             | Text or number displayed inside the chip                         |
| `color`      | `ChipColor`        | `'primary'`   | Color variant (primary, success, danger, warning, info, neutral) |
| `size`       | `ChipSize`         | `'md'`        | Size variant (xs, sm, md, lg)                                    |
| `position`   | `ChipPosition`     | `'top-right'` | Position (top-right, bottom-right, top-left, bottom-left)        |
| `inset`      | `boolean`          | `false`       | Keep chip inside rounded elements                                |
| `standalone` | `boolean`          | `false`       | Render inline without wrapping content                           |
| `show`       | `boolean`          | `true`        | When false, hide the chip                                        |

## Slots

| Slot      | Description                   |
| --------- | ----------------------------- |
| `default` | Wrapped element (e.g. button) |
| `content` | Override chip content         |

## Types

```typescript
import type {
  ChipProps,
  ChipColor,
  ChipSize,
  ChipPosition,
} from "@baklavue/ui";

const props: ChipProps = {
  text: 5,
  color: "primary",
  size: "md",
  position: "top-right",
  inset: false,
  standalone: false,
  show: true,
};
```

## Usage Notes

- **Notification counts**: Use the chip to show unread counts on mail, notification, or message icons.
- **Status indicators**: Use with avatars to show online/offline status.
- **Standalone badges**: Use `standalone` for inline badges in inputs, selects, or command palettes.
