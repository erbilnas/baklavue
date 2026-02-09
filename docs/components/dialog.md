# Dialog

A Vue wrapper for Baklava's `bl-dialog` component for modal dialogs.

## Basic Usage

```vue
<template>
  <Button @click="showDialog = true">Open Dialog</Button>
  <Dialog v-model="showDialog" title="Dialog Title">
    <p>Dialog content goes here</p>
  </Dialog>
</template>

<script setup>
import { ref } from "vue";
import { Button, Dialog } from "@baklavue/ui";

const showDialog = ref(false);
</script>
```

## Props

| Prop         | Type      | Default     | Description                 |
| ------------ | --------- | ----------- | --------------------------- |
| `modelValue` | `boolean` | `undefined` | Dialog visibility (v-model) |
| `title`      | `string`  | `undefined` | Dialog title                |

## Events

| Event               | Payload   | Description                     |
| ------------------- | --------- | ------------------------------- |
| `update:modelValue` | `boolean` | Emitted when visibility changes |
