# Navigation Components

Components for navigation and user actions.

## BvScrollToTop

[ScrollToTop](/components/scroll-to-top) · `import { BvScrollToTop } from "@baklavue/ui"`

| Prop        | Type                 | Description                                  |
| ----------- | -------------------- | -------------------------------------------- |
| `threshold` | `number`             | Scroll threshold (px) before button appears   |
| `position`  | `ScrollToTopPosition` | bottom-right, bottom-left, top-right, top-left |
| `label`     | `string`             | Accessible label                             |
| `size`      | `ButtonSize`         | Button size                                  |
| `variant`   | `ButtonVariant`      | Button variant                               |

**Events:** `click`

## BvLink

[Link](/components/link) · `import { BvLink } from "@baklavue/ui"`

| Prop       | Type          | Description           |
| ---------- | ------------- | --------------------- |
| `href`     | `string`      | URL                   |
| `target`   | `string`      | \_self, \_blank, etc. |
| `variant`  | `LinkVariant` | inline, standalone    |
| `size`     | `LinkSize`    | small, medium, large  |
| `kind`     | `LinkKind`    | primary, neutral      |
| `disabled` | `boolean`     | Disabled state        |

## BvPagination

[Pagination](/components/pagination) · `import { BvPagination } from "@baklavue/ui"`

| Prop                  | Type                   | Description           |
| --------------------- | ---------------------- | --------------------- |
| `currentPage`         | `number`               | v-model:currentPage   |
| `totalItems`          | `number`               | Total item count      |
| `pageSize`            | `number`               | Items per page        |
| `hasJumper`           | `boolean`              | Page jumper input     |
| `hasSelect`           | `boolean`              | Items-per-page select |
| `itemsPerPageOptions` | `ItemsPerPageOption[]` | Select options        |

**Events:** `update:currentPage`, `change`

## BvSplitButton

[Split Button](/components/split-button) · `import { BvSplitButton } from "@baklavue/ui"`

| Prop       | Type          | Description          |
| ---------- | ------------- | -------------------- |
| `variant`  | `string`      | primary, secondary   |
| `size`     | `string`      | small, medium, large |
| `label`    | `string`      | Button label         |
| `icon`     | `BaklavaIcon` | Icon name            |
| `disabled` | `boolean`     | Disabled state       |
| `loading`  | `boolean`     | Loading state        |

**Slots:** `default` (dropdown items)
