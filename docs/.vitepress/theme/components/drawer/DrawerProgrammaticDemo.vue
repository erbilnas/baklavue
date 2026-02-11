<script setup>
import { ref } from "vue";
import { BvDrawer, BvButton } from "@baklavue/ui";

const drawerRef = ref();
</script>

<template>
  <div>
    <div style="margin-bottom: 1rem; display: flex; gap: 0.5rem;">
      <BvButton @click="drawerRef?.open()">Open</BvButton>
      <BvButton @click="drawerRef?.close()">Close</BvButton>
    </div>
    <BvDrawer ref="drawerRef" caption="Programmatically Controlled">
      <p style="color: black">
        This drawer can be opened and closed via button clicks or programmatically.
      </p>
    </BvDrawer>
  </div>
</template>
