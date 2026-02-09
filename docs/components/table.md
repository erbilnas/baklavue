# Table

A Vue wrapper for Baklava's `bl-table` component for displaying tabular data.

## Basic Usage

```vue
<template>
  <Table :columns="columns" :data="tableData" />
</template>

<script setup>
import { Table } from "@baklavue/ui";

const columns = [
  { key: "name", label: "Name" },
  { key: "age", label: "Age" },
  { key: "email", label: "Email" },
];

const tableData = [
  { name: "John", age: 30, email: "john@example.com" },
  { name: "Jane", age: 25, email: "jane@example.com" },
];
</script>
```

## Props

| Prop      | Type            | Default     | Description              |
| --------- | --------------- | ----------- | ------------------------ |
| `columns` | `TableColumn[]` | `undefined` | Table column definitions |
| `data`    | `any[]`         | `undefined` | Table data rows          |
