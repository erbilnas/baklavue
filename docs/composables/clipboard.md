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

## With Options

```vue
<template>
  <BvButton v-if="isSupported" @click="copy()">
    {{ copied ? "Copied!" : "Copy" }}
  </BvButton>
  <p v-else>Clipboard not supported</p>
</template>

<script setup>
import { BvButton } from "@baklavue/ui";
import { useClipboard } from "@baklavue/composables";

const link = ref("https://example.com/share");
const { copy, copied, isSupported } = useClipboard({
  source: link,
  copiedDuring: 1500,
  legacy: true,
});
</script>
```

## API

### Options

| Option         | Type               | Default | Description                                                                      |
| -------------- | ------------------ | ------- | -------------------------------------------------------------------------------- |
| `source`       | `MaybeRef<string>` | —       | Default text to copy when `copy()` is called without arguments                   |
| `copiedDuring` | `number`           | —       | Milliseconds before `copied` resets to `false`. Omit to disable auto-reset.      |
| `legacy`       | `boolean`          | `false` | Fallback to `document.execCommand` when Clipboard API is unavailable (e.g. HTTP) |

### Return Value

| Property      | Type                                  | Description                                                       |
| ------------- | ------------------------------------- | ----------------------------------------------------------------- |
| `copy`        | `(text?: string) => Promise<boolean>` | Copies text to clipboard. Uses `source` when called without args. |
| `copied`      | `Ref<boolean>`                        | True after successful copy                                        |
| `isSupported` | `ComputedRef<boolean>`                | Whether clipboard is available (native or legacy when enabled)    |

### Notes

- Uses `navigator.clipboard.writeText()` when available
- Returns `false` in environments without clipboard API (e.g. non-HTTPS) unless `legacy: true`
- `copied` resets to `false` on each `copy()` call; with `copiedDuring`, it auto-resets after the specified ms
- When `source` is provided, `copy()` can be called without arguments

## TypeScript Support

```typescript
import { useClipboard, type UseClipboardOptions } from "@baklavue/composables";

const { copy, copied, isSupported } = useClipboard();
const ok = await copy("hello");

const { copy: copyFromSource } = useClipboard({
  source: ref("default"),
  copiedDuring: 1500,
  legacy: true,
});
await copyFromSource(); // copies "default"
```
