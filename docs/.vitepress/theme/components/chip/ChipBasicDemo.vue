<script setup>
import { BvButton, BvChip } from "@baklavue/ui";
</script>

<template>
  <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap">
    <BvChip :text="5">
      <BvButton kind="neutral" variant="tertiary" icon="mail" />
    </BvChip>
    <BvChip :text="3">
      <BvButton kind="neutral" variant="tertiary" icon="notification" />
    </BvChip>
    <BvChip text="New">
      <BvButton kind="neutral" variant="tertiary" icon="settings" />
    </BvChip>
  </div>
</template>
