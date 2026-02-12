<script setup lang="ts">
/**
 * Tab Component
 *
 * A Vue UI kit component for Baklava's `bl-tabs` (bl-tab-group / bl-tab / bl-tab-panel) web components
 * for tab navigation. Use the `tabs` prop for declarative configuration or the default slot
 * for custom tab content.
 *
 * @component
 * @example
 * ```vue
 * <!-- Basic usage with tabs prop -->
 * <template>
 *   <BvTab v-model:activeTab="activeTab" :tabs="tabOptions">
 *     <div v-if="activeTab === 'tab1'">Content 1</div>
 *     <div v-if="activeTab === 'tab2'">Content 2</div>
 *   </BvTab>
 * </template>
 * ```
 *
 * @example
 * ```vue
 * <!-- Custom slots -->
 * <template>
 *   <BvTab v-model:activeTab="active">
 *     <bl-tab value="a">Tab A</bl-tab>
 *     <bl-tab value="b">Tab B</bl-tab>
 *     <bl-tab-panel tab="a">Panel A content</bl-tab-panel>
 *     <bl-tab-panel tab="b">Panel B content</bl-tab-panel>
 *   </BvTab>
 * </template>
 * ```
 */
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
  /**
   * Emitted when the active tab changes (use with v-model:activeTab).
   * @param {string} tab - The new active tab value.
   */
  "update:activeTab": [tab: string];
  /**
   * Emitted when tab selection changes (raw CustomEvent from bl-tabs).
   * @param {CustomEvent} event - The bl-tab-change event.
   */
  "tab-change": [event: CustomEvent];
}>();

/**
 * Handles the bl-tab-selected event from the underlying bl-tab-group.
 * Emits update:activeTab with the new tab value and tab-change with the raw event.
 *
 * @param {CustomEvent} event - The bl-tab-selected event from bl-tab (detail is tab name).
 */
const handleTabChange = (event: CustomEvent<string>) => {
  emit("tab-change", event);
  const tab = event.detail;
  if (tab !== undefined) emit("update:activeTab", tab);
};

onMounted(() => {
  loadBaklavaResources();
});
</script>

<template>
  <bl-tab-group @bl-tab-selected="handleTabChange">
    <template v-if="tabs">
      <bl-tab
        v-for="tab in tabs"
        :key="tab.value"
        slot="tabs"
        :name="tab.value"
        :caption="tab.label"
        :disabled="tab.disabled"
        :selected="props.activeTab === tab.value"
      >
        {{ tab.label }}
      </bl-tab>
      <bl-tab-panel
        v-for="tab in tabs"
        :key="`panel-${tab.value}`"
        :tab="tab.value"
      >
        <slot />
      </bl-tab-panel>
    </template>
    <slot v-else />
  </bl-tab-group>
</template>
