# @baklavue/ui

Vue 3 UI kit for [Trendyol Baklava](https://github.com/Trendyol/baklava) design system. Vue-friendly wrappers with full `v-model` support, slots, and TypeScript.

## Installation

```bash
# bun
bun add @baklavue/ui

# npm
npm install @baklavue/ui

# pnpm
pnpm add @baklavue/ui

# yarn
yarn add @baklavue/ui
```

Requires Vue 3 and TypeScript 5.9+ (peer dependencies).

## Setup

Components load Baklava styles and scripts automatically when mounted. For explicit loading (e.g. before any component mounts), call `loadBaklavaResources()` in `main.ts`:

```ts
import { loadBaklavaResources } from "@baklavue/ui";

loadBaklavaResources(); // optional
```

## Usage

```vue
<template>
  <BvButton variant="primary" @click="handleClick">Click me</BvButton>
  <BvInput v-model="email" label="Email" placeholder="Enter your email" />
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

## Components

All components use the `Bv-` prefix and support TypeScript, `v-model`, Vue events, reactive props, and slots.

| Category   | Components                                                                 |
| ---------- | -------------------------------------------------------------------------- |
| **Form**   | BvButton, BvInput, BvCheckbox, BvRadio, BvSwitch, BvSelect, BvTextarea, BvDatepicker |
| **Feedback** | BvAlert, BvBadge, BvTag, BvNotification, BvSpinner                         |
| **Layout** | BvDialog, BvDrawer, BvDropdown, BvTooltip, BvAccordion, BvTab, BvStepper    |
| **Navigation** | BvLink, BvPagination, BvSplitButton                                         |
| **Data**   | BvTable, BvIcon                                                             |

## Requirements

- **Vue 3.0+** — Composition API
- **TypeScript 5.9.2+** (peer dependency)

## Documentation

- [Full docs](https://erbilnas.github.io/baklavue/) — Guide and examples
- [Components](https://erbilnas.github.io/baklavue/components/) — Component reference

## License

[MIT](LICENSE)
