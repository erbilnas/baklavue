<script setup>
import { BvSwitch } from "@baklavue/ui";
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <BvSwitch :checked="true" :disabled="true" label="Disabled (checked)" />
    <BvSwitch :checked="false" :disabled="true" label="Disabled (unchecked)" />
  </div>
</template>
