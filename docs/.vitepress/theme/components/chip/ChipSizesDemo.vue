<script setup>
import { BvButton, BvChip } from "@baklavue/ui";
</script>

<template>
  <div style="display: flex; gap: 1.5rem; align-items: center; flex-wrap: wrap">
    <BvChip size="xs" :text="1">
      <BvButton kind="neutral" variant="tertiary" icon="mail" size="small" />
    </BvChip>
    <BvChip size="sm" :text="5">
      <BvButton kind="neutral" variant="tertiary" icon="mail" size="small" />
    </BvChip>
    <BvChip size="md" :text="12">
      <BvButton kind="neutral" variant="tertiary" icon="mail" />
    </BvChip>
    <BvChip size="lg" :text="99">
      <BvButton kind="neutral" variant="tertiary" icon="mail" size="large" />
    </BvChip>
  </div>
</template>
