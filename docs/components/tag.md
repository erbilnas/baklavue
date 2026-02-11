# Tag

A Vue wrapper for Baklava's `bl-tag` component for displaying tags or labels. Supports selectable and removable (closable) variants, sizes, and icons.

## Basic Usage

Use the default slot for tag content.

<div class="component-demo">

<TagBasicDemo />

</div>

```vue
<template>
  <div style="display: flex; gap: 0.5rem; flex-wrap: wrap">
    <BvTag>Vue</BvTag>
    <BvTag>Baklava</BvTag>
    <BvTag>Design System</BvTag>
  </div>
</template>

<script setup>
import { BvTag } from "@baklavue/ui";
</script>
```

## Closable

Use the `closable` prop to show a close button. Listen to the `close` event to handle removal.

<div class="component-demo">

<TagClosableDemo />

</div>

```vue
<template>
  <BvTag v-if="visible" closable @close="visible = false">
    Removable tag (click X to remove)
  </BvTag>
</template>

<script setup>
import { ref } from "vue";
import { BvTag } from "@baklavue/ui";

const visible = ref(true);
</script>
```

## Sizes

Control the tag size with the `size` prop.

<div class="component-demo">

<TagSizesDemo />

</div>

```vue
<template>
  <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap">
    <BvTag size="small">Small</BvTag>
    <BvTag size="medium">Medium</BvTag>
    <BvTag size="large">Large</BvTag>
  </div>
</template>

<script setup>
import { BvTag } from "@baklavue/ui";
</script>
```

## With Icon

Add an icon using the `icon` prop with a Baklava icon name.

<div class="component-demo">

<TagWithIconDemo />

</div>

```vue
<template>
  <div style="display: flex; gap: 0.5rem; flex-wrap: wrap">
    <BvTag icon="info">Info</BvTag>
    <BvTag icon="settings">Settings</BvTag>
    <BvTag icon="check">Success</BvTag>
  </div>
</template>

<script setup>
import { BvTag } from "@baklavue/ui";
</script>
```

## Custom Icon Slot

Use the `#icon` slot to render a custom icon (e.g. `BvIcon` or SVG).

<div class="component-demo">

<TagCustomIconDemo />

</div>

```vue
<template>
  <BvTag>
    <template #icon>
      <BvIcon name="check" />
    </template>
    Verified
  </BvTag>
</template>

<script setup>
import { BvTag, BvIcon } from "@baklavue/ui";
</script>
```

## Selectable

Use `variant="selectable"` for tags that can be toggled (e.g. filter chips). Bind `selected` and listen to `@update:selected` to control state.

<div class="component-demo">

<TagSelectableDemo />

</div>

```vue
<template>
  <div style="display: flex; gap: 0.5rem; flex-wrap: wrap">
    <BvTag
      v-for="filter in filters"
      :key="filter"
      variant="selectable"
      :selected="selected.includes(filter)"
      :value="filter"
      @update:selected="(v) => toggleFilter(filter, v)"
    >
      {{ filter }}
    </BvTag>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { BvTag } from "@baklavue/ui";

const filters = ref(["Vue", "React", "Svelte"]);
const selected = ref(["Vue"]);

function toggleFilter(filter, value) {
  if (value) {
    if (!selected.value.includes(filter)) selected.value.push(filter);
  } else {
    selected.value = selected.value.filter((s) => s !== filter);
  }
}
</script>
```

## Disabled

Use the `disabled` prop to prevent interaction with the tag.

<div class="component-demo">

<TagDisabledDemo />

</div>

```vue
<template>
  <div style="display: flex; gap: 0.5rem; flex-wrap: wrap">
    <BvTag disabled>Disabled</BvTag>
    <BvTag disabled closable>Disabled closable</BvTag>
    <BvTag variant="selectable" disabled>Disabled selectable</BvTag>
  </div>
</template>

<script setup>
import { BvTag } from "@baklavue/ui";
</script>
```

## Props

| Prop       | Type         | Default     | Description                                      |
| ---------- | ------------ | ----------- | ------------------------------------------------ |
| `variant`  | `TagVariant` | `undefined` | Tag variant: `selectable` or `removable`        |
| `size`     | `TagSize`    | `undefined` | Tag size: `small`, `medium`, `large`            |
| `closable` | `boolean`    | `undefined` | When true, shows close button (removable variant) |
| `icon`     | `BaklavaIcon`| `undefined` | Icon name from Baklava icons                     |
| `selected` | `boolean`   | `undefined` | Selected state (for selectable variant)         |
| `disabled` | `boolean`   | `undefined` | Disabled state                                  |
| `value`    | `string \| null` | `undefined` | Value for form/selection                     |

## Events

| Event               | Payload  | Description                                              |
| ------------------- | -------- | -------------------------------------------------------- |
| `close`             | -        | Emitted when close button is clicked (closable)           |
| `update:selected`   | `boolean`| Emitted when a selectable tag is clicked (new `selected` state) |

## Slots

| Slot      | Description                    |
| --------- | ------------------------------ |
| `default` | Tag content (label/text)       |
| `icon`    | Custom icon content            |

## Types

```typescript
import type { TagProps, TagVariant, TagSize } from "@baklavue/ui";

type TagVariant = "selectable" | "removable";
type TagSize = "small" | "medium" | "large";

interface TagProps {
  variant?: TagVariant;
  size?: TagSize;
  closable?: boolean;
  icon?: BaklavaIcon;
  selected?: boolean;
  disabled?: boolean;
  value?: string | null;
}
```

## Usage Notes

- **Closable vs variant**: Use `closable` for a simple removable tag; it maps to the `removable` variant under the hood.
- **Selectable**: Use `variant="selectable"` for tags that can be toggled (e.g. in filter chips).
- **Accessibility**: The component follows Baklava's accessibility guidelines.
