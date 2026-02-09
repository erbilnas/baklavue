# Components

BaklaVue provides Vue 3 wrappers for all Baklava Design System components. Each component is fully typed and follows Vue 3 best practices.

## Form Components

Components for building forms and collecting user input.

- [Button](/components/button) - Interactive button component
- [Input](/components/input) - Text input field
- [Checkbox](/components/checkbox) - Checkbox input
- [Radio](/components/radio) - Radio button input
- [Switch](/components/switch) - Toggle switch
- [Select](/components/select) - Dropdown select
- [Textarea](/components/textarea) - Multi-line text input
- [Datepicker](/components/datepicker) - Date selection input

## Feedback Components

Components for displaying feedback and status information.

- [Alert](/components/alert) - Alert messages
- [Badge](/components/badge) - Status badges
- [Tag](/components/tag) - Tag labels
- [Notification](/components/notification) - Toast notifications
- [Spinner](/components/spinner) - Loading spinner

## Layout Components

Components for organizing content and creating layouts.

- [Dialog](/components/dialog) - Modal dialog
- [Drawer](/components/drawer) - Side drawer
- [Dropdown](/components/dropdown) - Dropdown menu
- [Tooltip](/components/tooltip) - Tooltip popover
- [Accordion](/components/accordion) - Collapsible accordion
- [Tab](/components/tab) - Tab navigation
- [Stepper](/components/stepper) - Step indicator

## Navigation Components

Components for navigation and user actions.

- [Link](/components/link) - Navigation link
- [Pagination](/components/pagination) - Page navigation
- [Split Button](/components/split-button) - Button with dropdown

## Data Display

Components for displaying data and content.

- [Table](/components/table) - Data table
- [Icon](/components/icon) - Icon component

## Usage Example

```vue
<template>
  <div>
    <Button variant="primary" @click="handleClick"> Submit </Button>
    <Input v-model="email" label="Email" type="email" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Button, Input } from "@baklavue/ui";

const email = ref("");

const handleClick = () => {
  console.log("Submitted:", email.value);
};
</script>
```

## Importing Components

You can import components individually:

```typescript
import { Button, Input, Checkbox } from "@baklavue/ui";
```

Or import all components:

```typescript
import * as BaklaVue from "@baklavue/ui";
```

## TypeScript Support

All components are fully typed:

```typescript
import type { ButtonProps } from "@baklavue/ui";

const props: ButtonProps = {
  variant: "primary",
  size: "medium",
};
```

## Next Steps

- Browse individual component documentation
- Check [API Reference](/api/reference) for detailed API
- See [Getting Started Guide](/guide/getting-started) for setup
