<script setup lang="ts">
import { BvFileUpload } from "@baklavue/ui";
import { ref } from "vue";
import type { FileUploadInvalidEntry } from "@baklavue/ui";

const files = ref<File[]>([]);
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

<template>
  <BvFileUpload
    v-model="files"
    multiple
    accept="image/*"
    :max-size="MAX_SIZE"
    :max-files="3"
    label="Images only (max 500 KB, 3 files)"
    :invalid-text="invalidText"
    @invalid="handleInvalid"
    @change="handleChange"
  />
</template>
