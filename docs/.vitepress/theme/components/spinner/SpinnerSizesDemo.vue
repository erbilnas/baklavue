<script setup>
import { BvSpinner } from "@baklavue/ui";
</script>

<template>
  <div style="display: flex; align-items: center; gap: 2rem">
    <div
      style="
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
      "
    >
      <BvSpinner size="var(--bl-font-size-s)" />
      <span style="font-size: 0.875rem">Small</span>
    </div>
    <div
      style="
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
      "
    >
      <BvSpinner size="var(--bl-font-size-m)" />
      <span style="font-size: 0.875rem">Medium</span>
    </div>
    <div
      style="
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
      "
    >
      <BvSpinner size="var(--bl-font-size-l)" />
      <span style="font-size: 0.875rem">Large</span>
    </div>
  </div>
</template>
