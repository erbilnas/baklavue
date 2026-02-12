<script setup>
import { ref } from "vue";
import { BvBanner } from "@baklavue/ui";

const actions = ref([
  {
    label: "Action 1",
    variant: "tertiary",
    onClick: () => console.log("Action 1"),
  },
  {
    label: "Action 2",
    variant: "tertiary",
    trailingIcon: "arrow_right",
    onClick: () => console.log("Action 2"),
  },
]);
</script>

<template>
  <BvBanner
    title="This is a banner with actions."
    :actions="actions"
  />
</template>
