<script setup lang="ts">
/**
 * Stepper Component
 *
 * A Vue wrapper for Baklava's `bl-stepper` web component for step indicators.
 * Displays progress through a sequence of steps. Use the `steps` prop for declarative
 * configuration or the default slot for custom step content.
 *
 * @component
 * @example
 * ```vue
 * <template>
 *   <BvStepper v-model:current-step="currentStep" :steps="steps" />
 * </template>
 * ```
 *
 * @example
 * ```vue
 * <template>
 *   <BvStepper :steps="['Step 1', 'Step 2', 'Step 3']" />
 * </template>
 * ```
 */
import { onMounted } from "vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import type { StepperProps, StepperStep } from "./stepper.types";

/**
 * Component props with default values.
 */
const props = withDefaults(defineProps<StepperProps>(), {
  currentStep: undefined,
  steps: undefined,
  orientation: undefined,
  showLabels: undefined,
});

/**
 * Component events.
 */
const emit = defineEmits<{
  /**
   * Emitted when the current step changes (for v-model:currentStep).
   *
   * @param {number} step - The new current step index.
   */
  "update:currentStep": [step: number];
  /**
   * Emitted when the user selects a different step.
   *
   * @param {CustomEvent} event - The native bl-stepper-change event from bl-stepper.
   */
  "step-change": [event: CustomEvent];
}>();

/**
 * Returns the variant for a step based on its index and the current step.
 */
const getStepVariant = (index: number): "default" | "active" | "success" | "error" => {
  const current = props.currentStep ?? 0;
  const step = props.steps?.[index];
  if (step?.error) return "error";
  if (index < current) return "success";
  if (index === current) return "active";
  return "default";
};

/**
 * Handles the bl-stepper-change event from the underlying web component.
 */
const handleStepChange = (event: CustomEvent<{ activeStep: number; totalSteps: number }>) => {
  emit("step-change", event);
  const step = event.detail?.activeStep;
  if (step !== undefined) emit("update:currentStep", step);
};

onMounted(() => {
  loadBaklavaResources();
});
</script>

<template>
  <bl-stepper
    :direction="orientation ?? 'horizontal'"
    @bl-stepper-change="handleStepChange"
  >
    <template v-if="steps">
      <bl-stepper-item
        v-for="(step, index) in steps"
        :key="index"
        :id="`step-${index}`"
        :title="showLabels !== false ? step.label : ''"
        :description="showLabels !== false && step.description ? step.description : ''"
        :variant="getStepVariant(index)"
        :disabled="step.disabled"
      />
    </template>
    <slot />
  </bl-stepper>
</template>
