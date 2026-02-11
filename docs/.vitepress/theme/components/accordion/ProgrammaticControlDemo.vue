<script setup>
import { ref } from "vue";
import { BvAccordion, BvButton } from "@baklavue/ui";

const accordionRef = ref();
const isOpen = ref(false);

const expandAccordion = () => {
  accordionRef.value?.expand();
};

const collapseAccordion = () => {
  accordionRef.value?.collapse();
};
</script>

<template>
  <div>
    <div style="margin-bottom: 1rem; display: flex; gap: 0.5rem">
      <BvButton @click="expandAccordion">Expand</BvButton>
      <BvButton @click="collapseAccordion">Collapse</BvButton>
    </div>
    <BvAccordion
      ref="accordionRef"
      :open="isOpen"
      @toggle="isOpen = $event"
      caption="Programmatically Controlled Accordion"
    >
      <p style="color: black">
        This accordion can be controlled via buttons or programmatically.
      </p>
    </BvAccordion>
  </div>
</template>
