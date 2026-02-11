<script setup>
import { BvPagination } from "@baklavue/ui";
import { ref } from "vue";

const currentPage = ref(1);

const handlePageChange = (event) => {
  const detail = event.detail;
  if (detail) {
    console.log(
      "Page changed:",
      detail.selectedPage,
      "Previous:",
      detail.prevPage,
      "Items per page:",
      detail.itemsPerPage,
    );
  }
};
</script>

<template>
  <div>
    <p style="margin-bottom: 0.5rem">Current page: {{ currentPage }}</p>
    <BvPagination
      v-model:current-page="currentPage"
      :total-items="100"
      :page-size="10"
      @change="handlePageChange"
    />
  </div>
</template>
