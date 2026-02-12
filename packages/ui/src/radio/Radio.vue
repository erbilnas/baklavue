<script setup lang="ts">
/**
 * Radio Component
 *
 * A Vue UI kit component for Baklava's `bl-radio` and `bl-radio-group` web components.
 * Can be used as either a single radio option or as a group container for multiple radios.
 *
 * @component
 * @example
 * ```vue
 * <!-- Single radio in a group -->
 * <template>
 *   <bl-radio-group :value="choice" @bl-radio-change="choice = $event.detail">
 *     <BvRadio v-model="choice" value="yes" label="Yes" name="choice" />
 *     <BvRadio v-model="choice" value="no" label="No" name="choice" />
 *   </bl-radio-group>
 * </template>
 * ```
 *
 * @example
 * ```vue
 * <!-- Radio group with items -->
 * <template>
 *   <BvRadio v-model="choice" :items="items">
 *     <template #item="{ item }">{{ item.label }}</template>
 *   </BvRadio>
 * </template>
 * ```
 *
 * @example
 * ```vue
 * <!-- Explicit checked control -->
 * <template>
 *   <BvRadio :checked="isSelected" @update:checked="isSelected = $event" label="Option" />
 * </template>
 * ```
 */
import { computed, onMounted } from "vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import type { RadioProps } from "./radio.types";

/**
 * Component props with default values.
 */
const props = withDefaults(defineProps<RadioProps>(), {
  modelValue: undefined,
  value: undefined,
  name: undefined,
  label: undefined,
  checked: undefined,
  disabled: undefined,
  required: undefined,
  items: undefined,
});

/**
 * Component events.
 */
const emit = defineEmits<{
  /**
   * Emitted when selection changes (for v-model with modelValue).
   * Payload is this radio's value when it becomes selected (single mode) or the selected value (group mode).
   *
   * @param {string | number} value - The selected value.
   */
  "update:modelValue": [value: string | number];

  /**
   * Emitted when checked state changes (for explicit checked control).
   *
   * @param {boolean} checked - The new checked state.
   */
  "update:checked": [checked: boolean];

  /**
   * Emitted when the radio state changes (native bl-change / bl-radio-change event).
   *
   * @param {CustomEvent} event - The change event from bl-radio or bl-radio-group.
   */
  change: [event: CustomEvent];

  /**
   * Emitted on input (native bl-input event).
   *
   * @param {CustomEvent} event - The bl-input event from bl-radio.
   */
  input: [event: CustomEvent];
}>();

/**
 * Determines if the component should act as a group container.
 * When `items` prop is provided and is an array, it acts as a group.
 */
const isGroupMode = computed(
  () => props.items !== undefined && Array.isArray(props.items),
);

/**
 * Normalized model value for group mode (string for bl-radio-group).
 */
const groupValue = computed(() => {
  const val = props.modelValue;
  if (val === undefined || val === null) return "";
  return String(val);
});

/**
 * Computed checked state for bl-radio (single mode).
 * Uses explicit checked prop when provided, otherwise modelValue === value for v-model.
 */
const computedChecked = computed(() => {
  if (props.checked === true || props.checked === false) {
    return props.checked;
  }
  if (props.modelValue !== undefined && props.value !== undefined) {
    return String(props.modelValue) === String(props.value);
  }
  return undefined;
});

/**
 * Handles the bl-change event from the underlying bl-radio (single mode).
 * Emits update:modelValue with this radio's value when selected, or update:checked.
 */
const handleSingleChange = (event: CustomEvent) => {
  emit("change", event);
  const target = event.target as { checked?: boolean; value?: string | number };
  const checked = target?.checked;
  if (checked === true && props.value !== undefined) {
    emit("update:modelValue", props.value);
  }
  if (checked === true || checked === false) {
    emit("update:checked", checked);
  }
};

/**
 * Handles the bl-radio-change event from the underlying bl-radio-group (group mode).
 * Emits update:modelValue with the selected value (preserves original type from items).
 */
const handleGroupChange = (event: CustomEvent) => {
  emit("change", event);
  const detail = event.detail as string | undefined;
  if (detail === undefined || detail === "") return;
  const item = props.items?.find(
    (i) => String(i.value) === String(detail),
  );
  const newValue = item !== undefined ? item.value : detail;
  emit("update:modelValue", newValue);
};

/**
 * Lifecycle hook: Component mounted.
 * Loads Baklava resources for bl-radio and bl-radio-group.
 */
onMounted(() => {
  loadBaklavaResources();
});
</script>

<template>
  <!-- Group mode: render as bl-radio-group -->
  <bl-radio-group
    v-if="isGroupMode"
    :value="groupValue"
    :required="props.required === true ? true : undefined"
    :label="props.label"
    @bl-radio-change="handleGroupChange"
  >
    <bl-radio
      v-for="(item, index) in props.items"
      :key="String(item.value)"
      v-bind="{
        value: String(item.value),
        disabled: item.disabled === true ? true : undefined,
        name: item.name ?? props.name,
      }"
    >
      <slot name="item" :item="item" :index="index">
        {{ item.label }}
      </slot>
    </bl-radio>
  </bl-radio-group>

  <!-- Single radio mode: render as bl-radio -->
  <bl-radio
    v-else
    v-bind="{
      value: props.value !== undefined ? String(props.value) : undefined,
      name: props.name,
      disabled: props.disabled === true ? true : undefined,
      required: props.required === true ? true : undefined,
      checked:
        computedChecked === true
          ? true
          : computedChecked === false
            ? false
            : undefined,
    }"
    @bl-change="handleSingleChange"
    @bl-input="emit('input', $event)"
  >
    <slot>{{ label }}</slot>
  </bl-radio>
</template>
