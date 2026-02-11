<script setup>
import { BvDropdown } from "@baklavue/ui";

const menuItems = [
  { caption: "Dashboard", icon: "dashboard" },
  { caption: "Settings", icon: "settings" },
  { caption: "Profile", icon: "user" },
];
</script>

<template>
  <BvDropdown label="Menu" :items="menuItems">
    <template #item="{ item }">
      <span style="color: black">{{ item.caption }}</span>
    </template>
  </BvDropdown>
</template>
