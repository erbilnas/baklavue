# Data Display

Components for displaying data and content.

## BvTable

[Table](/components/table) · `import { BvTable } from "@baklavue/ui"`

| Prop            | Type                   | Description          |
| --------------- | ---------------------- | -------------------- |
| `data`          | `TableRow[]`           | Table rows           |
| `columns`       | `TableColumn[]`        | Column definitions   |
| `title`         | `string`               | Table title          |
| `sortable`      | `boolean`              | Enable sorting       |
| `selectable`    | `boolean`              | Enable row selection |
| `multiple`      | `boolean`              | Multi-select         |
| `selected`      | `(string \| number)[]` | v-model:selected     |
| `sortKey`       | `string`               | Sorted column        |
| `sortDirection` | `string`               | asc, desc            |
| `isLoading`     | `boolean`              | Loading state        |
| `pagination`    | `TablePaginationProps` | Pagination config    |

**Events:** `update:selected`, `sort`, `row-click`

**Slots:** `default` (custom cell content), `empty`

## BvIcon

[Icon](/components/icon) · `import { BvIcon } from "@baklavue/ui"`

| Prop    | Type          | Description                  |
| ------- | ------------- | ---------------------------- |
| `name`  | `BaklavaIcon` | Icon name from Baklava icons |
| `size`  | `string`      | CSS size (e.g. "24px")       |
| `color` | `string`      | CSS color                    |

## BvImage

[Image](/components/image) · `import { BvImage } from "@baklavue/ui"`

| Prop          | Type               | Description                          |
| ------------- | ------------------ | ------------------------------------ |
| `src`         | `string`           | Image URL (required)                 |
| `alt`         | `string`           | Accessible description (required)    |
| `width`       | `string`           | CSS width (prevents CLS)              |
| `height`      | `string`           | CSS height                           |
| `loading`     | `"lazy" \| "eager"` | Native loading behavior (default: lazy) |
| `placeholder` | `"skeleton" \| "none"` | Placeholder type (default: skeleton) |
| `objectFit`   | `string`           | CSS object-fit (default: cover)       |
| `srcset`      | `string`           | Responsive image sources             |
| `sizes`       | `string`           | Sizes attribute for srcset            |

**Events:** `load`, `error`

**Slots:** `placeholder`, `fallback`
