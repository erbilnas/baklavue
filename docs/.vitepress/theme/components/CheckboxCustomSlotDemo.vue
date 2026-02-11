<script setup>
import { BvCheckbox } from "@baklavue/ui";
import { ref } from "vue";

const selected = ref([]);
const items = [
  { value: "email", label: "Email notifications" },
  { value: "sms", label: "SMS notifications" },
  { value: "push", label: "Push notifications" },
];
</script>

<template>
  <BvCheckbox v-model="selected" :items="items">
    <template #item="{ item }">
      <span style="color: black">{{ item.label }}</span>
    </template>
  </BvCheckbox>
  <p
    v-if="selected.length"
    style="color: black; margin-top: 0.5rem; font-size: 0.875rem"
  >
    Selected: {{ selected.join(", ") }}
  </p>
</template>
