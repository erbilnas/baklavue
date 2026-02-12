<script setup>
import { BvButton, BvDrawer } from "@baklavue/ui";
import { ref } from "vue";

const showDrawer = ref(false);
</script>

<template>
  <div>
    <BvButton @click="showDrawer = true">Open Drawer</BvButton>
    <BvDrawer v-model:open="showDrawer">
      <p style="color: black">Drawer content goes here.</p>
    </BvDrawer>
  </div>
</template>
