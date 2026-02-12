# Dropdown

A Vue UI kit component for Baklava's `bl-dropdown`, `bl-dropdown-group`, and `bl-dropdown-item` components for dropdown menus. The Dropdown component can work in two modes: slot mode (custom content via default slot) or items mode (declarative menu items with optional grouping via `bl-dropdown-group`).

## Slot Mode

Use the Dropdown component without the `items` prop to provide custom content via the default slot. You can place `bl-dropdown-item` elements or other custom markup directly.

### Basic Slot Mode

<div class="component-demo">

<DropdownSlotDemo />

</div>

```vue
<template>
  <BvDropdown label="Custom Content">
    <bl-dropdown-item>Item 1</bl-dropdown-item>
    <bl-dropdown-item>Item 2</bl-dropdown-item>
    <bl-dropdown-item>Item 3</bl-dropdown-item>
  </BvDropdown>
</template>

<script setup>
import { BvDropdown } from "@baklavue/ui";
</script>
```

## Items Mode

Use the Dropdown component with the `items` prop to create a declarative menu. Content for each item is provided via the `#item` scoped slot. Items can be grouped using the `groupCaption` property.

### Basic Items Example

<div class="component-demo">

<DropdownBasicDemo />

</div>

```vue
<template>
  <BvDropdown label="Actions" :items="menuItems">
    <template #item="{ item }">
      {{ item.caption }}
    </template>
  </BvDropdown>
</template>

<script setup>
import { BvDropdown } from "@baklavue/ui";

const menuItems = [
  { caption: "Edit" },
  { caption: "Duplicate" },
  { caption: "Delete" },
];
</script>
```

### Items with Icons

Add icons to dropdown items using the `icon` prop on each item.

<div class="component-demo">

<DropdownItemsDemo />

</div>

```vue
<template>
  <BvDropdown label="Menu" :items="menuItems">
    <template #item="{ item }">
      {{ item.caption }}
    </template>
  </BvDropdown>
</template>

<script setup>
import { BvDropdown } from "@baklavue/ui";

const menuItems = [
  { caption: "Dashboard", icon: "dashboard" },
  { caption: "Settings", icon: "settings" },
  { caption: "Profile", icon: "user" },
];
</script>
```

### Items with Groups

Use `groupCaption` on items to group them into `bl-dropdown-group` sections with captions.

<div class="component-demo">

<DropdownGroupDemo />

</div>

```vue
<template>
  <BvDropdown label="Actions" :items="groupedItems">
    <template #item="{ item }">
      {{ item.caption }}
    </template>
  </BvDropdown>
</template>

<script setup>
import { BvDropdown } from "@baklavue/ui";

const groupedItems = [
  { caption: "New File", groupCaption: "File" },
  { caption: "Save", groupCaption: "File" },
  { caption: "Export", groupCaption: "File" },
  { caption: "Cut", groupCaption: "Edit" },
  { caption: "Copy", groupCaption: "Edit" },
  { caption: "Paste", groupCaption: "Edit" },
];
</script>
```

### Disabled State

Disable the entire dropdown or individual items.

<div class="component-demo">

<DropdownDisabledDemo />

</div>

```vue
<template>
  <BvDropdown label="Actions" :items="menuItems" :disabled="true">
    <template #item="{ item }">
      {{ item.caption }}
    </template>
  </BvDropdown>
</template>

<script setup>
import { BvDropdown } from "@baklavue/ui";

const menuItems = [
  { caption: "Enabled Item" },
  { caption: "Disabled Item", disabled: true },
  { caption: "Another Item" },
];
</script>
```

## Programmatic Control

Access dropdown methods programmatically using template refs.

<div class="component-demo">

<DropdownProgrammaticDemo />

</div>

```vue
<template>
  <div>
    <div style="margin-bottom: 1rem; display: flex; gap: 0.5rem">
      <BvButton @click="dropdownRef?.open()">Open</BvButton>
      <BvButton @click="dropdownRef?.close()">Close</BvButton>
      <BvButton @click="dropdownRef?.toggle()">Toggle</BvButton>
    </div>
    <BvDropdown ref="dropdownRef" label="Menu" :items="menuItems">
      <template #item="{ item }">
        {{ item.caption }}
      </template>
    </BvDropdown>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { BvDropdown, BvButton } from "@baklavue/ui";

const dropdownRef = ref();
const menuItems = [
  { caption: "Option 1" },
  { caption: "Option 2" },
  { caption: "Option 3" },
];
</script>
```

## Props

### Common Props

| Prop        | Type      | Default     | Description                                              |
| ----------- | --------- | ----------- | -------------------------------------------------------- |
| `open`      | `boolean` | `false`     | Whether the dropdown is open (use with `v-model:open`)   |
| `label`     | `string`  | `'Menu'`    | Label for the built-in dropdown button                   |
| `variant`   | `string`  | `undefined` | Button variant for the dropdown trigger                  |
| `kind`      | `string`  | `undefined` | Button kind for the dropdown trigger                     |
| `size`      | `string`  | `undefined` | Button size for the dropdown trigger                     |
| `icon`      | `string`  | `undefined` | Icon for the dropdown trigger button                     |
| `disabled`  | `boolean` | `false`     | Whether the dropdown trigger is disabled                 |
| `placement` | `string`  | `undefined` | Popover placement (when supported by bl-dropdown)        |

### Items Mode Props

| Prop    | Type           | Default     | Description                                                                     |
| ------- | -------------- | ----------- | ------------------------------------------------------------------------------- |
| `items` | `DropdownItem[]` | `undefined` | Array of dropdown items. Each item is rendered as a bl-dropdown-item (or grouped) |

### DropdownItem Interface

When using the `items` prop, each item should follow the `DropdownItem` interface:

| Property       | Type      | Default     | Description                                                                     |
| -------------- | --------- | ----------- | ------------------------------------------------------------------------------- |
| `caption`      | `string`  | `undefined` | Text displayed for the item                                                    |
| `icon`         | `string`  | `undefined` | Icon name for the item (BaklavaIcon)                                           |
| `disabled`     | `boolean` | `false`     | Whether the item is disabled                                                   |
| `groupCaption` | `string`  | `undefined` | Groups items into a bl-dropdown-group with this caption                         |

Items may include additional custom data for use in the `#item` slot.

## Events

| Event         | Payload   | Description                                               |
| ------------- | --------- | --------------------------------------------------------- |
| `update:open` | `boolean` | Emitted when visibility changes. Use for two-way binding. |
| `open`       | -         | Emitted when the dropdown is opened                       |
| `close`      | -         | Emitted when the dropdown is closed                      |
| `select`     | `CustomEvent` | Emitted when a dropdown item is clicked (from bl-dropdown-item-click) |

## Methods

You can access these methods via template refs:

| Method    | Description                              |
| --------- | ---------------------------------------- |
| `open()`  | Opens the dropdown programmatically      |
| `close()` | Closes the dropdown programmatically     |
| `toggle()`| Toggles the dropdown open/closed state    |

## Slots

| Slot      | Props              | Description                                                   |
| --------- | ------------------ | ------------------------------------------------------------- |
| `default` | -                  | Custom content for slot mode (e.g. bl-dropdown-item elements) |
| `item`    | `{ item, index }`  | Scoped slot for each item content in items mode               |

## Types

```typescript
import type { DropdownProps, DropdownItem } from "@baklavue/ui";

interface DropdownItem {
  caption?: string;
  icon?: string;
  disabled?: boolean;
  groupCaption?: string;
  [key: string]: unknown; // Additional custom data for #item slot
}

interface DropdownProps {
  open?: boolean;
  placement?: string;
  disabled?: boolean;
  label?: string;
  variant?: string;
  kind?: string;
  size?: string;
  icon?: string;
  items?: DropdownItem[];
}
```

## Usage Notes

- **Slot vs Items Mode**: The component automatically switches between slot mode and items mode based on whether the `items` prop is provided. When `items` is undefined or empty, it uses the default slot. When `items` is provided, it renders bl-dropdown-group and bl-dropdown-item elements.

- **Items Prop**: In items mode, content for each item is provided via the `#item` scoped slot. You can use the default (item.caption) or customize the markup.

- **Grouping**: Use `groupCaption` on items to group them. Items with the same `groupCaption` are rendered inside a `bl-dropdown-group` with that caption.

- **Accessibility**: The component follows Baklava's accessibility guidelines and includes proper ARIA attributes for screen readers.

- **Styling**: The component uses Baklava's default styling. Custom styling can be applied through CSS variables or by overriding the component styles.
