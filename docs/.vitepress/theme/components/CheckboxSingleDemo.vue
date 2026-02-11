<script setup>
import { ref } from "vue";
import { BvCheckbox } from "@baklavue/ui";

const checked = ref(false);
</script>

<template>
  <div>
    <BvCheckbox v-model="checked" label="I agree to the terms and conditions" />
    <p v-if="checked" style="color: black; margin-top: 0.5rem; font-size: 0.875rem">
      Checked: {{ checked }}
    </p>
  </div>
</template>
