# Switch

A Vue wrapper for Baklava's `bl-switch` component with v-model support.

## Basic Usage

```vue
<template>
  <Switch v-model="enabled" label="Enable notifications" />
</template>

<script setup>
import { ref } from "vue";
import { Switch } from "@baklavue/ui";

const enabled = ref(false);
</script>
```

## Props

| Prop         | Type      | Default     | Description                    |
| ------------ | --------- | ----------- | ------------------------------ |
| `modelValue` | `boolean` | `undefined` | Switch checked state (v-model) |
| `name`       | `string`  | `undefined` | Switch name attribute          |
| `label`      | `string`  | `undefined` | Switch label                   |
| `disabled`   | `boolean` | `undefined` | Disabled state                 |
| `required`   | `boolean` | `undefined` | Required field                 |

## Events

| Event               | Payload   | Description                       |
| ------------------- | --------- | --------------------------------- |
| `update:modelValue` | `boolean` | Emitted when switch state changes |

## Examples

### Multiple Switches

```vue
<template>
  <Switch v-model="settings.email" label="Email notifications" />
  <Switch v-model="settings.sms" label="SMS notifications" />
  <Switch v-model="settings.push" label="Push notifications" />
</template>

<script setup>
import { ref } from "vue";
import { Switch } from "@baklavue/ui";

const settings = ref({
  email: true,
  sms: false,
  push: true,
});
</script>
```
