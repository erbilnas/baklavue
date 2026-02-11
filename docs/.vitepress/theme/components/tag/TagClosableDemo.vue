<script setup>
import { BvTag } from "@baklavue/ui";
import { ref } from "vue";

const visible = ref(true);
</script>

<template>
  <div style="display: flex; gap: 0.5rem; flex-wrap: wrap">
    <BvTag v-if="visible" closable @close="visible = false">
      Removable tag (click X to remove)
    </BvTag>
  </div>
</template>
