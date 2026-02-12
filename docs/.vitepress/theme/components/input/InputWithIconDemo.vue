<script setup>
import { BvInput } from "@baklavue/ui";
import { ref } from "vue";

const search = ref("");
</script>

<template>
  <div style="max-width: 300px;">
    <BvInput v-model="search" label="Search" icon="search" />
  </div>
</template>
