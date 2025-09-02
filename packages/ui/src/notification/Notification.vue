<script setup lang="ts">
import { onMounted } from "vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";

interface NotificationProps {
  duration?: number;
  noAnimation?: boolean;
}

const props = withDefaults(defineProps<NotificationProps>(), {
  duration: 7,
  noAnimation: false,
});

onMounted(() => {
  loadBaklavaResources();
});
</script>

<template>
  <bl-notification v-bind="props" />
</template>

<style lang="css" scoped></style>
