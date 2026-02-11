# useAlert

A composable for programmatic show/hide of inline BvAlert. Use with `v-if="isVisible"` or `:closed="!isVisible"` on BvAlert.

## Basic Usage

```vue
<template>
  <div>
    <BvButton @click="showSuccess">Show success</BvButton>
    <BvAlert
      v-if="isVisible"
      :variant="variant"
      :caption="caption"
      :description="description"
      :closable="closable"
      @close="hide"
    />
  </div>
</template>

<script setup>
import { BvButton, BvAlert } from "@baklavue/ui";
import { useAlert } from "@baklavue/composables";

const { isVisible, variant, caption, description, closable, show, hide } = useAlert();

const showSuccess = () => {
  show({
    variant: "success",
    caption: "Saved",
    description: "Your changes have been saved.",
    closable: true,
  });
};
</script>
```

## With Closable

```vue
<script setup>
import { useAlert } from "@baklavue/composables";

const { isVisible, variant, caption, description, closable, show, hide } = useAlert();

show({
  variant: "warning",
  description: "Please fix the errors before submitting.",
  closable: true,
});
</script>
```

## API

### Return Value

| Property | Type | Description |
| --- | --- | --- |
| `isVisible` | `Ref<boolean>` | Whether alert is visible |
| `variant` | `Ref<AlertVariant>` | info, success, warning, danger |
| `caption` | `Ref<string>` | Alert title |
| `description` | `Ref<string>` | Alert message |
| `closable` | `Ref<boolean>` | Whether close button is shown |
| `show` | `(options?) => void` | Show alert with options |
| `hide` | `() => void` | Hide alert |

### Options

```typescript
interface UseAlertOptions {
  variant?: "info" | "success" | "warning" | "danger";
  caption?: string;
  description?: string;
  closable?: boolean;
}
```

## TypeScript Support

```typescript
import { useAlert, type UseAlertOptions, type AlertVariant } from "@baklavue/composables";

const { show } = useAlert();
show({ variant: "success", description: "Done!" });
```
