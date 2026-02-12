# Radio

A Vue UI kit component for Baklava's `bl-radio` and `bl-radio-group` components for single-choice selections. Use the `items` prop to create a radio group. Selected value is bound via v-model.

## Basic Usage

<div class="component-demo">

<RadioSingleDemo />

</div>

```vue
<template>
  <BvRadio v-model="selected" :items="items">
    <template #item="{ item }">{{ item.label }}</template>
  </BvRadio>
</template>

<script setup>
import { ref } from "vue";
import { BvRadio } from "@baklavue/ui";

const selected = ref("option1");
const items = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
];
</script>
```

## Multiple Options

<div class="component-demo">

<RadioGroupDemo />

</div>

```vue
<template>
  <BvRadio v-model="choice" :items="items">
    <template #item="{ item }">{{ item.label }}</template>
  </BvRadio>
</template>

<script setup>
import { ref } from "vue";
import { BvRadio } from "@baklavue/ui";

const choice = ref("yes");
const items = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "maybe", label: "Maybe" },
];
</script>
```

## Disabled State

Disable individual radios to prevent user interaction.

<div class="component-demo">

<RadioDisabledDemo />

</div>

```vue
<template>
  <BvRadio v-model="choice" :items="items">
    <template #item="{ item }">{{ item.label }}</template>
  </BvRadio>
</template>

<script setup>
import { ref } from "vue";
import { BvRadio } from "@baklavue/ui";

const choice = ref("yes");
const items = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "maybe", label: "Maybe (disabled)", disabled: true },
];
</script>
```

## Custom Content with #item Slot

Use the `#item` scoped slot to customize the label or content of each radio. The slot receives `{ item, index }`.

```vue
<template>
  <BvRadio v-model="choice" :items="items">
    <template #item="{ item }">
      <span>{{ item.label }}</span>
    </template>
  </BvRadio>
</template>

<script setup>
import { ref } from "vue";
import { BvRadio } from "@baklavue/ui";

const choice = ref("email");
const items = [
  { value: "email", label: "Email notifications" },
  { value: "sms", label: "SMS notifications" },
  { value: "push", label: "Push notifications" },
];
</script>
```

## Complete Examples

### Survey Form

<div class="component-demo">

<RadioGroupDemo />

</div>

```vue
<template>
  <div>
    <h3>How satisfied are you?</h3>
    <BvRadio v-model="rating" :items="ratingItems">
      <template #item="{ item }">{{ item.label }}</template>
    </BvRadio>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { BvRadio } from "@baklavue/ui";

const rating = ref("5");
const ratingItems = [
  { value: "5", label: "Very satisfied" },
  { value: "4", label: "Satisfied" },
  { value: "3", label: "Neutral" },
  { value: "2", label: "Dissatisfied" },
  { value: "1", label: "Very dissatisfied" },
];
</script>
```

## Props

| Prop         | Type               | Default     | Description                                                         |
| ------------ | ------------------ | ----------- | ------------------------------------------------------------------- |
| `modelValue` | `string \| number` | `undefined` | Selected value (use v-model for two-way binding)                    |
| `items`      | `RadioItem[]`      | `undefined` | Array of radio items. Each item renders as a bl-radio element       |
| `label`      | `string`           | `undefined` | Label for the radio group (bl-radio-group label attribute)           |
| `required`   | `boolean`          | `undefined` | Whether the radio group is required (for form validation)            |

### RadioItem Interface

When using the `items` prop, each item should follow the `RadioItem` interface:

| Property   | Type               | Default     | Description                               |
| ---------- | ------------------ | ----------- | ----------------------------------------- |
| `value`    | `string \| number` | required    | The value of the radio (for v-model)      |
| `label`    | `string`           | `undefined` | Label text displayed next to the radio    |
| `disabled` | `boolean`          | `false`     | Whether the radio is disabled             |
| `name`     | `string`           | `undefined` | Name attribute for the radio             |

Items may include additional custom data for use in the `#item` slot.

## Events

| Event               | Payload               | Description                                  |
| ------------------- | --------------------- | -------------------------------------------- |
| `update:modelValue` | `string \| number`    | Emitted when selection changes (for v-model) |
| `change`            | `CustomEvent`         | Emitted when the selection changes           |

## Slots

| Slot   | Props             | Description                                            |
| ------ | ----------------- | ------------------------------------------------------ |
| `item` | `{ item, index }` | Scoped slot for each radio item content                |

## Types

```typescript
import type { RadioProps, RadioItem } from "@baklavue/ui";

interface RadioItem {
  value: string | number;
  label?: string;
  disabled?: boolean;
  name?: string;
  [key: string]: unknown; // Additional custom data for #item slot
}

interface RadioProps {
  modelValue?: string | number;
  items?: RadioItem[];
  label?: string;
  required?: boolean;
}

// Events
interface RadioEmits {
  "update:modelValue": [value: string | number];
  change: [event: CustomEvent];
}
```

## Usage Notes

- **Items Prop**: Radios are rendered from the `items` prop. Content for each item is provided via the `#item` scoped slot or defaults to `item.label`.

- **v-model Behavior**: v-model binds the selected value (string or number).

- **Accessibility**: The component follows Baklava's accessibility guidelines and includes proper ARIA attributes for screen readers.

- **Styling**: The component uses Baklava's default styling. Custom styling can be applied via CSS variables such as `--bl-radio-align-items` (default: center) and `--bl-radio-direction` (row|column) for layout.
