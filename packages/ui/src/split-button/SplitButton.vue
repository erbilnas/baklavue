<script setup lang="ts">
/**
 * SplitButton Component
 *
 * A Vue wrapper for Baklava's `bl-split-button` web component.
 * A button with a primary action and a dropdown for secondary actions.
 * Dropdown content is provided via the `dropdown-content` slot.
 *
 * @component
 * @example
 * ```vue
 * <template>
 *   <BvSplitButton label="Actions" @click="handleClick">
 *     <template #dropdown-content>
 *       <bl-dropdown-item>Action 1</bl-dropdown-item>
 *       <bl-dropdown-item>Action 2</bl-dropdown-item>
 *     </template>
 *   </BvSplitButton>
 * </template>
 * ```
 *
 * @example
 * ```vue
 * <template>
 *   <BvSplitButton label="Save" icon="check" variant="primary" @click="save" />
 * </template>
 * ```
 */
import { onMounted } from "vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import type { SplitButtonProps } from "./split-button.types";

const props = defineProps<SplitButtonProps>();

/**
 * Component events.
 */
const emit = defineEmits<{
  /**
   * Emitted when the main button is clicked.
   *
   * @param {CustomEvent} event - The native click event from bl-split-button.
   */
  click: [event: CustomEvent];
  /**
   * Emitted when the dropdown button is clicked.
   *
   * @param {CustomEvent} event - The native dropdown-click event from bl-split-button.
   */
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
    <slot v-if="$slots['dropdown-content']" name="dropdown-content" />
  </bl-split-button>
</template>
