# Composables

BaklaVue provides Vue 3 composables to enhance your application functionality.

## Available Composables

- [useNotification](/composables/notification) - Programmatically manage notifications

## Usage Pattern

Composables follow Vue 3 Composition API patterns:

```vue
<script setup>
import { useNotification } from "@baklavue/composables";

const { success, error, warning, info } = useNotification();

// Use the composable methods
success({
  title: "Success!",
  message: "Operation completed",
});
</script>
```

## Importing Composables

```typescript
import { useNotification } from "@baklavue/composables";
```

## TypeScript Support

All composables are fully typed:

```typescript
import type { UseNotificationReturn } from "@baklavue/composables";
```

## Next Steps

- Explore individual composable documentation
- Check [API Reference](/api/reference) for detailed API
- See [Getting Started Guide](/guide/getting-started) for setup
