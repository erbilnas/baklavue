# Tab

A Vue wrapper for Baklava's `bl-tab` component for tab navigation.

## Basic Usage

```vue
<template>
  <Tab
    v-model="activeTab"
    :tabs="[
      { label: 'Tab 1', value: 'tab1' },
      { label: 'Tab 2', value: 'tab2' },
      { label: 'Tab 3', value: 'tab3' },
    ]"
  >
    <div v-if="activeTab === 'tab1'">Content 1</div>
    <div v-if="activeTab === 'tab2'">Content 2</div>
    <div v-if="activeTab === 'tab3'">Content 3</div>
  </Tab>
</template>

<script setup>
import { ref } from "vue";
import { Tab } from "@baklavue/ui";

const activeTab = ref("tab1");
</script>
```

## Props

| Prop         | Type          | Default     | Description                |
| ------------ | ------------- | ----------- | -------------------------- |
| `modelValue` | `string`      | `undefined` | Active tab value (v-model) |
| `tabs`       | `TabOption[]` | `undefined` | Tab options                |

## Events

| Event               | Payload  | Description              |
| ------------------- | -------- | ------------------------ |
| `update:modelValue` | `string` | Emitted when tab changes |
