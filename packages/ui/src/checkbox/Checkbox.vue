<script setup lang="ts">
/**
 * Checkbox Component
 *
 * A Vue UI kit component for Baklava's `bl-checkbox` and `bl-checkbox-group` web components.
 * Can be used as either a single checkbox or as a group container for multiple checkboxes.
 *
 * @component
 * @example
 * ```vue
 * <!-- Single checkbox -->
 * <template>
 *   <BvCheckbox v-model="checked" label="I agree" />
 * </template>
 * ```
 *
 * @example
 * ```vue
 * <!-- Checkbox group -->
 * <template>
 *   <BvCheckbox v-model="selected" :items="items">
 *     <template #item="{ item }">{{ item.label }}</template>
 *   </BvCheckbox>
 * </template>
 * ```
 */
import { computed, onMounted } from "vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import type { CheckboxProps } from "./checkbox.types";

const props = withDefaults(defineProps<CheckboxProps>(), {
  modelValue: undefined,
  disabled: undefined,
  indeterminate: undefined,
  value: undefined,
  name: undefined,
  label: undefined,
  items: undefined,
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean | (string | number)[]];
  change: [event: CustomEvent];
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
 * Normalized model value for group mode (always array).
 */
const groupValue = computed(() => {
  const val = props.modelValue;
  if (Array.isArray(val)) return val;
  return [];
});

/**
 * Check if an item is selected in group mode.
 */
const isItemChecked = (item: { value: string | number }) => {
  return groupValue.value.includes(item.value);
};

/**
 * Handles the change event from the single checkbox.
 */
const handleSingleChange = (event: CustomEvent) => {
  const checked = (event.target as HTMLInputElement & { checked?: boolean })
    ?.checked;
  emit("change", event);
  emit("update:modelValue", checked ?? false);
};

/**
 * Handles the change event from the checkbox group.
 * Normalizes value to array (Baklava may emit array or comma-separated string).
 */
const handleGroupChange = (event: CustomEvent) => {
  emit("change", event);
  const target = event.target as { value?: unknown };
  let newValue: (string | number)[];
  if (Array.isArray(target?.value)) {
    newValue = target.value as (string | number)[];
  } else if (typeof target?.value === "string") {
    newValue = target.value ? target.value.split(",").map((s) => s.trim()) : [];
  } else {
    newValue = [];
  }
  emit("update:modelValue", newValue);
};

onMounted(() => {
  loadBaklavaResources();
});
</script>

<template>
  <!-- Group mode: render as bl-checkbox-group -->
  <bl-checkbox-group
    v-if="isGroupMode"
    :value="groupValue"
    @bl-checkbox-group-change="handleGroupChange"
  >
    <bl-checkbox
      v-for="(item, index) in props.items"
      :key="String(item.value)"
      v-bind="{
        value: item.value,
        checked: isItemChecked(item),
        disabled: item.disabled === true ? true : undefined,
        indeterminate: item.indeterminate === true ? true : undefined,
        name: item.name,
      }"
    >
      <slot name="item" :item="item" :index="index">
        {{ item.label }}
      </slot>
    </bl-checkbox>
  </bl-checkbox-group>

  <!-- Single checkbox mode: render as bl-checkbox -->
  <bl-checkbox
    v-else
    v-bind="{
      checked:
        props.modelValue === true
          ? true
          : props.modelValue === false
            ? false
            : undefined,
      disabled: props.disabled === true ? true : undefined,
      indeterminate: props.indeterminate === true ? true : undefined,
      value: props.value,
      name: props.name,
    }"
    @bl-change="handleSingleChange"
    @bl-input="emit('input', $event)"
  >
    <slot>{{ label }}</slot>
  </bl-checkbox>
</template>
