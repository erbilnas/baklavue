# Spinner

A Vue wrapper for Baklava's `bl-spinner` component for loading indicators.

## Basic Usage

```vue
<template>
  <Spinner />
</template>

<script setup>
import { Spinner } from "@baklavue/ui";
</script>
```

## Props

| Prop      | Type             | Default     | Description     |
| --------- | ---------------- | ----------- | --------------- |
| `size`    | `SpinnerSize`    | `'medium'`  | Spinner size    |
| `variant` | `SpinnerVariant` | `'primary'` | Spinner variant |
