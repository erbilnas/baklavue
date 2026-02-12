# Textarea

A Vue UI kit component for Baklava's `bl-textarea` component with v-model support. Supports label, placeholder, validation, character counter, help text, and more.

## Basic Usage

Use `v-model` for two-way binding with `label` and `placeholder` props.

<div class="component-demo">

<TextareaBasicDemo />

</div>

```vue
<template>
  <BvTextarea
    v-model="message"
    label="Message"
    placeholder="Enter your message"
  />
</template>

<script setup>
import { ref } from "vue";
import { BvTextarea } from "@baklavue/ui";

const message = ref("");
</script>
```

## Rows and Maxlength

Control the visible rows and maximum character length.

```vue
<template>
  <BvTextarea
    v-model="text"
    label="Description"
    :rows="6"
    :maxlength="500"
  />
</template>

<script setup>
import { ref } from "vue";
import { BvTextarea } from "@baklavue/ui";

const text = ref("");
</script>
```

## With Validation

Use `required`, `helpText`, and `invalidText` for validation feedback.

<div class="component-demo">

<TextareaValidationDemo />

</div>

```vue
<template>
  <BvTextarea
    v-model="comment"
    label="Comment"
    placeholder="Enter your comment"
    :maxlength="200"
    help-text="Maximum 200 characters"
    :required="true"
  />
</template>

<script setup>
import { ref } from "vue";
import { BvTextarea } from "@baklavue/ui";

const comment = ref("");
</script>
```

## Disabled and Readonly

Disable or make the textarea readonly.

```vue
<template>
  <BvTextarea v-model="text" label="Disabled" :disabled="true" />
  <BvTextarea v-model="text" label="Readonly" :readonly="true" />
</template>

<script setup>
import { ref } from "vue";
import { BvTextarea } from "@baklavue/ui";

const text = ref("Cannot edit");
</script>
```

## Character Counter

Enable the character counter with `characterCounter`.

```vue
<template>
  <BvTextarea
    v-model="bio"
    label="Bio"
    :maxlength="300"
    :character-counter="true"
  />
</template>

<script setup>
import { ref } from "vue";
import { BvTextarea } from "@baklavue/ui";

const bio = ref("");
</script>
```

## Props

| Prop                | Type             | Default     | Description                          |
| ------------------- | ---------------- | ----------- | ------------------------------------ |
| `modelValue`        | `string \| null` | `undefined` | Textarea value (v-model)             |
| `label`             | `string`         | `undefined` | Label text                           |
| `placeholder`       | `string`         | `undefined` | Placeholder text                     |
| `rows`              | `number`        | `undefined` | Number of visible rows               |
| `maxlength`         | `number`        | `undefined` | Maximum character length             |
| `minlength`         | `number`        | `undefined` | Minimum character length             |
| `disabled`          | `boolean`       | `undefined` | Disabled state                       |
| `required`          | `boolean`       | `undefined` | Required field                       |
| `readonly`          | `boolean`       | `undefined` | Readonly state                       |
| `helpText`          | `string`        | `undefined` | Help text below the textarea         |
| `invalidText`       | `string`        | `undefined` | Custom error/invalid message         |
| `characterCounter`  | `boolean`       | `undefined` | Enable character counter             |
| `expand`            | `boolean`       | `undefined` | Enable auto-expand up to maxRows     |
| `maxRows`           | `number`        | `undefined` | Max rows when expand is true         |
| `size`              | `TextareaSize`  | `undefined` | Textarea size: small, medium, large  |
| `name`              | `string`        | `undefined` | Name attribute for forms             |

## Events

| Event               | Payload         | Description                            |
| ------------------- | --------------- | -------------------------------------- |
| `update:modelValue` | `string \| null`| Emitted when value changes (v-model)   |
| `input`            | `CustomEvent`   | Emitted on user input                  |
| `change`           | `CustomEvent`   | Emitted when value commits (blur)      |

## Slots

| Slot      | Description                |
| --------- | -------------------------- |
| `default` | Additional content/slots   |

## Types

```typescript
import type { TextareaProps, TextareaSize } from "@baklavue/ui";

type TextareaSize = "small" | "medium" | "large";

interface TextareaProps {
  modelValue?: string | null;
  label?: string;
  placeholder?: string;
  rows?: number;
  maxlength?: number;
  minlength?: number;
  disabled?: boolean;
  required?: boolean;
  readonly?: boolean;
  helpText?: string;
  invalidText?: string;
  characterCounter?: boolean;
  expand?: boolean;
  maxRows?: number;
  size?: TextareaSize;
  name?: string;
}
```

## Usage Notes

- **v-model**: Use `v-model` for two-way binding of the textarea value.
- **Validation**: Use `invalidText` to display custom error messages when validation fails.
- **Character counter**: Enable `characterCounter` with `maxlength` to show character count.
