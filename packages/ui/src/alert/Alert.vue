<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import type { AlertProps } from "./alert.types";

const props = withDefaults(defineProps<AlertProps>(), {
  variant: "info",
  description: undefined,
  icon: undefined,
  closable: false,
  caption: undefined,
  closed: false,
});

const emit = defineEmits<{
  close: [];
}>();

const alertRef = ref<HTMLElement | null>(null);

// Watch for closed prop changes and sync with web component
watch(
  () => props.closed,
  (newValue) => {
    if (alertRef.value) {
      const blAlert = alertRef.value as any;
      if (newValue && !blAlert.closed) {
        blAlert.close();
      } else if (!newValue && blAlert.closed) {
        blAlert.open();
      }
    }
  },
  { immediate: true },
);

const handleClose = () => {
  emit("close");
};

onMounted(() => {
  loadBaklavaResources();

  // Sync initial state
  if (alertRef.value) {
    const blAlert = alertRef.value as any;
    if (props.closed && !blAlert.closed) {
      blAlert.close();
    } else if (!props.closed && blAlert.closed) {
      blAlert.open();
    }
  }
});

// Expose methods for programmatic control
defineExpose({
  open: () => {
    if (alertRef.value) {
      (alertRef.value as any).open();
    }
  },
  close: () => {
    if (alertRef.value) {
      (alertRef.value as any).close();
    }
  },
});
</script>

<template>
  <bl-alert
    ref="alertRef"
    v-bind="{
      ...props,
      closable: props.closable === true ? true : undefined,
      closed: props.closed === true ? true : undefined,
    }"
    @bl-close="handleClose"
  >
    <slot v-if="$slots['caption']" name="caption" />
    <slot v-if="$slots['default']" />
    <slot v-if="$slots['action']" name="action" />
  </bl-alert>
</template>
