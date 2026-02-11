<script setup>
import { BvSelect } from "@baklavue/ui";
import { ref } from "vue";

const small = ref("");
const medium = ref("");
const large = ref("");
const options = [
  { value: "a", label: "Option A" },
  { value: "b", label: "Option B" },
  { value: "c", label: "Option C" },
];
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px;">
    <BvSelect v-model="small" size="small" label="Small" :options="options" placeholder="Select" />
    <BvSelect v-model="medium" size="medium" label="Medium" :options="options" placeholder="Select" />
    <BvSelect v-model="large" size="large" label="Large" :options="options" placeholder="Select" />
  </div>
</template>
