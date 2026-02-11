<script setup>
import { BvSwitch } from "@baklavue/ui";
import { ref } from "vue";

const enabled = ref(false);
</script>

<template>
  <div>
    <p style="margin-bottom: 0.5rem">
      Notifications: {{ enabled ? "On" : "Off" }}
    </p>
    <BvSwitch v-model:checked="enabled" label="Enable notifications" />
  </div>
</template>
