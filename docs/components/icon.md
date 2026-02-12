# Icon

A Vue UI kit component for Baklava's `bl-icon` component for displaying icons. The Icon component provides icon display with support for name, size, color, and custom slot content. Size and color are applied via CSS (`font-size`, `color`) as per Baklava's API.

## Basic Usage

Use the `name` prop to display a Baklava icon. Available icon names come from the Baklava icons set.

<div class="component-demo">

<IconBasicDemo />

</div>

```vue
<template>
  <div style="display: flex; gap: 1rem;">
    <BvIcon name="home" />
    <BvIcon name="settings" />
    <BvIcon name="info" />
    <BvIcon name="user" />
  </div>
</template>

<script setup>
import { BvIcon } from "@baklavue/ui";
</script>
```

## Size

Use the `size` prop to control the icon size. Accepts any valid CSS value (e.g. `"24px"`, `"1.5rem"`). Maps to the `font-size` CSS property on the underlying bl-icon.

<div class="component-demo">

<IconSizeDemo />

</div>

```vue
<template>
  <div style="display: flex; gap: 1rem; align-items: center;">
    <BvIcon name="home" size="16px" />
    <BvIcon name="home" size="24px" />
    <BvIcon name="home" size="32px" />
    <BvIcon name="home" size="48px" />
  </div>
</template>

<script setup>
import { BvIcon } from "@baklavue/ui";
</script>
```

## Color

Use the `color` prop to set the icon color. Accepts any valid CSS color value (e.g. `"#0066cc"`, `"red"`, `"currentColor"`). Maps to the `color` CSS property on the underlying bl-icon.

<div class="component-demo">

<IconColorDemo />

</div>

```vue
<template>
  <div style="display: flex; gap: 1rem; align-items: center;">
    <BvIcon name="info" color="#0066cc" />
    <BvIcon name="info" color="#16a34a" />
    <BvIcon name="info" color="#dc2626" />
    <BvIcon name="info" color="#7c3aed" />
  </div>
</template>

<script setup>
import { BvIcon } from "@baklavue/ui";
</script>
```

## Custom Slot

Use the default slot to provide custom SVG content instead of a named icon. When using the slot, the `name` prop is optional.

```vue
<template>
  <BvIcon>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  </BvIcon>
</template>

<script setup>
import { BvIcon } from "@baklavue/ui";
</script>
```

## Props

| Prop   | Type          | Default     | Description                                                                 |
| ------ | ------------- | ----------- | --------------------------------------------------------------------------- |
| `name` | `BaklavaIcon` | `undefined` | Icon name from Baklava icons set. Optional when using default slot.          |
| `size` | `string`      | `undefined` | Icon size as CSS value (e.g. `"24px"`, `"1.5rem"`). Maps to `font-size`.     |
| `color` | `string`      | `undefined` | Icon color as CSS value (e.g. `"#0066cc"`). Maps to `color`. Default inherits. |

## Events

| Event   | Payload | Description                                              |
| ------- | ------- | -------------------------------------------------------- |
| `load`  | `string`| Emitted when the SVG icon has loaded (from `bl-load`).   |
| `error` | `string`| Emitted when the SVG icon failed to load (from `bl-error`).|

## Slots

| Slot      | Props | Description                                                       |
| --------- | ----- | ----------------------------------------------------------------- |
| `default` | -     | Custom SVG content. When provided, can be used instead of `name`. |

## Types

```typescript
import type { IconProps } from "@baklavue/ui";

interface IconProps {
  /** Icon name from Baklava icons set */
  name?: BaklavaIcon;
  /** Icon size as CSS value (e.g. "24px", "1.5rem") */
  size?: string;
  /** Icon color as CSS value (e.g. "#0066cc", "red") */
  color?: string;
}
```

## Usage Notes

- **Icon names**: Use valid Baklava icon names from the `@trendyol/baklava-icons` package. See [Baklava documentation](https://baklava.trendyol.com) for the full icon list.

- **Size and color**: These props are applied via inline styles to the underlying `bl-icon`. When omitted, the icon inherits `font-size` and `color` from its parent.

- **Accessibility**: When using icons for decorative purposes, ensure they are not announced by screen readers. For meaningful icons, provide appropriate `aria-label` or surround with descriptive text.

- **Styling**: The component uses Baklava's default styling. Custom styling can be applied through CSS variables or by wrapping the icon in a styled container.
