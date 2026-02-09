# Textarea

A Vue wrapper for Baklava's `bl-textarea` component with v-model support.

## Basic Usage

```vue
<template>
  <Textarea
    v-model="message"
    label="Message"
    placeholder="Enter your message"
  />
</template>

<script setup>
import { ref } from "vue";
import { Textarea } from "@baklavue/ui";

const message = ref("");
</script>
```

## Props

| Prop          | Type      | Default     | Description              |
| ------------- | --------- | ----------- | ------------------------ |
| `modelValue`  | `string`  | `undefined` | Textarea value (v-model) |
| `name`        | `string`  | `undefined` | Textarea name attribute  |
| `label`       | `string`  | `undefined` | Textarea label           |
| `placeholder` | `string`  | `undefined` | Placeholder text         |
| `rows`        | `number`  | `undefined` | Number of rows           |
| `cols`        | `number`  | `undefined` | Number of columns        |
| `required`    | `boolean` | `undefined` | Required field           |
| `minlength`   | `number`  | `undefined` | Minimum length           |
| `maxlength`   | `number`  | `undefined` | Maximum length           |
| `disabled`    | `boolean` | `undefined` | Disabled state           |
| `readonly`    | `boolean` | `undefined` | Readonly state           |
| `invalidText` | `string`  | `undefined` | Error message text       |
| `helpText`    | `string`  | `undefined` | Help text                |

## Events

| Event               | Payload         | Description                   |
| ------------------- | --------------- | ----------------------------- |
| `update:modelValue` | `string`        | Emitted when value changes    |
| `invalid`           | `ValidityState` | Emitted when validation fails |

## Examples

### With Validation

```vue
<template>
  <Textarea
    v-model="comment"
    label="Comment"
    :minlength="10"
    :maxlength="500"
    :invalid-text="error"
    help-text="Between 10 and 500 characters"
    @invalid="handleInvalid"
  />
</template>

<script setup>
import { ref } from 'vue'
import { Textarea } from '@baklavue/ui'

const comment = ref('')
const error = ref('')

const handleInvalid = (validity: ValidityState) => {
  if (validity.tooShort) {
    error.value = 'Comment must be at least 10 characters'
  } else if (validity.tooLong) {
    error.value = 'Comment must be less than 500 characters'
  }
}
</script>
```
