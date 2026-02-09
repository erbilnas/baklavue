# Dropdown

A Vue wrapper for Baklava's `bl-dropdown` component for dropdown menus.

## Basic Usage

```vue
<template>
  <Dropdown>
    <Button slot="trigger">Open Menu</Button>
    <div slot="content">
      <a href="#">Item 1</a>
      <a href="#">Item 2</a>
      <a href="#">Item 3</a>
    </div>
  </Dropdown>
</template>

<script setup>
import { Button, Dropdown } from "@baklavue/ui";
</script>
```

## Props

| Prop        | Type                | Default    | Description        |
| ----------- | ------------------- | ---------- | ------------------ |
| `placement` | `DropdownPlacement` | `'bottom'` | Dropdown placement |

## Slots

| Slot      | Description              |
| --------- | ------------------------ |
| `trigger` | Dropdown trigger element |
| `content` | Dropdown content         |
