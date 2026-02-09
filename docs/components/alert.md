# Alert

A Vue wrapper for Baklava's `bl-alert` component for displaying alert messages.

## Basic Usage

```vue
<template>
  <Alert variant="info" description="This is an info alert" />
</template>

<script setup>
import { Alert } from "@baklavue/ui";
</script>
```

## Variants

```vue
<template>
  <Alert variant="info" description="Info message" />
  <Alert variant="success" description="Success message" />
  <Alert variant="warning" description="Warning message" />
  <Alert variant="error" description="Error message" />
</template>

<script setup>
import { Alert } from "@baklavue/ui";
</script>
```

## Closable Alert

```vue
<template>
  <Alert
    variant="info"
    description="This alert can be closed"
    closable
    @close="handleClose"
  />
</template>

<script setup>
import { Alert } from "@baklavue/ui";

const handleClose = () => {
  console.log("Alert closed");
};
</script>
```

## Props

| Prop          | Type           | Default     | Description                                   |
| ------------- | -------------- | ----------- | --------------------------------------------- |
| `variant`     | `AlertVariant` | `'info'`    | Alert variant (info, success, warning, error) |
| `description` | `string`       | `undefined` | Alert message text                            |
| `closable`    | `boolean`      | `undefined` | Show close button                             |

## Events

| Event   | Payload | Description                  |
| ------- | ------- | ---------------------------- |
| `close` | `void`  | Emitted when alert is closed |
