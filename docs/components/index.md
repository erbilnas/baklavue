# Components

BaklaVue provides a comprehensive Vue 3 UI kit that brings the [Baklava Design System](https://baklava.design) to your Vue applications. Every component is **fully typed**, **composable**, and built with Vue 3 best practices—giving you a native, delightful development experience.

::: tip Why BaklaVue?
Each component wraps Baklava's battle-tested web components under the hood, so you get enterprise-grade accessibility, theming, and design consistency—with Vue-native APIs like `v-model`, slots, and reactive props.
:::

## Overview

| Category | Count | Purpose |
| -------- | ----- | ------- |
| Form | 9 | Inputs, selects, buttons, toggles, file upload, and date picking |
| Feedback | 6 | Alerts, badges, tags, notifications, spinners, and skeleton loaders |
| Layout | 7 | Dialogs, drawers, dropdowns, tooltips, accordions, tabs, steppers |
| Navigation | 4 | Links, pagination, split buttons, scroll-to-top |
| Data | 3 | Tables, icons, and images |

**29 components** in total—ready to build beautiful, consistent interfaces.

---

## Form Components

Build forms and collect user input with purpose-built components. All form components support `v-model`, validation states, and full TypeScript inference.

| Component | Description |
| --------- | ----------- |
| [**Button**](/components/button) | Primary, secondary, tertiary variants • Multiple kinds (default, neutral, success, danger) • Sizes, icons, loading state |
| [**Input**](/components/input) | Text input with label, help text, validation • Types: text, email, password, number • Loading and disabled states |
| [**Checkbox**](/components/checkbox) | Single and grouped checkboxes • Indeterminate state • Custom slots and preferences |
| [**Radio**](/components/radio) | Radio button groups with full v-model support |
| [**Switch**](/components/switch) | Toggle switch for boolean settings • Multiple sizes |
| [**Select**](/components/select) | Single and multi-select dropdowns • Options via props or slots |
| [**Textarea**](/components/textarea) | Multi-line text input with validation |
| [**File Upload**](/components/file-upload) | Drag-and-drop file upload with validation, preview, and file list |
| [**Datepicker**](/components/datepicker) | Date selection with calendar popover |

---

## Feedback Components

Communicate status, guide users, and show progress. These components help you build clear, responsive feedback patterns.

| Component | Description |
| --------- | ----------- |
| [**Alert**](/components/alert) | Inline alerts for success, warning, error, info • Closable and programmatic control |
| [**Badge**](/components/badge) | Compact status indicators (e.g. counts, labels) |
| [**Tag**](/components/tag) | Labels with optional close button • Selectable and customizable icons |
| [**Notification**](/components/notification) | Toast-style notifications • Use composable `useNotification` for programmatic control |
| [**Skeleton**](/components/skeleton) | Animated placeholder for content loading • Text, rectangle, circle variants |
| [**Spinner**](/components/spinner) | Loading spinner with size and variant options |

---

## Layout Components

Structure your UI with overlays, panels, and navigation patterns. Full control over open/close behavior and animations.

| Component | Description |
| --------- | ----------- |
| [**Dialog**](/components/dialog) | Modal dialogs with header, footer, caption • Programmatic open/close |
| [**Drawer**](/components/drawer) | Side drawer for navigation or forms • Left/right placement |
| [**Dropdown**](/components/dropdown) | Dropdown menus with items, groups, and slots |
| [**Tooltip**](/components/tooltip) | Contextual tooltips with placement control |
| [**Accordion**](/components/accordion) | Collapsible sections • Single or multiple open |
| [**Tab**](/components/tab) | Tab navigation with slot-based panels |
| [**Stepper**](/components/stepper) | Step indicator for wizards and multi-step flows |

---

## Navigation Components

Help users move through your app and trigger actions.

| Component | Description |
| --------- | ----------- |
| [**Link**](/components/link) | Internal and external links • Standalone and inline variants |
| [**Pagination**](/components/pagination) | Page navigation with jumper and select controls |
| [**ScrollToTop**](/components/scroll-to-top) | Floating button to scroll back to top • Configurable threshold and position |
| [**Split Button**](/components/split-button) | Primary action with secondary dropdown options |

---

## Data Display

Render data and assets with consistent styling.

| Component | Description |
| --------- | ----------- |
| [**Table**](/components/table) | Data tables with sorting, pagination, loading states • Custom cell slots |
| [**Icon**](/components/icon) | Icon component with size and color props |
| [**Image**](/components/image) | Performance-focused image with lazy loading, skeleton placeholder, and error fallback |

---

## Quick Start

### Import and Use

Import components individually (recommended for tree-shaking):

```vue
<template>
  <div class="form-example">
    <BvInput v-model="email" label="Email" type="email" />
    <BvButton variant="primary" @click="handleSubmit">Submit</BvButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { BvButton, BvInput } from "@baklavue/ui";

const email = ref("");

const handleSubmit = () => {
  console.log("Submitted:", email.value);
};
</script>
```

Or import everything:

```typescript
import * as BaklaVue from "@baklavue/ui";
```

### TypeScript

All components ship with full type definitions. Use inferred props or import types:

```typescript
import type { ButtonProps } from "@baklavue/ui";

const props: ButtonProps = {
  variant: "primary",
  size: "medium",
};
```

---

## Next Steps

- [**Browse components**](/components/button) — Each component has examples, API docs, and live demos
- [**API Reference**](/api/reference) — Full programmatic API
- [**Getting Started**](/guide/getting-started) — Project setup and configuration
- [**Design Tokens**](/guide/design-tokens) — Customize colors, spacing, typography
