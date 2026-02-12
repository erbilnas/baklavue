<script setup>
import { BvTextarea } from "@baklavue/ui";
import { ref } from "vue";

const message = ref("");
</script>

<template>
  <BvTextarea
    v-model="message"
    label="Message"
    placeholder="Enter your message"
  />
</template>
