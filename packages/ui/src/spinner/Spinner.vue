<script setup lang="ts">
/**
 * Spinner Component
 *
 * A Vue UI kit component for Baklava's `bl-spinner` web component for loading indicators.
 * Displays an animated spinner with configurable size and variant.
 *
 * @component
 * @example
 * ```vue
 * <template>
 *   <BvSpinner />
 * </template>
 * ```
 *
 * @example
 * ```vue
 * <template>
 *   <BvSpinner size="large" label="Loading..." />
 * </template>
 * ```
 */
import { computed, onMounted } from "vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import type { SpinnerProps } from "./spinner.types";

/**
 * Component props with default values.
 */
const props = withDefaults(defineProps<SpinnerProps>(), {
  size: undefined,
  variant: undefined,
  label: undefined,
});

/** Props to pass to bl-spinner (excludes label, which is used for aria-label) */
const spinnerProps = computed(() => {
  const { label: _, ...rest } = props;
  return rest;
});

onMounted(() => {
  loadBaklavaResources();
});
</script>

<template>
  <bl-spinner v-bind="spinnerProps" :aria-label="label" />
</template>
