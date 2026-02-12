<script setup>
import { BvSelect } from "@baklavue/ui";
import { ref } from "vue";

const selected = ref("");
const countries = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "tr", label: "Turkey" },
];
</script>

<template>
  <BvSelect v-model="selected" label="Country" :options="countries" placeholder="Select a country" />
</template>
