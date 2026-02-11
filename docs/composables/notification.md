# useNotification

A composable for managing notifications programmatically.

## Basic Usage

```vue
<template>
  <div>
    <BvButton @click="showSuccess">Success</BvButton>
    <BvButton @click="showError">Error</BvButton>
    <BvButton @click="showWarning">Warning</BvButton>
    <BvButton @click="showInfo">Info</BvButton>
    <BvNotification />
  </div>
</template>

<script setup>
import { BvButton, BvNotification } from "@baklavue/ui";
import { useNotification } from "@baklavue/composables";

const { success, error, warning, info } = useNotification();

const showSuccess = () => {
  success({
    caption: "Success!",
    description: "Operation completed successfully",
  });
};

const showError = () => {
  error({
    caption: "Error",
    description: "Something went wrong",
  });
};

const showWarning = () => {
  warning({
    caption: "Warning",
    description: "Please check your input",
  });
};

const showInfo = () => {
  info({
    caption: "Info",
    description: "This is an informational message",
  });
};
</script>
```

## Methods

### success

Shows a success notification.

```typescript
success(options: NotificationOptions): void
```

### error

Shows an error notification.

```typescript
error(options: NotificationOptions): void
```

### warning

Shows a warning notification.

```typescript
warning(options: NotificationOptions): void
```

### info

Shows an info notification.

```typescript
info(options: NotificationOptions): void
```

## Notification Options

Uses Baklava's `NotificationProps`. Key options:

```typescript
interface NotificationOptions {
  caption?: string; // Notification title
  description: string; // Notification message (required)
  duration?: number;
  permanent?: boolean;
  primaryAction?: { label: string; onClick: () => void };
  secondaryAction?: { label: string; onClick: () => void };
}
```

## Examples

### With Duration

```vue
<script setup>
import { useNotification } from "@baklavue/composables";

const { success } = useNotification();

const showNotification = () => {
  success({
    caption: "Saved",
    description: "Your changes have been saved",
    duration: 5, // Show for 5 seconds
  });
};
</script>
```

### With Custom Message

```vue
<script setup>
import { useNotification } from '@baklavue/composables'

const { error } = useNotification()

const handleError = (err: Error) => {
  error({
    caption: 'Error',
    description: err.message
  })
}
</script>
```

## Requirements

The `useNotification` composable requires a `<Notification />` component to be present in your component tree:

```vue
<template>
  <div>
    <!-- Your app content -->
    <Notification />
  </div>
</template>

<script setup>
import { Notification } from "@baklavue/ui";
</script>
```

## TypeScript Support

```typescript
import { useNotification } from "@baklavue/composables";

const notification = useNotification();

// All methods are fully typed
notification.success({
  caption: "Success",
  description: "Done!",
});
```
