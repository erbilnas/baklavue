<script setup>
import { BvDropdown } from "@baklavue/ui";

const groupedItems = [
  { caption: "New File", groupCaption: "File" },
  { caption: "Save", groupCaption: "File" },
  { caption: "Export", groupCaption: "File" },
  { caption: "Cut", groupCaption: "Edit" },
  { caption: "Copy", groupCaption: "Edit" },
  { caption: "Paste", groupCaption: "Edit" },
];
</script>

<template>
  <BvDropdown label="Actions" :items="groupedItems">
    <template #item="{ item }">
      <span style="color: black">{{ item.caption }}</span>
    </template>
  </BvDropdown>
</template>
