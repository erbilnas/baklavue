# Select

A Vue UI kit component for Baklava's `bl-select` component with v-model support. Supports both slot-based options (using `bl-select-option` children) and the `options` prop for programmatic rendering. Single and multiple selection modes are supported.

## Basic Usage

Use `v-model` for two-way binding. Provide options via the default slot using `bl-select-option` elements.

<div class="component-demo">

<SelectBasicDemo />

</div>

```vue
<template>
  <BvSelect v-model="selected" label="Choose an option">
    <bl-select-option value="option1">Option 1</bl-select-option>
    <bl-select-option value="option2">Option 2</bl-select-option>
    <bl-select-option value="option3">Option 3</bl-select-option>
  </BvSelect>
</template>

<script setup>
import { ref } from "vue";
import { BvSelect } from "@baklavue/ui";

const selected = ref("option1");
</script>
```

## With Options Array

Use the `options` prop for programmatic option rendering. Each option has `value`, `label`, and optional `disabled`.

<div class="component-demo">

<SelectOptionsDemo />

</div>

```vue
<template>
  <BvSelect v-model="selected" label="Country" :options="countries" placeholder="Select a country" />
</template>

<script setup>
import { ref } from "vue";
import { BvSelect } from "@baklavue/ui";

const selected = ref("");
const countries = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "tr", label: "Turkey" },
];
</script>
```

## Multiple Select

Enable multiple selection with the `multiple` prop. The `modelValue` becomes an array of selected values.

<div class="component-demo">

<SelectMultipleDemo />

</div>

```vue
<template>
  <BvSelect
    v-model="selected"
    label="Frameworks"
    :options="items"
    :multiple="true"
    placeholder="Select multiple"
  />
</template>

<script setup>
import { ref } from "vue";
import { BvSelect } from "@baklavue/ui";

const selected = ref([]);
const items = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "angular", label: "Angular" },
];
</script>
```

## Disabled State

Disable the select to prevent user interaction.

<div class="component-demo">

<SelectDisabledDemo />

</div>

```vue
<template>
  <BvSelect v-model="selected" label="Disabled Select" :options="options" :disabled="true" />
</template>

<script setup>
import { ref } from "vue";
import { BvSelect } from "@baklavue/ui";

const selected = ref("option1");
const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];
</script>
```

## Sizes

Use the `size` prop to change the select height: `small`, `medium`, or `large`.

<div class="component-demo">

<SelectSizesDemo />

</div>

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px;">
    <BvSelect v-model="small" size="small" label="Small" :options="options" placeholder="Select" />
    <BvSelect v-model="medium" size="medium" label="Medium" :options="options" placeholder="Select" />
    <BvSelect v-model="large" size="large" label="Large" :options="options" placeholder="Select" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { BvSelect } from "@baklavue/ui";

const small = ref("");
const medium = ref("");
const large = ref("");
const options = [
  { value: "a", label: "Option A" },
  { value: "b", label: "Option B" },
  { value: "c", label: "Option C" },
];
</script>
```

## Props

| Prop                 | Type                    | Default     | Description                                                      |
| -------------------- | ----------------------- | ----------- | ---------------------------------------------------------------- |
| `modelValue`         | `string \| string[] \| null` | `undefined` | Selected value(s). Use with v-model. Array when `multiple` is true. |
| `options`            | `SelectOption[]`        | `undefined` | Array of options for programmatic rendering                      |
| `label`              | `string`                | `undefined` | Label displayed above or as placeholder                           |
| `placeholder`       | `string`                | `undefined` | Placeholder text when no value is selected                       |
| `name`               | `string`                | `undefined` | Select name attribute for form submission                        |
| `required`          | `boolean`               | `undefined` | Whether the select is required (shows error state when empty)    |
| `disabled`          | `boolean`               | `undefined` | Whether the select is disabled                                   |
| `multiple`          | `boolean`               | `undefined` | Whether multiple options can be selected                         |
| `size`               | `SelectSize`            | `undefined` | Size: `small`, `medium`, or `large`                              |
| `clearable`         | `boolean`               | `undefined` | Whether the selected value can be cleared                        |
| `helpText`          | `string`                | `undefined` | Help text displayed below the select                             |
| `customInvalidText` | `string`                | `undefined` | Custom error message for validation                              |
| `searchBar`         | `boolean`               | `undefined` | Enable search/filter for options in the dropdown                 |
| `searchBarPlaceholder` | `string`              | `undefined` | Placeholder text for the search input                            |

### SelectOption Interface

When using the `options` prop, each item should follow the `SelectOption` interface:

| Property   | Type      | Default     | Description                    |
| ---------- | --------- | ----------- | ------------------------------ |
| `value`    | `string`  | required    | The value submitted or bound   |
| `label`    | `string`  | required    | The label displayed to the user |
| `disabled` | `boolean` | `undefined` | Whether the option is disabled |

## Events

| Event               | Payload                      | Description                                              |
| ------------------- | ---------------------------- | -------------------------------------------------------- |
| `update:modelValue` | `string \| string[] \| null` | Emitted when selection changes. Use with v-model.        |
| `change`            | `CustomEvent`                | Emitted when selection changes (bl-change event)        |
| `input`             | `CustomEvent`                | Emitted on input (bl-input event)                        |

## Slots

| Slot      | Props | Description                                                              |
| --------- | ----- | ------------------------------------------------------------------------ |
| `default` | -     | Custom `bl-select-option` elements. Alternative to the `options` prop.    |

## Types

```typescript
import type { SelectProps, SelectOption, SelectSize } from "@baklavue/ui";

type SelectSize = "small" | "medium" | "large";

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  modelValue?: string | string[] | null;
  options?: SelectOption[];
  label?: string;
  placeholder?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  size?: SelectSize;
  clearable?: boolean;
  helpText?: string;
  customInvalidText?: string;
  searchBar?: boolean;
  searchBarPlaceholder?: string;
}
```

## Usage Notes

- **Options vs Slot**: Use the `options` prop for data-driven option lists, or the default slot with `bl-select-option` elements when you need full control over markup.

- **v-model**: The component uses `modelValue` for single select and emits `string | null`. With `multiple`, `modelValue` is `string[]`.

- **Baklava Alignment**: The component wraps Baklava's `bl-select` and passes through supported props. Attributes like `help-text`, `search-bar`, etc. are mapped from camelCase props.

- **Accessibility**: The component follows Baklava's accessibility guidelines and includes proper ARIA attributes for screen readers.
