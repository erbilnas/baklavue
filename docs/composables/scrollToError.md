# useScrollToError

A composable for scrolling to an element with validation error. Scrolls into view, optionally applies a highlight effect, focuses the first focusable control, and announces to screen readers.

## Basic Usage

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <div data-field="tags">
      <input v-model="tags" />
    </div>
    <button type="submit">Submit</button>
  </form>
</template>

<script setup lang="ts">
import { useScrollToError } from "@baklavue/composables";

const { scrollToError } = useScrollToError();

const handleSubmit = () => {
  const err = validationError.value;
  if (err) {
    scrollToError(err);
  }
};
</script>
```

### Direct Selector

```vue
<script setup lang="ts">
import { useScrollToError } from "@baklavue/composables";

const { scrollToError } = useScrollToError();

// Scroll to element by selector
scrollToError('[data-field="tags"]');
</script>
```

### With Validation Error Object

```vue
<script setup lang="ts">
import { useScrollToError } from "@baklavue/composables";

const { scrollToError } = useScrollToError();

// Validation error with scrollTarget
const validationError = {
  field: "tags",
  message: "Please select at least one option",
  scrollTarget: '[data-field="tags"]',
};

scrollToError(validationError);
</script>
```

## Methods

### scrollToError

Scrolls to the target element and optionally applies highlight and focus.

```typescript
scrollToError(target: ScrollToErrorTarget, options?: ScrollToErrorOptions): ScrollToErrorResult
```

Returns `{ success: boolean }` indicating whether the target was found and scrolled to.

## Target Types

Accepted by `scrollToError`:

- **CSS selector string** – e.g. `'[data-field="tags"]'`
- **HTMLElement** – direct element reference
- **Object with scrollTarget** – e.g. `{ scrollTarget: '[data-field="tags"]' }` for validation errors

## Options

### ScrollToErrorOptions

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `scrollBehavior` | `'smooth' \| 'auto' \| 'instant'` | `'smooth'` | Scroll behavior |
| `block` | `'start' \| 'center' \| 'end' \| 'nearest'` | `'center'` | Vertical scroll position |
| `shineClass` | `string` | `'error-shine'` | CSS class for highlight effect |
| `shineDuration` | `number` | `2500` | Duration in ms to keep the shine class. Use `0` to disable |
| `focus` | `boolean` | `true` | Whether to attempt focusing the first focusable element |
| `focusDelay` | `number` | `300` | Delay in ms before focus attempt |
| `scrollContainer` | `string \| HTMLElement \| null` | — | Scroll container for forms inside modals/drawers. When provided, scrolls this container instead of the viewport |
| `announce` | `boolean \| string` | `true` | Screen reader announcement. `true` = default message, `string` = custom message, `false` = no announcement |
| `scrollOffset` | `{ top?: number; left?: number }` | — | Offset in pixels for fixed headers (e.g. `{ top: 80 }`) |

### UseScrollToErrorOptions (composable-level)

When creating the composable, you can pass default options applied to every call:

```typescript
useScrollToError({
  defaultOptions: {
    scrollContainer: "[data-dialog-body]",
    shineClass: "my-app-error",
  },
});
```

Call-time options override these defaults.

## Examples

### With Custom Options

```vue
<script setup lang="ts">
import { useScrollToError } from "@baklavue/composables";

const { scrollToError } = useScrollToError();

scrollToError('[data-field="tags"]', {
  shineClass: "my-shine",
  shineDuration: 1500,
  focusDelay: 500,
});
</script>
```

### With Default Options (for modals)

```vue
<script setup lang="ts">
import { useScrollToError } from "@baklavue/composables";

const { scrollToError } = useScrollToError({
  defaultOptions: {
    scrollContainer: "[data-dialog-body]",
    announce: "Form has errors. Please fix the highlighted field.",
  },
});

scrollToError('[data-field="tags"]');
</script>
```

### Form in Modal with Scroll Container

```vue
<template>
  <BvDialog v-model:open="isOpen">
    <div data-dialog-body class="dialog-body">
      <form @submit.prevent="handleSubmit">
        <div data-field="email">
          <input v-model="email" />
        </div>
      </form>
    </div>
  </BvDialog>
</template>

<script setup lang="ts">
import { useScrollToError } from "@baklavue/composables";

const { scrollToError } = useScrollToError({
  defaultOptions: { scrollContainer: "[data-dialog-body]" },
});

const handleSubmit = () => {
  if (hasError) {
    scrollToError('[data-field="email"]');
  }
};
</script>
```

### With Fixed Header Offset

```vue
<script setup lang="ts">
import { useScrollToError } from "@baklavue/composables";

const { scrollToError } = useScrollToError();

scrollToError('[data-field="tags"]', {
  scrollOffset: { top: 80 },
});
</script>
```

### Without Shine Effect

```vue
<script setup lang="ts">
import { useScrollToError } from "@baklavue/composables";

const { scrollToError } = useScrollToError();

scrollToError('[data-field="tags"]', {
  shineDuration: 0,
});
</script>
```

### Without Focus

```vue
<script setup lang="ts">
import { useScrollToError } from "@baklavue/composables";

const { scrollToError } = useScrollToError();

scrollToError('[data-field="tags"]', {
  focus: false,
});
</script>
```

### Without Screen Reader Announcement

```vue
<script setup lang="ts">
import { useScrollToError } from "@baklavue/composables";

const { scrollToError } = useScrollToError();

scrollToError('[data-field="tags"]', {
  announce: false,
});
</script>
```

### Using Return Value

```vue
<script setup lang="ts">
import { useScrollToError } from "@baklavue/composables";

const { scrollToError } = useScrollToError();

const handleSubmit = () => {
  const result = scrollToError('[data-field="tags"]');
  if (!result.success) {
    console.warn("Could not scroll to error field");
  }
};
</script>
```

## CSS for Shine Effect

The composable uses `error-shine` by default. Define this class in your styles for the highlight effect:

```css
.error-shine {
  animation: error-shine 2.5s ease-in-out;
}

@keyframes error-shine {
  0%,
  100% {
    box-shadow: none;
  }
  50% {
    box-shadow: 0 0 0 2px var(--bl-color-danger);
  }
}
```

## TypeScript Support

```typescript
import {
  useScrollToError,
  type ScrollToErrorOptions,
  type ScrollToErrorResult,
  type ScrollToErrorTarget,
  type UseScrollToErrorOptions,
} from "@baklavue/composables";

const { scrollToError } = useScrollToError();

// scrollToError accepts string, HTMLElement, or { scrollTarget: string }
const result = scrollToError('[data-field="tags"]');
// result.success: boolean

scrollToError(document.getElementById("field"));
scrollToError({ scrollTarget: '[data-field="tags"]' });
```
