<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import type { AccordionProps } from "./accordion.types";

const props = withDefaults(defineProps<AccordionProps>(), {
  open: false,
  caption: undefined,
  icon: undefined,
  disabled: false,
  animationDuration: undefined,
});

const emit = defineEmits<{
  toggle: [open: boolean];
}>();

const accordionRef = ref<HTMLElement | null>(null);

// Watch for open prop changes and sync with web component
watch(
  () => props.open,
  (newValue) => {
    if (accordionRef.value) {
      const blAccordion = accordionRef.value as any;
      if (newValue && !blAccordion.open) {
        blAccordion.expand();
      } else if (!newValue && blAccordion.open) {
        blAccordion.collapse();
      }
    }
  },
  { immediate: true }
);

const handleToggle = (event: CustomEvent<boolean>) => {
  emit("toggle", event.detail);
};

onMounted(() => {
  loadBaklavaResources();
  
  // Sync initial state
  if (accordionRef.value) {
    const blAccordion = accordionRef.value as any;
    if (props.open && !blAccordion.open) {
      blAccordion.expand();
    } else if (!props.open && blAccordion.open) {
      blAccordion.collapse();
    }
  }
});

// Expose methods for programmatic control
defineExpose({
  expand: () => {
    if (accordionRef.value) {
      (accordionRef.value as any).expand();
    }
  },
  collapse: () => {
    if (accordionRef.value) {
      (accordionRef.value as any).collapse();
    }
  },
});
</script>

<template>
  <bl-accordion
    ref="accordionRef"
    v-bind="{
      ...props,
      open: props.open === true ? true : undefined,
      disabled: props.disabled === true ? true : undefined,
    }"
    @bl-toggle="handleToggle"
  >
    <slot />
  </bl-accordion>
</template>
