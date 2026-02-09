<script setup lang="ts">
import { onMounted } from "vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import type { SplitButtonProps } from "./split-button.types";

const props = defineProps<SplitButtonProps>();

const emit = defineEmits<{
  click: [event: CustomEvent];
  "dropdown-click": [event: CustomEvent];
}>();

onMounted(() => {
  loadBaklavaResources();
});
</script>

<template>
  <bl-split-button
    v-bind="{
      variant: props.variant,
      size: props.size,
      disabled: props.disabled === true ? true : undefined,
      loading: props.loading === true ? true : undefined,
      label: props.label,
      icon: props.icon,
    }"
    @bl-click="emit('click', $event)"
    @bl-dropdown-click="emit('dropdown-click', $event)"
  >
    <slot>{{ props.label }}</slot>
    <slot v-if="$slots['dropdown-content']" name="dropdown-content" />
  </bl-split-button>
</template>
