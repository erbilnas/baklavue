# File Upload

A custom file upload component with drag-and-drop zone, click-to-browse, file list with remove, validation (size/type), and optional preview. Uses Baklava design tokens for consistent styling.

## Basic Usage

Use `v-model` to bind the selected file(s). Single file mode by default.

<div class="component-demo">

<FileUploadBasicDemo />

</div>

```vue
<template>
  <BvFileUpload
    v-model="file"
    label="Upload document"
    help-text="Single file, any type"
  />
</template>

<script setup>
import { ref } from "vue";
import { BvFileUpload } from "@baklavue/ui";

const file = ref(null);
</script>
```

## Multiple Files

Set `multiple` to allow selecting multiple files.

<div class="component-demo">

<FileUploadMultipleDemo />

</div>

```vue
<template>
  <BvFileUpload
    v-model="files"
    multiple
    label="Upload multiple files"
    help-text="Drag and drop or click to browse"
  />
</template>

<script setup>
import { ref } from "vue";
import { BvFileUpload } from "@baklavue/ui";

const files = ref([]);
</script>
```

## Validation

Use `accept`, `maxSize`, `minSize`, and `maxFiles` for validation. Listen to the `invalid` event to display custom error messages.

<div class="component-demo">

<FileUploadValidationDemo />

</div>

```vue
<template>
  <BvFileUpload
    v-model="files"
    multiple
    accept="image/*"
    :max-size="500 * 1024"
    :max-files="3"
    label="Images only (max 500 KB, 3 files)"
    :invalid-text="invalidText"
    @invalid="handleInvalid"
    @change="handleChange"
  />
</template>

<script setup>
import { ref } from "vue";
import { BvFileUpload } from "@baklavue/ui";
import type { FileUploadInvalidEntry } from "@baklavue/ui";

const files = ref([]);
const invalidText = ref("");
const MAX_SIZE = 500 * 1024; // 500 KB

const handleInvalid = (entries: FileUploadInvalidEntry[]) => {
  const reasons = entries.map((e) => {
    if (e.reason === "type") return `${e.file.name}: invalid type`;
    if (e.reason === "size") return `${e.file.name}: max ${MAX_SIZE / 1024} KB`;
    return `${e.file.name}: max 3 files`;
  });
  invalidText.value = reasons.join(". ");
};

const handleChange = () => {
  invalidText.value = "";
};
</script>
```

## Preview

Enable `showPreview` to display image thumbnails for uploaded image files.

<div class="component-demo">

<FileUploadPreviewDemo />

</div>

```vue
<template>
  <BvFileUpload
    v-model="files"
    multiple
    accept="image/*"
    show-preview
    label="Upload images with preview"
    help-text="Accepts images only"
  />
</template>

<script setup>
import { ref } from "vue";
import { BvFileUpload } from "@baklavue/ui";

const files = ref([]);
</script>
```

## Disabled

Use the `disabled` prop to prevent user interaction.

<div class="component-demo">

<FileUploadDisabledDemo />

</div>

```vue
<template>
  <BvFileUpload
    v-model="file"
    label="Disabled"
    disabled
    help-text="Upload is disabled"
  />
</template>

<script setup>
import { ref } from "vue";
import { BvFileUpload } from "@baklavue/ui";

const file = ref(null);
</script>
```

## Custom Hint Slot

Use the `#hint` slot to customize the text displayed in the drop zone.

<div class="component-demo">

<FileUploadSlotDemo />

</div>

```vue
<template>
  <BvFileUpload v-model="file" label="Upload with custom hint">
    <template #hint>
      Drop your file here or <strong>click to browse</strong>
    </template>
  </BvFileUpload>
</template>

<script setup>
import { ref } from "vue";
import { BvFileUpload } from "@baklavue/ui";

const file = ref(null);
</script>
```

## Props

| Prop          | Type                             | Default     | Description                                                |
| ------------- | -------------------------------- | ----------- | ---------------------------------------------------------- |
| `modelValue`  | `File \| File[] \| null`         | `undefined` | Bound files (v-model)                                      |
| `multiple`    | `boolean`                        | `false`     | Allow multiple files                                       |
| `accept`      | `string`                         | `undefined` | Accepted MIME types or extensions (e.g. `image/*`, `.pdf`) |
| `maxSize`     | `number`                         | `undefined` | Max file size in bytes                                     |
| `minSize`     | `number`                         | `undefined` | Min file size in bytes                                     |
| `maxFiles`    | `number`                         | `undefined` | Max file count when multiple                               |
| `disabled`    | `boolean`                        | `false`     | Disabled state                                             |
| `label`       | `string`                         | `undefined` | Label for the upload area                                  |
| `helpText`    | `string`                         | `undefined` | Helper text below the area                                 |
| `invalidText` | `string`                         | `undefined` | Error message when validation fails                        |
| `showPreview` | `boolean`                        | `false`     | Show image previews for image files                        |
| `size`        | `"small" \| "medium" \| "large"` | `"medium"`  | Drop zone size                                             |

## Events

| Event               | Payload                    | Description                          |
| ------------------- | -------------------------- | ------------------------------------ |
| `update:modelValue` | `File \| File[] \| null`   | Emitted when files change (v-model)  |
| `invalid`           | `FileUploadInvalidEntry[]` | Emitted when validation fails        |
| `change`            | `File[]`                   | Emitted when files are added/removed |

## Slots

| Slot   | Description                                       |
| ------ | ------------------------------------------------- |
| `hint` | Custom hint text (like "Drag and drop or browse") |

## Types

```typescript
import type {
  FileUploadProps,
  FileUploadInvalidEntry,
  FileUploadInvalidReason,
} from "@baklavue/ui";

interface FileUploadInvalidEntry {
  file: File;
  reason: "type" | "size" | "count";
}
```

## Usage Notes

- **Drag and drop**: The drop zone supports both click-to-browse and drag-and-drop. The `accept` attribute filters the native file picker; drag-and-drop files are validated in JavaScript.

- **Validation**: Client-side validation is for UX only. Always validate file types and sizes on the server.

- **Preview**: When `showPreview` is true, object URLs are created for image files. These are automatically revoked when files are removed or the component unmounts.

- **Accessibility**: The drop zone is keyboard-accessible via the hidden file input. Use a proper label for screen readers.
