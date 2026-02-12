<script setup>
import { BvRadio } from "@baklavue/ui";
import { ref } from "vue";

const selected = ref("option1");
const items = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
];
</script>

<template>
  <BvRadio v-model="selected" :items="items">
    <template #item="{ item }">{{ item.label }}</template>
  </BvRadio>
  <p v-if="selected" style="margin-top: 0.5rem; font-size: 0.875rem">
    Selected: {{ selected }}
  </p>
</template>
