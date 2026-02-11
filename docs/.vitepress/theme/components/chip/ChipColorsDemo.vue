<script setup>
import { BvButton, BvChip } from "@baklavue/ui";
</script>

<template>
  <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap">
    <BvChip color="primary" :text="5">
      <BvButton kind="neutral" variant="tertiary" icon="mail" />
    </BvChip>
    <BvChip color="success" :text="3">
      <BvButton kind="neutral" variant="tertiary" icon="notification" />
    </BvChip>
    <BvChip color="danger">
      <BvButton kind="neutral" variant="tertiary" icon="notification" />
    </BvChip>
    <BvChip color="warning" text="!">
      <BvButton kind="neutral" variant="tertiary" icon="settings" />
    </BvChip>
    <BvChip color="info" :text="2">
      <BvButton kind="neutral" variant="tertiary" icon="info" />
    </BvChip>
    <BvChip color="neutral" :text="9">
      <BvButton kind="neutral" variant="tertiary" icon="mail" />
    </BvChip>
  </div>
</template>
