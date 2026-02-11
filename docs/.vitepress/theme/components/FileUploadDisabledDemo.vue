<script setup>
import { BvFileUpload } from "@baklavue/ui";
import { ref } from "vue";

const file = ref(null);
</script>

<template>
  <BvFileUpload v-model="file" label="Disabled" disabled help-text="Upload is disabled" />
</template>
