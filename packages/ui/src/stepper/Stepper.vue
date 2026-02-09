<script setup lang="ts">
import { onMounted } from "vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import type { StepperProps } from "./stepper.types";

const props = withDefaults(defineProps<StepperProps>(), {
  currentStep: undefined,
  steps: undefined,
  orientation: undefined,
  showLabels: undefined,
});

const emit = defineEmits<{
  "update:currentStep": [step: number];
  "step-change": [event: CustomEvent];
}>();

const handleStepChange = (event: CustomEvent) => {
  emit('step-change', event);
  const step = (event.target as any)?.currentStep;
  if (step !== undefined) emit('update:currentStep', step);
};

onMounted(() => {
  loadBaklavaResources();
});
</script>

<template>
  <bl-stepper
    v-bind="{
      ...props,
      'show-labels': props.showLabels === true ? true : undefined,
    }"
    @bl-step-change="handleStepChange"
  >
    <template v-if="steps">
      <bl-step
        v-for="(step, index) in steps"
        :key="index"
        :completed="step.completed"
        :disabled="step.disabled"
      >
        {{ step.label }}
      </bl-step>
    </template>
    <slot />
  </bl-stepper>
</template>
