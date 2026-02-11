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
        <span style="color: black; font-weight: 600;">Dialog Title</span>
      </template>
      <p style="color: black">Dialog content goes here.</p>
    </BvDialog>
  </div>
</template>
