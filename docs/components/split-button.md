# Split Button

A Vue wrapper for Baklava's `bl-split-button` component for buttons with dropdown actions.

## Basic Usage

```vue
<template>
  <SplitButton
    label="Actions"
    :options="[
      { label: 'Action 1', value: 'action1' },
      { label: 'Action 2', value: 'action2' },
    ]"
    @select="handleSelect"
  />
</template>

<script setup>
import { SplitButton } from '@baklavue/ui'

const handleSelect = (value: string) => {
  console.log('Selected:', value)
}
</script>
```

## Props

| Prop      | Type                  | Default     | Description      |
| --------- | --------------------- | ----------- | ---------------- |
| `label`   | `string`              | `undefined` | Button label     |
| `options` | `SplitButtonOption[]` | `undefined` | Dropdown options |
| `variant` | `ButtonVariant`       | `'primary'` | Button variant   |

## Events

| Event    | Payload  | Description                     |
| -------- | -------- | ------------------------------- |
| `select` | `string` | Emitted when option is selected |
