<script setup>
import { BvFileUpload } from "@baklavue/ui";
import { ref } from "vue";

const file = ref(null);
</script>

<template>
  <BvFileUpload v-model="file" label="Upload document" help-text="Single file, any type" />

  <p v-if="file" class="mt-3 text-sm text-neutral-600">
    Selected: {{ file.name }} ({{ (file.size / 1024).toFixed(1) }} KB)
  </p>
</template>
