# Stepper

A Vue wrapper for Baklava's `bl-stepper` component for step indicators.

## Basic Usage

```vue
<template>
  <Stepper v-model="currentStep" :steps="['Step 1', 'Step 2', 'Step 3']" />
</template>

<script setup>
import { ref } from "vue";
import { Stepper } from "@baklavue/ui";

const currentStep = ref(0);
</script>
```

## Props

| Prop         | Type       | Default     | Description                  |
| ------------ | ---------- | ----------- | ---------------------------- |
| `modelValue` | `number`   | `undefined` | Current step index (v-model) |
| `steps`      | `string[]` | `undefined` | Step labels                  |

## Events

| Event               | Payload  | Description               |
| ------------------- | -------- | ------------------------- |
| `update:modelValue` | `number` | Emitted when step changes |
