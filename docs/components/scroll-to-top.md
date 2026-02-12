# ScrollToTop

A floating button that appears when the user scrolls past a threshold. Clicking it scrolls smoothly to the top of the page.

## Basic Usage

<div class="component-demo">

<ScrollToTopBasicDemo />

</div>

```vue
<template>
  <BvScrollToTop />
</template>

<script setup>
import { BvScrollToTop } from "@baklavue/ui";
</script>
```

## Position

Control the fixed position of the button using the `position` prop.

```vue
<template>
  <BvScrollToTop position="bottom-left" />
  <BvScrollToTop position="bottom-right" />
  <BvScrollToTop position="top-left" />
  <BvScrollToTop position="top-right" />
</template>

<script setup>
import { BvScrollToTop } from "@baklavue/ui";
</script>
```

## Custom Threshold

Set the scroll threshold in pixels. The button becomes visible when the user scrolls past this value.

```vue
<template>
  <BvScrollToTop :threshold="500" />
</template>

<script setup>
import { BvScrollToTop } from "@baklavue/ui";
</script>
```

## Props

| Prop       | Type                | Default         | Description                                                |
| ---------- | ------------------- | --------------- | ---------------------------------------------------------- |
| `threshold` | `number`            | `300`           | Scroll threshold in pixels before button appears           |
| `position`  | `ScrollToTopPosition` | `"bottom-right"` | Fixed position (bottom-right, bottom-left, top-right, top-left) |
| `label`     | `string`            | `"Scroll to top"` | Accessible label for screen readers                      |
| `size`      | `ButtonSize`        | `"medium"`      | Button size                                                |
| `variant`   | `ButtonVariant`     | `"primary"`     | Button variant                                             |

## Events

| Event   | Payload | Description                 |
| ------- | ------- | --------------------------- |
| `click` | -       | Emitted when button is clicked |

## Types

```typescript
import type { ScrollToTopProps, ScrollToTopPosition } from "@baklavue/ui";

type ScrollToTopPosition = "bottom-right" | "bottom-left" | "top-right" | "top-left";

interface ScrollToTopProps {
  threshold?: number;
  position?: ScrollToTopPosition;
  label?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
}
```

## Usage Notes

- **Accessibility**: The component includes `role="complementary"` and `aria-label` for screen readers. The `label` prop is passed to the underlying button for additional context.
- **Window scroll**: The button listens to `window.scrollY` and scrolls the window. For scrollable containers (e.g. `overflow: auto`), consider a custom implementation.
- **Z-index**: The button uses `z-index: 1000` to stay above most content. Override via CSS if needed.
