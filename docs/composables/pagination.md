# usePagination

Pagination state for tables and lists. Provides `currentPage`, `pageSize`, `totalItems`, derived `totalPages`, `offset`, and a `slice` helper. Use with BvPagination or BvTable.

## Basic Usage

```vue
<template>
  <BvPagination
    v-model:current-page="currentPage"
    :total-items="totalItems"
    :page-size="pageSize"
  />
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { BvPagination } from "@baklavue/ui";
import { usePagination } from "@baklavue/composables";

const allItems = ref([/* ... */]);

const {
  currentPage,
  pageSize,
  totalItems,
  totalPages,
  setPage,
  setPageSize,
  setTotalItems,
  slice,
} = usePagination({
  totalItems: 100,
  pageSize: 10,
});

// Sync totalItems when data changes
watch(allItems, (items) => setTotalItems(items.length), { immediate: true });

// Get items for current page
const pageItems = computed(() => slice(allItems.value));
</script>
```

## With BvTable

```vue
<template>
  <BvTable
    :columns="columns"
    :data="pageData"
    :pagination="{
      currentPage,
      totalItems,
      itemsPerPage: pageSize,
    }"
  />
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { BvTable } from "@baklavue/ui";
import { usePagination } from "@baklavue/composables";

const allData = ref([/* ... */]);
const { currentPage, pageSize, totalItems, slice, setTotalItems } = usePagination({
  pageSize: 10,
});

watch(allData, (data) => setTotalItems(data.length), { immediate: true });

const pageData = computed(() => slice(allData.value));
</script>
```

## API

### Return Value

| Property | Type | Description |
| --- | --- | --- |
| `currentPage` | `Ref<number>` | Current page (1-based) |
| `pageSize` | `Ref<number>` | Items per page |
| `totalItems` | `Ref<number>` | Total item count |
| `totalPages` | `ComputedRef<number>` | Total pages |
| `offset` | `ComputedRef<number>` | Offset for current page |
| `setPage` | `(page: number) => void` | Set current page |
| `setPageSize` | `(size: number) => void` | Set items per page |
| `setTotalItems` | `(total: number) => void` | Set total items |
| `slice` | `<T>(arr: T[]) => T[]` | Slice array for current page |

### Options

```typescript
interface UsePaginationOptions {
  totalItems?: number;   // Default: 0
  pageSize?: number;     // Default: 10
  initialPage?: number;  // Default: 1
}
```

## TypeScript Support

```typescript
import { usePagination, type UsePaginationOptions } from "@baklavue/composables";

const options: UsePaginationOptions = { totalItems: 50, pageSize: 5 };
const pagination = usePagination(options);
```
