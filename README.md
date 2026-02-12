<div align="center">
  <img src="docs/public/logo.png" alt="BaklaVue Logo" width="200" />
  
  # BaklaVue
  
  A Vue 3 UI kit for [Trendyol Baklava](https://github.com/Trendyol/baklava) design system components.
  
  [![npm version](https://img.shields.io/npm/v/@baklavue/ui.svg?style=flat-squar&label=ui)](https://www.npmjs.com/package/@baklavue/ui)
  [![composables](https://img.shields.io/npm/v/@baklavue/composables.svg?style=flat-square&label=composables)](https://www.npmjs.com/package/@baklavue/composables)
  [![npm downloads](https://img.shields.io/npm/dm/@baklavue/ui.svg?style=flat-square)](https://www.npmjs.com/package/@baklavue/ui)
  [![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?style=flat-square&logo=vue.js)](https://vuejs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
</div>

---

## What is BaklaVue?

BaklaVue bridges [Trendyol Baklava](https://github.com/Trendyol/baklava) web components with Vue 3's reactive ecosystem. Get type-safe, Vue-friendly wrappers with full `v-model` support, slots, and composables.

### Why BaklaVue?

| Feature                  | Description                                                                                                   |
| ------------------------ | ------------------------------------------------------------------------------------------------------------- |
| **Native Vue feel**      | Components work like native Vue with `v-model`, events, and reactive props                                    |
| **Type safety**          | Full TypeScript definitions for components, props, events, and composables                                    |
| **Developer experience** | Intuitive APIs, docs, and composables                                                                         |
| **Production ready**     | Used in real-world applications                                                                               |
| **MCP support**          | [Model Context Protocol](https://modelcontextprotocol.io) server for AI assistants (Cursor, Claude, Windsurf) |

---

## Quick Start

```bash
# bun
bun add @baklavue/ui @baklavue/composables

# npm
npm install @baklavue/ui @baklavue/composables

# yarn
yarn add @baklavue/ui @baklavue/composables

# pnpm
pnpm add @baklavue/ui @baklavue/composables
```

### Basic Example

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

---

## Requirements

- **Vue 3.0+** — Composition API support
- **Node.js 18+** or **Bun**
- **TypeScript 5.9.2+** (recommended)

---

## Features

- Vue 3 integration with Composition API and TypeScript
- Baklava components with Vue-friendly APIs and full type safety
- Composables for notifications, CSV export, theme customization, and more
- Tree-shakeable bundle with optimized sizes
- Documentation site with examples and playground
- MCP server for AI assistants

---

## Packages

| Package                                                                      | Description                                      |
| ---------------------------------------------------------------------------- | ------------------------------------------------ |
| [@baklavue/ui](https://www.npmjs.com/package/@baklavue/ui)                   | Vue 3 components for Baklava design system       |
| [@baklavue/composables](https://www.npmjs.com/package/@baklavue/composables) | Vue composables (notification, theme, CSV, etc.) |

---

## Components

All components support TypeScript types, `v-model`, Vue events, reactive props, slots, and accessibility features.

| Category       | Components                                                           |
| -------------- | -------------------------------------------------------------------- |
| **Form**       | Button, Input, Checkbox, Radio, Switch, Select, Textarea, Datepicker |
| **Feedback**   | Alert, Badge, Tag, Notification, Spinner                             |
| **Layout**     | Dialog, Drawer, Dropdown, Tooltip, Accordion, Tab, Stepper           |
| **Navigation** | Link, Pagination, Split Button                                       |
| **Data**       | Table, Icon                                                          |

---

## Resources

- [**Documentation**](https://erbilnas.github.io/baklavue/) — Full docs with interactive examples
- [**Getting Started**](https://erbilnas.github.io/baklavue/guide/getting-started) — Setup and first steps
- [**MCP Guide**](https://erbilnas.github.io/baklavue/guide/mcp) — Use with AI assistants
- [**Components**](https://erbilnas.github.io/baklavue/components/) — All components with examples
- [**GitHub**](https://github.com/erbilnas/baklavue) — Source code and contributions

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

See the [Contributing Guide](https://erbilnas.github.io/baklavue/guide/contributing) for details.

---

## License

[MIT](LICENSE)

---

## Related

- [Trendyol Baklava](https://github.com/Trendyol/baklava) — Design system
- [Vue 3](https://vuejs.org/) — Framework
- [Bun](https://bun.sh/) — Runtime & package manager

---

<div align="center">
  <strong>Built with ❤️ for the Vue community</strong>
</div>
