<script setup>
import { BvInput } from "@baklavue/ui";
import { ref } from "vue";

const search = ref("");
const isSearching = ref(true);
</script>

<template>
  <div style="max-width: 300px;">
    <BvInput
      v-model="search"
      label="Search"
      :loading="isSearching"
      placeholder="Type to search..."
    />
  </div>
</template>
