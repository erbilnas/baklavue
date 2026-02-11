<script setup lang="ts">
/**
 * FileUpload Component
 *
 * A custom file upload component with drag-and-drop zone, click-to-browse,
 * file list with remove, validation (size/type), and optional preview.
 *
 * @component
 * @example
 * ```vue
 * <!-- Basic usage -->
 * <template>
 *   <BvFileUpload v-model="file" label="Upload document" />
 * </template>
 * ```
 *
 * @example
 * ```vue
 * <!-- Multiple with validation -->
 * <template>
 *   <BvFileUpload
 *     v-model="files"
 *     multiple
 *     accept="image/*"
 *     :max-size="1024 * 1024"
 *     @invalid="handleInvalid"
 *   />
 * </template>
 * ```
 */
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import BvIcon from "../icon/Icon.vue";
import BvTag from "../tag/Tag.vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import type {
  FileUploadInvalidEntry,
  FileUploadProps,
} from "./file-upload.types";

const props = withDefaults(defineProps<FileUploadProps>(), {
  modelValue: undefined,
  multiple: false,
  accept: undefined,
  maxSize: undefined,
  minSize: undefined,
  maxFiles: undefined,
  disabled: false,
  label: undefined,
  helpText: undefined,
  invalidText: undefined,
  showPreview: false,
  size: "medium",
});

const emit = defineEmits<{
  "update:modelValue": [value: File | File[] | null];
  invalid: [entries: FileUploadInvalidEntry[]];
  change: [files: File[]];
}>();

const inputRef = ref<HTMLInputElement | null>(null);
const isDragging = ref(false);
const previewUrls = ref<Map<File, string>>(new Map());

/** Normalize modelValue to File[] */
const filesList = computed<File[]>(() => {
  const v = props.modelValue;
  if (!v) return [];
  return Array.isArray(v) ? [...v] : [v];
});

/** Check if file passes accept filter */
function matchesAccept(file: File): boolean {
  if (!props.accept) return true;
  const rules = props.accept.split(",").map((r) => r.trim());
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";

  for (const rule of rules) {
    if (rule.startsWith(".")) {
      if (ext === rule.slice(1).toLowerCase()) return true;
    } else {
      const mime = file.type;
      if (rule.endsWith("/*")) {
        const base = rule.slice(0, -1);
        if (mime.startsWith(base)) return true;
      } else if (mime === rule) {
        return true;
      }
    }
  }
  return false;
}

/** Validate files and return invalid entries */
function validateFiles(
  incoming: File[],
  existingCount: number,
): FileUploadInvalidEntry[] {
  const invalid: FileUploadInvalidEntry[] = [];
  const maxFiles = props.maxFiles ?? Infinity;
  let validAdded = 0;

  for (const file of incoming) {
    if (!matchesAccept(file)) {
      invalid.push({ file, reason: "type" });
      continue;
    }
    if (props.maxSize !== undefined && file.size > props.maxSize) {
      invalid.push({ file, reason: "size" });
      continue;
    }
    if (props.minSize !== undefined && file.size < props.minSize) {
      invalid.push({ file, reason: "size" });
      continue;
    }
    if (props.multiple && existingCount + validAdded >= maxFiles) {
      invalid.push({ file, reason: "count" });
      continue;
    }
    validAdded++;
  }

  return invalid;
}

/** Process and emit validated files */
function processFiles(newFiles: File[]) {
  const valid: File[] = [];
  const invalid = validateFiles(newFiles, filesList.value.length);

  for (const f of newFiles) {
    const entry = invalid.find((e) => e.file === f);
    if (!entry) valid.push(f);
  }

  if (invalid.length > 0) {
    emit("invalid", invalid);
  }

  if (valid.length > 0) {
    const combined = props.multiple
      ? [...filesList.value, ...valid]
      : [valid[0]];
    const out = props.multiple ? combined : combined[0];
    emit("update:modelValue", out);
    emit("change", combined);
  }
}

function handleInputChange(e: Event) {
  const input = e.target as HTMLInputElement;
  const files = input.files ? Array.from(input.files) : [];
  processFiles(files);
  input.value = "";
}

function handleDrop(e: DragEvent) {
  e.preventDefault();
  isDragging.value = false;
  if (props.disabled) return;
  const files = e.dataTransfer?.files ? Array.from(e.dataTransfer.files) : [];
  processFiles(files);
}

function handleDragOver(e: DragEvent) {
  e.preventDefault();
  e.stopPropagation();
  if (props.disabled) return;
  isDragging.value = true;
}

function handleDragLeave() {
  isDragging.value = false;
}

function openFilePicker() {
  if (props.disabled) return;
  inputRef.value?.click();
}

function removeFile(index: number) {
  const list = [...filesList.value];
  const removed = list[index];
  list.splice(index, 1);
  if (props.showPreview && removed && removed.type.startsWith("image/")) {
    const url = previewUrls.value.get(removed);
    if (url) URL.revokeObjectURL(url);
    previewUrls.value.delete(removed);
  }
  const out = props.multiple ? list : (list[0] ?? null);
  emit("update:modelValue", out);
  emit("change", list);
}

function getPreviewUrl(file: File): string {
  if (!file.type.startsWith("image/")) return "";
  let url = previewUrls.value.get(file);
  if (!url) {
    url = URL.createObjectURL(file);
    previewUrls.value.set(file, url);
  }
  return url;
}

watch(
  filesList,
  (files) => {
    const toRevoke = new Set(previewUrls.value.keys());
    for (const f of files) {
      toRevoke.delete(f);
    }
    for (const f of toRevoke) {
      const url = previewUrls.value.get(f);
      if (url) URL.revokeObjectURL(url);
      previewUrls.value.delete(f);
    }
  },
  { deep: true },
);

onMounted(() => {
  loadBaklavaResources();
});

onBeforeUnmount(() => {
  for (const url of previewUrls.value.values()) {
    URL.revokeObjectURL(url);
  }
  previewUrls.value.clear();
});

const zoneSizeClass = computed(() => `file-upload-zone--${props.size}`);
const hasError = computed(() => !!props.invalidText);
</script>

<template>
  <div class="file-upload">
    <label v-if="label" class="file-upload-label">{{ label }}</label>

    <div
      class="file-upload-zone"
      :class="[
        zoneSizeClass,
        {
          'file-upload-zone--dragging': isDragging,
          'file-upload-zone--disabled': disabled,
          'file-upload-zone--invalid': hasError,
        },
      ]"
      @click="openFilePicker"
      @drop="handleDrop"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
    >
      <input
        ref="inputRef"
        type="file"
        class="file-upload-input"
        :accept="accept"
        :multiple="multiple"
        :disabled="disabled"
        @change="handleInputChange"
      />
      <div class="file-upload-content">
        <BvIcon name="upload" size="24px" class="file-upload-icon" />
        <span class="file-upload-text">
          <slot name="hint"> </slot>
        </span>
      </div>
    </div>

    <p v-if="helpText && !hasError" class="file-upload-help">{{ helpText }}</p>
    <p v-if="invalidText" class="file-upload-invalid">{{ invalidText }}</p>

    <div v-if="filesList.length > 0" class="file-upload-list">
      <div
        v-for="(file, index) in filesList"
        :key="`${file.name}-${file.size}-${index}`"
        class="file-upload-item"
      >
        <div
          v-if="showPreview && file.type.startsWith('image/')"
          class="file-upload-preview"
        >
          <img
            :src="getPreviewUrl(file)"
            :alt="file.name"
            class="file-upload-thumb"
          />
        </div>
        <BvTag
          closable
          size="small"
          class="file-upload-tag"
          @close="removeFile(index)"
        >
          {{ file.name }} ({{ (file.size / 1024).toFixed(1) }} KB)
        </BvTag>
      </div>
    </div>
  </div>
</template>

<style scoped>
.file-upload {
  display: flex;
  flex-direction: column;
  gap: var(--bl-spacing-2, 0.5rem);
}

.file-upload-label {
  font: var(--bl-font-body-2-medium, 0.875rem 500);
  color: var(--bl-color-neutral-darker, #374151);
}

.file-upload-zone {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed var(--bl-color-neutral-light, #e5e7eb);
  border-radius: var(--bl-radius-m, 8px);
  background: var(--bl-color-neutral-background, #f9fafb);
  cursor: pointer;
  transition:
    border-color 0.2s,
    background 0.2s;
}

.file-upload-zone:hover:not(.file-upload-zone--disabled) {
  border-color: var(--bl-color-primary, #ff6000);
  background: var(--bl-color-primary-background, #fff5f0);
}

.file-upload-zone--dragging {
  border-color: var(--bl-color-primary, #ff6000);
  background: var(--bl-color-primary-background, #fff5f0);
}

.file-upload-zone--disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.file-upload-zone--invalid {
  border-color: var(--bl-color-danger, #dc2626);
}

.file-upload-zone--small {
  min-height: 80px;
  padding: var(--bl-spacing-3, 0.75rem);
}

.file-upload-zone--medium {
  min-height: 120px;
  padding: var(--bl-spacing-4, 1rem);
}

.file-upload-zone--large {
  min-height: 160px;
  padding: var(--bl-spacing-5, 1.25rem);
}

.file-upload-input {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  overflow: hidden;
  pointer-events: none;
}

.file-upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--bl-spacing-2, 0.5rem);
}

.file-upload-icon {
  color: var(--bl-color-neutral-subtle, #9ca3af);
}

.file-upload-text {
  font: var(--bl-font-body-2-regular, 0.875rem 400);
  color: var(--bl-color-neutral-subtle, #6b7280);
}

.file-upload-browse {
  color: var(--bl-color-primary, #ff6000);
  text-decoration: underline;
}

.file-upload-help,
.file-upload-invalid {
  font: var(--bl-font-body-3-regular, 0.75rem 400);
  margin: 0;
}

.file-upload-help {
  color: var(--bl-color-neutral-subtle, #6b7280);
}

.file-upload-invalid {
  color: var(--bl-color-danger, #dc2626);
}

.file-upload-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--bl-spacing-2, 0.5rem);
}

.file-upload-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--bl-spacing-1, 0.25rem);
}

.file-upload-preview {
  width: 48px;
  height: 48px;
  border-radius: var(--bl-radius-s, 4px);
  overflow: hidden;
  background: var(--bl-color-neutral-light, #e5e7eb);
}

.file-upload-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.file-upload-tag {
  max-width: 240px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
