# Datepicker

A Vue wrapper for Baklava's `bl-datepicker` component with v-model support.

## Basic Usage

```vue
<template>
  <Datepicker v-model="date" label="Select date" />
</template>

<script setup>
import { ref } from "vue";
import { Datepicker } from "@baklavue/ui";

const date = ref("");
</script>
```

## Props

| Prop          | Type      | Default     | Description             |
| ------------- | --------- | ----------- | ----------------------- |
| `modelValue`  | `string`  | `undefined` | Selected date (v-model) |
| `label`       | `string`  | `undefined` | Datepicker label        |
| `placeholder` | `string`  | `undefined` | Placeholder text        |
| `disabled`    | `boolean` | `undefined` | Disabled state          |
| `required`    | `boolean` | `undefined` | Required field          |

## Events

| Event               | Payload  | Description               |
| ------------------- | -------- | ------------------------- |
| `update:modelValue` | `string` | Emitted when date changes |
