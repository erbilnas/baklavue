<script setup lang="ts">
import { onMounted } from "vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import type { PaginationProps } from "./pagination.types";

const props = withDefaults(defineProps<PaginationProps>(), {
  currentPage: undefined,
  totalPages: undefined,
  pageSize: undefined,
  showFirstLast: undefined,
  showPrevNext: undefined,
});

const emit = defineEmits<{
  "update:currentPage": [page: number];
  change: [event: CustomEvent];
}>();

const handleChange = (event: CustomEvent) => {
  emit('change', event);
  const page = (event.target as any)?.currentPage;
  if (page !== undefined) emit('update:currentPage', page);
};

onMounted(() => {
  loadBaklavaResources();
});
</script>

<template>
  <bl-pagination
    v-bind="{
      ...props,
      'show-first-last': props.showFirstLast === true ? true : undefined,
      'show-prev-next': props.showPrevNext === true ? true : undefined,
    }"
    @bl-change="handleChange"
  >
    <slot />
  </bl-pagination>
</template>
