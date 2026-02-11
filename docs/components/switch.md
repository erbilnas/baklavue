# Switch

A Vue UI kit component for Baklava's `bl-switch` web component with v-model support. A toggle switch for boolean states. Use `v-model:checked` for two-way binding.

## Basic Usage

<div class="component-demo">

<SwitchBasicDemo />

</div>

```vue
<template>
  <div>
    <p>Notifications: {{ enabled ? "On" : "Off" }}</p>
    <BvSwitch v-model:checked="enabled" label="Enable notifications" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { BvSwitch } from "@baklavue/ui";

const enabled = ref(false);
</script>
```

## Disabled State

Disable the switch to prevent user interaction.

<div class="component-demo">

<SwitchDisabledDemo />

</div>

```vue
<template>
  <BvSwitch :checked="true" :disabled="true" label="Disabled (checked)" />
  <BvSwitch :checked="false" :disabled="true" label="Disabled (unchecked)" />
</template>

<script setup>
import { BvSwitch } from "@baklavue/ui";
</script>
```

## Sizes

Control the switch size using the `size` prop.

<div class="component-demo">

<SwitchSizesDemo />

</div>

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <BvSwitch v-model:checked="small" size="small" label="Small" />
    <BvSwitch v-model:checked="medium" size="medium" label="Medium" />
    <BvSwitch v-model:checked="large" size="large" label="Large" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { BvSwitch } from "@baklavue/ui";

const small = ref(false);
const medium = ref(false);
const large = ref(false);
</script>
```

## Multiple Switches

Use multiple switches for settings or preferences.

```vue
<template>
  <div>
    <BvSwitch v-model:checked="settings.email" label="Email notifications" />
    <BvSwitch v-model:checked="settings.sms" label="SMS notifications" />
    <BvSwitch v-model:checked="settings.push" label="Push notifications" />
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { BvSwitch } from "@baklavue/ui";

const settings = reactive({
  email: true,
  sms: false,
  push: true,
});
</script>
```

## Props

| Prop       | Type      | Default     | Description                        |
| ---------- | --------- | ----------- | ---------------------------------- |
| `checked`  | `boolean` | `undefined` | Checked state (use with v-model:checked) |
| `disabled` | `boolean` | `undefined` | Whether the switch is disabled     |
| `label`    | `string`  | `undefined` | Label for the switch               |
| `size`     | `string`  | `undefined` | Switch size (`small`, `medium`, `large`) |

## Events

| Event             | Payload       | Description                              |
| ----------------- | ------------- | ---------------------------------------- |
| `update:checked`  | `boolean`     | Emitted when checked state changes (v-model) |
| `change`          | `CustomEvent` | Emitted when the user toggles the switch |
| `input`           | `CustomEvent` | Emitted on user input (mirrors native)   |

## Slots

| Slot      | Description                              |
| --------- | ---------------------------------------- |
| `default` | Switch label (falls back to `label` prop) |

## Types

```typescript
import type { SwitchProps } from "@baklavue/ui";

interface SwitchProps {
  checked?: boolean;
  disabled?: boolean;
  label?: string;
  size?: string;
}
```

## Usage Notes

- **v-model:checked**: Use `v-model:checked` for two-way binding of the toggle state.
- **Accessibility**: The `label` prop or default slot provides accessible text for the switch.
- **Styling**: Custom colors can be applied via CSS variables (`--bl-switch-color-on`, `--bl-switch-color-off`, `--bl-switch-animation-duration`).
