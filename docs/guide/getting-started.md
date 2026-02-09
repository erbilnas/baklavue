# Getting Started

BaklaVue is a Vue 3 wrapper library for [Trendyol Baklava](https://github.com/Trendyol/baklava) Design System components. This guide will help you get started with BaklaVue in your Vue 3 project.

## Prerequisites

- Vue 3.0+
- Node.js 18+ or Bun
- TypeScript 5.9.2+ (recommended)

## Installation

Install BaklaVue packages using your preferred package manager:

```bash
# Using npm
npm install @baklavue/ui @baklavue/composables

# Using yarn
yarn add @baklavue/ui @baklavue/composables

# Using pnpm
pnpm add @baklavue/ui @baklavue/composables

# Using bun
bun add @baklavue/ui @baklavue/composables
```

## Basic Usage

### 1. Import Components

```vue
<template>
  <div>
    <Button variant="primary" @click="handleClick"> Click me </Button>
  </div>
</template>

<script setup>
import { Button } from "@baklavue/ui";

const handleClick = () => {
  console.log("Button clicked!");
};
</script>
```

### 2. Use Composables

```vue
<template>
  <div>
    <Button @click="showNotification">Show Notification</Button>
    <Notification />
  </div>
</template>

<script setup>
import { Button, Notification } from "@baklavue/ui";
import { useNotification } from "@baklavue/composables";

const { success } = useNotification();

const showNotification = () => {
  success({
    title: "Success!",
    message: "Operation completed successfully",
  });
};
</script>
```

## Loading Baklava Resources

BaklaVue components automatically load Baklava resources when mounted. However, if you need to load them manually:

```vue
<script setup>
import { onMounted } from "vue";
import { loadBaklavaResources } from "@baklavue/ui";

onMounted(() => {
  loadBaklavaResources();
});
</script>
```

## TypeScript Support

BaklaVue is built with TypeScript and provides full type definitions:

```typescript
import type { ButtonProps } from "@baklavue/ui";

const buttonProps: ButtonProps = {
  variant: "primary",
  size: "medium",
  disabled: false,
};
```

## Next Steps

- Explore [Components](/components/) to see all available components
- Learn about [Composables](/composables/) for enhanced functionality
- Check the [API Reference](/api/reference) for detailed documentation
- Read the [Contributing Guide](/guide/contributing) to help improve BaklaVue
