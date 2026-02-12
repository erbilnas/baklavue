# Notification

A Vue UI kit component for Baklava's `bl-notification` web component for toast notifications. Place the Notification component once in your app (typically at root or layout level). Notifications are triggered programmatically via the `useNotification` composable from `@baklavue/composables`.

## Basic Usage

Place `<BvNotification />` in your app. It acts as a container for toast notifications that appear when you call `useNotification()` methods.

<div class="component-demo">

<NotificationBasicDemo />

</div>

```vue
<template>
  <div>
    <BvButton @click="showSuccess">Show Success</BvButton>
    <BvButton kind="danger" @click="showError">Show Error</BvButton>
    <BvNotification />
  </div>
</template>

<script setup>
import { BvButton, BvNotification } from "@baklavue/ui";
import { useNotification } from "@baklavue/composables";

const { success, error } = useNotification();

const showSuccess = () => {
  success({
    caption: "Success!",
    description: "Operation completed successfully.",
  });
};

const showError = () => {
  error({
    caption: "Error",
    description: "Something went wrong.",
  });
};
</script>
```

## With Composables

The `useNotification` composable provides four methods: `success`, `error`, `warning`, and `info`. Each displays a notification with the corresponding kind (icon and styling).

<div class="component-demo">

<NotificationBasicDemo />

</div>

```vue
<template>
  <div>
    <BvButton kind="success" @click="showSuccess">Success</BvButton>
    <BvButton kind="danger" @click="showError">Error</BvButton>
    <BvButton kind="neutral" @click="showWarning">Warning</BvButton>
    <BvButton @click="showInfo">Info</BvButton>
    <BvNotification />
  </div>
</template>

<script setup>
import { BvButton, BvNotification } from "@baklavue/ui";
import { useNotification } from "@baklavue/composables";

const { success, error, warning, info } = useNotification();

const showSuccess = () =>
  success({
    caption: "Success!",
    description: "Operation completed successfully.",
  });

const showError = () =>
  error({
    caption: "Error",
    description: "Something went wrong.",
  });

const showWarning = () =>
  warning({
    caption: "Warning",
    description: "Please check your input.",
  });

const showInfo = () =>
  info({
    caption: "Info",
    description: "This is an informational message.",
  });
</script>
```

## Custom Duration

Control the default duration via the `duration` prop on the component (in seconds). You can also override duration per notification when calling `success`, `error`, `warning`, or `info`.

<div class="component-demo">

<NotificationDurationDemo />

</div>

```vue
<template>
  <div>
    <BvButton @click="showShort">Show 3s notification</BvButton>
    <BvButton @click="showLong">Show 10s notification</BvButton>
    <BvNotification :duration="5" />
  </div>
</template>

<script setup>
import { BvButton, BvNotification } from "@baklavue/ui";
import { useNotification } from "@baklavue/composables";

const { success } = useNotification();

const showShort = () => {
  success({
    caption: "Short duration",
    description: "This notification stays for 3 seconds.",
    duration: 3,
  });
};

const showLong = () => {
  success({
    caption: "Long duration",
    description: "This notification stays for 10 seconds.",
    duration: 10,
  });
};
</script>
```

## Props

| Prop          | Type      | Default | Description                                                     |
| ------------- | --------- | ------- | --------------------------------------------------------------- |
| `duration`    | `number`  | `7`     | Default duration of notifications in seconds                    |
| `noAnimation` | `boolean` | `false` | Disable animations. Respects user's reduced-motion preferences. |

## Types

```typescript
import type { NotificationProps } from "@baklavue/ui";

// Notification component props (duration, noAnimation)
interface NotificationProps {
  duration?: number;
  noAnimation?: boolean;
}

// useNotification options (caption, description) - maps to Baklava NotificationProps
interface UseNotificationOptions {
  caption?: string; // Notification title
  description: string; // Notification message (required)
  duration?: number;
  permanent?: boolean;
  primaryAction?: { label: string; onClick: () => void };
  secondaryAction?: { label: string; onClick: () => void };
}
```

## Usage Notes

- **Placement**: Place `<BvNotification />` once in your app, typically at the root layout or App.vue. It renders the `bl-notification` container; notifications are added via `useNotification()`.

- **useNotification requirement**: The `useNotification` composable requires a `<BvNotification />` (or `<bl-notification>`) component to be present in the DOM. If it is missing, a console warning is shown and notifications will not appear.

- **Accessibility**: The component follows Baklava's accessibility guidelines. The `noAnimation` prop respects the user's reduced-motion preferences.

- **Styling**: The component uses Baklava's default styling. Custom styling can be applied through CSS variables or by overriding the component styles.
