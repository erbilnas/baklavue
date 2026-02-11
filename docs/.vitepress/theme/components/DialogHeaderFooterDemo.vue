<script setup>
import { ref } from "vue";
import { BvDialog, BvButton } from "@baklavue/ui";

const showDialog = ref(false);
</script>

<template>
  <div>
    <BvButton @click="showDialog = true">Open Dialog</BvButton>
    <BvDialog v-model:open="showDialog">
      <template #header>
        <span style="color: black; font-weight: 600;">Confirm Action</span>
      </template>
      <p style="color: black">
        Are you sure you want to proceed? This action cannot be undone.
      </p>
      <template #footer>
        <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
          <BvButton variant="tertiary" @click="showDialog = false">Cancel</BvButton>
          <BvButton variant="primary" @click="showDialog = false">Confirm</BvButton>
        </div>
      </template>
    </BvDialog>
  </div>
</template>
