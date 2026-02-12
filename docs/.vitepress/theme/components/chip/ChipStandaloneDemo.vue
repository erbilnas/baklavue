<script setup>
import { BvChip } from "@baklavue/ui";
</script>

<template>
  <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap">
    <BvChip standalone :text="5" />
    <BvChip standalone text="New" color="success" />
    <BvChip standalone text="99+" color="danger" size="lg" />
  </div>
</template>
