<script setup>
import { ref } from "vue";
import { BvAccordion } from "@baklavue/ui";

const isOpen = ref(false);
</script>

<template>
  <BvAccordion
    caption="Slow Animation"
    :animation-duration="500"
    :open="isOpen"
    @toggle="isOpen = $event"
  >
    <p style="color: black">This accordion has a slower animation (500ms).</p>
  </BvAccordion>
</template>
