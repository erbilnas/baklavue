<script setup>
import { BvButton, BvStepper } from "@baklavue/ui";
import { ref } from "vue";

const currentStep = ref(0);
const steps = [
  { label: "Personal", description: "Your details" },
  { label: "Address", description: "Where you live" },
  { label: "Confirm", description: "Review & submit" },
];

const stepContent = [
  "Enter your name and contact information.",
  "Enter your residential address.",
  "Review your information and submit.",
];

const goNext = () => {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++;
  }
};

const goBack = () => {
  if (currentStep.value > 0) {
    currentStep.value--;
  }
};
</script>

<template>
  <div>
    <BvStepper v-model:current-step="currentStep" :steps="steps" />
    <div style="margin-top: 1.5rem; padding: 1rem; background: var(--bl-color-neutral-50); border-radius: 0.5rem;">
      <p style="margin: 0 0 1rem 0;">{{ stepContent[currentStep] }}</p>
      <div style="display: flex; gap: 0.5rem;">
        <BvButton variant="tertiary" :disabled="currentStep === 0" @click="goBack">
          Back
        </BvButton>
        <BvButton variant="primary" @click="goNext">
          {{ currentStep === steps.length - 1 ? "Submit" : "Next" }}
        </BvButton>
      </div>
    </div>
  </div>
</template>
