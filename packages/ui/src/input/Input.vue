<script setup lang="ts">
import { onMounted } from "vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import type { InputProps } from "./input.types";

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

const emit = defineEmits<{
  "update:modelValue": [value: string | number | null];
  invalid: [state: ValidityState];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
}>();

const showPicker = ({ currentTarget }: Event) =>
  (currentTarget as HTMLInputElement)?.showPicker();

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
    <span v-if="suffixText" slot="icon">
      {{ suffixText }}
    </span>
  </bl-input>
</template>
