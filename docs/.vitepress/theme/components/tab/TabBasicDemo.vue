<script setup>
import { BvTab } from "@baklavue/ui";
import { ref } from "vue";

const activeTab = ref("tab1");
const tabs = [
  { label: "Tab 1", value: "tab1" },
  { label: "Tab 2", value: "tab2" },
  { label: "Tab 3", value: "tab3" },
];
</script>

<template>
  <div>
    <p style="margin-bottom: 0.5rem">Active tab: {{ activeTab }}</p>
    <BvTab v-model:activeTab="activeTab" :tabs="tabs">
      <div v-if="activeTab === 'tab1'" style="color: black; padding: 1rem">
        Content for Tab 1
      </div>
      <div v-if="activeTab === 'tab2'" style="color: black; padding: 1rem">
        Content for Tab 2
      </div>
      <div v-if="activeTab === 'tab3'" style="color: black; padding: 1rem">
        Content for Tab 3
      </div>
    </BvTab>
  </div>
</template>
