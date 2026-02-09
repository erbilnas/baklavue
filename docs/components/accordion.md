# Accordion

A Vue wrapper for Baklava's `bl-accordion` component for collapsible content.

## Basic Usage

```vue
<template>
  <Accordion>
    <AccordionItem title="Section 1"> Content for section 1 </AccordionItem>
    <AccordionItem title="Section 2"> Content for section 2 </AccordionItem>
  </Accordion>
</template>

<script setup>
import { Accordion, AccordionItem } from "@baklavue/ui";
</script>
```

## Props

| Prop       | Type      | Default     | Description               |
| ---------- | --------- | ----------- | ------------------------- |
| `multiple` | `boolean` | `undefined` | Allow multiple items open |
