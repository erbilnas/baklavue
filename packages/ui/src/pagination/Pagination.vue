<script setup lang="ts">
/**
 * Pagination Component
 *
 * A Vue wrapper for Baklava's `bl-pagination` web component for page navigation.
 * Supports v-model:currentPage for two-way binding and emits change events when
 * the user navigates to a different page.
 *
 * @component
 * @example
 * ```vue
 * <!-- Basic pagination -->
 * <template>
 *   <BvPagination
 *     v-model:current-page="currentPage"
 *     :total-items="100"
 *     :page-size="10"
 *     @change="handlePageChange"
 *   />
 * </template>
 * ```
 *
 * @example
 * ```vue
 * <!-- With jumper - jump directly to a page -->
 * <template>
 *   <BvPagination
 *     v-model:current-page="currentPage"
 *     :total-items="250"
 *     :page-size="25"
 *     :has-jumper="true"
 *     jumper-label="Go to page"
 *   />
 * </template>
 * ```
 *
 * @example
 * ```vue
 * <!-- With items-per-page select -->
 * <template>
 *   <BvPagination
 *     v-model:current-page="currentPage"
 *     :total-items="100"
 *     :page-size="10"
 *     :has-select="true"
 *     select-label="Items per page"
 *     :items-per-page-options="[
 *       { text: '10 Items', value: 10 },
 *       { text: '25 Items', value: 25 },
 *       { text: '50 Items', value: 50 }
 *     ]"
 *   />
 * </template>
 * ```
 */
import { onMounted } from "vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import type { PaginationProps } from "./pagination.types";

/**
 * Component props with default values.
 */
const props = withDefaults(defineProps<PaginationProps>(), {
  currentPage: undefined,
  totalItems: undefined,
  pageSize: undefined,
  hasJumper: false,
  jumperLabel: undefined,
  hasSelect: false,
  selectLabel: undefined,
  itemsPerPageOptions: undefined,
});

/**
 * Component events.
 */
const emit = defineEmits<{
  /**
   * Emitted when the current page changes.
   * Use v-model:currentPage for two-way binding.
   *
   * @param {number} page - The new current page number.
   */
  "update:currentPage": [page: number];

  /**
   * Emitted when the user navigates to a different page.
   * Payload contains selectedPage, prevPage, and itemsPerPage.
   *
   * @param {CustomEvent<{ selectedPage: number; prevPage: number; itemsPerPage: number }>} event - The change event from bl-pagination.
   */
  change: [event: CustomEvent];
}>();

/**
 * Handles the bl-change event from the underlying bl-pagination component.
 * Extracts selectedPage from event.detail and emits update:currentPage and change.
 *
 * @param {CustomEvent} event - The bl-change event from bl-pagination.
 */
const handleChange = (event: CustomEvent) => {
  emit("change", event);
  const detail = event.detail as
    | { selectedPage?: number; prevPage?: number; itemsPerPage?: number }
    | undefined;
  const page = detail?.selectedPage;
  if (page !== undefined) {
    emit("update:currentPage", page);
  }
};

/**
 * Lifecycle hook: Component mounted.
 * Loads Baklava resources required for bl-pagination.
 */
onMounted(() => {
  loadBaklavaResources();
});
</script>

<template>
  <bl-pagination
    v-bind="{
      'current-page': props.currentPage,
      'total-items': props.totalItems,
      'items-per-page': props.pageSize,
      'has-jumper': props.hasJumper === true ? true : undefined,
      'jumper-label': props.jumperLabel,
      'has-select': props.hasSelect === true ? true : undefined,
      'select-label': props.selectLabel,
      'items-per-page-options': props.itemsPerPageOptions,
    }"
    @bl-change="handleChange"
  >
    <slot />
  </bl-pagination>
</template>
