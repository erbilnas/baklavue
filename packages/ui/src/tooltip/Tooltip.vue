<script setup lang="ts">
import { onMounted } from "vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import type { TooltipProps } from "./tooltip.types";

const props = withDefaults(defineProps<TooltipProps>(), {
  content: undefined,
  placement: undefined,
  trigger: undefined,
  disabled: undefined,
  delay: undefined,
});

const emit = defineEmits<{
  show: [];
  hide: [];
}>();

onMounted(() => {
  loadBaklavaResources();
});
</script>

<template>
  <bl-tooltip
    v-bind="{
      ...props,
      disabled: props.disabled === true ? true : undefined,
    }"
    @bl-show="emit('show')"
    @bl-hide="emit('hide')"
  >
    <slot v-if="$slots['content']" name="content" />
    <slot />
  </bl-tooltip>
</template>
