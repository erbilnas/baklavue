<script setup>
import { ref } from "vue";
import { BvDropdown, BvButton } from "@baklavue/ui";

const dropdownRef = ref();
const menuItems = [
  { caption: "Option 1" },
  { caption: "Option 2" },
  { caption: "Option 3" },
];
</script>

<template>
  <div>
    <div style="margin-bottom: 1rem; display: flex; gap: 0.5rem">
      <BvButton @click="dropdownRef?.open()">Open</BvButton>
      <BvButton @click="dropdownRef?.close()">Close</BvButton>
      <BvButton @click="dropdownRef?.toggle()">Toggle</BvButton>
    </div>
    <BvDropdown ref="dropdownRef" label="Menu" :items="menuItems">
      <template #item="{ item }">
        <span style="color: black">{{ item.caption }}</span>
      </template>
    </BvDropdown>
  </div>
</template>
