<script setup>
import { BvAccordion, BvButton } from "@baklavue/ui";
import { ref } from "vue";

const isOpen = ref(false);

const toggleAccordion = () => {
  isOpen.value = !isOpen.value;
};

const handleToggle = (val) => {
  isOpen.value = val;
};
</script>

<template>
  <div>
    <BvButton @click="toggleAccordion">
      {{ isOpen ? "Close" : "Open" }} Accordion
    </BvButton>

    <br />

    <BvAccordion
      :open="isOpen"
      @toggle="handleToggle"
      caption="Controlled Accordion"
    >
      <p style="color: black">
        This accordion's state is controlled by the parent component.
      </p>
      <p style="color: black">
        Current state: {{ isOpen ? "Open" : "Closed" }}
      </p>
    </BvAccordion>
  </div>
</template>
