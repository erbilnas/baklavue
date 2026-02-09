# Drawer

A Vue wrapper for Baklava's `bl-drawer` component for side drawers.

## Basic Usage

```vue
<template>
  <Button @click="showDrawer = true">Open Drawer</Button>
  <Drawer v-model="showDrawer" title="Drawer Title">
    <p>Drawer content goes here</p>
  </Drawer>
</template>

<script setup>
import { ref } from "vue";
import { Button, Drawer } from "@baklavue/ui";

const showDrawer = ref(false);
</script>
```

## Props

| Prop         | Type              | Default     | Description                                 |
| ------------ | ----------------- | ----------- | ------------------------------------------- |
| `modelValue` | `boolean`         | `undefined` | Drawer visibility (v-model)                 |
| `title`      | `string`          | `undefined` | Drawer title                                |
| `placement`  | `DrawerPlacement` | `'right'`   | Drawer placement (left, right, top, bottom) |

## Events

| Event               | Payload   | Description                     |
| ------------------- | --------- | ------------------------------- |
| `update:modelValue` | `boolean` | Emitted when visibility changes |
