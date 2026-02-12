<script setup>
import { BvDropdown } from "@baklavue/ui";

const menuItems = [
  { caption: "Edit" },
  { caption: "Duplicate" },
  { caption: "Delete" },
];
</script>

<template>
  <BvDropdown label="Actions" :items="menuItems">
    <template #item="{ item }">
      <span style="color: black">{{ item.caption }}</span>
    </template>
  </BvDropdown>
</template>
