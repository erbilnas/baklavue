# Checkbox

A Vue wrapper for Baklava's `bl-checkbox` component with v-model support.

## Basic Usage

```vue
<template>
  <Checkbox v-model="checked" label="I agree to the terms" />
</template>

<script setup>
import { ref } from "vue";
import { Checkbox } from "@baklavue/ui";

const checked = ref(false);
</script>
```

## Props

| Prop         | Type      | Default     | Description                      |
| ------------ | --------- | ----------- | -------------------------------- |
| `modelValue` | `boolean` | `undefined` | Checkbox checked state (v-model) |
| `name`       | `string`  | `undefined` | Checkbox name attribute          |
| `label`      | `string`  | `undefined` | Checkbox label                   |
| `disabled`   | `boolean` | `undefined` | Disabled state                   |
| `required`   | `boolean` | `undefined` | Required field                   |

## Events

| Event               | Payload   | Description                        |
| ------------------- | --------- | ---------------------------------- |
| `update:modelValue` | `boolean` | Emitted when checked state changes |

## Examples

### Multiple Checkboxes

```vue
<template>
  <Checkbox v-model="options.option1" label="Option 1" />
  <Checkbox v-model="options.option2" label="Option 2" />
  <Checkbox v-model="options.option3" label="Option 3" />
</template>

<script setup>
import { ref } from "vue";
import { Checkbox } from "@baklavue/ui";

const options = ref({
  option1: false,
  option2: false,
  option3: false,
});
</script>
```
