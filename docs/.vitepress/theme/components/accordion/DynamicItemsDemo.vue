<script setup>
import { ref, computed, onMounted } from "vue";
import { BvAccordion } from "@baklavue/ui";

const loading = ref(true);
const apiData = ref([]);

const accordionItems = computed(() => {
  return apiData.value.map((item) => ({
    caption: item.title,
    content: item.description,
    icon: item.icon,
    disabled: item.disabled,
  }));
});

onMounted(async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  apiData.value = [
    { title: "Item 1", description: "Description 1", icon: "info" },
    { title: "Item 2", description: "Description 2", icon: "help" },
    { title: "Item 3", description: "Description 3", disabled: true },
  ];
  loading.value = false;
});
</script>

<template>
  <div>
    <div v-if="loading" style="color: black">Loading...</div>
    <BvAccordion v-else :multiple="true" :items="accordionItems">
      <template #item="{ item }">
        <p style="color: black">{{ item.content }}</p>
      </template>
    </BvAccordion>
  </div>
</template>
