# useScrollToError

A composable for scrolling to an element with validation error. Scrolls into view, optionally applies a highlight effect, and focuses the first focusable control.

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
scrollToError(target: ScrollToErrorTarget, options?: ScrollToErrorOptions): void
```

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
  type ScrollToErrorTarget,
} from "@baklavue/composables";

const { scrollToError } = useScrollToError();

// scrollToError accepts string, HTMLElement, or { scrollTarget: string }
scrollToError('[data-field="tags"]');
scrollToError(document.getElementById("field"));
scrollToError({ scrollTarget: '[data-field="tags"]' });
```
