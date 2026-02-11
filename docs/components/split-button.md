# Split Button

A Vue wrapper for Baklava's `bl-split-button` web component for buttons with a primary action and a dropdown for secondary actions. Dropdown content is provided via the `dropdown-content` slot.

## Basic Usage

<div class="component-demo">

<SplitButtonBasicDemo />

</div>

```vue
<template>
  <BvSplitButton label="Actions" @click="handleClick">
    <template #dropdown-content>
      <bl-dropdown-item>Action 1</bl-dropdown-item>
      <bl-dropdown-item>Action 2</bl-dropdown-item>
      <bl-dropdown-item>Action 3</bl-dropdown-item>
    </template>
  </BvSplitButton>
</template>

<script setup>
import { BvSplitButton } from "@baklavue/ui";

const handleClick = () => {
  console.log("Main button clicked");
};
</script>
```

## With Icon

Add an icon to the main button using the `icon` prop.

<div class="component-demo">

<SplitButtonWithIconDemo />

</div>

```vue
<template>
  <BvSplitButton
    label="Save"
    icon="check"
    variant="primary"
    @click="handleSave"
  >
    <template #dropdown-content>
      <bl-dropdown-item>Save as draft</bl-dropdown-item>
      <bl-dropdown-item>Save and publish</bl-dropdown-item>
    </template>
  </BvSplitButton>
</template>

<script setup>
import { BvSplitButton } from "@baklavue/ui";

const handleSave = () => {
  console.log("Save clicked");
};
</script>
```

## With Dropdown Content

Use the `#dropdown-content` slot to provide custom dropdown items. Each item should be a `bl-dropdown-item` element.

<div class="component-demo">

<SplitButtonDropdownDemo />

</div>

```vue
<template>
  <BvSplitButton label="More options" @click="handleMainClick">
    <template #dropdown-content>
      <bl-dropdown-item>Edit</bl-dropdown-item>
      <bl-dropdown-item>Duplicate</bl-dropdown-item>
      <bl-dropdown-item>Delete</bl-dropdown-item>
    </template>
  </BvSplitButton>
</template>

<script setup>
import { BvSplitButton } from "@baklavue/ui";

const handleMainClick = () => {
  console.log("Main button clicked");
};
</script>
```

## Loading State

Use the `loading` prop to show a loading indicator on the main button.

```vue
<template>
  <BvSplitButton label="Saving..." :loading="isLoading" @click="save" />
</template>

<script setup>
import { ref } from "vue";
import { BvSplitButton } from "@baklavue/ui";

const isLoading = ref(false);

const save = async () => {
  isLoading.value = true;
  await doSave();
  isLoading.value = false;
};
</script>
```

## Props

| Prop       | Type           | Default     | Description                          |
| ---------- | -------------- | ----------- | ------------------------------------ |
| `label`    | `string`       | `undefined` | Button label                         |
| `variant`  | `string`       | `undefined` | Button variant (`primary`, `secondary`) |
| `size`     | `string`       | `undefined` | Button size (`small`, `medium`, `large`) |
| `disabled` | `boolean`      | `undefined` | Whether the main button is disabled  |
| `loading`  | `boolean`      | `undefined` | Loading state of the main button    |
| `icon`     | `BaklavaIcon` | `undefined` | Icon name for the main button       |

## Events

| Event               | Payload       | Description                          |
| ------------------- | ------------- | ------------------------------------ |
| `click`             | `CustomEvent` | Emitted when the main button is clicked |
| `dropdown-click`    | `CustomEvent` | Emitted when the dropdown button is clicked |

## Slots

| Slot               | Description                                   |
| ------------------ | --------------------------------------------- |
| `default`          | Main button content (falls back to `label`)   |
| `dropdown-content` | Content for the dropdown (e.g. bl-dropdown-item elements) |

## Types

```typescript
import type { SplitButtonProps } from "@baklavue/ui";
import type { BaklavaIcon } from "@trendyol/baklava-icons";

interface SplitButtonProps {
  variant?: string;
  size?: string;
  disabled?: boolean;
  loading?: boolean;
  label?: string;
  icon?: BaklavaIcon;
}
```

## Usage Notes

- **Dropdown content**: Dropdown items must be `bl-dropdown-item` elements. Place them in the `#dropdown-content` slot.
- **No options prop**: The Split Button does not accept an `options` array; use the slot for dropdown content.
- **Accessibility**: The component follows Baklava's accessibility guidelines. Ensure dropdown items have clear, actionable labels.
