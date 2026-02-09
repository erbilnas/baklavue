# Badge

A Vue wrapper for Baklava's `bl-badge` component for displaying status badges.

## Basic Usage

```vue
<template>
  <Badge variant="primary">New</Badge>
</template>

<script setup>
import { Badge } from "@baklavue/ui";
</script>
```

## Variants

```vue
<template>
  <Badge variant="primary">Primary</Badge>
  <Badge variant="secondary">Secondary</Badge>
  <Badge variant="success">Success</Badge>
  <Badge variant="warning">Warning</Badge>
  <Badge variant="error">Error</Badge>
</template>

<script setup>
import { Badge } from "@baklavue/ui";
</script>
```

## Props

| Prop      | Type           | Default     | Description   |
| --------- | -------------- | ----------- | ------------- |
| `variant` | `BadgeVariant` | `'primary'` | Badge variant |
