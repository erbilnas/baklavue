<script setup lang="ts">
/**
 * Textarea Component
 *
 * A Vue UI kit component for Baklava's `bl-textarea` web component with v-model support.
 * Supports label, placeholder, validation, character counter, and help text.
 *
 * @component
 * @example
 * ```vue
 * <!-- Basic usage with v-model -->
 * <template>
 *   <BvTextarea v-model="message" label="Message" placeholder="Enter your message" />
 * </template>
 * ```
 *
 * @example
 * ```vue
 * <!-- With validation -->
 * <template>
 *   <BvTextarea
 *     v-model="comment"
 *     label="Comment"
 *     :maxlength="500"
 *     help-text="Max 500 characters"
 *     invalid-text="Please enter a valid comment"
 *   />
 * </template>
 * ```
 */
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
  /**
   * Emitted when the value changes (use with v-model).
   * @param {string | null} value - The new textarea value.
   */
  "update:modelValue": [value: string | null];
  /**
   * Emitted on user input (mirrors native bl-input).
   * @param {CustomEvent} event - The bl-input event.
   */
  input: [event: CustomEvent];
  /**
   * Emitted when the value changes (blur or commit).
   * @param {CustomEvent} event - The bl-change event.
   */
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
