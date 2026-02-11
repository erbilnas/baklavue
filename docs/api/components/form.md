# Form Components

Components for building forms and collecting user input.

## BvButton

[Button](/components/button) · `import { BvButton } from "@baklavue/ui"`

| Prop          | Type                          | Description                               |
| ------------- | ----------------------------- | ----------------------------------------- |
| `variant`     | `ButtonVariant`               | primary, secondary, tertiary              |
| `kind`        | `ButtonKind`                  | default, neutral, success, danger, custom |
| `size`        | `ButtonSize`                  | small, medium, large                      |
| `label`       | `string`                      | Button text                               |
| `loading`     | `boolean`                     | Loading state                             |
| `disabled`    | `boolean`                     | Disabled state                            |
| `href`        | `string`                      | Renders as link when provided             |
| `icon`        | `BaklavaIcon`                 | Icon name                                 |
| `customClass` | `{ color?, highlightColor? }` | For kind="custom"                         |

**Events:** `click`

## BvInput

[Input](/components/input) · `import { BvInput } from "@baklavue/ui"`

| Prop          | Type                       | Description                         |
| ------------- | -------------------------- | ----------------------------------- |
| `modelValue`  | `string \| number \| null` | v-model                             |
| `label`       | `string`                   | Input label                         |
| `type`        | `InputType`                | text, email, password, number, etc. |
| `size`        | `InputSize`                | small, medium, large                |
| `disabled`    | `boolean`                  | Disabled state                      |
| `required`    | `boolean`                  | Required field                      |
| `invalidText` | `string`                   | Error message                       |
| `helpText`    | `string`                   | Helper text                         |

**Events:** `update:modelValue`, `invalid`, `focus`, `blur`

## BvCheckbox

[Checkbox](/components/checkbox) · `import { BvCheckbox } from "@baklavue/ui"`

| Prop            | Type                              | Description                  |
| --------------- | --------------------------------- | ---------------------------- |
| `modelValue`    | `boolean \| (string \| number)[]` | v-model (single or group)    |
| `value`         | `string \| number`                | Checkbox value (single mode) |
| `label`         | `string`                          | Label text                   |
| `items`         | `CheckboxItem[]`                  | Group mode items             |
| `disabled`      | `boolean`                         | Disabled state               |
| `indeterminate` | `boolean`                         | Indeterminate state          |

**Events:** `update:modelValue`, `change`, `input`

## BvRadio

[Radio](/components/radio) · `import { BvRadio } from "@baklavue/ui"`

| Prop         | Type               | Description               |
| ------------ | ------------------ | ------------------------- |
| `modelValue` | `string \| number` | v-model                   |
| `value`      | `string \| number` | Radio value (single mode) |
| `label`      | `string`           | Label text                |
| `items`      | `RadioItem[]`      | Group mode items          |
| `disabled`   | `boolean`          | Disabled state            |
| `required`   | `boolean`          | Required (group mode)     |

**Events:** `update:modelValue`, `update:checked`, `change`, `input`

## BvSwitch

[Switch](/components/switch) · `import { BvSwitch } from "@baklavue/ui"`

| Prop       | Type      | Description          |
| ---------- | --------- | -------------------- |
| `checked`  | `boolean` | v-model:checked      |
| `label`    | `string`  | Label text           |
| `disabled` | `boolean` | Disabled state       |
| `size`     | `string`  | small, medium, large |

**Events:** `update:checked`, `change`, `input`

## BvSelect

[Select](/components/select) · `import { BvSelect } from "@baklavue/ui"`

| Prop          | Type                         | Description           |
| ------------- | ---------------------------- | --------------------- |
| `modelValue`  | `string \| string[] \| null` | v-model               |
| `options`     | `SelectOption[]`             | Programmatic options  |
| `label`       | `string`                     | Select label          |
| `placeholder` | `string`                     | Placeholder text      |
| `size`        | `SelectSize`                 | small, medium, large  |
| `multiple`    | `boolean`                    | Multi-select          |
| `clearable`   | `boolean`                    | Clear selection       |
| `searchBar`   | `boolean`                    | Search/filter options |

**Events:** `update:modelValue`

## BvTextarea

[Textarea](/components/textarea) · `import { BvTextarea } from "@baklavue/ui"`

| Prop               | Type             | Description          |
| ------------------ | ---------------- | -------------------- |
| `modelValue`       | `string \| null` | v-model              |
| `label`            | `string`         | Label text           |
| `placeholder`      | `string`         | Placeholder          |
| `rows`             | `number`         | Visible rows         |
| `size`             | `TextareaSize`   | small, medium, large |
| `disabled`         | `boolean`        | Disabled state       |
| `expand`           | `boolean`        | Auto-expand          |
| `characterCounter` | `boolean`        | Show character count |

**Events:** `update:modelValue`, `invalid`

## BvFileUpload

[File Upload](/components/file-upload) · `import { BvFileUpload } from "@baklavue/ui"`

| Prop          | Type                        | Description                                |
| ------------- | --------------------------- | ------------------------------------------ |
| `modelValue`  | `File \| File[] \| null`    | v-model                                    |
| `multiple`    | `boolean`                   | Allow multiple files                       |
| `accept`      | `string`                    | MIME types or extensions (e.g. `image/*`)  |
| `maxSize`     | `number`                    | Max file size (bytes)                      |
| `minSize`     | `number`                    | Min file size (bytes)                      |
| `maxFiles`    | `number`                    | Max file count when multiple               |
| `disabled`    | `boolean`                   | Disabled state                             |
| `label`       | `string`                    | Label                                      |
| `helpText`    | `string`                    | Helper text                                |
| `invalidText` | `string`                    | Error message                              |
| `showPreview` | `boolean`                   | Image previews for image files             |
| `size`        | `FileUploadSize`            | small, medium, large                       |

**Events:** `update:modelValue`, `invalid`, `change`

## BvDatepicker

[Datepicker](/components/datepicker) · `import { BvDatepicker } from "@baklavue/ui"`

| Prop         | Type                                             | Description             |
| ------------ | ------------------------------------------------ | ----------------------- |
| `modelValue` | `string \| string[] \| [string, string] \| null` | v-model                 |
| `type`       | `DatepickerType`                                 | single, multiple, range |
| `label`      | `string`                                         | Input label             |
| `min`        | `string`                                         | Min date (ISO)          |
| `max`        | `string`                                         | Max date (ISO)          |
| `disabled`   | `boolean`                                        | Disabled state          |
| `size`       | `InputSize`                                      | small, medium, large    |

**Events:** `update:modelValue`
