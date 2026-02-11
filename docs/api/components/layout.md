# Layout Components

Components for organizing content and creating layouts.

## BvDialog

[Dialog](/components/dialog) · `import { BvDialog } from "@baklavue/ui"`

| Prop       | Type      | Description                       |
| ---------- | --------- | --------------------------------- |
| `open`     | `boolean` | Visibility                        |
| `caption`  | `string`  | Dialog title                      |
| `closable` | `boolean` | Show close button                 |
| `backdrop` | `boolean` | Click backdrop to close           |
| `size`     | `string`  | small, medium, large or CSS value |

**Slots:** `default` (content)

## BvDrawer

[Drawer](/components/drawer) · `import { BvDrawer } from "@baklavue/ui"`

| Prop           | Type      | Description                       |
| -------------- | --------- | --------------------------------- |
| `open`         | `boolean` | Visibility                        |
| `caption`      | `string`  | Drawer title                      |
| `embedUrl`     | `string`  | Iframe URL (replaces slot)        |
| `externalLink` | `string`  | Header link URL                   |
| `width`        | `string`  | small, medium, large or CSS value |

**Slots:** `default` (content)

## BvDropdown

[Dropdown](/components/dropdown) · `import { BvDropdown } from "@baklavue/ui"`

| Prop        | Type             | Description            |
| ----------- | ---------------- | ---------------------- |
| `open`      | `boolean`        | Dropdown visibility    |
| `placement` | `string`         | Popover placement      |
| `label`     | `string`         | Trigger button label   |
| `items`     | `DropdownItem[]` | Items mode             |
| `variant`   | `ButtonVariant`  | Trigger button variant |
| `disabled`  | `boolean`        | Disabled state         |

**Slots:** `trigger`, `default`, `item` (scoped)

**Events:** `update:open`, `select`

## BvTooltip

[Tooltip](/components/tooltip) · `import { BvTooltip } from "@baklavue/ui"`

| Prop        | Type                | Description                    |
| ----------- | ------------------- | ------------------------------ |
| `content`   | `string`            | Tooltip text                   |
| `placement` | `TooltipPlacement`  | top, bottom, left, right, etc. |
| `target`    | `string \| Element` | External trigger               |
| `trigger`   | `string`            | hover, click, etc.             |
| `delay`     | `number`            | Show delay (ms)                |
| `disabled`  | `boolean`           | Disabled state                 |

**Slots:** `default` (trigger element)

## BvAccordion

[Accordion](/components/accordion) · `import { BvAccordion } from "@baklavue/ui"`

| Prop                | Type                     | Description                     |
| ------------------- | ------------------------ | ------------------------------- |
| `open`              | `boolean`                | Expanded state (single mode)    |
| `caption`           | `string`                 | Header text (single mode)       |
| `icon`              | `boolean \| BaklavaIcon` | Icon config                     |
| `multiple`          | `boolean`                | Group mode: allow multiple open |
| `items`             | `AccordionItem[]`        | Group mode items                |
| `disabled`          | `boolean`                | Disabled state                  |
| `animationDuration` | `number`                 | Animation duration (ms)         |

**Events:** `toggle` (single mode)

**Slots:** `default` (single mode), `item` (scoped, group mode)

**Methods:** `expand()`, `collapse()` (single mode, via ref)

## BvTab

[Tab](/components/tab) · `import { BvTab } from "@baklavue/ui"`

| Prop          | Type          | Description          |
| ------------- | ------------- | -------------------- |
| `activeTab`   | `string`      | v-model:activeTab    |
| `tabs`        | `TabOption[]` | Tab options          |
| `variant`     | `string`      | Tab variant          |
| `orientation` | `string`      | horizontal, vertical |

**Events:** `update:activeTab`

**Slots:** `default` (tab panels)

## BvStepper

[Stepper](/components/stepper) · `import { BvStepper } from "@baklavue/ui"`

| Prop          | Type            | Description          |
| ------------- | --------------- | -------------------- |
| `currentStep` | `number`        | v-model:currentStep  |
| `steps`       | `StepperStep[]` | Step configs         |
| `orientation` | `string`        | horizontal, vertical |
| `showLabels`  | `boolean`       | Show step labels     |

**Events:** `update:currentStep`
