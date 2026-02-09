<script setup lang="ts">
import { onMounted } from "vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import type { TabProps } from "./tab.types";

const props = withDefaults(defineProps<TabProps>(), {
  activeTab: undefined,
  tabs: undefined,
  variant: undefined,
  orientation: undefined,
});

const emit = defineEmits<{
  "update:activeTab": [tab: string];
  "tab-change": [event: CustomEvent];
}>();

const handleTabChange = (event: CustomEvent) => {
  emit('tab-change', event);
  const tab = (event.target as any)?.activeTab;
  if (tab !== undefined) emit('update:activeTab', tab);
};

onMounted(() => {
  loadBaklavaResources();
});
</script>

<template>
  <bl-tabs
    v-bind="{
      ...props,
    }"
    @bl-tab-change="handleTabChange"
  >
    <template v-if="tabs">
      <bl-tab
        v-for="tab in tabs"
        :key="tab.value"
        :value="tab.value"
        :disabled="tab.disabled"
      >
        {{ tab.label }}
      </bl-tab>
    </template>
    <slot />
  </bl-tabs>
</template>
