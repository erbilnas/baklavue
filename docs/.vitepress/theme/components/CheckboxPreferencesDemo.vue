<script setup>
import { ref } from "vue";
import { BvCheckbox } from "@baklavue/ui";

const prefs = ref([]);
const preferenceItems = [
  { value: "newsletter", label: "Subscribe to newsletter" },
  { value: "updates", label: "Product updates" },
  { value: "marketing", label: "Marketing emails" },
];
</script>

<template>
  <div>
    <h3 style="color: black; margin-bottom: 1rem">Notification Preferences</h3>
    <BvCheckbox v-model="prefs" :items="preferenceItems">
      <template #item="{ item }">
        <span style="color: black">{{ item.label }}</span>
      </template>
    </BvCheckbox>
    <p v-if="prefs.length" style="color: black; margin-top: 0.5rem; font-size: 0.875rem">
      Selected: {{ prefs.join(", ") }}
    </p>
  </div>
</template>
