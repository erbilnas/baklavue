<script setup>
import { BvStepper } from "@baklavue/ui";
import { ref } from "vue";

const currentStep = ref(0);
const lastChange = ref(null);
const steps = [
  { label: "Step 1" },
  { label: "Step 2" },
  { label: "Step 3" },
];

const onStepChange = (event) => {
  const { activeStep, totalSteps } = event.detail || {};
  lastChange.value = `Step ${(activeStep ?? 0) + 1} of ${totalSteps ?? 0} selected`;
};
</script>

<template>
  <div>
    <p style="margin-bottom: 0.5rem">
      Current step: {{ currentStep + 1 }}
      <span v-if="lastChange" style="color: var(--bl-color-success); font-size: 0.875rem;">
        — {{ lastChange }}
      </span>
    </p>
    <BvStepper v-model:current-step="currentStep" :steps="steps" @step-change="onStepChange" />
  </div>
</template>
