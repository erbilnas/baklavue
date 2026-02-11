<script setup>
import { BvFileUpload } from "@baklavue/ui";
import { ref } from "vue";

const files = ref([]);
</script>

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
