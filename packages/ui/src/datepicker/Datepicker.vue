<script setup lang="ts">
import { onMounted } from "vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import type { DatepickerProps } from "./datepicker.types";

const props = withDefaults(defineProps<DatepickerProps>(), {
  modelValue: undefined,
  label: undefined,
  placeholder: undefined,
  disabled: undefined,
  min: undefined,
  max: undefined,
  required: undefined,
});

const emit = defineEmits<{
  "update:modelValue": [value: string | null];
  input: [event: CustomEvent];
  change: [event: CustomEvent];
}>();

onMounted(() => {
  loadBaklavaResources();
});
</script>

<template>
  <bl-datepicker
    v-bind="{
      ...props,
      disabled: props.disabled === true ? true : undefined,
      required: props.required === true ? true : undefined,
    }"
    :value="props.modelValue"
    @bl-input="
      emit('input', $event);
      emit('update:modelValue', ($event.target as HTMLInputElement)?.value || null);
    "
    @bl-change="emit('change', $event)"
  >
    <slot />
  </bl-datepicker>
</template>
