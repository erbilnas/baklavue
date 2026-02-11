<script setup>
import { ref } from "vue";
import { BvButton } from "@baklavue/ui";

const isLoading = ref(false);

const handleClick = async () => {
  isLoading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 2000));
  isLoading.value = false;
};
</script>

<template>
  <BvButton :loading="isLoading" @click="handleClick">Submit</BvButton>
</template>
