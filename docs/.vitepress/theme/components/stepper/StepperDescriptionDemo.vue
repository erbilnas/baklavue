<script setup>
import { BvStepper } from "@baklavue/ui";
import { ref } from "vue";

const currentStep = ref(1);
const steps = [
  { label: "Account", description: "Create your account" },
  { label: "Profile", description: "Add your details" },
  { label: "Preferences", description: "Set your preferences" },
  { label: "Review", description: "Review and submit" },
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
