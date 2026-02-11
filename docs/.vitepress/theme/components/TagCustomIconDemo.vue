<script setup>
import { BvTag, BvIcon } from "@baklavue/ui";
</script>

<template>
  <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center">
    <BvTag>
      <template #icon>
        <BvIcon name="check" />
      </template>
      Verified
    </BvTag>
    <BvTag>
      <template #icon>
        <BvIcon name="settings" />
      </template>
      Custom
    </BvTag>
  </div>
</template>
