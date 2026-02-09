<script setup lang="ts">
import { onMounted } from "vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import type { SelectProps } from "./select.types";

const props = withDefaults(defineProps<SelectProps>(), {
  modelValue: undefined,
  options: undefined,
  label: undefined,
  placeholder: undefined,
  disabled: undefined,
  multiple: undefined,
  size: undefined,
});

const emit = defineEmits<{
  "update:modelValue": [value: string | string[] | null];
  change: [event: CustomEvent];
  input: [event: CustomEvent];
}>();

onMounted(() => {
  loadBaklavaResources();
});
</script>

<template>
  <bl-select
    v-bind="{
      ...props,
      disabled: props.disabled === true ? true : undefined,
      multiple: props.multiple === true ? true : undefined,
    }"
    :value="props.modelValue"
    @bl-change="
      emit('change', $event);
      emit(
        'update:modelValue',
        ($event.target as HTMLSelectElement)?.value || null,
      );
    "
    @bl-input="emit('input', $event)"
  >
    <template v-if="options">
      <bl-select-option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled"
      >
        {{ option.label }}
      </bl-select-option>
    </template>
    <slot />
  </bl-select>
</template>
