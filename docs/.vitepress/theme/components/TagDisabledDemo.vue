<script setup>
import { BvTag } from "@baklavue/ui";
</script>

<template>
  <div style="display: flex; gap: 0.5rem; flex-wrap: wrap">
    <BvTag disabled>Disabled</BvTag>
    <BvTag disabled closable>Disabled closable</BvTag>
    <BvTag variant="selectable" disabled>Disabled selectable</BvTag>
  </div>
</template>
