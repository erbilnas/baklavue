<script setup>
import { BvInput } from "@baklavue/ui";
import { ref } from "vue";

const value = ref("");
</script>

<template>
  <BvInput v-model="value" label="Email" placeholder="Enter your email" />

  <p>Value: {{ value }}</p>
</template>
