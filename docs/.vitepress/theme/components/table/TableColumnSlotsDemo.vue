<script setup>
import { BvTable } from "@baklavue/ui";

const columns = [
  { key: "name", label: "Name" },
  { key: "status", label: "Status" },
  { key: "email", label: "Email" },
];

const tableData = [
  { id: 1, name: "John Doe", status: "active", email: "john@example.com" },
  { id: 2, name: "Jane Smith", status: "inactive", email: "jane@example.com" },
  { id: 3, name: "Bob Wilson", status: "active", email: "bob@example.com" },
];
</script>

<template>
  <BvTable :columns="columns" :data="tableData">
    <template #status="{ value }">
      <span
        :style="{
          color: value === 'active' ? 'var(--bl-color-success)' : 'var(--bl-color-neutral-600)',
          fontWeight: 500,
        }"
      >
        {{ value }}
      </span>
    </template>
  </BvTable>
</template>
