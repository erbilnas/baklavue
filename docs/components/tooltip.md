# Tooltip

A Vue wrapper for Baklava's `bl-tooltip` component for tooltips.

## Basic Usage

```vue
<template>
  <Tooltip content="This is a tooltip">
    <Button>Hover me</Button>
  </Tooltip>
</template>

<script setup>
import { Button, Tooltip } from "@baklavue/ui";
</script>
```

## Props

| Prop        | Type               | Default     | Description       |
| ----------- | ------------------ | ----------- | ----------------- |
| `content`   | `string`           | `undefined` | Tooltip text      |
| `placement` | `TooltipPlacement` | `'top'`     | Tooltip placement |
