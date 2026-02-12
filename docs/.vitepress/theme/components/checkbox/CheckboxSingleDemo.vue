<script setup>
import { BvCheckbox } from "@baklavue/ui";
import { ref } from "vue";

const checked = ref(false);
</script>

<template>
  <div>
    <BvCheckbox v-model="checked" label="I agree to the terms and conditions" />
    <p v-if="checked" style="margin-top: 0.5rem; font-size: 0.875rem">
      Checked: {{ checked }}
    </p>
  </div>
</template>
