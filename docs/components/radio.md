# Radio

A Vue wrapper for Baklava's `bl-radio` component with v-model support.

## Basic Usage

```vue
<template>
  <Radio v-model="selected" value="option1" label="Option 1" />
  <Radio v-model="selected" value="option2" label="Option 2" />
</template>

<script setup>
import { ref } from "vue";
import { Radio } from "@baklavue/ui";

const selected = ref("option1");
</script>
```

## Props

| Prop         | Type      | Default     | Description                    |
| ------------ | --------- | ----------- | ------------------------------ |
| `modelValue` | `string`  | `undefined` | Selected radio value (v-model) |
| `value`      | `string`  | `undefined` | Radio button value             |
| `name`       | `string`  | `undefined` | Radio group name               |
| `label`      | `string`  | `undefined` | Radio label                    |
| `disabled`   | `boolean` | `undefined` | Disabled state                 |
| `required`   | `boolean` | `undefined` | Required field                 |

## Events

| Event               | Payload  | Description                    |
| ------------------- | -------- | ------------------------------ |
| `update:modelValue` | `string` | Emitted when selection changes |

## Examples

### Radio Group

```vue
<template>
  <Radio v-model="choice" value="yes" label="Yes" name="choice" />
  <Radio v-model="choice" value="no" label="No" name="choice" />
  <Radio v-model="choice" value="maybe" label="Maybe" name="choice" />
</template>

<script setup>
import { ref } from "vue";
import { Radio } from "@baklavue/ui";

const choice = ref("yes");
</script>
```
