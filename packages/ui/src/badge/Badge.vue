<script setup lang="ts">
import { onMounted } from "vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import type { BadgeProps } from "./badge.types";

const props = withDefaults(defineProps<BadgeProps>(), {
  size: "medium",
  icon: undefined,
});

onMounted(() => {
  loadBaklavaResources();
});
</script>

<template>
  <bl-badge v-bind="props">
    <slot />
  </bl-badge>
</template>
