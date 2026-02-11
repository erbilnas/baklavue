<script setup>
import { BvInput } from "@baklavue/ui";
import { ref } from "vue";

const value = ref("Read-only value");
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px;">
    <BvInput v-model="value" label="Disabled" disabled />
    <BvInput v-model="value" label="Readonly" readonly />
  </div>
</template>
