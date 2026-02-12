<script setup>
import { BvTextarea } from "@baklavue/ui";
import { ref } from "vue";

const comment = ref("");
</script>

<template>
  <BvTextarea
    v-model="comment"
    label="Comment"
    placeholder="Enter your comment"
    :maxlength="200"
    help-text="Maximum 200 characters"
    :required="true"
  />
</template>
