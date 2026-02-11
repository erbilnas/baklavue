<script setup>
import { ref } from "vue";
import { BvDialog, BvButton } from "@baklavue/ui";

const showDialog = ref(false);
</script>

<template>
  <div>
    <BvButton @click="showDialog = true">Open Dialog</BvButton>
    <BvDialog v-model:open="showDialog" caption="Simple Title">
      <p style="color: black">Use the <code>caption</code> prop for a simple text title instead of the header slot.</p>
    </BvDialog>
  </div>
</template>
