<script setup lang="ts">
import { onMounted } from "vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import type { CheckboxProps } from "./checkbox.types";

const props = withDefaults(defineProps<CheckboxProps>(), {
  checked: undefined,
  disabled: undefined,
  indeterminate: undefined,
  value: undefined,
  name: undefined,
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
  <bl-checkbox
    v-bind="{
      ...props,
      checked: props.checked === true ? true : props.checked === false ? false : undefined,
      disabled: props.disabled === true ? true : undefined,
      indeterminate: props.indeterminate === true ? true : undefined,
    }"
    @bl-change="
      emit('change', $event);
      emit('update:checked', ($event.target as any)?.checked);
    "
    @bl-input="emit('input', $event)"
  >
    <slot>{{ label }}</slot>
  </bl-checkbox>
</template>
