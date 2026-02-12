<script setup>
import { BvSkeleton } from "@baklavue/ui";
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 1.5rem;">
    <div>
      <p style="margin-bottom: 0.5rem; font-size: 0.875rem; color: var(--bl-color-neutral-darker);">Rectangle (default)</p>
      <BvSkeleton width="200px" height="120px" />
    </div>
    <div>
      <p style="margin-bottom: 0.5rem; font-size: 0.875rem; color: var(--bl-color-neutral-darker);">Text lines</p>
      <BvSkeleton variant="text" :count="3" />
    </div>
    <div>
      <p style="margin-bottom: 0.5rem; font-size: 0.875rem; color: var(--bl-color-neutral-darker);">Circle (avatar)</p>
      <div style="display: flex; align-items: center; gap: 1rem;">
        <BvSkeleton variant="circle" />
        <div style="flex: 1;">
          <BvSkeleton variant="text" :count="2" />
        </div>
      </div>
    </div>
  </div>
</template>
