# API Reference

Complete API reference for BaklaVue components and composables. All components use the `Bv` prefix (e.g. `BvButton`, `BvInput`).

**Packages:**

- `@baklavue/ui` — Components and utilities
- `@baklavue/composables` — useCsv, useNotification, useScrollToError, useBaklavaTheme

---

## Form Components

Components for building forms and collecting user input.

### BvButton

[Button](/components/button) · `import { BvButton } from "@baklavue/ui"`

| Prop | Type | Description |
| --- | --- | --- |
| `variant` | `ButtonVariant` | primary, secondary, tertiary |
| `kind` | `ButtonKind` | default, neutral, success, danger, custom |
| `size` | `ButtonSize` | small, medium, large |
| `label` | `string` | Button text |
| `loading` | `boolean` | Loading state |
| `disabled` | `boolean` | Disabled state |
| `href` | `string` | Renders as link when provided |
| `icon` | `BaklavaIcon` | Icon name |
| `customClass` | `{ color?, highlightColor? }` | For kind="custom" |

**Events:** `click`

### BvInput

[Input](/components/input) · `import { BvInput } from "@baklavue/ui"`

| Prop | Type | Description |
| --- | --- | --- |
| `modelValue` | `string \| number \| null` | v-model |
| `label` | `string` | Input label |
| `type` | `InputType` | text, email, password, number, etc. |
| `size` | `InputSize` | small, medium, large |
| `disabled` | `boolean` | Disabled state |
| `required` | `boolean` | Required field |
| `invalidText` | `string` | Error message |
| `helpText` | `string` | Helper text |

**Events:** `update:modelValue`, `invalid`, `focus`, `blur`

### BvCheckbox

[Checkbox](/components/checkbox) · `import { BvCheckbox } from "@baklavue/ui"`

| Prop | Type | Description |
| --- | --- | --- |
| `modelValue` | `boolean \| (string \| number)[]` | v-model (single or group) |
| `value` | `string \| number` | Checkbox value (single mode) |
| `label` | `string` | Label text |
| `items` | `CheckboxItem[]` | Group mode items |
| `disabled` | `boolean` | Disabled state |
| `indeterminate` | `boolean` | Indeterminate state |

**Events:** `update:modelValue`, `change`, `input`

### BvRadio

[Radio](/components/radio) · `import { BvRadio } from "@baklavue/ui"`

| Prop | Type | Description |
| --- | --- | --- |
| `modelValue` | `string \| number` | v-model |
| `value` | `string \| number` | Radio value (single mode) |
| `label` | `string` | Label text |
| `items` | `RadioItem[]` | Group mode items |
| `disabled` | `boolean` | Disabled state |
| `required` | `boolean` | Required (group mode) |

**Events:** `update:modelValue`, `update:checked`, `change`, `input`

### BvSwitch

[Switch](/components/switch) · `import { BvSwitch } from "@baklavue/ui"`

| Prop | Type | Description |
| --- | --- | --- |
| `checked` | `boolean` | v-model:checked |
| `label` | `string` | Label text |
| `disabled` | `boolean` | Disabled state |
| `size` | `string` | small, medium, large |

**Events:** `update:checked`, `change`, `input`

### BvSelect

[Select](/components/select) · `import { BvSelect } from "@baklavue/ui"`

| Prop | Type | Description |
| --- | --- | --- |
| `modelValue` | `string \| string[] \| null` | v-model |
| `options` | `SelectOption[]` | Programmatic options |
| `label` | `string` | Select label |
| `placeholder` | `string` | Placeholder text |
| `size` | `SelectSize` | small, medium, large |
| `multiple` | `boolean` | Multi-select |
| `clearable` | `boolean` | Clear selection |
| `searchBar` | `boolean` | Search/filter options |

**Events:** `update:modelValue`

### BvTextarea

[Textarea](/components/textarea) · `import { BvTextarea } from "@baklavue/ui"`

| Prop | Type | Description |
| --- | --- | --- |
| `modelValue` | `string \| null` | v-model |
| `label` | `string` | Label text |
| `placeholder` | `string` | Placeholder |
| `rows` | `number` | Visible rows |
| `size` | `TextareaSize` | small, medium, large |
| `disabled` | `boolean` | Disabled state |
| `expand` | `boolean` | Auto-expand |
| `characterCounter` | `boolean` | Show character count |

**Events:** `update:modelValue`, `invalid`

### BvDatepicker

[Datepicker](/components/datepicker) · `import { BvDatepicker } from "@baklavue/ui"`

| Prop | Type | Description |
| --- | --- | --- |
| `modelValue` | `string \| string[] \| [string, string] \| null` | v-model |
| `type` | `DatepickerType` | single, multiple, range |
| `label` | `string` | Input label |
| `min` | `string` | Min date (ISO) |
| `max` | `string` | Max date (ISO) |
| `disabled` | `boolean` | Disabled state |
| `size` | `InputSize` | small, medium, large |

**Events:** `update:modelValue`

---

## Feedback Components

Components for displaying feedback and status information.

### BvAlert

[Alert](/components/alert) · `import { BvAlert } from "@baklavue/ui"`

| Prop | Type | Description |
| --- | --- | --- |
| `variant` | `AlertVariant` | success, danger, info, warning |
| `caption` | `string` | Alert title |
| `description` | `string` | Alert message |
| `icon` | `boolean \| BaklavaIcon` | Icon config |
| `closable` | `boolean` | Show close button |
| `closed` | `boolean` | Closed state |

**Events:** Emits via `BlAlertElement` ref (open, close)

### BvBadge

[Badge](/components/badge) · `import { BvBadge } from "@baklavue/ui"`

| Prop | Type | Description |
| --- | --- | --- |
| `size` | `BadgeSize` | Badge size |
| `icon` | `BaklavaIcon` | Icon name |

### BvTag

[Tag](/components/tag) · `import { BvTag } from "@baklavue/ui"`

| Prop | Type | Description |
| --- | --- | --- |
| `variant` | `TagVariant` | selectable, removable |
| `size` | `TagSize` | small, medium, large |
| `closable` | `boolean` | Show close button |
| `selected` | `boolean` | Selected state |
| `disabled` | `boolean` | Disabled state |
| `icon` | `BaklavaIcon` | Icon name |

**Events:** `update:selected`, `close`

### BvNotification

[Notification](/components/notification) · `import { BvNotification } from "@baklavue/ui"`

| Prop | Type | Description |
| --- | --- | --- |
| `duration` | `number` | Default duration (seconds) |
| `noAnimation` | `boolean` | Disable animations |

Container for toast notifications triggered via `useNotification`. Must be mounted for composable to work.

### BvSpinner

[Spinner](/components/spinner) · `import { BvSpinner } from "@baklavue/ui"`

| Prop | Type | Description |
| --- | --- | --- |
| `size` | `string` | CSS size (e.g. var(--bl-font-size-m)) |
| `variant` | `string` | Spinner style |
| `label` | `string` | Accessible label |

---

## Layout Components

Components for organizing content and creating layouts.

### BvDialog

[Dialog](/components/dialog) · `import { BvDialog } from "@baklavue/ui"`

| Prop | Type | Description |
| --- | --- | --- |
| `open` | `boolean` | Visibility |
| `caption` | `string` | Dialog title |
| `closable` | `boolean` | Show close button |
| `backdrop` | `boolean` | Click backdrop to close |
| `size` | `string` | small, medium, large or CSS value |

**Slots:** `default` (content)

### BvDrawer

[Drawer](/components/drawer) · `import { BvDrawer } from "@baklavue/ui"`

| Prop | Type | Description |
| --- | --- | --- |
| `open` | `boolean` | Visibility |
| `caption` | `string` | Drawer title |
| `embedUrl` | `string` | Iframe URL (replaces slot) |
| `externalLink` | `string` | Header link URL |
| `width` | `string` | small, medium, large or CSS value |

**Slots:** `default` (content)

### BvDropdown

[Dropdown](/components/dropdown) · `import { BvDropdown } from "@baklavue/ui"`

| Prop | Type | Description |
| --- | --- | --- |
| `open` | `boolean` | Dropdown visibility |
| `placement` | `string` | Popover placement |
| `label` | `string` | Trigger button label |
| `items` | `DropdownItem[]` | Items mode |
| `variant` | `ButtonVariant` | Trigger button variant |
| `disabled` | `boolean` | Disabled state |

**Slots:** `trigger`, `default`, `item` (scoped)

**Events:** `update:open`, `select`

### BvTooltip

[Tooltip](/components/tooltip) · `import { BvTooltip } from "@baklavue/ui"`

| Prop | Type | Description |
| --- | --- | --- |
| `content` | `string` | Tooltip text |
| `placement` | `TooltipPlacement` | top, bottom, left, right, etc. |
| `target` | `string \| Element` | External trigger |
| `trigger` | `string` | hover, click, etc. |
| `delay` | `number` | Show delay (ms) |
| `disabled` | `boolean` | Disabled state |

**Slots:** `default` (trigger element)

### BvAccordion

[Accordion](/components/accordion) · `import { BvAccordion } from "@baklavue/ui"`

| Prop | Type | Description |
| --- | --- | --- |
| `open` | `boolean` | Expanded state (single mode) |
| `caption` | `string` | Header text (single mode) |
| `icon` | `boolean \| BaklavaIcon` | Icon config |
| `multiple` | `boolean` | Group mode: allow multiple open |
| `items` | `AccordionItem[]` | Group mode items |
| `disabled` | `boolean` | Disabled state |
| `animationDuration` | `number` | Animation duration (ms) |

**Events:** `toggle` (single mode)

**Slots:** `default` (single mode), `item` (scoped, group mode)

**Methods:** `expand()`, `collapse()` (single mode, via ref)

### BvTab

[Tab](/components/tab) · `import { BvTab } from "@baklavue/ui"`

| Prop | Type | Description |
| --- | --- | --- |
| `activeTab` | `string` | v-model:activeTab |
| `tabs` | `TabOption[]` | Tab options |
| `variant` | `string` | Tab variant |
| `orientation` | `string` | horizontal, vertical |

**Events:** `update:activeTab`

**Slots:** `default` (tab panels)

### BvStepper

[Stepper](/components/stepper) · `import { BvStepper } from "@baklavue/ui"`

| Prop | Type | Description |
| --- | --- | --- |
| `currentStep` | `number` | v-model:currentStep |
| `steps` | `StepperStep[]` | Step configs |
| `orientation` | `string` | horizontal, vertical |
| `showLabels` | `boolean` | Show step labels |

**Events:** `update:currentStep`

---

## Navigation Components

Components for navigation and user actions.

### BvLink

[Link](/components/link) · `import { BvLink } from "@baklavue/ui"`

| Prop | Type | Description |
| --- | --- | --- |
| `href` | `string` | URL |
| `target` | `string` | _self, _blank, etc. |
| `variant` | `LinkVariant` | inline, standalone |
| `size` | `LinkSize` | small, medium, large |
| `kind` | `LinkKind` | primary, neutral |
| `disabled` | `boolean` | Disabled state |

### BvPagination

[Pagination](/components/pagination) · `import { BvPagination } from "@baklavue/ui"`

| Prop | Type | Description |
| --- | --- | --- |
| `currentPage` | `number` | v-model:currentPage |
| `totalItems` | `number` | Total item count |
| `pageSize` | `number` | Items per page |
| `hasJumper` | `boolean` | Page jumper input |
| `hasSelect` | `boolean` | Items-per-page select |
| `itemsPerPageOptions` | `ItemsPerPageOption[]` | Select options |

**Events:** `update:currentPage`, `change`

### BvSplitButton

[Split Button](/components/split-button) · `import { BvSplitButton } from "@baklavue/ui"`

| Prop | Type | Description |
| --- | --- | --- |
| `variant` | `string` | primary, secondary |
| `size` | `string` | small, medium, large |
| `label` | `string` | Button label |
| `icon` | `BaklavaIcon` | Icon name |
| `disabled` | `boolean` | Disabled state |
| `loading` | `boolean` | Loading state |

**Slots:** `default` (dropdown items)

---

## Data Display

Components for displaying data and content.

### BvTable

[Table](/components/table) · `import { BvTable } from "@baklavue/ui"`

| Prop | Type | Description |
| --- | --- | --- |
| `data` | `TableRow[]` | Table rows |
| `columns` | `TableColumn[]` | Column definitions |
| `title` | `string` | Table title |
| `sortable` | `boolean` | Enable sorting |
| `selectable` | `boolean` | Enable row selection |
| `multiple` | `boolean` | Multi-select |
| `selected` | `(string \| number)[]` | v-model:selected |
| `sortKey` | `string` | Sorted column |
| `sortDirection` | `string` | asc, desc |
| `isLoading` | `boolean` | Loading state |
| `pagination` | `TablePaginationProps` | Pagination config |

**Events:** `update:selected`, `sort`, `row-click`

**Slots:** `default` (custom cell content), `empty`

### BvIcon

[Icon](/components/icon) · `import { BvIcon } from "@baklavue/ui"`

| Prop | Type | Description |
| --- | --- | --- |
| `name` | `BaklavaIcon` | Icon name from Baklava icons |
| `size` | `string` | CSS size (e.g. "24px") |
| `color` | `string` | CSS color |

---

## Composables

### useCsv

[useCsv](/composables/csv) · `import { useCsv } from "@baklavue/composables"`

Parse, create, and download CSV files. Uses PapaParse for RFC 4180-compliant handling.

```typescript
const { parse, parseFile, create, download } = useCsv();

// Parse string (sync)
const result = parse("name,age\nAlice,30", { header: true });

// Parse file (async)
const result = await parseFile(file, { header: true });

// Create CSV string
const csv = create([{ name: "Alice", age: 30 }]);

// Download CSV
download([{ name: "Alice", age: 30 }], "export.csv");
```

**CsvParseOptions:** `delimiter`, `header`, `dynamicTyping`, `skipEmptyLines`

**CsvCreateOptions:** `delimiter`, `header`, `columns`, `escapeFormulae`

### useNotification

[useNotification](/composables/notification) · `import { useNotification } from "@baklavue/composables"`

Programmatically show toast notifications. Requires `<BvNotification />` in the DOM.

```typescript
const { success, error, warning, info } = useNotification();

// Each method accepts NotificationOptions
success({ caption?: string; description: string; duration?: number; permanent?: boolean });
error({ caption?: string; description: string; duration?: number; permanent?: boolean });
warning({ caption?: string; description: string; duration?: number; permanent?: boolean });
info({ caption?: string; description: string; duration?: number; permanent?: boolean });
```

Uses Baklava's `NotificationProps` (description required). Options include `primaryAction`, `secondaryAction` for buttons.

### useScrollToError

[useScrollToError](/composables/scrollToError) · `import { useScrollToError } from "@baklavue/composables"`

Scroll to an element with validation error. Scrolls into view, optionally applies a highlight effect, and focuses the first focusable control.

```typescript
const { scrollToError } = useScrollToError();

// From validation error object (with scrollTarget)
scrollToError(validationError);

// Direct selector
scrollToError('[data-field="tags"]');

// With options
scrollToError('[data-field="tags"]', {
  shineClass: "my-shine",
  shineDuration: 1500,
  focus: true,
});
```

**Target:** `string` (CSS selector) | `HTMLElement` | `{ scrollTarget: string }`

**ScrollToErrorOptions:** `scrollBehavior`, `block`, `shineClass`, `shineDuration`, `focus`, `focusDelay`

### useBaklavaTheme

[useBaklavaTheme](/composables/theme) · `import { useBaklavaTheme } from "@baklavue/composables"`

Overwrite Baklava design system colors by injecting CSS variables.

```typescript
const { applyTheme } = useBaklavaTheme();

// Vue preset
applyTheme({ preset: "vue" });

// Custom preset (CSS variable map)
applyTheme({
  preset: {
    "--bl-color-primary": "#ea4c89",
    "--bl-color-primary-highlight": "#d6427a",
  },
});

// Custom colors (shorthand)
applyTheme({
  colors: { primary: "#41B883", primaryHighlight: "#3aa876" },
});
```

**ApplyThemeOptions:**

| Key | Type | Description |
| --- | --- | --- |
| `preset` | `"vue" \| "default" \| BaklavaThemePresetRecord` | Built-in or custom preset |
| `colors` | `Partial<BaklavaThemeColors>` | Override specific tokens |

**BaklavaThemeColors:** `primary`, `primaryHighlight`, `primaryContrast`, `success`, `successHighlight`, `successContrast`, `danger`, `warning`, `info`, `neutralDarkest`, `neutralDarker`, `neutralDark`, `neutralLight`, `neutralLighter`, `neutralLightest`, `neutralFull`

---

## Utilities

### loadBaklavaResources

`import { loadBaklavaResources } from "@baklavue/ui"`

Loads Baklava CSS and JavaScript from CDN. Useful when not using a bundler. Idempotent—safe to call multiple times.

```typescript
loadBaklavaResources(): void
```

---

## Type Exports

### From @baklavue/ui

```typescript
import type {
  // Form
  ButtonProps,
  InputProps,
  CheckboxProps,
  CheckboxItem,
  RadioProps,
  RadioItem,
  SwitchProps,
  SelectProps,
  SelectOption,
  SelectSize,
  TextareaProps,
  TextareaSize,
  DatepickerProps,
  DatepickerType,
  // Feedback
  AlertProps,
  BlAlertElement,
  BadgeProps,
  TagProps,
  TagVariant,
  TagSize,
  NotificationProps,
  SpinnerProps,
  // Layout
  DialogProps,
  DrawerProps,
  DropdownProps,
  DropdownItem,
  TooltipProps,
  TooltipPlacement,
  AccordionProps,
  AccordionItem,
  TabProps,
  TabOption,
  StepperProps,
  StepperStep,
  // Navigation
  LinkProps,
  LinkVariant,
  LinkSize,
  LinkKind,
  PaginationProps,
  ItemsPerPageOption,
  SplitButtonProps,
  // Data Display
  TableProps,
  TableColumn,
  TableRow,
  TablePaginationProps,
  IconProps,
} from "@baklavue/ui";
```

### From @baklavue/composables

```typescript
import type {
  // CSV
  CsvData,
  CsvParseOptions,
  CsvCreateOptions,
  ParseResult,
  ParseError,
  ParseMeta,
  // Theme
  ApplyThemeOptions,
  BaklavaThemeColors,
  BaklavaThemePreset,
  BaklavaThemePresetRecord,
  // Scroll
  ScrollToErrorOptions,
  ScrollToErrorTarget,
} from "@baklavue/composables";
```

---

## Import Patterns

### Individual Imports

```typescript
import { BvButton, BvInput, BvCheckbox } from "@baklavue/ui";
import { useCsv, useNotification, useScrollToError, useBaklavaTheme } from "@baklavue/composables";
```

### Namespace Import

```typescript
import * as BaklaVue from "@baklavue/ui";
import * as BaklaVueComposables from "@baklavue/composables";
```

### Type Imports

```typescript
import type { ButtonProps, InputProps } from "@baklavue/ui";
import type {
  CsvParseOptions,
  ApplyThemeOptions,
  ScrollToErrorOptions,
} from "@baklavue/composables";
```
