# Checkbox

A Vue UI kit component for Baklava's `bl-checkbox` and `bl-checkbox-group` components for boolean or multi-value selections. The Checkbox component can work in two modes: as a single checkbox or as a group container for multiple checkboxes.

## Single Checkbox

Use the Checkbox component without the `items` prop to create a single checkbox.

### Basic Single Checkbox

<div class="component-demo">

<BvCheckbox label="I agree to the terms and conditions" />

</div>

```vue
<template>
  <BvCheckbox v-model="checked" label="I agree to the terms and conditions" />
</template>

<script setup>
import { ref } from "vue";
import { BvCheckbox } from "@baklavue/ui";

const checked = ref(false);
</script>
```

### With v-model

Use v-model for two-way binding of the checked state.

<div class="component-demo">

<CheckboxSingleDemo />

</div>

```vue
<template>
  <BvCheckbox v-model="checked" label="I agree to the terms and conditions" />
</template>

<script setup>
import { ref } from "vue";
import { BvCheckbox } from "@baklavue/ui";

const checked = ref(false);
</script>
```

### Disabled State

Disable a checkbox to prevent user interaction.

<div class="component-demo">

<BvCheckbox label="Disabled checkbox" :disabled="true" />

</div>

```vue
<template>
  <BvCheckbox label="Disabled checkbox" :disabled="true" />
</template>

<script setup>
import { BvCheckbox } from "@baklavue/ui";
</script>
```

### Indeterminate State

Use the indeterminate state for "select all" or partial selection scenarios.

<div class="component-demo">

<BvCheckbox label="Indeterminate checkbox" :indeterminate="true" />

</div>

```vue
<template>
  <BvCheckbox
    v-model="checked"
    label="Select all"
    :indeterminate="indeterminate"
  />
</template>

<script setup>
import { ref, computed } from "vue";
import { BvCheckbox } from "@baklavue/ui";

const checked = ref(false);
const children = ref([false, false, false]);
const indeterminate = computed(() => {
  const some = children.value.some(Boolean);
  const all = children.value.every(Boolean);
  return some && !all;
});
</script>
```

## Checkbox Group

Use the Checkbox component with the `items` prop to create a group of checkboxes. Selected values are bound via v-model as an array.

### Basic Items Example

<div class="component-demo">

<CheckboxGroupDemo />

</div>

```vue
<template>
  <BvCheckbox v-model="selected" :items="items">
    <template #item="{ item }">{{ item.label }}</template>
  </BvCheckbox>
</template>

<script setup>
import { ref } from "vue";
import { BvCheckbox } from "@baklavue/ui";

const selected = ref([]);
const items = [
  { value: "vue", label: "Vue.js" },
  { value: "react", label: "React" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
];
</script>
```

### Items with Disabled and Indeterminate

Each item in the group can have its own disabled or indeterminate state.

<div class="component-demo">

<CheckboxDisabledDemo />

</div>

```vue
<template>
  <BvCheckbox v-model="selected" :items="items">
    <template #item="{ item }">{{ item.label }}</template>
  </BvCheckbox>
</template>

<script setup>
import { ref } from "vue";
import { BvCheckbox } from "@baklavue/ui";

const selected = ref([]);
const items = [
  { value: "a", label: "Option A" },
  { value: "b", label: "Option B (disabled)", disabled: true },
];
</script>
```

### Custom Content with #item Slot

Use the `#item` scoped slot to customize the label or content of each checkbox. The slot receives `{ item, index }`.

<div class="component-demo">

<CheckboxCustomSlotDemo />

</div>

```vue
<template>
  <BvCheckbox v-model="selected" :items="notificationItems">
    <template #item="{ item }">
      <span>{{ item.label }}</span>
    </template>
  </BvCheckbox>
</template>

<script setup>
import { ref } from "vue";
import { BvCheckbox } from "@baklavue/ui";

const selected = ref([]);
const notificationItems = [
  { value: "email", label: "Email notifications" },
  { value: "sms", label: "SMS notifications" },
  { value: "push", label: "Push notifications" },
];
</script>
```

## Complete Examples

### Preferences Form

A complete preferences form using the checkbox group with the `#item` slot:

<div class="component-demo">

<CheckboxPreferencesDemo />

</div>

```vue
<template>
  <div>
    <h3>Notification Preferences</h3>
    <BvCheckbox v-model="prefs" :items="preferenceItems">
      <template #item="{ item }">
        <span>{{ item.label }}</span>
      </template>
    </BvCheckbox>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { BvCheckbox } from "@baklavue/ui";

const prefs = ref([]);
const preferenceItems = [
  { value: "newsletter", label: "Subscribe to newsletter" },
  { value: "updates", label: "Product updates" },
  { value: "marketing", label: "Marketing emails" },
];
</script>
```

## Props

### Single Checkbox Mode Props

When used as a single checkbox (without `items` prop):

| Prop            | Type               | Default     | Description                                     |
| --------------- | ------------------ | ----------- | ----------------------------------------------- |
| `modelValue`    | `boolean`          | `undefined` | Checked state (use v-model for two-way binding) |
| `disabled`      | `boolean`          | `undefined` | Whether the checkbox is disabled                |
| `indeterminate` | `boolean`          | `undefined` | Whether the checkbox is in indeterminate state  |
| `value`         | `string \| number` | `undefined` | Value for form submission                       |
| `name`          | `string`           | `undefined` | Name attribute for the checkbox                 |
| `label`         | `string`           | `undefined` | Label text (can be overridden by default slot)  |

### Group Mode Props

When used as a checkbox group (with `items` prop):

| Prop         | Type                   | Default     | Description                                                         |
| ------------ | ---------------------- | ----------- | ------------------------------------------------------------------- |
| `modelValue` | `(string \| number)[]` | `undefined` | Selected values array (use v-model for two-way binding)             |
| `items`      | `CheckboxItem[]`       | `undefined` | Array of checkbox items. Each item renders as a bl-checkbox element |

### CheckboxItem Interface

When using the `items` prop, each item should follow the `CheckboxItem` interface:

| Property        | Type               | Default     | Description                               |
| --------------- | ------------------ | ----------- | ----------------------------------------- |
| `value`         | `string \| number` | required    | The value of the checkbox (for v-model)   |
| `label`         | `string`           | `undefined` | Label text displayed next to the checkbox |
| `checked`       | `boolean`          | `false`     | Whether the checkbox is checked           |
| `disabled`      | `boolean`          | `false`     | Whether the checkbox is disabled          |
| `indeterminate` | `boolean`          | `false`     | Whether the checkbox is indeterminate     |
| `name`          | `string`           | `undefined` | Name attribute for the checkbox           |

Items may include additional custom data for use in the `#item` slot.

## Events

### Single Checkbox Mode Events

When used as a single checkbox:

| Event               | Payload       | Description                                      |
| ------------------- | ------------- | ------------------------------------------------ |
| `update:modelValue` | `boolean`     | Emitted when checked state changes (for v-model) |
| `change`            | `CustomEvent` | Emitted when the checkbox state changes          |
| `input`             | `CustomEvent` | Emitted on input (native bl-input event)         |

### Group Mode Events

When used as a checkbox group:

| Event               | Payload                | Description                                  |
| ------------------- | ---------------------- | -------------------------------------------- |
| `update:modelValue` | `(string \| number)[]` | Emitted when selection changes (for v-model) |
| `change`            | `CustomEvent`          | Emitted when the selection changes           |

## Slots

| Slot      | Props             | Description                                                     |
| --------- | ----------------- | --------------------------------------------------------------- |
| `default` | -                 | Label content for single checkbox mode (overrides `label` prop) |
| `item`    | `{ item, index }` | Scoped slot for each checkbox item content in group mode        |

## Types

```typescript
import type { CheckboxProps, CheckboxItem } from "@baklavue/ui";

interface CheckboxItem {
  value: string | number;
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  name?: string;
  [key: string]: unknown; // Additional custom data for #item slot
}

interface CheckboxProps {
  // Single checkbox mode props
  modelValue?: boolean | (string | number)[];
  disabled?: boolean;
  indeterminate?: boolean;
  value?: string | number;
  name?: string;
  label?: string;

  // Group mode props
  items?: CheckboxItem[];
}
```

## Usage Notes

- **Single vs Group Mode**: The component automatically switches between single checkbox mode and group mode based on whether the `items` prop is provided. When `items` is `undefined`, it acts as a single checkbox. When `items` is an array, it acts as a group container using `bl-checkbox-group`.

- **Items Prop Required**: In group mode, checkboxes are rendered from the `items` prop. Content for each item is provided via the `#item` scoped slot or defaults to `item.label`.

- **v-model Behavior**: In single mode, v-model binds a boolean. In group mode, v-model binds an array of selected values (strings or numbers).

- **Accessibility**: The component follows Baklava's accessibility guidelines and includes proper ARIA attributes for screen readers.

- **Styling**: The component uses Baklava's default styling. Custom styling can be applied through CSS variables or by overriding the component styles.
