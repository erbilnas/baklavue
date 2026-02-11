<script setup>
import { BvStepper } from "@baklavue/ui";
import { ref } from "vue";

const currentStepHoriz = ref(1);
const currentStepVert = ref(1);
const steps = [{ label: "Step 1" }, { label: "Step 2" }, { label: "Step 3" }];
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 2rem">
    <div>
      <p style="margin-bottom: 0.5rem">Horizontal</p>
      <BvStepper
        v-model:current-step="currentStepHoriz"
        :steps="steps"
        orientation="horizontal"
      />
    </div>
    <div>
      <p style="margin-bottom: 0.5rem">Vertical</p>
      <BvStepper
        v-model:current-step="currentStepVert"
        :steps="steps"
        orientation="vertical"
      />
    </div>
  </div>
</template>
