<script setup lang="ts">
import { onMounted } from "vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import type { LinkProps } from "./link.types";

const props = withDefaults(defineProps<LinkProps>(), {
  href: undefined,
  target: undefined,
  disabled: undefined,
  variant: undefined,
  size: undefined,
});

const emit = defineEmits<{
  click: [event: CustomEvent];
}>();

onMounted(() => {
  loadBaklavaResources();
});
</script>

<template>
  <bl-link
    v-bind="{
      ...props,
      disabled: props.disabled === true ? true : undefined,
    }"
    @bl-click="emit('click', $event)"
  >
    <slot v-if="$slots['icon']" name="icon" />
    <slot />
  </bl-link>
</template>
