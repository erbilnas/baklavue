<script setup>
import { BvStepper } from "@baklavue/ui";
import { ref } from "vue";

const currentStep = ref(1);
const steps = [
  { label: "Account", description: "Account created" },
  { label: "Validation", description: "Please fix errors", error: true },
  { label: "Review", description: "Final review" },
];
</script>

<template>
  <div>
    <p style="margin-bottom: 0.5rem">
      Current step: {{ currentStep + 1 }} (Step 2 has an error state)
    </p>
    <BvStepper v-model:current-step="currentStep" :steps="steps" />
  </div>
</template>
