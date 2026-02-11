<script setup>
import { ref } from "vue";
import { BvDialog, BvButton } from "@baklavue/ui";

const closableDemo = ref(false);
</script>

<template>
  <div>
    <BvButton @click="closableDemo = true">Open (closable)</BvButton>
    <BvDialog v-model:open="closableDemo" :closable="true">
      <template #header>
        <span style="color: black; font-weight: 600;">Closable Dialog</span>
      </template>
      <p style="color: black">This dialog has a close button. Click the X to dismiss.</p>
    </BvDialog>
  </div>
</template>
