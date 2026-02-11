<script setup>
import { BvCheckbox } from "@baklavue/ui";
import { ref } from "vue";

const selected = ref([]);
const items = [
  { value: "a", label: "Option A" },
  { value: "b", label: "Option B (disabled)", disabled: true },
];
</script>

<template>
  <BvCheckbox v-model="selected" :items="items">
    <template #item="{ item }">{{ item.label }}</template>
  </BvCheckbox>
  <p
    v-if="selected.length"
    style="color: black; margin-top: 0.5rem; font-size: 0.875rem"
  >
    Selected: {{ selected.join(", ") }}
  </p>
</template>
