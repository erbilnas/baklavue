# Button

A Vue wrapper for Baklava's `bl-button` component with enhanced features and full TypeScript support.

## Basic Button

Use the Button component with the `variant` prop for different styles.

<div class="component-demo">

<BvButton variant="primary">Click me</BvButton>

</div>

```vue
<template>
  <BvButton variant="primary" @click="handleClick">Click me</BvButton>
</template>

<script setup>
import { BvButton } from "@baklavue/ui";

const handleClick = () => {
  console.log("Button clicked!");
};
</script>
```

## Variants

The Button component supports four variants: primary, secondary and tertiary

<div class="component-demo" style="display: flex; gap: 0.5rem; flex-wrap: wrap">

<BvButton variant="primary">Primary</BvButton>
<BvButton variant="secondary">Secondary</BvButton>
<BvButton variant="tertiary">Tertiary</BvButton>

</div>

```vue
<template>
  <BvButton variant="primary">Primary</BvButton>
  <BvButton variant="secondary">Secondary</BvButton>
  <BvButton variant="tertiary">Tertiary</BvButton>
</template>

<script setup>
import { BvButton } from "@baklavue/ui";
</script>
```

## Kinds

The Button component supports multiple kinds: default, neutral, success, danger, and custom (with color overrides).

<div class="component-demo" style="display: flex; gap: 0.5rem; flex-wrap: wrap">

<BvButton kind="default" variant="primary">Default</BvButton>
<BvButton kind="neutral" variant="primary">Neutral</BvButton>
<BvButton kind="success" variant="primary">Success</BvButton>
<BvButton kind="danger" variant="primary">Danger</BvButton>
<BvButton kind="custom" variant="primary" :custom-class="{ color: '#8b5cf6', highlightColor: '#7c3aed' }">Custom</BvButton>

</div>

```vue
<template>
  <BvButton kind="default" variant="primary">Default</BvButton>
  <BvButton kind="neutral" variant="primary">Neutral</BvButton>
  <BvButton kind="success" variant="primary">Success</BvButton>
  <BvButton kind="danger" variant="primary">Danger</BvButton>
  <BvButton kind="custom" variant="primary" :custom-class="{ color: '#8b5cf6', highlightColor: '#7c3aed' }">Custom</BvButton>
</template>

<script setup>
import { BvButton } from "@baklavue/ui";
</script>
```

## Sizes

The Button component supports three sizes: small, medium, and large.

<div class="component-demo" style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center">

<BvButton size="small">Small</BvButton>
<BvButton size="medium">Medium</BvButton>
<BvButton size="large">Large</BvButton>

</div>

```vue
<template>
  <BvButton size="small">Small</BvButton>
  <BvButton size="medium">Medium</BvButton>
  <BvButton size="large">Large</BvButton>
</template>

<script setup>
import { BvButton } from "@baklavue/ui";
</script>
```

## Loading State

Use the `loading` prop to show a loading indicator. Bind it to your async submit handler.

<div class="component-demo">

<LoadingButtonDemo />

</div>

```vue
<template>
  <BvButton :loading="isLoading" @click="handleClick">Submit</BvButton>
</template>

<script setup>
import { ref } from "vue";
import { BvButton } from "@baklavue/ui";

const isLoading = ref(false);

const handleClick = async () => {
  isLoading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 2000));
  isLoading.value = false;
};
</script>
```

## Disabled State

Use the `disabled` prop to prevent user interaction.

<div class="component-demo">

<BvButton :disabled="true">Disabled Button</BvButton>

</div>

```vue
<template>
  <BvButton :disabled="true">Disabled Button</BvButton>
</template>

<script setup>
import { BvButton } from "@baklavue/ui";
</script>
```

## Link Button

Provide an `href` prop to render the button as a link (anchor tag).

<div class="component-demo">

<BvButton href="/about" variant="primary">Go to About</BvButton>

</div>

```vue
<template>
  <BvButton href="/about" variant="primary">Go to About</BvButton>
</template>

<script setup>
import { BvButton } from "@baklavue/ui";
</script>
```

## With Icon

Add an icon using the `icon` prop. Use a valid icon name from Baklava icons.

<div class="component-demo">

<BvButton icon="info">Icon</BvButton>

</div>

```vue
<template>
  <BvButton icon="info">Icon</BvButton>
</template>

<script setup>
import { BvButton } from "@baklavue/ui";
</script>
```

## Props

| Prop           | Type            | Default     | Description                                         |
| -------------- | --------------- | ----------- | --------------------------------------------------- |
| `variant`      | `ButtonVariant` | `'primary'` | Button style variant (primary, secondary, tertiary) |
| `kind`         | `ButtonKind`    | `'default'` | Button kind (default, neutral, success, danger, custom) |
| `size`         | `ButtonSize`    | `'medium'`  | Button size (small, medium, large)                  |
| `label`        | `string`        | `undefined` | Button label text                                   |
| `loadingLabel` | `string`        | `'...'`     | Label shown during loading state                    |
| `loading`      | `boolean`       | `undefined` | Loading state                                       |
| `disabled`     | `boolean`       | `undefined` | Disabled state                                      |
| `href`         | `string`        | `undefined` | Link URL (renders as anchor tag)                    |
| `target`       | `TargetType`    | `undefined` | Link target attribute                               |
| `icon`         | `BaklavaIcon`   | `undefined` | Icon name from Baklava icons                        |
| `type`         | `string`        | `'button'`  | Button type (button, submit, reset)                 |
| `autofocus`    | `boolean`       | `undefined` | Autofocus attribute                                 |
| `customClass`  | `CustomClass`   | `undefined` | Custom color overrides for custom kind              |

## Events

| Event   | Payload                   | Description                    |
| ------- | ------------------------- | ------------------------------ |
| `click` | `CustomEvent<MouseEvent>` | Emitted when button is clicked |

## Slots

| Slot      | Props | Description                                         |
| --------- | ----- | --------------------------------------------------- |
| `default` | -     | Button content (overrides `label` prop if provided) |

## Types

```typescript
import type { ButtonProps } from "@baklavue/ui";

// ButtonVariant: "primary" | "secondary" | "tertiary"
// ButtonKind: "default" | "neutral" | "success" | "danger" | "custom"
// ButtonSize: "small" | "medium" | "large"

interface ButtonProps {
  variant?: ButtonVariant;
  kind?: ButtonKind;
  size?: ButtonSize;
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

Combine with form inputs and use `type="submit"` with loading state for async form submission.

<div class="component-demo">

<FormSubmitButtonDemo />

</div>

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <BvInput v-model="email" label="Email" />
    <BvButton type="submit" :loading="isSubmitting">Submit</BvButton>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { BvButton, BvInput } from "@baklavue/ui";

const email = ref("");
const isSubmitting = ref(false);

const handleSubmit = async () => {
  isSubmitting.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  isSubmitting.value = false;
};
</script>
```

### Button Group

Group related buttons together with flex layout.

<div class="component-demo" style="display: flex; gap: 0.5rem">

<BvButton variant="primary">Save</BvButton>
<BvButton variant="secondary">Cancel</BvButton>
<BvButton variant="tertiary">Delete</BvButton>

</div>

```vue
<template>
  <div style="display: flex; gap: 0.5rem">
    <BvButton variant="primary">Save</BvButton>
    <BvButton variant="secondary">Cancel</BvButton>
    <BvButton variant="tertiary">Delete</BvButton>
  </div>
</template>

<script setup>
import { BvButton } from "@baklavue/ui";
</script>
```

## Usage Notes

- **Label vs Default Slot**: Use the `label` prop for simple text buttons. Use the `#default` slot when you need custom content (e.g. icons, formatted text, or multiple elements).

- **Loading State**: Set `loading` to `true` during async operations. The button shows a spinner and is non-clickable while loading. Use `loadingLabel` to customize the accessibility text.

- **Link vs Button**: When `href` is provided, the component renders an `<a>` tag instead of `<button>`. Use `target` for external links (e.g. `_blank`).

- **Accessibility**: The component follows Baklava's accessibility guidelines and includes proper ARIA attributes for screen readers.

- **Styling**: The component uses Baklava's default styling. Custom colors can be applied through the `customClass` prop when using `kind="custom"`, or by overriding component styles.
