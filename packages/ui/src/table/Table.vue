<script setup lang="ts">
/**
 * Table Component
 *
 * A Vue UI kit component for Baklava's `bl-table` web component for displaying tabular data.
 * Supports columns, data, sorting, row selection, loading/empty states, pagination,
 * and custom slots for header actions, empty state, and per-column cell content.
 *
 * @component
 * @example
 * ```vue
 * <!-- Basic usage -->
 * <template>
 *   <BvTable :columns="columns" :data="tableData" />
 * </template>
 * ```
 *
 * @example
 * ```vue
 * <!-- With loading and empty states -->
 * <template>
 *   <BvTable
 *     :columns="columns"
 *     :data="tableData"
 *     :is-loading="isLoading"
 *   >
 *     <template #empty-state>
 *       <span>No data found</span>
 *     </template>
 *   </BvTable>
 * </template>
 * ```
 */
import { computed, onMounted, type PropType } from "vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import BvSpinner from "../spinner/Spinner.vue";
import type {
  TableColumn,
  TableRow,
  TablePaginationProps,
} from "./table.types";

defineOptions({ inheritAttrs: false });

const props = defineProps({
    title: { type: String, default: undefined },
    headerOptions: {
      type: Object as PropType<{ sticky?: boolean; minCellWidth?: string }>,
      default: undefined,
    },
    data: { type: Array as PropType<TableRow[]>, default: () => [] },
    columns: { type: Array as PropType<TableColumn[]>, default: undefined },
    sortable: { type: Boolean, default: undefined },
    selectable: { type: Boolean, default: undefined },
    multiple: { type: Boolean, default: undefined },
    selected: {
      type: Array as PropType<(string | number)[]>,
      default: undefined,
    },
    sortKey: { type: String, default: undefined },
    sortDirection: { type: String, default: undefined },
    stickyFirstColumn: { type: Boolean, default: undefined },
    stickyLastColumn: { type: Boolean, default: undefined },
    isLoading: { type: Boolean, default: undefined },
    pagination: {
      type: Object as PropType<TablePaginationProps>,
      default: undefined,
    },
    loadingText: { type: String, default: "Loading..." },
});

const emit = defineEmits<{
  /**
   * Emitted when a row is clicked.
   * @param {CustomEvent} event - The bl-row-click event.
   */
  "row-click": [event: CustomEvent];
  /**
   * Emitted when table sort options change.
   * @param {CustomEvent} event - The bl-sort event.
   */
  sort: [event: CustomEvent];
  /**
   * Emitted when selected rows change.
   * @param {CustomEvent} event - The bl-row-select event.
   */
  select: [event: CustomEvent];
  /**
   * Emitted when pagination changes.
   * @param {CustomEvent} event - The bl-change event with selectedPage, prevPage, itemsPerPage.
   */
  change: [event: CustomEvent];
}>();

/**
 * Baklava table expects selected IDs to always be strings,
 * even when the actual data IDs might be numbers.
 */
const selectedIdsAsStrings = computed(() => {
  const s = props.selected;
  if (s == null || !Array.isArray(s)) return [];
  return s.map((id) => String(id));
});

/** Column header text: prefer name, then label, then key */
const getColumnLabel = (col: { key: string; label?: string; name?: string }) =>
  col.name ?? col.label ?? col.key;

/** Row key for :key and selection-key: prefer row.id, fallback to index */
const getRowKey = (row: Record<string, unknown> & { id?: string | number }, index: number) =>
  row.id != null ? String(row.id) : String(index);

onMounted(() => {
  loadBaklavaResources();
});
</script>

<template>
  <div class="table">
    <div v-if="props.title" class="header">
      <span class="--title">{{ props.title }}</span>
      <slot name="header-actions" />
    </div>

    <div class="table-content">
      <!-- Loading state -->
      <bl-table v-if="props.isLoading">
        <div class="loading-state">
          <BvSpinner />
          <span>{{ props.loadingText }}</span>
        </div>
      </bl-table>

      <!-- Empty state -->
      <bl-table v-else-if="!props.data?.length">
        <div class="empty-state">
          <slot name="empty-state" />
        </div>
      </bl-table>

      <!-- Data table -->
      <bl-table
        v-else
        v-bind="{
          sortable: props.sortable === true ? true : undefined,
          selectable: props.selectable === true ? true : undefined,
          multiple: props.multiple === true ? true : undefined,
          ...(props.selectable && { selected: selectedIdsAsStrings }),
          sortKey: props.sortKey,
          sortDirection: props.sortDirection,
          stickyFirstColumn: props.stickyFirstColumn,
          stickyLastColumn: props.stickyLastColumn,
        }"
        @bl-sort="emit('sort', $event)"
        @bl-row-select="emit('select', $event)"
      >
        <bl-table-header :sticky="props.headerOptions?.sticky">
          <bl-table-row>
            <bl-table-header-cell
              v-for="column in props.columns"
              :key="column.key"
              :sort-key="
                props.sortable && column.sortable !== false ? column.key : undefined
              "
              :style="{
                '--bl-table-header-cell-min-width':
                  props.headerOptions?.minCellWidth || '100px',
              }"
            >
              {{ getColumnLabel(column) }}
            </bl-table-header-cell>
          </bl-table-row>
        </bl-table-header>

        <bl-table-body>
          <bl-table-row
            v-for="(row, index) in props.data"
            :key="getRowKey(row, index)"
            :selection-key="props.selectable ? getRowKey(row, index) : undefined"
          >
            <bl-table-cell v-for="column in props.columns" :key="column.key">
              <slot
                :name="column.key"
                :row="row"
                :value="row[column.key]"
              >
                {{ row[column.key] }}
              </slot>
            </bl-table-cell>
          </bl-table-row>
        </bl-table-body>
      </bl-table>
    </div>

    <div v-if="props.pagination" class="pagination-wrapper">
      <bl-pagination
        :current-page="props.pagination!.currentPage"
        :total-items="props.pagination!.totalItems"
        :items-per-page="props.pagination!.itemsPerPage"
        :has-jumper="props.pagination!.hasJumper ?? undefined"
        :has-select="props.pagination!.hasSelect ?? undefined"
        :jumper-label="props.pagination!.jumperLabel ?? 'Go to page'"
        :select-label="props.pagination!.selectLabel ?? 'Items per page'"
        :items-per-page-options="props.pagination!.itemsPerPageOptions"
        @bl-change="emit('change', $event)"
      />
    </div>
  </div>
</template>

<style lang="css" scoped>
.table {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.--title {
  font: var(--bl-font-title-1-medium);
}

.table-content {
  width: 100%;
  overflow-x: auto;
}

.table-content > bl-table {
  min-width: max-content;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px;
  gap: 16px;
}

.loading-state span {
  font: var(--bl-font-body-2-regular);
  color: var(--bl-color-primary);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px;
  gap: 12px;
}

.pagination-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
