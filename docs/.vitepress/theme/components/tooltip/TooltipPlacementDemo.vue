<script setup>
import { BvTooltip, BvButton } from "@baklavue/ui";
</script>

<template>
  <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center; justify-content: center; padding: 2rem">
    <BvTooltip content="Tooltip on top" placement="top">
      <BvButton>Top</BvButton>
    </BvTooltip>
    <BvTooltip content="Tooltip on bottom" placement="bottom">
      <BvButton>Bottom</BvButton>
    </BvTooltip>
    <BvTooltip content="Tooltip on left" placement="left">
      <BvButton>Left</BvButton>
    </BvTooltip>
    <BvTooltip content="Tooltip on right" placement="right">
      <BvButton>Right</BvButton>
    </BvTooltip>
  </div>
</template>
