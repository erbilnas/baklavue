<script setup>
import { BvRadio } from "@baklavue/ui";
import { ref } from "vue";

const choice = ref("yes");
const items = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "maybe", label: "Maybe (disabled)", disabled: true },
];
</script>

<template>
  <BvRadio v-model="choice" :items="items">
    <template #item="{ item }">{{ item.label }}</template>
  </BvRadio>
  <p v-if="choice" style="margin-top: 0.5rem; font-size: 0.875rem">
    Selected: {{ choice }}
  </p>
</template>
