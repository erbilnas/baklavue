<script setup lang="ts">
import { onMounted } from "vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import type { ButtonProps } from "./button.types";

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: "primary",
  kind: "default",
  size: "medium",
  disabled: undefined,
  loading: undefined,
  loadingLabel: "...",
  label: undefined,
  href: undefined,
  icon: undefined,
  target: undefined,
  type: "button",
  autofocus: undefined,
});

const emit = defineEmits<{
  click: [event: CustomEvent<MouseEvent>];
}>();

onMounted(() => {
  loadBaklavaResources();
});
</script>

<template>
  <bl-button
    v-bind="{
      ...props,
      loading: props.loading === true ? true : undefined,
    }"
    :style="{
      '--bl-color-primary': kind === 'custom' ? customClass?.color : undefined,
      '--bl-color-primary-highlight':
        kind === 'custom' ? customClass?.highlightColor : undefined,
    }"
    @bl-click="emit('click', $event)"
  >
    <slot>{{ label }}</slot>
  </bl-button>
</template>
