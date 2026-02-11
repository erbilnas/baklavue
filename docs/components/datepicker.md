# Datepicker

A Vue wrapper for Baklava's `bl-datepicker` component with v-model support for date selection. The Datepicker provides a calendar picker input with options for min/max date constraints, placeholder text, and standard form states.

## Basic Usage

Use v-model for two-way binding of the selected date.

<div class="component-demo">

<DatepickerDemo variant="basic" />

</div>

```vue
<template>
  <BvDatepicker v-model="date" label="Select date" />
</template>

<script setup>
import { ref } from "vue";
import { BvDatepicker } from "@baklavue/ui";

const date = ref("");
</script>
```

## With Placeholder

Add a placeholder to guide users when no date is selected.

<div class="component-demo">

<DatepickerDemo variant="placeholder" />

</div>

```vue
<template>
  <BvDatepicker v-model="date" label="Appointment" placeholder="Pick a date" />
</template>

<script setup>
import { ref } from "vue";
import { BvDatepicker } from "@baklavue/ui";

const date = ref("");
</script>
```

## Disabled State

Disable the datepicker to prevent user interaction.

<div class="component-demo">

<DatepickerDemo variant="disabled" />

</div>

```vue
<template>
  <BvDatepicker v-model="date" label="Disabled datepicker" :disabled="true" />
</template>

<script setup>
import { ref } from "vue";
import { BvDatepicker } from "@baklavue/ui";

const date = ref("");
</script>
```

## Required State

Mark the datepicker as required for form validation.

<div class="component-demo">

<DatepickerDemo variant="required" />

</div>

```vue
<template>
  <BvDatepicker v-model="date" label="Required date" :required="true" />
</template>

<script setup>
import { ref } from "vue";
import { BvDatepicker } from "@baklavue/ui";

const date = ref("");
</script>
```

## Min/Max Dates

Restrict selectable dates using the `min` and `max` props. Dates should be provided as ISO date strings (YYYY-MM-DD).

<div class="component-demo">

<DatepickerDemo variant="minmax" />

</div>

```vue
<template>
  <BvDatepicker
    v-model="date"
    label="Date range"
    placeholder="Select within range"
    :min="minDate"
    :max="maxDate"
  />
</template>

<script setup>
import { ref, computed } from "vue";
import { BvDatepicker } from "@baklavue/ui";

const date = ref("");
// Example: restrict to current month
const now = new Date();
const minDate = computed(
  () =>
    `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`,
);
const maxDate = computed(
  () =>
    `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
      new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate(),
    ).padStart(2, "0")}`,
);
</script>
```

## Multiple Dates

Select multiple dates by setting `type="multiple"`.

<div class="component-demo">

<DatepickerDemo variant="multiple" />

</div>

```vue
<template>
  <BvDatepicker v-model="dates" type="multiple" label="Select dates" />
</template>

<script setup>
import { ref } from "vue";
import { BvDatepicker } from "@baklavue/ui";

const dates = ref<string[]>([]);
</script>
```

## Date Range

Select a date range by setting `type="range"`.

<div class="component-demo">

<DatepickerDemo variant="range" />

</div>

```vue
<template>
  <BvDatepicker v-model="range" type="range" label="Select range" />
</template>

<script setup>
import { ref } from "vue";
import { BvDatepicker } from "@baklavue/ui";

const range = (ref < [string, string]) | (null > null);
</script>
```

## Props

| Prop          | Type                                             | Default     | Description                       |
| ------------- | ------------------------------------------------ | ----------- | --------------------------------- |
| `modelValue`  | `string \| string[] \| [string, string] \| null` | `undefined` | Selected date(s) (v-model)        |
| `type`        | `"single" \| "multiple" \| "range"`              | `"single"`  | Selection mode                    |
| `label`       | `string`                                         | `undefined` | Datepicker label                  |
| `placeholder` | `string`                                         | `undefined` | Placeholder text                  |
| `disabled`    | `boolean`                                        | `undefined` | Disabled state                    |
| `min`         | `string`                                         | `undefined` | Minimum selectable date           |
| `max`         | `string`                                         | `undefined` | Maximum selectable date           |
| `required`    | `boolean`                                        | `undefined` | Required field                    |
| `size`        | `InputSize`                                      | `undefined` | Input size (small, medium, large) |
| `labelFixed`  | `boolean`                                        | `undefined` | Makes the label fixed positioned  |
| `helpText`    | `string`                                         | `undefined` | Help text below the input         |

## Events

| Event               | Payload                                          | Description                                           |
| ------------------- | ------------------------------------------------ | ----------------------------------------------------- |
| `update:modelValue` | `string \| string[] \| [string, string] \| null` | Emitted when date(s) change                           |
| `change`            | `CustomEvent<Date[]>`                            | Emitted when selection changes (bl-datepicker-change) |

## Slots

| Slot      | Props | Description                              |
| --------- | ----- | ---------------------------------------- |
| `default` | -     | Optional content passed to bl-datepicker |

## Types

```typescript
import type { DatepickerProps, DatepickerType } from "@baklavue/ui";

type DatepickerType = "single" | "multiple" | "range";

interface DatepickerProps {
  modelValue?: string | string[] | [string, string] | null;
  type?: DatepickerType;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  min?: string;
  max?: string;
  required?: boolean;
  size?: InputSize;
  labelFixed?: boolean;
  helpText?: string;
}
```

## Usage Notes

- **v-model Binding**: Use v-model for two-way binding. For `type="single"`, value is `string | null`. For `type="multiple"`, value is `string[]`. For `type="range"`, value is `[string, string] | null`.

- **Date Format**: The `min`, `max`, and `modelValue` use ISO date strings (YYYY-MM-DD).

- **Accessibility**: The component follows Baklava's accessibility guidelines and includes proper ARIA attributes for screen readers.

- **Styling**: The component uses Baklava's default styling. Custom styling can be applied through CSS variables or by overriding the component styles.
