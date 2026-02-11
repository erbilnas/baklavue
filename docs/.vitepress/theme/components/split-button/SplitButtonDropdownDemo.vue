<script setup>
import { BvSplitButton } from "@baklavue/ui";
import { ref } from "vue";

const lastAction = ref("");

const handleClick = () => {
  lastAction.value = "Main button";
};
</script>

<template>
  <div>
    <div style="margin-bottom: 1rem">
      Last action: {{ lastAction || "None" }}
    </div>
    <BvSplitButton label="More options" @click="handleClick">
      <template #dropdown-content>
        <bl-dropdown-item>Edit</bl-dropdown-item>
        <bl-dropdown-item>Duplicate</bl-dropdown-item>
        <bl-dropdown-item>Delete</bl-dropdown-item>
      </template>
    </BvSplitButton>
  </div>
</template>
