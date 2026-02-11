<script setup>
import { BvSplitButton } from "@baklavue/ui";

const handleClick = () => {
  console.log("Save clicked");
};
</script>

<template>
  <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
    <BvSplitButton
      label="Save"
      icon="check"
      variant="primary"
      @click="handleClick"
    >
      <template #dropdown-content>
        <bl-dropdown-item>Save as draft</bl-dropdown-item>
        <bl-dropdown-item>Save and publish</bl-dropdown-item>
      </template>
    </BvSplitButton>
    <BvSplitButton
      label="Download"
      icon="download"
      variant="secondary"
      @click="handleClick"
    />
  </div>
</template>
