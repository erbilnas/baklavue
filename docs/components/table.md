# Table

A Vue UI kit component for Baklava's `bl-table` component for displaying tabular data. Supports columns, data, sorting, row selection, loading/empty states, pagination, title/header actions, and per-column custom slots.

## Basic Usage

Provide `columns` and `data` to render a table. Rows should include an `id` when using `selectable`; otherwise the row index is used.

<div class="component-demo">

<TableBasicDemo />

</div>

```vue
<template>
  <BvTable :columns="columns" :data="tableData" />
</template>

<script setup>
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
</script>
```

## Sortable

Enable column sorting with the `sortable` prop. Set `sortable: true` on individual columns to allow sorting by that column.

<div class="component-demo">

<TableSortableDemo />

</div>

```vue
<template>
  <BvTable :columns="columns" :data="tableData" :sortable="true" />
</template>

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
```

## Loading State

Use `isLoading` to show a loading state with a spinner and custom text.

<div class="component-demo">

<TableLoadingDemo />

</div>

```vue
<template>
  <BvTable
    :columns="columns"
    :data="tableData"
    :is-loading="isLoading"
    loading-text="Loading data..."
  />
</template>

<script setup>
import { ref } from "vue";
import { BvTable } from "@baklavue/ui";

const isLoading = ref(true);
const columns = [...];
const tableData = [...];
</script>
```

## Empty State

When `data` is empty, use the `empty-state` slot to customize the content shown.

<div class="component-demo">

<TableEmptyDemo />

</div>

```vue
<template>
  <BvTable :columns="columns" :data="tableData">
    <template #empty-state>
      <span>No data found</span>
    </template>
  </BvTable>
</template>

<script setup>
import { BvTable } from "@baklavue/ui";

const columns = [...];
const tableData = [];
</script>
```

## Pagination

Pass a `pagination` object to enable pagination. Listen to `@change` for page or items-per-page changes.

<div class="component-demo">

<TablePaginationDemo />

</div>

```vue
<template>
  <BvTable
    :columns="columns"
    :data="tableData"
    title="Users"
    :pagination="pagination"
    @change="onPageChange"
  />
</template>

<script setup>
import { ref, computed } from "vue";
import { BvTable } from "@baklavue/ui";

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
  const { selectedPage, itemsPerPage: newItemsPerPage } = event.detail;
  currentPage.value = selectedPage;
  itemsPerPage.value = newItemsPerPage;
};
</script>
```

## Column Slots

Use scoped slots named by column `key` to customize cell content. Each slot receives `{ row, value }`.

<div class="component-demo">

<TableColumnSlotsDemo />

</div>

```vue
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
];
</script>
```

## Selectable

Enable row selection with the `selectable` prop. Use `@select` to handle selection changes. When `selectable` is true, rows should have an `id` for reliable selection keys.

```vue
<template>
  <BvTable
    :columns="columns"
    :data="tableData"
    :selectable="true"
    :multiple="true"
    v-model:selected="selectedIds"
    @select="onSelect"
  />
</template>

<script setup>
import { ref } from "vue";
import { BvTable } from "@baklavue/ui";

const columns = [
  { key: "name", label: "Name" },
  { key: "age", label: "Age" },
];

const tableData = [
  { id: 1, name: "John", age: 30 },
  { id: 2, name: "Jane", age: 25 },
];

const selectedIds = ref([]);

const onSelect = (event) => {
  console.log("Selected:", event.detail);
};
</script>
```

## Title and Header Actions

Use the `title` prop and `header-actions` slot for a header bar above the table.

```vue
<template>
  <BvTable title="Users" :columns="columns" :data="tableData">
    <template #header-actions>
      <BvButton>Add User</BvButton>
    </template>
  </BvTable>
</template>
```

## Props

| Prop                | Type                   | Default     | Description                                |
| ------------------- | ---------------------- | ----------- | ------------------------------------------ |
| `title`             | `string`               | `undefined` | Optional title above the table             |
| `headerOptions`     | `object`               | `undefined` | `{ sticky?: boolean; minCellWidth?: string }` |
| `data`              | `TableRow[]`           | `[]`        | Table data rows                            |
| `columns`           | `TableColumn[]`        | `undefined` | Column definitions                         |
| `sortable`          | `boolean`              | `undefined` | Enable column sorting                      |
| `selectable`        | `boolean`              | `undefined` | Enable row selection                       |
| `multiple`          | `boolean`              | `undefined` | Enable multiple row selection              |
| `selected`          | `(string \| number)[]` | `undefined` | Selected row keys (v-model:selected)       |
| `sortKey`           | `string`               | `undefined` | Sort key for sorted column                 |
| `sortDirection`     | `string`               | `undefined` | Sort direction: '' \| 'asc' \| 'desc'      |
| `stickyFirstColumn` | `boolean`              | `undefined` | Make first column sticky                   |
| `stickyLastColumn`  | `boolean`              | `undefined` | Make last column sticky                    |
| `isLoading`         | `boolean`              | `undefined` | Show loading state                         |
| `pagination`        | `TablePaginationProps` | `undefined` | Pagination configuration                   |
| `loadingText`       | `string`               | `"Loading..."` | Text shown in loading state             |

## Events

| Event       | Payload                    | Description                       |
| ----------- | -------------------------- | --------------------------------- |
| `row-click` | `CustomEvent`              | Emitted when a row is clicked     |
| `sort`      | `CustomEvent`              | Emitted when sort options change  |
| `select`    | `CustomEvent<string[]>`    | Emitted when selected rows change |
| `change`    | `CustomEvent<PaginationDetail>` | Emitted when pagination changes (selectedPage, prevPage, itemsPerPage) |

## Slots

| Slot             | Props            | Description                               |
| ---------------- | ---------------- | ----------------------------------------- |
| `header-actions` | -                | Right side of title bar                   |
| `empty-state`    | -                | Content when `data.length === 0`          |
| `[column.key]`   | `{ row, value }` | Per-column cell content (scoped)           |

## Types

```typescript
import type {
  TableProps,
  TableColumn,
  TableRow,
  TablePaginationProps,
} from "@baklavue/ui";

interface TableColumn {
  key: string;
  label?: string;
  name?: string;
  sortable?: boolean;
}

type TableRow = Record<string, unknown> & { id?: string | number };

interface TablePaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  hasJumper?: boolean;
  jumperLabel?: string;
  hasSelect?: boolean;
  selectLabel?: string;
  itemsPerPageOptions?: { text: string; value: number }[];
}

interface TableProps {
  title?: string;
  headerOptions?: { sticky?: boolean; minCellWidth?: string };
  data?: TableRow[];
  columns?: TableColumn[];
  sortable?: boolean;
  selectable?: boolean;
  multiple?: boolean;
  selected?: (string | number)[];
  sortKey?: string;
  sortDirection?: string;
  stickyFirstColumn?: boolean;
  stickyLastColumn?: boolean;
  isLoading?: boolean;
  pagination?: TablePaginationProps;
  loadingText?: string;
}
```

## Usage Notes

- **Column keys**: Each column's `key` must match a property in the data rows. Use `label` or `name` for header text.
- **Row ids**: When `selectable` is true, rows should have an `id` (string or number) for reliable selection. Falls back to row index if absent.
- **Sortable columns**: Set `sortable: true` on the table and optionally on individual columns.
- **Empty state**: Provide custom content via the `empty-state` slot (e.g., icon, message, action button).
