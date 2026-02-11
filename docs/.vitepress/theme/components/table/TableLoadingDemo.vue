<script setup>
import { ref } from "vue";
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
];

const isLoading = ref(true);
</script>

<template>
  <BvTable
    :columns="columns"
    :data="tableData"
    :is-loading="isLoading"
    loading-text="Loading data..."
  />
</template>
