# Link

A Vue wrapper for Baklava's `bl-link` component for navigation links.

## Basic Usage

```vue
<template>
  <Link href="/about">About</Link>
</template>

<script setup>
import { Link } from "@baklavue/ui";
</script>
```

## Props

| Prop      | Type          | Default     | Description  |
| --------- | ------------- | ----------- | ------------ |
| `href`    | `string`      | `undefined` | Link URL     |
| `target`  | `TargetType`  | `undefined` | Link target  |
| `variant` | `LinkVariant` | `undefined` | Link variant |
