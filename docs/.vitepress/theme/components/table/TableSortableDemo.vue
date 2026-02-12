<script setup>
import { BvTable } from "@baklavue/ui";

const columns = [
  { key: "name", label: "Name", sortable: true },
  { key: "age", label: "Age", sortable: true },
  { key: "email", label: "Email" },
];

const tableData = [
  { id: 1, name: "John Doe", age: 30, email: "john@example.com" },
  { id: 2, name: "Jane Smith", age: 25, email: "jane@example.com" },
  { id: 3, name: "Bob Wilson", age: 35, email: "bob@example.com" },
];
</script>

<template>
  <BvTable :columns="columns" :data="tableData" :sortable="true" />
</template>
