<script setup lang="ts">
import { BvInput } from "@baklavue/ui";
import { ref } from "vue";

const email = ref("");
const emailError = ref("");

const handleInvalid = (validity: ValidityState) => {
  if (validity.typeMismatch) {
    emailError.value = "Please enter a valid email address";
  } else if (validity.valueMissing) {
    emailError.value = "Email is required";
  }
};
</script>

<template>
  <div style="max-width: 300px;">
    <BvInput
      v-model="email"
      type="email"
      label="Email"
      required
      :invalid-text="emailError"
      @invalid="handleInvalid"
    />
  </div>
</template>
