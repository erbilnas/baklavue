# useBase64

A composable for converting Blob/File/ArrayBuffer/canvas/image to Base64 data URLs. Complements `useFile` for image preview before upload, avatar uploads, and thumbnails.

## Basic Usage

```vue
<template>
  <input type="file" accept="image/*" @change="handleFile" />
  <img v-if="base64" :src="base64" alt="Preview" />
</template>

<script setup>
import { ref } from "vue";
import { useBase64 } from "@baklavue/composables";

const file = ref<File | undefined>();
const { base64 } = useBase64(file);

const handleFile = (e: Event) => {
  file.value = (e.target as HTMLInputElement).files?.[0];
};
</script>
```

## With Canvas

```vue
<script setup>
import { useBase64 } from "@baklavue/composables";

const canvasRef = ref<HTMLCanvasElement>();
const { base64, execute } = useBase64(canvasRef, {
  type: "image/jpeg",
  quality: 0.8,
});

await execute();
</script>
```

## API

### Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `dataUrl` | `boolean` | `true` | Output as Data URL format (e.g. `data:image/png;base64,...`) |
| `type` | `string` | `"image/png"` | MIME type for canvas/image |
| `quality` | `number` | — | Image quality for jpeg or webp (0-1) |

### Return Value

| Property | Type | Description |
| --- | --- | --- |
| `base64` | `ShallowRef<string>` | Base64 string (or data URL when `dataUrl: true`) |
| `execute` | `() => Promise<string>` | Manually trigger conversion |
| `promise` | `ShallowRef<Promise<string>>` | Current conversion promise |

### Supported Sources

- `string` | `Blob` | `File` | `ArrayBuffer`
- `HTMLCanvasElement` | `HTMLImageElement`

## TypeScript Support

```typescript
import { useBase64, type UseBase64Options } from "@baklavue/composables";

const { base64 } = useBase64(fileRef);
const { base64: canvasBase64 } = useBase64(canvasRef, { type: "image/jpeg" });
```
