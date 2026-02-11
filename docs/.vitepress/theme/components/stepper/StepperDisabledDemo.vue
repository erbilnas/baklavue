<script setup>
import { BvStepper } from "@baklavue/ui";
import { ref } from "vue";

const currentStep = ref(1);
const steps = [
  { label: "Step 1" },
  { label: "Step 2", disabled: true },
  { label: "Step 3" },
  { label: "Step 4", disabled: true },
];
</script>

<template>
  <div>
    <p style="margin-bottom: 0.5rem">
      Current step: {{ currentStep + 1 }} of {{ steps.length }} (Step 2 is disabled)
    </p>
    <BvStepper v-model:current-step="currentStep" :steps="steps" />
  </div>
</template>
