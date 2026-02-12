# Tab

A Vue UI kit component for Baklava's `bl-tabs` (bl-tab-group / bl-tab / bl-tab-panel) components for tab navigation. Use the `tabs` prop for declarative configuration or the default slot for custom tab content and panels.

## Basic Usage

Use the `tabs` prop with `v-model:activeTab` for two-way binding of the active tab.

<div class="component-demo">

<TabBasicDemo />

</div>

```vue
<template>
  <div>
    <p>Active tab: {{ activeTab }}</p>
    <BvTab v-model:activeTab="activeTab" :tabs="tabs">
      <div v-if="activeTab === 'tab1'">Content for Tab 1</div>
      <div v-if="activeTab === 'tab2'">Content for Tab 2</div>
      <div v-if="activeTab === 'tab3'">Content for Tab 3</div>
    </BvTab>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { BvTab } from "@baklavue/ui";

const activeTab = ref("tab1");
const tabs = [
  { label: "Tab 1", value: "tab1" },
  { label: "Tab 2", value: "tab2" },
  { label: "Tab 3", value: "tab3" },
];
</script>
```

## With Slots

Use the default slot to provide panel content. Match `v-if` conditions to the tab `value` to show the correct content.

<div class="component-demo">

<TabWithSlotsDemo />

</div>

```vue
<template>
  <BvTab v-model:activeTab="activeTab" :tabs="tabOptions">
    <div v-if="activeTab === 'overview'">Overview content</div>
    <div v-if="activeTab === 'profile'">Profile content</div>
    <div v-if="activeTab === 'settings'">Settings content</div>
  </BvTab>
</template>

<script setup>
import { ref } from "vue";
import { BvTab } from "@baklavue/ui";

const activeTab = ref("profile");
const tabOptions = [
  { label: "Overview", value: "overview" },
  { label: "Profile", value: "profile" },
  { label: "Settings", value: "settings" },
];
</script>
```

## Disabled Tabs

Disable specific tabs by setting `disabled: true` in the tab option.

```vue
<template>
  <BvTab v-model:activeTab="activeTab" :tabs="[
    { label: 'Enabled', value: 'enabled' },
    { label: 'Disabled', value: 'disabled', disabled: true },
  ]">
    <div v-if="activeTab === 'enabled'">Enabled content</div>
    <div v-if="activeTab === 'disabled'">Disabled content</div>
  </BvTab>
</template>

<script setup>
import { ref } from "vue";
import { BvTab } from "@baklavue/ui";

const activeTab = ref("enabled");
</script>
```

## Props

| Prop         | Type          | Default     | Description                                        |
| ------------ | ------------- | ----------- | -------------------------------------------------- |
| `activeTab`  | `string`      | `undefined` | Currently active tab value (use with v-model:activeTab) |
| `tabs`       | `TabOption[]` | `undefined` | Array of tab options. When provided, tabs are rendered from this array. |
| `variant`    | `string`      | `undefined` | Tab variant (passed to bl-tabs)                    |
| `orientation`| `string`      | `undefined` | Tab orientation: horizontal or vertical            |

## Events

| Event               | Payload    | Description                                       |
| ------------------- | ---------- | ------------------------------------------------- |
| `update:activeTab`  | `string`   | Emitted when the active tab changes (v-model)     |
| `tab-change`       | `CustomEvent` | Emitted when tab selection changes (raw event) |

## Slots

| Slot      | Description                                              |
| --------- | -------------------------------------------------------- |
| `default` | Panel content. Use v-if to show content per active tab.  |

## Types

```typescript
import type { TabProps, TabOption } from "@baklavue/ui";

interface TabOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface TabProps {
  activeTab?: string;
  tabs?: TabOption[];
  variant?: string;
  orientation?: string;
}
```

## Usage Notes

- **tabs prop**: When `tabs` is provided, the component renders a `bl-tab` for each item. Content for each panel is provided via the default slot; use `v-if="activeTab === 'value'"` to show the correct panel.
- **v-model:activeTab**: Use `v-model:activeTab` for two-way binding of the active tab value.
- **Accessibility**: The component follows Baklava's accessibility guidelines for tab navigation.
