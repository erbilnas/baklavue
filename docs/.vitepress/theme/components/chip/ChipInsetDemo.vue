<script setup>
import { BvChip } from "@baklavue/ui";
</script>

<template>
  <div style="display: flex; gap: 1.5rem; align-items: center; flex-wrap: wrap">
    <BvChip :text="5" inset color="primary">
      <div
        class="avatar"
        style="
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        "
      />
    </BvChip>
    <BvChip :text="3" inset color="success">
      <div
        class="avatar"
        style="
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        "
      />
    </BvChip>
    <BvChip text="New" inset color="warning">
      <div
        class="avatar"
        style="
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        "
      />
    </BvChip>
  </div>
</template>
