<script setup lang="ts">
import { onMounted } from "vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import type { TableProps } from "./table.types";

const props = withDefaults(defineProps<TableProps>(), {
  data: undefined,
  columns: undefined,
  sortable: undefined,
  selectable: undefined,
  pagination: undefined,
});

const emit = defineEmits<{
  "row-click": [event: CustomEvent];
  sort: [event: CustomEvent];
  select: [event: CustomEvent];
}>();

onMounted(() => {
  loadBaklavaResources();
});
</script>

<template>
  <bl-table
    v-bind="{
      ...props,
      sortable: props.sortable === true ? true : undefined,
      selectable: props.selectable === true ? true : undefined,
      pagination: props.pagination === true ? true : undefined,
    }"
    @bl-row-click="emit('row-click', $event)"
    @bl-sort="emit('sort', $event)"
    @bl-select="emit('select', $event)"
  >
    <slot v-if="$slots['header']" name="header" />
    <slot v-if="$slots['row']" name="row" />
    <slot v-if="$slots['footer']" name="footer" />
    <slot />
  </bl-table>
</template>
