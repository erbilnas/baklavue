<script setup>
import { BvSelect } from "@baklavue/ui";
import { ref } from "vue";

const selected = ref("option1");
</script>

<template>
  <BvSelect v-model="selected" label="Choose an option">
    <bl-select-option value="option1">Option 1</bl-select-option>
    <bl-select-option value="option2">Option 2</bl-select-option>
    <bl-select-option value="option3">Option 3</bl-select-option>
  </BvSelect>
</template>
