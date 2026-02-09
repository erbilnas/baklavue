# Select

A Vue wrapper for Baklava's `bl-select` component with v-model support.

## Basic Usage

```vue
<template>
  <Select v-model="selected" label="Choose an option">
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
    <option value="option3">Option 3</option>
  </Select>
</template>

<script setup>
import { ref } from "vue";
import { Select } from "@baklavue/ui";

const selected = ref("option1");
</script>
```

## Props

| Prop          | Type         | Default     | Description              |
| ------------- | ------------ | ----------- | ------------------------ |
| `modelValue`  | `string`     | `undefined` | Selected value (v-model) |
| `name`        | `string`     | `undefined` | Select name attribute    |
| `label`       | `string`     | `undefined` | Select label             |
| `placeholder` | `string`     | `undefined` | Placeholder text         |
| `required`    | `boolean`    | `undefined` | Required field           |
| `disabled`    | `boolean`    | `undefined` | Disabled state           |
| `size`        | `SelectSize` | `'medium'`  | Select size              |

## Events

| Event               | Payload  | Description                    |
| ------------------- | -------- | ------------------------------ |
| `update:modelValue` | `string` | Emitted when selection changes |

## Examples

### With Options Array

```vue
<template>
  <Select v-model="selected" label="Country" :options="countries" />
</template>

<script setup>
import { ref } from "vue";
import { Select } from "@baklavue/ui";

const selected = ref("");
const countries = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "tr", label: "Turkey" },
];
</script>
```
