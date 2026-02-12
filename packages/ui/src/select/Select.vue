<script setup lang="ts">
/**
 * Select Component
 *
 * A Vue UI kit component for Baklava's `bl-select` web component with v-model support.
 * Supports both slot-based options and the `options` prop for programmatic rendering.
 *
 * @component
 * @example
 * ```vue
 * <!-- Basic single select with slot -->
 * <template>
 *   <BvSelect v-model="selected" label="Choose an option">
 *     <bl-select-option value="a">Option A</bl-select-option>
 *     <bl-select-option value="b">Option B</bl-select-option>
 *   </BvSelect>
 * </template>
 * ```
 *
 * @example
 * ```vue
 * <!-- Options array -->
 * <template>
 *   <BvSelect v-model="country" label="Country" :options="countries" />
 * </template>
 * ```
 *
 * @example
 * ```vue
 * <!-- Multiple select -->
 * <template>
 *   <BvSelect v-model="selected" label="Select multiple" :multiple="true" :options="items" />
 * </template>
 * ```
 */
import { computed, onMounted } from "vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import type { SelectProps } from "./select.types";

/**
 * Component props with default values.
 */
const props = withDefaults(defineProps<SelectProps>(), {
  modelValue: undefined,
  options: undefined,
  label: undefined,
  placeholder: undefined,
  name: undefined,
  required: undefined,
  disabled: undefined,
  multiple: undefined,
  size: undefined,
  clearable: undefined,
  helpText: undefined,
  customInvalidText: undefined,
  searchBar: undefined,
  searchBarPlaceholder: undefined,
});

/**
 * Component events.
 */
const emit = defineEmits<{
  /**
   * Emitted when the selection changes. Use with v-model.
   *
   * @param {string | string[] | null} value - The selected value(s). Array when multiple.
   */
  "update:modelValue": [value: string | string[] | null];
  /**
   * Emitted when selection changes (bl-change event).
   *
   * @param {CustomEvent} event - The native bl-change event from bl-select.
   */
  change: [event: CustomEvent];
  /**
   * Emitted on input (bl-input event).
   *
   * @param {CustomEvent} event - The native bl-input event from bl-select.
   */
  input: [event: CustomEvent];
}>();

/**
 * Handles the bl-change event from the underlying bl-select component.
 * Syncs v-model and forwards the change event.
 * The bl-select element (event.target) exposes a .value property for the selected value.
 *
 * @param {CustomEvent} event - The bl-change event from bl-select.
 */
const handleChange = (event: CustomEvent) => {
  emit("change", event);
  const target = event.target as HTMLSelectElement & {
    value?: string | string[] | null;
  };
  emit("update:modelValue", target?.value ?? null);
};

/**
 * Lifecycle hook: Component mounted.
 *
 * Loads Baklava resources when the component is mounted.
 */
/**
 * Props to pass to bl-select. Excludes modelValue (we use :value) and options
 * (we render bl-select-option children from options in the template).
 */
const selectProps = computed(() => {
  const { modelValue: _, options: __, ...rest } = props;
  return {
    ...rest,
    disabled: rest.disabled === true ? true : undefined,
    multiple: rest.multiple === true ? true : undefined,
    "help-text": rest.helpText ?? undefined,
    "invalid-text": rest.customInvalidText ?? undefined,
    "search-bar": rest.searchBar === true ? true : undefined,
    "search-bar-placeholder": rest.searchBarPlaceholder ?? undefined,
  };
});

onMounted(() => {
  loadBaklavaResources();
});
</script>

<template>
  <bl-select
    v-bind="selectProps"
    :value="props.modelValue"
    @bl-change="handleChange"
    @bl-input="emit('input', $event)"
  >
    <!-- Render options from options prop when provided -->
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
    <!-- Default slot for custom bl-select-option children -->
    <slot />
  </bl-select>
</template>
