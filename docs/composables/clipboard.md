# useClipboard

A composable for copying text to the clipboard. Integrates well with `useNotification` for copy feedback.

## Basic Usage

```vue
<template>
  <BvButton @click="handleCopy">Copy token</BvButton>
</template>

<script setup>
import { BvButton } from "@baklavue/ui";
import { useClipboard, useNotification } from "@baklavue/composables";

const { copy, copied } = useClipboard();
const { success } = useNotification();

const handleCopy = async () => {
  const ok = await copy("secret-token-123");
  if (ok) {
    success({ description: "Copied to clipboard!" });
  }
};
</script>
```

## With Copied State

```vue
<template>
  <BvButton @click="copy(text)">
    {{ copied ? "Copied!" : "Copy" }}
  </BvButton>
</template>

<script setup>
import { BvButton } from "@baklavue/ui";
import { useClipboard } from "@baklavue/composables";

const text = ref("https://example.com/link");
const { copy, copied } = useClipboard();
</script>
```

## API

### Return Value

| Property | Type | Description |
| --- | --- | --- |
| `copy` | `(text: string) => Promise<boolean>` | Copies text to clipboard |
| `copied` | `Ref<boolean>` | True after successful copy |

### Notes

- Uses `navigator.clipboard.writeText()` when available
- Returns `false` in environments without clipboard API (e.g. non-HTTPS)
- `copied` resets to `false` on each `copy()` call

## TypeScript Support

```typescript
import { useClipboard } from "@baklavue/composables";

const { copy, copied } = useClipboard();
const ok = await copy("hello");
```
