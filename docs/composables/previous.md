# usePrevious

A composable that tracks the previous value of a ref. Useful for diffing, dirty detection, undo logic, or "save changes" only when different.

## Basic Usage

```vue
<script setup>
import { usePrevious } from "@baklavue/composables";

const count = ref(0);
const previousCount = usePrevious(count);

watch(count, (newVal) => {
  console.log(`Was ${previousCount.value}, now ${newVal}`);
});
</script>
```

## Dirty Detection

```vue
<script setup>
import { computed } from "vue";
import { usePrevious } from "@baklavue/composables";

const formData = ref({ name: "" });
const initial = usePrevious(formData);

const isDirty = computed(() =>
  JSON.stringify(formData.value) !== JSON.stringify(initial.value),
);
</script>
```

## API

### Arguments

| Argument | Type | Description |
| --- | --- | --- |
| `value` | `Ref<T>` | Ref to track |

### Return Value

| Property | Type | Description |
| --- | --- | --- |
| (return) | `Ref<T \| undefined>` | Ref holding the previous value (undefined on first render) |

## TypeScript Support

```typescript
import { usePrevious } from "@baklavue/composables";

const count = ref(0);
const previous = usePrevious(count);
// previous: Ref<number | undefined>
```
