<script setup>
import { BvButton, BvInput } from "@baklavue/ui";
import { ref } from "vue";

const email = ref("");
const isSubmitting = ref(false);

const handleSubmit = async () => {
  isSubmitting.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  isSubmitting.value = false;
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="form-demo">
    <BvInput v-model="email" label="Email" />
    <BvButton type="submit" :loading="isSubmitting">Submit</BvButton>
  </form>
</template>

<style scoped>
.form-demo {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 20rem;
  width: 100%;
}
</style>
