# @baklavue/composables

A collection of Vue 3 composables for seamless integration with Baklava UI components. This package provides convenient utilities and hooks to enhance your Vue applications with Baklava's design system.

## 🚀 Features

- **Vue 3 Composition API**: Built with modern Vue 3 composables
- **TypeScript Support**: Full TypeScript support with proper type definitions
- **Baklava Integration**: Seamlessly works with Baklava UI components
- **Lightweight**: Minimal bundle size with no unnecessary dependencies
- **Tree-shakable**: Only import what you need

## 📦 Installation

```bash
# Using npm
npm install @baklavue/composables

# Using yarn
yarn add @baklavue/composables

# Using pnpm
pnpm add @baklavue/composables

# Using bun
bun add @baklavue/composables
```

## 🔧 Prerequisites

- Vue 3.x
- TypeScript 5.9.2+ (peer dependency)
- Baklava UI components installed in your project

## 📚 Available Composables

### `useNotification`

A composable for managing Baklava notification system with a simple and intuitive API.

#### Basic Usage

```vue
<template>
  <div>
    <button @click="showSuccess">Show Success</button>
    <button @click="showError">Show Error</button>
    <button @click="showWarning">Show Warning</button>
    <button @click="showInfo">Show Info</button>

    <!-- Required: Add the notification element to your template -->
    <bl-notification />
  </div>
</template>

<script setup lang="ts">
import { useNotification } from "@baklavue/composables";

const { success, error, warning, info } = useNotification();

const showSuccess = () => {
  success({
    caption: "Success!",
    description: "Operation completed successfully.",
    duration: 5,
  });
};

const showError = () => {
  error({
    caption: "Error!",
    description: "Something went wrong. Please try again.",
    duration: 8,
  });
};

const showWarning = () => {
  warning({
    caption: "Warning!",
    description: "Please review your input before proceeding.",
    duration: 6,
  });
};

const showInfo = () => {
  info({
    caption: "Information",
    description: "Here is some useful information for you.",
    duration: 4,
  });
};
</script>
```

#### API Reference

The `useNotification` composable returns an object with the following methods:

##### `success(notification: NotificationProps)`

Shows a success notification with green styling.

##### `error(notification: NotificationProps)`

Shows an error notification with red styling.

##### `warning(notification: NotificationProps)`

Shows a warning notification with orange styling.

##### `info(notification: NotificationProps)`

Shows an info notification with blue styling.

#### Notification Props

All notification methods accept a `NotificationProps` object with the following properties:

```typescript
interface NotificationProps {
  caption?: string;    // Notification title
  description: string; // Notification message (required)
  duration?: number;  // Duration in seconds (optional)
  permanent?: boolean; // Prevent auto-close
  // ... other Baklava notification properties
}
```

#### Important Notes

- **Required DOM Element**: You must include `<bl-notification>` in your template for notifications to work
- **Auto-icon**: All notifications automatically include appropriate icons based on their variant
- **Duration**: If no duration is specified, notifications will use Baklava's default duration
- **Error Handling**: The composable includes built-in error handling and will warn if the notification element is not found

## 🏗️ Project Structure

```
packages/composables/
├── index.ts              # Main export file
├── notification.ts       # Notification composable
├── package.json          # Package configuration
├── tsconfig.json         # TypeScript configuration
└── README.md            # This file
```

## 🔧 Development

### Prerequisites

- [Bun](https://bun.sh) (recommended) or Node.js
- TypeScript 5.9.2+

### Setup

```bash
# Install dependencies
bun install

# Run the package
bun run index.ts
```

### TypeScript Configuration

This package uses strict TypeScript configuration with:

- ESNext target and modules
- Strict type checking
- Bundler-friendly module resolution
- Unused variable/parameter detection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is part of the Baklavue ecosystem. See the main project for license information.

## 🔗 Related Packages

- `@baklavue/ui` - Baklava UI components for Vue
- `@trendyol/baklava` - Core Baklava design system

## 📞 Support

For issues and questions:

- Check the [Baklava documentation](https://baklava.trendyol.com/)
- Open an issue in the project repository
- Review the examples in the playground directory
