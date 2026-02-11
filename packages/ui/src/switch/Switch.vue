<script setup lang="ts">
/**
 * Switch Component
 *
 * A Vue UI kit component for Baklava's `bl-switch` web component with v-model support.
 * A toggle switch for boolean states. Supports v-model:checked for two-way binding.
 *
 * @component
 * @example
 * ```vue
 * <template>
 *   <BvSwitch v-model:checked="enabled" label="Enable notifications" />
 * </template>
 * ```
 *
 * @example
 * ```vue
 * <template>
 *   <BvSwitch :checked="isOn" @change="handleChange" />
 * </template>
 * ```
 */
import { onMounted } from "vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import type { SwitchProps } from "./switch.types";

/**
 * Component props with default values.
 */
const props = withDefaults(defineProps<SwitchProps>(), {
  checked: undefined,
  disabled: undefined,
  label: undefined,
  size: undefined,
});

/**
 * Component events.
 */
const emit = defineEmits<{
  /**
   * Emitted when the checked state changes (for v-model:checked).
   *
   * @param {boolean} checked - The new checked state.
   */
  "update:checked": [checked: boolean];
  /**
   * Emitted when the user toggles the switch.
   *
   * @param {CustomEvent} event - The native change event from bl-switch.
   */
  change: [event: CustomEvent];
  /**
   * Emitted on user input (mirrors native input event).
   *
   * @param {CustomEvent} event - The native input event from bl-switch.
   */
  input: [event: CustomEvent];
}>();

onMounted(() => {
  loadBaklavaResources();
});
</script>

<template>
  <bl-switch
    v-bind="{
      ...props,
      checked: props.checked === true ? true : props.checked === false ? false : undefined,
      disabled: props.disabled === true ? true : undefined,
    }"
    @bl-switch-toggle="
      emit('change', $event);
      emit('update:checked', $event.detail);
    "
  >
    <slot>{{ label }}</slot>
  </bl-switch>
</template>
