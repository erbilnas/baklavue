<script setup lang="ts">
/**
 * Icon Component
 *
 * A Vue wrapper for Baklava's `bl-icon` web component.
 * Provides icon display with support for name, size, color, and custom slot content.
 * Size and color are applied via CSS (font-size, color) as per Baklava's API.
 *
 * @component
 * @example
 * ```vue
 * <!-- Basic usage -->
 * <template>
 *   <BvIcon name="home" />
 * </template>
 * ```
 *
 * @example
 * ```vue
 * <!-- With size -->
 * <template>
 *   <BvIcon name="settings" size="24px" />
 * </template>
 * ```
 *
 * @example
 * ```vue
 * <!-- With color -->
 * <template>
 *   <BvIcon name="info" color="#0066cc" />
 * </template>
 * ```
 *
 * @example
 * ```vue
 * <!-- Custom slot for custom SVG -->
 * <template>
 *   <BvIcon>
 *     <svg>...</svg>
 *   </BvIcon>
 * </template>
 * ```
 */
import { computed, onMounted } from "vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import type { IconProps } from "./icon.types";

/**
 * Component props with default values.
 */
const props = withDefaults(defineProps<IconProps>(), {
  name: undefined,
  size: undefined,
  color: undefined,
});

/**
 * Component events.
 */
const emit = defineEmits<{
  /**
   * Emitted when the SVG icon has loaded.
   *
   * @param {string} detail - Event detail from bl-load.
   */
  load: [detail: string];
  /**
   * Emitted when the SVG icon failed to load.
   *
   * @param {string} detail - Event detail from bl-error.
   */
  error: [detail: string];
}>();

/**
 * Computed style object for size and color.
 * Maps to Baklava's font-size and color CSS properties.
 */
const iconStyle = computed(() => ({
  ...(props.size && { fontSize: props.size }),
  ...(props.color && { color: props.color }),
}));

/**
 * Lifecycle hook: Component mounted.
 * Loads Baklava resources (icons, styles).
 */
onMounted(() => {
  loadBaklavaResources();
});
</script>

<template>
  <bl-icon
    :name="props.name"
    :style="iconStyle"
    @bl-load="emit('load', ($event as CustomEvent<string>).detail)"
    @bl-error="emit('error', ($event as CustomEvent<string>).detail)"
  >
    <slot />
  </bl-icon>
</template>
