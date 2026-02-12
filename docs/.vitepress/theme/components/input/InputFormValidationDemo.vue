<script setup lang="ts">
import { BvButton, BvInput } from "@baklavue/ui";
import { ref } from "vue";

const form = ref({
  email: "",
  password: "",
});

const errors = ref({
  email: "",
  password: "",
});

const handleEmailInvalid = (validity: ValidityState) => {
  if (validity.typeMismatch) {
    errors.value.email = "Please enter a valid email";
  } else if (validity.valueMissing) {
    errors.value.email = "Email is required";
  }
};

const handlePasswordInvalid = (validity: ValidityState) => {
  if (validity.tooShort) {
    errors.value.password = "Password must be at least 8 characters";
  } else if (validity.valueMissing) {
    errors.value.password = "Password is required";
  }
};

const handleSubmit = () => {
  console.log("Form submitted:", form.value);
};
</script>

<template>
  <form @submit.prevent="handleSubmit" style="max-width: 300px; display: flex; flex-direction: column; gap: 1rem;">
    <BvInput
      v-model="form.email"
      type="email"
      label="Email"
      required
      :invalid-text="errors.email"
      @invalid="handleEmailInvalid"
    />
    <BvInput
      v-model="form.password"
      type="password"
      label="Password"
      required
      :minlength="8"
      :invalid-text="errors.password"
      help-text="Must be at least 8 characters"
      @invalid="handlePasswordInvalid"
    />
    <BvButton type="submit">Submit</BvButton>
  </form>
</template>
