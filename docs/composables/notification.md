# useNotification

A composable for managing notifications programmatically.

## Basic Usage

```vue
<template>
  <div>
    <Button @click="showSuccess">Success</Button>
    <Button @click="showError">Error</Button>
    <Button @click="showWarning">Warning</Button>
    <Button @click="showInfo">Info</Button>
    <Notification />
  </div>
</template>

<script setup>
import { Button, Notification } from "@baklavue/ui";
import { useNotification } from "@baklavue/composables";

const { success, error, warning, info } = useNotification();

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

const showWarning = () => {
  warning({
    title: "Warning",
    message: "Please check your input",
  });
};

const showInfo = () => {
  info({
    title: "Info",
    message: "This is an informational message",
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

```typescript
interface NotificationOptions {
  title?: string;
  message?: string;
  duration?: number;
  closable?: boolean;
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
    title: "Saved",
    message: "Your changes have been saved",
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
    title: 'Error',
    message: err.message
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
  title: "Success",
  message: "Done!",
});
```
