<script setup>
import { BvSkeleton } from "@baklavue/ui";
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <BvSkeleton />
    <BvSkeleton variant="text" :count="3" />
  </div>
</template>
