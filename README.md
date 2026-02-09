<div align="center">
  <img src="docs/public/logo.png" alt="BaklaVue Logo" width="200" />
  
  # BaklaVue
  
  A Vue 3 wrapper library for [Trendyol Baklava](https://github.com/Trendyol/baklava) design system components, providing a seamless integration between Vue 3 and Baklava's web components.
</div>

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

```bash
# Using bun
bun add @baklavue/ui @baklavue/composables

# Using npm
npm install @baklavue/ui @baklavue/composables

# Using yarn
yarn add @baklavue/ui @baklavue/composables

# Using pnpm
pnpm add @baklavue/ui @baklavue/composables
```

### Basic Example

Once installed, start using components immediately:

```vue
<template>
  <div class="example">
    <BvButton variant="primary" @click="handleClick"> Click me </BvButton>
    <BvInput
      v-model="email"
      label="Email"
      type="email"
      placeholder="Enter your email"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { BvButton, BvInput } from "@baklavue/ui";

const email = ref("");

const handleClick = () => {
  console.log("Email:", email.value);
};
</script>
```

## Requirements

- **Vue 3.0+**: BaklaVue requires Vue 3 with Composition API support
- **Node.js 18+** or **Bun**: For package management and development
- **TypeScript 5.9.2+** (recommended): For full type safety and IntelliSense support

## Features

- 🚀 **Vue 3 Integration**: Built with Vue 3 Composition API and TypeScript for modern development experience
- 🎨 **Baklava Components**: Wraps Baklava web components with Vue-friendly APIs and full type safety
- 🔧 **Composable Utilities**: Powerful Vue composables for enhanced functionality and better developer experience
- 📦 **Type Safe**: Full TypeScript support with proper type definitions for all components, props, events, and composables
- ⚡ **Modern Build**: Uses Bun for fast package management and building. Optimized bundle sizes with tree-shaking support
- 📚 **Well Documented**: Comprehensive documentation with examples and interactive playground

## Components

BaklaVue provides Vue 3 wrappers for all Baklava Design System components:

### Form Components

- Button, Input, Checkbox, Radio, Switch, Select, Textarea, Datepicker

### Feedback Components

- Alert, Badge, Tag, Notification, Spinner

### Layout Components

- Dialog, Drawer, Dropdown, Tooltip, Accordion, Tab, Stepper

### Navigation Components

- Link, Pagination, Split Button

### Data Display

- Table, Icon

All components support:

- ✅ Full TypeScript types
- ✅ v-model binding
- ✅ Vue event handling
- ✅ Reactive props
- ✅ Slot support
- ✅ Accessibility features

## Composables

Enhance your application with powerful Vue composables:

## Learn More

Ready to dive deeper? Explore these resources:

- **[Documentation Site](https://erbilnas.github.io/baklavue/)** - Complete documentation with interactive examples
- **[Getting Started Guide](/docs/guide/getting-started)** - Complete setup instructions and first steps
- **[Component Documentation](/docs/components/)** - Browse all available components with examples
- **[GitHub Repository](https://github.com/erbilnas/baklavue)** - View source code and contribute

## Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

For detailed contribution guidelines, see our [Contributing Guide](/docs/guide/contributing).

## License

This project is licensed under the MIT License.

## Links

- [Trendyol Baklava](https://github.com/Trendyol/baklava) - Design system
- [Vue 3 Documentation](https://vuejs.org/) - Vue framework
- [Bun Documentation](https://bun.sh/) - Package manager

---

**Built with ❤️ for the Vue community**
