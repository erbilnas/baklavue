<script setup>
import { BvButton, BvDrawer } from "@baklavue/ui";
import { ref } from "vue";

const showDrawer = ref(false);
</script>

<template>
  <div>
    <BvButton @click="showDrawer = true">Open Drawer</BvButton>
    <BvDrawer v-model:open="showDrawer" caption="Drawer Title">
      <p style="color: black">
        Use the <code>caption</code> prop for the drawer title.
      </p>
    </BvDrawer>
  </div>
</template>
