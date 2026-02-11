<script setup>
import { BvStepper } from "@baklavue/ui";
import { ref } from "vue";

const currentStep = ref(1);
const steps = [
  { label: "Account", completed: true },
  { label: "Profile", completed: false },
  { label: "Preferences", completed: false },
  { label: "Review", completed: false },
];
</script>

<template>
  <div>
    <p style="margin-bottom: 0.5rem">
      Current step: {{ currentStep + 1 }} of {{ steps.length }}
    </p>
    <BvStepper v-model:current-step="currentStep" :steps="steps" />
  </div>
</template>
