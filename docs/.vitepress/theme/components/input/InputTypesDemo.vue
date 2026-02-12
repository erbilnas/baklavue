<script setup>
import { BvInput } from "@baklavue/ui";
import { ref } from "vue";

const text = ref("");
const email = ref("");
const password = ref("");
const number = ref(0);
const date = ref("");
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px;">
    <BvInput v-model="text" type="text" label="Text" />
    <BvInput v-model="email" type="email" label="Email" />
    <BvInput v-model="password" type="password" label="Password" />
    <BvInput v-model="number" type="number" label="Number" />
    <BvInput v-model="date" type="date" label="Date" />
  </div>
</template>
