<script setup lang="ts">
import { onMounted } from "vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import type { TextareaProps } from "./textarea.types";

const props = withDefaults(defineProps<TextareaProps>(), {
  modelValue: undefined,
  label: undefined,
  placeholder: undefined,
  rows: undefined,
  maxlength: undefined,
  disabled: undefined,
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
  <bl-textarea
    v-bind="{
      ...props,
      disabled: props.disabled === true ? true : undefined,
      required: props.required === true ? true : undefined,
    }"
    :value="props.modelValue"
    @bl-input="
      emit('input', $event);
      emit('update:modelValue', ($event.target as HTMLTextAreaElement)?.value || null);
    "
    @bl-change="emit('change', $event)"
  >
    <slot />
  </bl-textarea>
</template>
