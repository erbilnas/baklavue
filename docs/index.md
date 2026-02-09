---
layout: home

hero:
  name: "BaklaVue"
  text: "Vue 3 wrapper for Baklava"
  tagline: "Seamlessly integrate Trendyol Baklava Design System components into your Vue 3 applications"
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/erbilnas/baklavue

features:
  - icon: 🚀
    title: Vue 3 Integration
    details: Built with Vue 3 Composition API and TypeScript for modern development experience
  - icon: 🎨
    title: Baklava Components
    details: Wraps Baklava web components with Vue-friendly APIs and full type safety
  - icon: 🔧
    title: Composable Utilities
    details: Powerful Vue composables for enhanced functionality and better developer experience
  - icon: 📦
    title: Type Safe
    details: Full TypeScript support with proper type definitions for all components
  - icon: ⚡
    title: Modern Build
    details: Uses Bun for fast package management and building
  - icon: 📚
    title: Well Documented
    details: Comprehensive documentation with examples and interactive playground
---

## Quick Start

```bash
# Install BaklaVue
npm install @baklavue/ui @baklavue/composables

# Or with bun
bun add @baklavue/ui @baklavue/composables
```

```vue
<template>
  <Button variant="primary" @click="handleClick"> Click me </Button>
</template>

<script setup>
import { Button } from "@baklavue/ui";

const handleClick = () => {
  console.log("Button clicked!");
};
</script>
```

## Components

BaklaVue provides Vue 3 wrappers for all Baklava Design System components:

- **Form Components**: Button, Input, Checkbox, Radio, Switch, Select, Textarea, Datepicker
- **Feedback Components**: Alert, Badge, Tag, Notification, Spinner
- **Layout Components**: Dialog, Drawer, Dropdown, Tooltip, Accordion, Tab, Stepper
- **Navigation Components**: Link, Pagination, Split Button
- **Data Display**: Table, Icon

## Composables

Enhance your application with powerful composables:

- **useNotification**: Programmatically manage notifications

## Learn More

- [Getting Started Guide](/guide/getting-started) - Quick setup and first steps
- [Component Documentation](/components/) - Browse all available components
- [API Reference](/api/reference) - Complete API documentation
- [Contributing Guide](/guide/contributing) - Help improve BaklaVue
