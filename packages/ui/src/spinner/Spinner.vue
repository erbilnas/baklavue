<script setup lang="ts">
import { onMounted } from "vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import type { SpinnerProps } from "./spinner.types";

const props = withDefaults(defineProps<SpinnerProps>(), {
  size: undefined,
  variant: undefined,
  label: undefined,
});

onMounted(() => {
  loadBaklavaResources();
});
</script>

<template>
  <bl-spinner v-bind="props">
    <slot>{{ label }}</slot>
  </bl-spinner>
</template>
