# Button

A Vue wrapper for Baklava's `bl-button` component with enhanced features and full TypeScript support.

## Basic Usage

```vue
<template>
  <Button variant="primary" @click="handleClick"> Click me </Button>
</template>

<script setup>
import { Button } from "@baklavue/ui";

const handleClick = () => {
  console.log("Button clicked!");
};
</script>
```

## Variants

```vue
<template>
  <Button variant="primary">Primary</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="tertiary">Tertiary</Button>
  <Button variant="danger">Danger</Button>
</template>

<script setup>
import { Button } from "@baklavue/ui";
</script>
```

## Sizes

```vue
<template>
  <Button size="small">Small</Button>
  <Button size="medium">Medium</Button>
  <Button size="large">Large</Button>
</template>

<script setup>
import { Button } from "@baklavue/ui";
</script>
```

## States

### Loading State

```vue
<template>
  <Button :loading="isLoading" @click="handleClick"> Submit </Button>
</template>

<script setup>
import { ref } from "vue";
import { Button } from "@baklavue/ui";

const isLoading = ref(false);

const handleClick = async () => {
  isLoading.value = true;
  // Simulate async operation
  await new Promise((resolve) => setTimeout(resolve, 2000));
  isLoading.value = false;
};
</script>
```

### Disabled State

```vue
<template>
  <Button :disabled="isDisabled">Disabled Button</Button>
</template>

<script setup>
import { ref } from "vue";
import { Button } from "@baklavue/ui";

const isDisabled = ref(true);
</script>
```

## Link Button

```vue
<template>
  <Button href="/about" variant="primary"> Go to About </Button>
</template>

<script setup>
import { Button } from "@baklavue/ui";
</script>
```

## With Icon

```vue
<template>
  <Button icon="trash" variant="danger"> Delete </Button>
</template>

<script setup>
import { Button } from "@baklavue/ui";
</script>
```

## Props

| Prop           | Type            | Default     | Description                                                 |
| -------------- | --------------- | ----------- | ----------------------------------------------------------- |
| `variant`      | `ButtonVariant` | `'primary'` | Button style variant (primary, secondary, tertiary, danger) |
| `kind`         | `ButtonKind`    | `'default'` | Button type (default, custom)                               |
| `size`         | `ButtonSize`    | `'medium'`  | Button size (small, medium, large)                          |
| `label`        | `string`        | `undefined` | Button label text                                           |
| `loadingLabel` | `string`        | `'...'`     | Label shown during loading state                            |
| `loading`      | `boolean`       | `undefined` | Loading state                                               |
| `disabled`     | `boolean`       | `undefined` | Disabled state                                              |
| `href`         | `string`        | `undefined` | Link URL (renders as anchor tag)                            |
| `target`       | `TargetType`    | `undefined` | Link target attribute                                       |
| `icon`         | `BaklavaIcon`   | `undefined` | Icon name from Baklava icons                                |
| `type`         | `string`        | `'button'`  | Button type (button, submit, reset)                         |
| `autofocus`    | `boolean`       | `undefined` | Autofocus attribute                                         |
| `customClass`  | `CustomClass`   | `undefined` | Custom color overrides for custom kind                      |

## Events

| Event   | Payload                   | Description                    |
| ------- | ------------------------- | ------------------------------ |
| `click` | `CustomEvent<MouseEvent>` | Emitted when button is clicked |

## Slots

| Slot      | Description                                         |
| --------- | --------------------------------------------------- |
| `default` | Button content (overrides `label` prop if provided) |

## Types

```typescript
import type { ButtonProps } from "@baklavue/ui";

interface ButtonProps {
  variant?: "primary" | "secondary" | "tertiary" | "danger";
  kind?: "default" | "custom";
  size?: "small" | "medium" | "large";
  label?: string;
  loadingLabel?: string;
  loading?: boolean;
  disabled?: boolean;
  href?: string;
  target?: "_self" | "_blank" | "_parent" | "_top";
  icon?: string;
  type?: "button" | "submit" | "reset";
  autofocus?: boolean;
  customClass?: {
    color?: string;
    highlightColor?: string;
  };
}
```

## Examples

### Form Submit Button

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <Input v-model="email" label="Email" />
    <Button type="submit" :loading="isSubmitting"> Submit </Button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { Button, Input } from "@baklavue/ui";

const email = ref("");
const isSubmitting = ref(false);

const handleSubmit = async () => {
  isSubmitting.value = true;
  // Submit form
  await new Promise((resolve) => setTimeout(resolve, 1000));
  isSubmitting.value = false;
};
</script>
```

### Button Group

```vue
<template>
  <div style="display: flex; gap: 0.5rem;">
    <Button variant="primary">Save</Button>
    <Button variant="secondary">Cancel</Button>
    <Button variant="danger">Delete</Button>
  </div>
</template>

<script setup>
import { Button } from "@baklavue/ui";
</script>
```
