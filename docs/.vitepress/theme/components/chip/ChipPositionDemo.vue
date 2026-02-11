<script setup>
import { BvButton, BvChip } from "@baklavue/ui";
</script>

<template>
  <div style="display: flex; gap: 2rem; flex-wrap: wrap">
    <BvChip position="top-right" :text="5">
      <BvButton kind="neutral" variant="tertiary" icon="mail" />
    </BvChip>
    <BvChip position="bottom-right" :text="5">
      <BvButton kind="neutral" variant="tertiary" icon="mail" />
    </BvChip>
    <BvChip position="top-left" :text="5">
      <BvButton kind="neutral" variant="tertiary" icon="mail" />
    </BvChip>
    <BvChip position="bottom-left" :text="5">
      <BvButton kind="neutral" variant="tertiary" icon="mail" />
    </BvChip>
  </div>
</template>
