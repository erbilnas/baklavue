---
layout: home

hero:
  name: "BaklaVue"
  text: "Vue 3 wrapper for Baklava"
  tagline: "Seamlessly integrate Trendyol Baklava Design System components into your Vue 3 applications with full type safety, Vue-friendly APIs, and powerful composables"
  image:
    src: /logo.png
    alt: BaklaVue Logo
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
    details: Built with Vue 3 Composition API and TypeScript for modern development experience. Leverage reactive data binding, computed properties, and lifecycle hooks seamlessly with Baklava components.
  - icon: 🎨
    title: Baklava Components
    details: Wraps Baklava web components with Vue-friendly APIs and full type safety. All components are properly typed, support v-model, and follow Vue 3 best practices for a native Vue development experience.
  - icon: 🔧
    title: Composable Utilities
    details: Powerful Vue composables for enhanced functionality and better developer experience. Manage notifications, handle component state, and access advanced features through intuitive composable functions.
  - icon: 📦
    title: Type Safe
    details: Full TypeScript support with proper type definitions for all components, props, events, and composables. Get autocomplete, type checking, and IntelliSense support in your IDE.
  - icon: ⚡
    title: Modern Build
    details: Uses Bun for fast package management and building. Optimized bundle sizes with tree-shaking support. Components are tree-shakeable, so you only include what you use.
  - icon: 📚
    title: Well Documented
    details: Comprehensive documentation with examples and interactive playground. Every component includes detailed API documentation, usage examples, and best practices to help you build faster.
---

## What is BaklaVue?

BaklaVue is a comprehensive Vue 3 wrapper library for the [Trendyol Baklava Design System](https://github.com/Trendyol/baklava). It bridges the gap between Baklava's web components and Vue 3's reactive ecosystem, providing a seamless development experience with full TypeScript support, Vue-friendly APIs, and powerful composables.

### Why BaklaVue?

- **Native Vue Experience**: Components feel like native Vue components with proper v-model support, event handling, and reactive props
- **Type Safety**: Complete TypeScript definitions for all components, props, events, and composables
- **Developer Experience**: Intuitive APIs, comprehensive documentation, and helpful composables
- **Production Ready**: Battle-tested components used in real-world applications
- **Active Development**: Regular updates and improvements based on community feedback

## Quick Start

Get started with BaklaVue in minutes. Install the packages using your preferred package manager:

::: code-group

```bash [bun]
bun add @baklavue/ui @baklavue/composables
```

```bash [npm]
npm install @baklavue/ui @baklavue/composables
```

```bash [yarn]
yarn add @baklavue/ui @baklavue/composables
```

```bash [pnpm]
pnpm add @baklavue/ui @baklavue/composables
```

:::

### Basic Example

Once installed, start using components immediately:

```vue
<template>
  <div class="example">
    <Button variant="primary" @click="handleClick"> Click me </Button>
    <Input
      v-model="email"
      label="Email"
      type="email"
      placeholder="Enter your email"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Button, Input } from "@baklavue/ui";

const email = ref("");

const handleClick = () => {
  console.log("Email:", email.value);
};
</script>
```

### Requirements

- **Vue 3.0+**: BaklaVue requires Vue 3 with Composition API support
- **Node.js 18+** or **Bun**: For package management and development
- **TypeScript 5.9.2+** (recommended): For full type safety and IntelliSense support

## Components

BaklaVue provides Vue 3 wrappers for all Baklava Design System components, organized into logical categories:

### Form Components

Build interactive forms with a complete set of form controls:

- **[Button](/components/button)** - Interactive button component with multiple variants, sizes, and loading states
- **[Input](/components/input)** - Text input field with label, placeholder, and validation support
- **[Checkbox](/components/checkbox)** - Checkbox input for boolean selections
- **[Radio](/components/radio)** - Radio button input for single-choice selections
- **[Switch](/components/switch)** - Toggle switch component for on/off states
- **[Select](/components/select)** - Dropdown select component with search and multi-select support
- **[Textarea](/components/textarea)** - Multi-line text input for longer content
- **[Datepicker](/components/datepicker)** - Date selection input with calendar picker

### Feedback Components

Display status messages, alerts, and loading indicators:

- **[Alert](/components/alert)** - Alert messages for important information, warnings, and errors
- **[Badge](/components/badge)** - Status badges for displaying counts, labels, and status indicators
- **[Tag](/components/tag)** - Tag labels for categorization and filtering
- **[Notification](/components/notification)** - Toast notifications for user feedback and system messages
- **[Spinner](/components/spinner)** - Loading spinner for async operations

### Layout Components

Organize content and create complex layouts:

- **[Dialog](/components/dialog)** - Modal dialog for confirmations, forms, and important content
- **[Drawer](/components/drawer)** - Side drawer for navigation and secondary content
- **[Dropdown](/components/dropdown)** - Dropdown menu for actions and navigation
- **[Tooltip](/components/tooltip)** - Tooltip popover for additional information
- **[Accordion](/components/accordion)** - Collapsible accordion for organizing content
- **[Tab](/components/tab)** - Tab navigation for switching between content sections
- **[Stepper](/components/stepper)** - Step indicator for multi-step processes

### Navigation Components

Navigate through your application:

- **[Link](/components/link)** - Navigation link component with routing support
- **[Pagination](/components/pagination)** - Page navigation for large datasets
- **[Split Button](/components/split-button)** - Button with dropdown menu for multiple actions

### Data Display

Present data and content effectively:

- **[Table](/components/table)** - Data table component with sorting, filtering, and pagination
- **[Icon](/components/icon)** - Icon component for displaying Baklava icons

All components support:

- ✅ Full TypeScript types
- ✅ v-model binding
- ✅ Vue event handling
- ✅ Reactive props
- ✅ Slot support
- ✅ Accessibility features

## Composables

Enhance your application with powerful Vue composables that provide advanced functionality:

### useNotification

Programmatically manage notifications throughout your application:

```vue
<template>
  <div>
    <Button @click="showSuccess">Success</Button>
    <Button @click="showError">Error</Button>
    <Notification />
  </div>
</template>

<script setup>
import { Button, Notification } from "@baklavue/ui";
import { useNotification } from "@baklavue/composables";

const { success, error, info, warning } = useNotification();

const showSuccess = () => {
  success({
    title: "Operation Successful",
    message: "Your changes have been saved",
  });
};

const showError = () => {
  error({
    title: "Error Occurred",
    message: "Please try again later",
  });
};
</script>
```

**Features:**

- Multiple notification types (success, error, info, warning)
- Programmatic control
- Automatic positioning and stacking
- Customizable duration and styling

More composables are coming soon! Check the [Composables Documentation](/composables/) for updates.

## TypeScript Support

BaklaVue is built with TypeScript and provides comprehensive type definitions:

```typescript
import type { ButtonProps, InputProps } from "@baklavue/ui";

// Type-safe component props
const buttonProps: ButtonProps = {
  variant: "primary",
  size: "medium",
  disabled: false,
  loading: false,
};

const inputProps: InputProps = {
  label: "Email",
  type: "email",
  placeholder: "Enter email",
  required: true,
};
```

All components, props, events, and composables are fully typed, providing excellent IDE support and catching errors at compile time.

## Examples

### Form with Validation

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <Input
      v-model="form.email"
      label="Email"
      type="email"
      :required="true"
      :error="errors.email"
    />
    <Input
      v-model="form.password"
      label="Password"
      type="password"
      :required="true"
      :error="errors.password"
    />
    <Button type="submit" variant="primary" :loading="isSubmitting">
      Submit
    </Button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { Button, Input } from "@baklavue/ui";

const form = ref({
  email: "",
  password: "",
});

const errors = ref({
  email: "",
  password: "",
});

const isSubmitting = ref(false);

const handleSubmit = async () => {
  // Validation and submission logic
};
</script>
```

### Using Composables

```vue
<template>
  <div>
    <Button @click="handleAction">Perform Action</Button>
    <Notification />
  </div>
</template>

<script setup>
import { Button, Notification } from "@baklavue/ui";
import { useNotification } from "@baklavue/composables";

const { success, error } = useNotification();

const handleAction = async () => {
  try {
    // Perform async operation
    await performAction();
    success({ title: "Success", message: "Action completed" });
  } catch (err) {
    error({ title: "Error", message: "Action failed" });
  }
};
</script>
```

## Learn More

Ready to dive deeper? Explore these resources:

- **[Getting Started Guide](/guide/getting-started)** - Complete setup instructions and first steps with BaklaVue
- **[Installation Guide](/guide/installation)** - Detailed installation instructions and configuration options
- **[Component Documentation](/components/)** - Browse all available components with examples and API reference
- **[Composables Documentation](/composables/)** - Learn about available composables and their usage
- **[API Reference](/api/reference)** - Complete API documentation for all components and utilities
- **[Contributing Guide](/guide/contributing)** - Help improve BaklaVue by contributing code, documentation, or feedback

## Community & Support

- **GitHub**: [View source code and report issues](https://github.com/erbilnas/baklavue)
- **Issues**: Found a bug or have a feature request? [Open an issue](https://github.com/erbilnas/baklavue/issues)
- **Contributions**: We welcome contributions! See our [Contributing Guide](/guide/contributing)

---

**Built with ❤️ for the Vue community**
