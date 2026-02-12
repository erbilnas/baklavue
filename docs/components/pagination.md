# Pagination

A Vue UI kit component for Baklava's `bl-pagination` web component for page navigation. Supports v-model for two-way binding of the current page and emits change events when the user navigates.

## Basic Usage

Use the Pagination component with `v-model:current-page` for two-way binding. Pass `total-items` (total item count) and `page-size` (items per page).

<div class="component-demo">

<PaginationBasicDemo />

</div>

```vue
<template>
  <div>
    <p>Current page: {{ currentPage }}</p>
    <BvPagination
      v-model:current-page="currentPage"
      :total-items="100"
      :page-size="10"
      @change="handlePageChange"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { BvPagination } from "@baklavue/ui";

const currentPage = ref(1);

const handlePageChange = (event) => {
  const detail = event.detail;
  if (detail) {
    console.log(
      "Page changed:",
      detail.selectedPage,
      "Previous:",
      detail.prevPage,
      "Items per page:",
      detail.itemsPerPage
    );
  }
};
</script>
```

## With Jumper

Add a jumper input to let users jump directly to a page. Set `has-jumper` to `true` and optionally provide a `jumper-label`.

<div class="component-demo">

<PaginationJumperDemo />

</div>

```vue
<template>
  <BvPagination
    v-model:current-page="currentPage"
    :total-items="250"
    :page-size="25"
    :has-jumper="true"
    jumper-label="Go to page"
  />
</template>

<script setup>
import { ref } from "vue";
import { BvPagination } from "@baklavue/ui";

const currentPage = ref(1);
</script>
```

## With Items Per Page Select

Add a select dropdown to let users choose how many items per page to display. Set `has-select` to `true` and provide `items-per-page-options`.

<div class="component-demo">

<PaginationSelectDemo />

</div>

```vue
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
```

## Props

| Prop                   | Type                    | Default     | Description                                                    |
| ---------------------- | ----------------------- | ----------- | -------------------------------------------------------------- |
| `currentPage`          | `number`                | `undefined` | Current page number (1-based). Supports v-model:currentPage.  |
| `totalItems`           | `number`                | `undefined` | Total number of items to be paginated                          |
| `pageSize`             | `number`                | `undefined` | Number of items per page                                       |
| `hasJumper`            | `boolean`               | `false`     | When true, adds a jumper input to jump directly to a page      |
| `jumperLabel`          | `string`                | `undefined` | Label for the jumper input                                     |
| `hasSelect`            | `boolean`               | `false`     | When true, adds a select to choose items per page              |
| `selectLabel`          | `string`                | `undefined` | Label for the items-per-page select                            |
| `itemsPerPageOptions`  | `ItemsPerPageOption[]`  | `undefined` | Options for the items-per-page select (`text`, `value`)        |

## Events

| Event                  | Payload | Description                                                                 |
| ---------------------- | ------- | --------------------------------------------------------------------------- |
| `update:currentPage`   | `number`| Emitted when the current page changes (for v-model:currentPage)              |
| `change`               | `CustomEvent` | Emitted when the user navigates. `event.detail` has `{ selectedPage, prevPage, itemsPerPage }` |

## Types

```typescript
import type { PaginationProps, ItemsPerPageOption } from "@baklavue/ui";

interface ItemsPerPageOption {
  text: string;
  value: number;
}

interface PaginationProps {
  currentPage?: number;
  totalItems?: number;
  pageSize?: number;
  hasJumper?: boolean;
  jumperLabel?: string;
  hasSelect?: boolean;
  selectLabel?: string;
  itemsPerPageOptions?: ItemsPerPageOption[];
}
```

## Usage Notes

- **Total Items vs Total Pages**: The component uses `totalItems` (total item count), not total pages. Baklava computes the page count internally from `totalItems` and `pageSize`.

- **v-model**: Use `v-model:current-page` for two-way binding of the current page number.

- **Change Event**: The `change` event receives a `CustomEvent` whose `detail` contains `{ selectedPage, prevPage, itemsPerPage }`.

- **Accessibility**: The component follows Baklava's accessibility guidelines for pagination controls.

- **Styling**: The component uses Baklava's default styling. Custom styling can be applied through CSS variables or by overriding the component styles.
