<script setup lang="ts">
import { onMounted } from "vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import type { RadioProps } from "./radio.types";

const props = withDefaults(defineProps<RadioProps>(), {
  checked: undefined,
  value: undefined,
  name: undefined,
  disabled: undefined,
  label: undefined,
});

const emit = defineEmits<{
  "update:checked": [checked: boolean];
  change: [event: CustomEvent];
  input: [event: CustomEvent];
}>();

onMounted(() => {
  loadBaklavaResources();
});
</script>

<template>
  <bl-radio
    v-bind="{
      ...props,
      checked: props.checked === true ? true : props.checked === false ? false : undefined,
      disabled: props.disabled === true ? true : undefined,
    }"
    @bl-change="
      emit('change', $event);
      emit('update:checked', ($event.target as any)?.checked);
    "
    @bl-input="emit('input', $event)"
  >
    <slot>{{ label }}</slot>
  </bl-radio>
</template>
