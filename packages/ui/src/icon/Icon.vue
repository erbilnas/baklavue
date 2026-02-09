<script setup lang="ts">
import { onMounted } from "vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import type { IconProps } from "./icon.types";

const props = withDefaults(defineProps<IconProps>(), {
  name: undefined,
  size: undefined,
  color: undefined,
});

onMounted(() => {
  loadBaklavaResources();
});
</script>

<template>
  <bl-icon v-bind="props">
    <slot />
  </bl-icon>
</template>
