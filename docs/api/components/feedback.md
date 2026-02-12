# Feedback Components

Components for displaying feedback and status information.

## BvBanner

[Banner](/components/banner) · `import { BvBanner } from "@baklavue/ui"`

| Prop        | Type              | Description                                        |
| ----------- | ----------------- | -------------------------------------------------- |
| `title`     | `string`          | Banner message text                                |
| `icon`      | `BaklavaIcon`     | Icon name next to title                            |
| `color`     | `BannerColor`     | primary, success, danger, warning, info, neutral    |
| `close`     | `boolean`         | Show close button                                  |
| `closeIcon` | `BaklavaIcon`     | Close button icon                                  |
| `id`        | `string`          | Unique ID for localStorage persistence             |
| `to`        | `string`          | Make banner a link (href)                           |
| `target`    | `string`          | Link target (e.g. _blank)                           |
| `actions`   | `BannerAction[]`  | Action buttons (label, variant, onClick)            |

**Events:** `close`

## BvAlert

[Alert](/components/alert) · `import { BvAlert } from "@baklavue/ui"`

| Prop          | Type                     | Description                    |
| ------------- | ------------------------ | ------------------------------ |
| `variant`     | `AlertVariant`           | success, danger, info, warning |
| `caption`     | `string`                 | Alert title                    |
| `description` | `string`                 | Alert message                  |
| `icon`        | `boolean \| BaklavaIcon` | Icon config                    |
| `closable`    | `boolean`                | Show close button              |
| `closed`      | `boolean`                | Closed state                   |

**Events:** Emits via `BlAlertElement` ref (open, close)

## BvChip

[Chip](/components/chip) · `import { BvChip } from "@baklavue/ui"`

| Prop         | Type          | Description                                              |
| ------------ | ------------- | -------------------------------------------------------- |
| `text`       | `string \| number` | Text or number inside the chip                        |
| `color`      | `ChipColor`   | primary, success, danger, warning, info, neutral          |
| `size`       | `ChipSize`    | xs, sm, md, lg                                           |
| `position`   | `ChipPosition`| top-right, bottom-right, top-left, bottom-left            |
| `inset`      | `boolean`     | Keep chip inside rounded elements                         |
| `standalone` | `boolean`     | Render inline without wrapping content                    |
| `show`       | `boolean`     | Visibility (default true)                                |

**Slots:** `default` (wrapped element), `content` (override chip content)

## BvBadge

[Badge](/components/badge) · `import { BvBadge } from "@baklavue/ui"`

| Prop   | Type          | Description |
| ------ | ------------- | ----------- |
| `size` | `BadgeSize`   | Badge size  |
| `icon` | `BaklavaIcon` | Icon name   |

## BvTag

[Tag](/components/tag) · `import { BvTag } from "@baklavue/ui"`

| Prop       | Type          | Description           |
| ---------- | ------------- | --------------------- |
| `variant`  | `TagVariant`  | selectable, removable |
| `size`     | `TagSize`     | small, medium, large  |
| `closable` | `boolean`     | Show close button     |
| `selected` | `boolean`     | Selected state        |
| `disabled` | `boolean`     | Disabled state        |
| `icon`     | `BaklavaIcon` | Icon name             |

**Events:** `update:selected`, `close`

## BvNotification

[Notification](/components/notification) · `import { BvNotification } from "@baklavue/ui"`

| Prop          | Type      | Description                |
| ------------- | --------- | -------------------------- |
| `duration`    | `number`  | Default duration (seconds) |
| `noAnimation` | `boolean` | Disable animations         |

Container for toast notifications triggered via `useNotification`. Must be mounted for composable to work.

## BvSkeleton

[Skeleton](/components/skeleton) · `import { BvSkeleton } from "@baklavue/ui"`

| Prop      | Type             | Description                         |
| --------- | ---------------- | ----------------------------------- |
| `variant` | `SkeletonVariant` | text, rectangle, circle             |
| `width`   | `string`         | Width (CSS value)                   |
| `height`  | `string`         | Height (CSS value)                  |
| `count`   | `number`         | Number of elements (for text lines) |

## BvSpinner

[Spinner](/components/spinner) · `import { BvSpinner } from "@baklavue/ui"`

| Prop      | Type     | Description                           |
| --------- | -------- | ------------------------------------- |
| `size`    | `string` | CSS size (e.g. var(--bl-font-size-m)) |
| `variant` | `string` | Spinner style                         |
| `label`   | `string` | Accessible label                      |
