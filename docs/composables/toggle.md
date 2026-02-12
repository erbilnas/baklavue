# useToggle

A composable for a simple boolean toggle. Lighter than `useDisclosure` when you only need a toggle without open/close semantics. Use `useDisclosure` for Dialog, Drawer, Dropdown.

## Basic Usage

```vue
<template>
  <button @click="toggle">{{ value ? "Hide" : "Show" }}</button>
</template>

<script setup>
import { useToggle } from "@baklavue/composables";

const [value, toggle] = useToggle(false);
</script>
```

## Set Explicitly

```vue
<script setup>
import { useToggle } from "@baklavue/composables";

const [darkMode, setDarkMode] = useToggle(true);

setDarkMode(false); // set explicitly
setDarkMode(true);
</script>
```

## API

### Arguments

| Argument | Type | Default | Description |
| --- | --- | --- | --- |
| `initial` | `boolean` | `false` | Initial boolean value |

### Return Value

| Property | Type | Description |
| --- | --- | --- |
| `[0]` | `Ref<boolean>` | The boolean value |
| `[1]` | `(value?: boolean) => void` | Toggle function. Call with no args to flip, or with a boolean to set |

## TypeScript Support

```typescript
import { useToggle } from "@baklavue/composables";

const [value, toggle] = useToggle(false);
toggle(); // flips
toggle(true); // sets to true
```
