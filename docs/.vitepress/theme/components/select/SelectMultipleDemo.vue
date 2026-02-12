<script setup lang="ts">
import { BvSelect } from "@baklavue/ui";
import { ref } from "vue";

const selected = ref<string[]>([]);
const items = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "angular", label: "Angular" },
];
</script>

<template>
  <BvSelect v-model="selected" label="Frameworks" :options="items" :multiple="true" placeholder="Select multiple" />
</template>
