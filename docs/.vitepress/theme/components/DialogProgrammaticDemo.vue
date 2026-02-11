<script setup>
import { ref } from "vue";
import { BvDialog, BvButton } from "@baklavue/ui";

const dialogRef = ref();
</script>

<template>
  <div>
    <div style="margin-bottom: 1rem; display: flex; gap: 0.5rem;">
      <BvButton @click="dialogRef?.open()">Open</BvButton>
      <BvButton @click="dialogRef?.close()">Close</BvButton>
    </div>
    <BvDialog ref="dialogRef">
      <template #header>
        <span style="color: black; font-weight: 600;">Programmatically Controlled</span>
      </template>
      <p style="color: black">
        This dialog can be opened and closed via button clicks or programmatically.
      </p>
    </BvDialog>
  </div>
</template>
