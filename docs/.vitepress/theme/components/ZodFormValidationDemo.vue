<script setup lang="ts">
import { BvButton, BvInput } from "@baklavue/ui";
import { useZodForm } from "@baklavue/composables";
import { ref } from "vue";
import { z } from "zod";

const form = ref({
  email: "",
  password: "",
});

const schema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const { validate, getError, scrollToFirstError } = useZodForm(schema, form, {
  mode: "lazy",
});

const handleSubmit = async () => {
  const errors = await validate();
  if (!errors) {
    console.log("Form submitted:", form.value);
  } else {
    scrollToFirstError();
  }
};
</script>

<template>
  <form
    @submit.prevent="handleSubmit"
    style="max-width: 300px; display: flex; flex-direction: column; gap: 1rem"
  >
    <div data-field="email">
      <BvInput
        v-model="form.email"
        type="email"
        label="Email"
        :invalid-text="getError('email')"
      />
    </div>
    <div data-field="password">
      <BvInput
        v-model="form.password"
        type="password"
        label="Password"
        help-text="Must be at least 8 characters"
        :invalid-text="getError('password')"
      />
    </div>
    <BvButton type="submit">Submit</BvButton>
  </form>
</template>
