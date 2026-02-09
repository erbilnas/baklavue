<script setup lang="ts">
import { onMounted } from "vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import type { TagProps } from "./tag.types";

const props = withDefaults(defineProps<TagProps>(), {
  variant: undefined,
  size: undefined,
  closable: undefined,
  icon: undefined,
});

const emit = defineEmits<{
  close: [];
}>();

onMounted(() => {
  loadBaklavaResources();
});
</script>

<template>
  <bl-tag
    v-bind="{
      ...props,
      closable: props.closable === true ? true : undefined,
    }"
    @bl-close="emit('close')"
  >
    <slot v-if="$slots['icon']" name="icon" />
    <slot />
  </bl-tag>
</template>
