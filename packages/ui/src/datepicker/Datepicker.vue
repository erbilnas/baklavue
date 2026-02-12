<script setup lang="ts">
/**
 * Datepicker Component
 *
 * A Vue UI kit component for Baklava's `bl-datepicker` web component with v-model support.
 * Provides a calendar picker input for date selection with min/max constraints,
 * placeholder text, and standard form states.
 *
 * Supports single date, multiple dates, and date range selection modes.
 *
 * @component
 * @example
 * ```vue
 * <!-- Basic usage (single) -->
 * <template>
 *   <BvDatepicker v-model="date" label="Select date" />
 * </template>
 * ```
 *
 * @example
 * ```vue
 * <!-- Multiple dates -->
 * <template>
 *   <BvDatepicker v-model="dates" type="multiple" label="Select dates" />
 * </template>
 * ```
 *
 * @example
 * ```vue
 * <!-- Date range -->
 * <template>
 *   <BvDatepicker v-model="range" type="range" label="Select range" />
 * </template>
 * ```
 *
 * @example
 * ```vue
 * <!-- With min/max constraints -->
 * <template>
 *   <BvDatepicker
 *     v-model="date"
 *     label="Date range"
 *     placeholder="Select within range"
 *     :min="minDate"
 *     :max="maxDate"
 *   />
 * </template>
 * ```
 */
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import type { DatepickerProps, DatepickerType } from "./datepicker.types";

const props = withDefaults(defineProps<DatepickerProps>(), {
  modelValue: undefined,
  type: "single",
  label: undefined,
  placeholder: undefined,
  disabled: undefined,
  min: undefined,
  max: undefined,
  required: undefined,
  size: undefined,
  labelFixed: undefined,
  helpText: undefined,
});

const emit = defineEmits<{
  "update:modelValue": [value: string | string[] | [string, string] | null];
  change: [event: CustomEvent<Date[]>];
}>();

/**
 * Converts a Date to ISO date string (YYYY-MM-DD) for v-model consistency.
 */
function toISODateString(date: Date): string {
  if (Number.isNaN(date.getTime())) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Converts modelValue to Baklava value format (comma-separated string).
 * Baklava expects comma-separated ISO date strings (YYYY-MM-DD).
 */
const baklavaValue = computed(() => {
  const val = props.modelValue;
  if (val == null || (Array.isArray(val) && val.length === 0)) return "";
  if (Array.isArray(val)) return val.map((d) => String(d)).join(",");
  return String(val);
});

/**
 * Handles the bl-datepicker-change event from Baklava.
 * Converts Date[] to the appropriate format based on type and emits update:modelValue.
 */
const skipNextValueSync = ref(false);

function handleDatepickerChange(event: CustomEvent<Date[]>) {
  const rawDates = event.detail ?? [];
  const dates = rawDates.filter(
    (d) => d instanceof Date && !Number.isNaN(d.getTime()),
  );
  const type: DatepickerType = props.type ?? "single";

  let value: string | string[] | [string, string] | null;

  if (dates.length === 0) {
    value = type === "multiple" ? [] : null;
  } else if (type === "single") {
    value = toISODateString(dates[0]);
  } else if (type === "multiple") {
    value = dates.map(toISODateString);
  } else if (type === "range") {
    value = [
      toISODateString(dates[0]),
      toISODateString(dates[1] ?? dates[0]),
    ] as [string, string];
  } else {
    value = null;
  }

  skipNextValueSync.value = true;
  emit("change", event);
  emit("update:modelValue", value);
  nextTick(() => {
    skipNextValueSync.value = false;
  });
}

const datepickerRef = ref<HTMLElement | null>(null);

// Sync value to web component property when modelValue changes externally.
// Skip sync when change originated from datepicker to avoid duplicate values in multiple/range mode.
watch(
  [datepickerRef, baklavaValue],
  ([el, val]) => {
    if (skipNextValueSync.value || !el) return;
    (el as HTMLUnknownElement & { value?: string }).value = val ?? "";
  },
  { immediate: true },
);

onMounted(async () => {
  loadBaklavaResources();
  // Wait for custom element to be defined before value can be set
  if (!customElements.get("bl-datepicker")) {
    await customElements.whenDefined("bl-datepicker");
  }
});
</script>

<template>
  <bl-datepicker
    ref="datepickerRef"
    :type="props.type"
    :label="props.label"
    :placeholder="props.placeholder"
    :disabled="props.disabled === true ? true : undefined"
    :required="props.required === true ? true : undefined"
    :size="props.size"
    :label-fixed="props.labelFixed === true ? true : undefined"
    :help-text="props.helpText"
    :min-date="props.min ? new Date(props.min) : undefined"
    :max-date="props.max ? new Date(props.max) : undefined"
    @bl-datepicker-change="handleDatepickerChange"
  >
    <slot />
  </bl-datepicker>
</template>
