# useId

A composable for generating stable unique IDs for use with accessibility attributes such as `aria-describedby`, `aria-labelledby`, and form labels.

## Basic Usage

```vue
<template>
  <div>
    <label :for="inputId">Name</label>
    <input :id="inputId" type="text" />
  </div>
</template>

<script setup>
import { useId } from "@baklavue/composables";

const inputId = useId();
</script>
```

## Custom Prefix

```vue
<script setup>
import { useId } from "@baklavue/composables";

const dialogId = useId("dialog");
// dialogId.value = "dialog-1"
</script>
```

## API

### Return Value

Returns a `Ref<string>` — use `id.value` in script or `id` in template for the stable unique ID.

### Parameters

```typescript
useId(prefix?: string)
```

- `prefix` — Optional prefix for the ID. Default: `"bv"`

## TypeScript Support

```typescript
import { useId } from "@baklavue/composables";

const id = useId();
// id is Ref<string>
```
