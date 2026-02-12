<script setup>
import { BvAccordion } from "@baklavue/ui";

const faqItems = [
  {
    caption: "What is BaklaVue?",
    content:
      "BaklaVue is a comprehensive Vue 3 UI kit for the Trendyol Baklava Design System. It provides Vue-friendly APIs with full TypeScript support.",
  },
  {
    caption: "How do I install BaklaVue?",
    content: "Install BaklaVue using your preferred package manager:",
    code: "bun add @baklavue/ui @baklavue/composables",
  },
  {
    caption: "Is BaklaVue free to use?",
    content: "Yes, BaklaVue is open source and free to use in your projects.",
  },
  {
    caption: "Does BaklaVue support TypeScript?",
    content:
      "Yes, BaklaVue is built with TypeScript and provides comprehensive type definitions for all components, props, events, and composables.",
  },
];
</script>

<template>
  <div>
    <h2 style="color: black; margin-bottom: 1rem">Frequently Asked Questions</h2>
    <BvAccordion :multiple="false" :items="faqItems">
      <template #item="{ item }">
        <div v-if="item.code" style="color: black">
          <p>{{ item.content }}</p>
          <pre><code>{{ item.code }}</code></pre>
        </div>
        <p v-else style="color: black">{{ item.content }}</p>
      </template>
    </BvAccordion>
  </div>
</template>
