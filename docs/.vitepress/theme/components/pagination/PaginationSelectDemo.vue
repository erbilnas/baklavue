<script setup>
import { ref } from "vue";
import { BvPagination } from "@baklavue/ui";

const currentPage = ref(1);

const itemsPerPageOptions = [
  { text: "10 Items", value: 10 },
  { text: "25 Items", value: 25 },
  { text: "50 Items", value: 50 },
  { text: "100 Items", value: 100 },
];
</script>

<template>
  <BvPagination
    v-model:current-page="currentPage"
    :total-items="100"
    :page-size="10"
    :has-select="true"
    select-label="Items per page"
    :items-per-page-options="itemsPerPageOptions"
  />
</template>
