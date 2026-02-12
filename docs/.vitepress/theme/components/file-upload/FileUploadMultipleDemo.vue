<script setup>
import { BvFileUpload } from "@baklavue/ui";
import { ref } from "vue";

const files = ref([]);
</script>

<template>
  <BvFileUpload
    v-model="files"
    multiple
    label="Upload multiple files"
    help-text="Drag and drop or click to browse"
  />

  <p v-if="files.length > 0" class="mt-3 text-sm text-neutral-600">
    {{ files.length }} file(s) selected
  </p>
</template>
