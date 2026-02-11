<script setup>
import { BvDatepicker } from "@baklavue/ui";
import { computed, ref } from "vue";

const props = defineProps({
  variant: {
    type: String,
    default: "basic",
    validator: (v) =>
      [
        "basic",
        "placeholder",
        "disabled",
        "required",
        "minmax",
        "multiple",
        "range",
      ].includes(v),
  },
});

const date = ref("");
const dates = ref([]);
const range = ref(null);

const minDate = computed(() => {
  if (props.variant !== "minmax") return undefined;
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;
});

const maxDate = computed(() => {
  if (props.variant !== "minmax") return undefined;
  const now = new Date();
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
    lastDay.getDate(),
  ).padStart(2, "0")}`;
});

const label = computed(() => {
  switch (props.variant) {
    case "basic":
      return "Select date";
    case "placeholder":
      return "Appointment";
    case "disabled":
      return "Disabled datepicker";
    case "required":
      return "Required date";
    case "minmax":
      return "Date range";
    case "multiple":
      return "Select dates";
    case "range":
      return "Select range";
    default:
      return "Select date";
  }
});

const placeholder = computed(() => {
  if (props.variant === "minmax") return "Select within range";
  if (props.variant === "placeholder") return "Pick a date";
  return undefined;
});
</script>

<template>
  <BvDatepicker
    v-if="variant === 'multiple'"
    v-model="dates"
    type="multiple"
    :label="label"
  />
  <BvDatepicker
    v-else-if="variant === 'range'"
    v-model="range"
    type="range"
    :label="label"
  />
  <BvDatepicker
    v-else
    v-model="date"
    :label="label"
    :placeholder="placeholder"
    :disabled="variant === 'disabled'"
    :required="variant === 'required'"
    :min="minDate"
    :max="maxDate"
  />
</template>
