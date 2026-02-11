<script setup>
import { BvStepper } from "@baklavue/ui";
import { ref } from "vue";

const currentStep = ref(0);
const steps = [{ label: "Step 1" }, { label: "Step 2" }, { label: "Step 3" }];
</script>

<template>
  <div>
    <p style="margin-bottom: 0.5rem">Current step: {{ currentStep + 1 }}</p>
    <BvStepper v-model:current-step="currentStep" :steps="steps" />
  </div>
</template>
