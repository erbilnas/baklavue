<script setup>
import { BvAccordion } from "@baklavue/ui";

defineProps({
  multiple: {
    type: Boolean,
    default: false,
  },
});

const items = [
  { caption: "Question 1", content: "Answer to question 1 goes here." },
  { caption: "Question 2", content: "Answer to question 2 goes here." },
  { caption: "Question 3", content: "Answer to question 3 goes here." },
];

const multipleItems = [
  { caption: "Section 1", content: "Content for section 1." },
  { caption: "Section 2", content: "Content for section 2." },
  { caption: "Section 3", content: "Content for section 3." },
];
</script>

<template>
  <BvAccordion :multiple="multiple" :items="multiple ? multipleItems : items">
    <template #item="{ item }">
      <p style="color: black">{{ item.content }}</p>
    </template>
  </BvAccordion>
</template>
