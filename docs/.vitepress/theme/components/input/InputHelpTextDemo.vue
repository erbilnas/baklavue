<script setup>
import { BvInput } from "@baklavue/ui";
import { ref } from "vue";

const password = ref("");
</script>

<template>
  <div style="max-width: 300px;">
    <BvInput
      v-model="password"
      type="password"
      label="Password"
      help-text="Must be at least 8 characters"
    />
  </div>
</template>
