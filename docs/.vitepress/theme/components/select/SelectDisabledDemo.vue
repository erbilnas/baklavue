<script setup>
import { BvSelect } from "@baklavue/ui";
import { ref } from "vue";

const selected = ref("option1");
const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];
</script>

<template>
  <BvSelect v-model="selected" label="Disabled Select" :options="options" :disabled="true" />
</template>
