<script setup lang="ts">
/**
 * Input Component
 *
 * A Vue wrapper for Baklava's `bl-input` web component with full v-model support
 * and TypeScript types. Supports text, email, password, number, date, time, and
 * other input types with validation, help text, loading state, and icons.
 *
 * @component
 * @example
 * ```vue
 * <!-- Basic usage -->
 * <template>
 *   <BvInput v-model="value" label="Email" placeholder="Enter your email" />
 * </template>
 * ```
 *
 * @example
 * ```vue
 * <!-- With validation -->
 * <template>
 *   <BvInput
 *     v-model="email"
 *     type="email"
 *     label="Email"
 *     required
 *     :invalid-text="emailError"
 *     @invalid="handleInvalid"
 *   />
 * </template>
 * ```
 *
 * @example
 * ```vue
 * <!-- With icon -->
 * <template>
 *   <BvInput v-model="search" label="Search" icon="search" />
 * </template>
 * ```
 */
import { onMounted } from "vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import type { InputProps } from "./input.types";

/**
 * Component props with default values.
 */
const props = withDefaults(defineProps<InputProps>(), {
  modelValue: undefined,
  name: undefined,
  type: "text",
  label: undefined,
  placeholder: undefined,
  required: undefined,
  minlength: undefined,
  maxlength: undefined,
  min: undefined,
  max: undefined,
  pattern: undefined,
  step: undefined,
  autocomplete: undefined,
  inputmode: undefined,
  autofocus: undefined,
  icon: undefined,
  size: "medium",
  disabled: undefined,
  readonly: undefined,
  invalidText: undefined,
  labelFixed: true,
  helpText: undefined,
  loading: undefined,
  suffixText: undefined,
});

/**
 * Component events.
 */
const emit = defineEmits<{
  /**
   * Emitted when the input value changes. Use with v-model.
   *
   * @param {string | number | null} value - The new input value.
   */
  "update:modelValue": [value: string | number | null];
  /**
   * Emitted when validation fails.
   *
   * @param {ValidityState} state - The native ValidityState object.
   */
  invalid: [state: ValidityState];
  /**
   * Emitted when the input receives focus.
   *
   * @param {FocusEvent} event - The native focus event.
   */
  focus: [event: FocusEvent];
  /**
   * Emitted when the input loses focus.
   *
   * @param {FocusEvent} event - The native focus event.
   */
  blur: [event: FocusEvent];
}>();

/**
 * Triggers the native date/time picker for inputs with type="date", "time",
 * "datetime-local", etc. Called on click to ensure the picker opens when
 * the user clicks the input.
 *
 * @param {Event} event - The click event.
 */
const showPicker = ({ currentTarget }: Event) =>
  (currentTarget as HTMLInputElement)?.showPicker();

/**
 * Lifecycle hook: Component mounted.
 *
 * Loads Baklava resources when the component is mounted.
 */
onMounted(() => {
  loadBaklavaResources();
});
</script>

<template>
  <bl-input
    v-bind="{
      ...props,
      'label-fixed': props.labelFixed === true ? true : undefined,
      'help-text': props.helpText ? props.helpText : undefined,
      'invalid-text': props.invalidText ? props.invalidText : undefined,
      loading: props.loading ? props.loading : undefined,
      placeholder: props.placeholder ? props.placeholder : props.label,
    }"
    :value="props.modelValue"
    @bl-input="
      emit('update:modelValue', ($event.target as HTMLInputElement)?.value)
    "
    @bl-invalid="emit('invalid', $event)"
    @focus="emit('focus', $event)"
    @blur="emit('blur', $event)"
    @click="showPicker"
  >
    <span v-if="props.suffixText" slot="icon">
      {{ props.suffixText }}
    </span>
  </bl-input>
</template>
