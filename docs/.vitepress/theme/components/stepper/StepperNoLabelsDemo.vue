<script setup>
import { BvStepper } from "@baklavue/ui";
import { ref } from "vue";

const currentStep = ref(1);
const steps = [
  { label: "Step 1" },
  { label: "Step 2" },
  { label: "Step 3" },
  { label: "Step 4" },
];
</script>

<template>
  <div>
    <p style="margin-bottom: 0.5rem">
      Stepper without labels (dots only)
    </p>
    <BvStepper v-model:current-step="currentStep" :steps="steps" :show-labels="false" />
  </div>
</template>
