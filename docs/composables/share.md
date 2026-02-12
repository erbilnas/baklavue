# useShare

A composable for the Web Share API. Share text, URLs, or files via native share sheet (mobile) or fallback. Pairs with `useClipboard` when share is unavailable.

## Basic Usage

```vue
<template>
  <BvButton v-if="isSupported" @click="handleShare">Share</BvButton>
</template>

<script setup>
import { BvButton } from "@baklavue/ui";
import { useShare, useNotification } from "@baklavue/composables";

const { share, isSupported } = useShare();
const { success } = useNotification();

const handleShare = async () => {
  const ok = await share({ title: "Report", url: "https://example.com/report" });
  if (ok) success({ description: "Shared!" });
};
</script>
```

## With Default Data

```vue
<script setup>
import { useShare, useNotification } from "@baklavue/composables";

const { success } = useNotification();
const { share, isSupported } = useShare({
  data: { title: "Check this out", url: window.location.href },
  onSuccess: () => success({ description: "Shared!" }),
});

await share(); // uses default data
</script>
```

## API

### Options

| Option | Type | Description |
| --- | --- | --- |
| `data` | `ShareData` | Default data to share when `share()` is called without arguments |
| `onSuccess` | `() => void` | Callback when share succeeds |
| `onError` | `(error?: Error) => void` | Callback when share fails or is aborted |

### ShareData

| Property | Type | Description |
| --- | --- | --- |
| `title` | `string` | Title of the shared content |
| `text` | `string` | Text to share |
| `url` | `string` | URL to share |
| `files` | `File[]` | Files to share (when supported) |

### Return Value

| Property | Type | Description |
| --- | --- | --- |
| `share` | `(data?: ShareData) => Promise<boolean>` | Share data. Uses default when called without args. |
| `isSupported` | `ComputedRef<boolean>` | Whether Web Share API is available |
| `canShare` | `ComputedRef<boolean>` | Whether the current data can be shared |
| `shared` | `Ref<boolean>` | True after successful share |
| `error` | `Ref<Error \| null>` | Last error if share failed |

## TypeScript Support

```typescript
import { useShare, type ShareData, type UseShareOptions } from "@baklavue/composables";

const { share, isSupported } = useShare();
await share({ title: "Report", url: "https://example.com" });
```
