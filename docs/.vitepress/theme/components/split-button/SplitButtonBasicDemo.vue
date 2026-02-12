<script setup>
import { BvSplitButton } from "@baklavue/ui";

const handleClick = () => {
  console.log("Main button clicked");
};
</script>

<template>
  <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
    <BvSplitButton label="Actions" @click="handleClick">
      <template #dropdown-content>
        <bl-dropdown-item>Action 1</bl-dropdown-item>
        <bl-dropdown-item>Action 2</bl-dropdown-item>
        <bl-dropdown-item>Action 3</bl-dropdown-item>
      </template>
    </BvSplitButton>
    <BvSplitButton label="Primary" variant="primary" @click="handleClick" />
    <BvSplitButton label="Secondary" variant="secondary" @click="handleClick" />
  </div>
</template>
