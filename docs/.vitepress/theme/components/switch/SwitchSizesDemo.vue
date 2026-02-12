<script setup>
import { ref } from "vue";
import { BvSwitch } from "@baklavue/ui";

const small = ref(false);
const medium = ref(false);
const large = ref(false);
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <BvSwitch v-model:checked="small" size="small" label="Small" />
    <BvSwitch v-model:checked="medium" size="medium" label="Medium" />
    <BvSwitch v-model:checked="large" size="large" label="Large" />
  </div>
</template>
