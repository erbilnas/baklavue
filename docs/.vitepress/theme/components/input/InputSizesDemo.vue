<script setup>
import { BvInput } from "@baklavue/ui";
import { ref } from "vue";

const small = ref("");
const medium = ref("");
const large = ref("");
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px;">
    <BvInput v-model="small" size="small" label="Small" />
    <BvInput v-model="medium" size="medium" label="Medium" />
    <BvInput v-model="large" size="large" label="Large" />
  </div>
</template>
