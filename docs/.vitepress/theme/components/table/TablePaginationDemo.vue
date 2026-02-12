<script setup>
import { ref, computed } from "vue";
import { BvTable } from "@baklavue/ui";

const columns = [
  { key: "name", label: "Name" },
  { key: "age", label: "Age" },
  { key: "email", label: "Email" },
];

const tableData = [
  { id: 1, name: "John Doe", age: 30, email: "john@example.com" },
  { id: 2, name: "Jane Smith", age: 25, email: "jane@example.com" },
  { id: 3, name: "Bob Wilson", age: 35, email: "bob@example.com" },
  { id: 4, name: "Alice Brown", age: 28, email: "alice@example.com" },
  { id: 5, name: "Charlie Davis", age: 42, email: "charlie@example.com" },
];

const currentPage = ref(1);
const itemsPerPage = ref(10);

const pagination = computed(() => ({
  currentPage: currentPage.value,
  totalItems: 50,
  itemsPerPage: itemsPerPage.value,
  hasJumper: true,
  jumperLabel: "Go to page",
  hasSelect: true,
  selectLabel: "Items per page",
  itemsPerPageOptions: [
    { text: "5 Items", value: 5 },
    { text: "10 Items", value: 10 },
    { text: "25 Items", value: 25 },
  ],
}));

const onPageChange = (event) => {
  const detail = event.detail;
  currentPage.value = detail.selectedPage;
  itemsPerPage.value = detail.itemsPerPage;
};
</script>

<template>
  <BvTable
    :columns="columns"
    :data="tableData"
    title="Users"
    :pagination="pagination"
    @change="onPageChange"
  />
</template>
