<script setup>
import { BvButton, BvNotification } from "@baklavue/ui";
import { useNotification } from "@baklavue/composables";

const { success } = useNotification();

const showShortNotification = () => {
  success({
    caption: "Short duration",
    description: "This notification stays for 3 seconds.",
    duration: 3,
  });
};

const showLongNotification = () => {
  success({
    caption: "Long duration",
    description: "This notification stays for 10 seconds.",
    duration: 10,
  });
};
</script>

<template>
  <div>
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <BvButton @click="showShortNotification">Show 3s notification</BvButton>
      <BvButton @click="showLongNotification">Show 10s notification</BvButton>
    </div>
    <BvNotification :duration="5" />
  </div>
</template>
