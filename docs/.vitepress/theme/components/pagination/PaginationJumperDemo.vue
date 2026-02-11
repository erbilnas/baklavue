<script setup>
import { ref } from "vue";
import { BvPagination } from "@baklavue/ui";

const currentPage = ref(1);
</script>

<template>
  <BvPagination
    v-model:current-page="currentPage"
    :total-items="250"
    :page-size="25"
    :has-jumper="true"
    jumper-label="Go to page"
  />
</template>
