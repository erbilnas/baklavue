# Notification

A Vue wrapper for Baklava's `bl-notification` component for toast notifications.

## Basic Usage

```vue
<template>
  <Notification />
</template>

<script setup>
import { Notification } from "@baklavue/ui";
</script>
```

## With Composables

```vue
<template>
  <div>
    <Button @click="showSuccess">Show Success</Button>
    <Button @click="showError">Show Error</Button>
    <Notification />
  </div>
</template>

<script setup>
import { Button, Notification } from "@baklavue/ui";
import { useNotification } from "@baklavue/composables";

const { success, error } = useNotification();

const showSuccess = () => {
  success({
    title: "Success!",
    message: "Operation completed successfully",
  });
};

const showError = () => {
  error({
    title: "Error",
    message: "Something went wrong",
  });
};
</script>
```

## Props

| Prop       | Type     | Default     | Description                      |
| ---------- | -------- | ----------- | -------------------------------- |
| `duration` | `number` | `undefined` | Notification duration in seconds |
