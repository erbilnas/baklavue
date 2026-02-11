<script setup>
import { BvTable } from "@baklavue/ui";

const columns = [
  { key: "name", label: "Name" },
  { key: "age", label: "Age" },
  { key: "email", label: "Email" },
];

const tableData = [];
</script>

<template>
  <BvTable :columns="columns" :data="tableData">
    <template #empty-state>
      <span>No data found</span>
    </template>
  </BvTable>
</template>
