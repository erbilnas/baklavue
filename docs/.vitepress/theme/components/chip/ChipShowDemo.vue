<script setup>
import { ref } from "vue";
import { BvButton, BvChip } from "@baklavue/ui";

const show = ref(true);
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 1rem">
    <div style="display: flex; gap: 1rem; align-items: center">
      <BvChip :text="5" :show="show">
        <BvButton kind="neutral" variant="tertiary" icon="mail" />
      </BvChip>
      <BvButton kind="neutral" variant="secondary" size="small" @click="show = !show">
        {{ show ? "Hide" : "Show" }} chip
      </BvButton>
    </div>
  </div>
</template>
