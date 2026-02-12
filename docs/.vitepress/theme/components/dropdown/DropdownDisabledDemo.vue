<script setup>
import { BvDropdown } from "@baklavue/ui";

const menuItems = [
  { caption: "Enabled Item" },
  { caption: "Disabled Item", disabled: true },
  { caption: "Another Item" },
];
</script>

<template>
  <BvDropdown label="Actions" :items="menuItems" :disabled="true">
    <template #item="{ item }">
      <span style="color: black">{{ item.caption }}</span>
    </template>
  </BvDropdown>
</template>
