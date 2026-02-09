# Input

A Vue wrapper for Baklava's `bl-input` component with full v-model support and TypeScript types.

## Basic Usage

```vue
<template>
  <Input v-model="value" label="Email" placeholder="Enter your email" />
</template>

<script setup>
import { ref } from "vue";
import { Input } from "@baklavue/ui";

const value = ref("");
</script>
```

## Input Types

```vue
<template>
  <Input v-model="text" type="text" label="Text" />
  <Input v-model="email" type="email" label="Email" />
  <Input v-model="password" type="password" label="Password" />
  <Input v-model="number" type="number" label="Number" />
  <Input v-model="date" type="date" label="Date" />
</template>

<script setup>
import { ref } from "vue";
import { Input } from "@baklavue/ui";

const text = ref("");
const email = ref("");
const password = ref("");
const number = ref(0);
const date = ref("");
</script>
```

## Validation

```vue
<template>
  <Input
    v-model="email"
    type="email"
    label="Email"
    required
    :invalid-text="emailError"
    @invalid="handleInvalid"
  />
</template>

<script setup>
import { ref } from 'vue'
import { Input } from '@baklavue/ui'

const email = ref('')
const emailError = ref('')

const handleInvalid = (validity: ValidityState) => {
  if (validity.typeMismatch) {
    emailError.value = 'Please enter a valid email address'
  } else if (validity.valueMissing) {
    emailError.value = 'Email is required'
  }
}
</script>
```

## Help Text

```vue
<template>
  <Input
    v-model="password"
    type="password"
    label="Password"
    help-text="Must be at least 8 characters"
  />
</template>

<script setup>
import { ref } from "vue";
import { Input } from "@baklavue/ui";

const password = ref("");
</script>
```

## Loading State

```vue
<template>
  <Input
    v-model="search"
    label="Search"
    :loading="isSearching"
    placeholder="Type to search..."
  />
</template>

<script setup>
import { ref } from "vue";
import { Input } from "@baklavue/ui";

const search = ref("");
const isSearching = ref(false);
</script>
```

## Disabled and Readonly

```vue
<template>
  <Input v-model="value" label="Disabled" disabled />
  <Input v-model="value" label="Readonly" readonly />
</template>

<script setup>
import { ref } from "vue";
import { Input } from "@baklavue/ui";

const value = ref("Read-only value");
</script>
```

## Sizes

```vue
<template>
  <Input v-model="small" size="small" label="Small" />
  <Input v-model="medium" size="medium" label="Medium" />
  <Input v-model="large" size="large" label="Large" />
</template>

<script setup>
import { ref } from "vue";
import { Input } from "@baklavue/ui";

const small = ref("");
const medium = ref("");
const large = ref("");
</script>
```

## With Icon

```vue
<template>
  <Input v-model="search" label="Search" icon="search" />
</template>

<script setup>
import { ref } from "vue";
import { Input } from "@baklavue/ui";

const search = ref("");
</script>
```

## Props

| Prop           | Type                       | Default     | Description                                            |
| -------------- | -------------------------- | ----------- | ------------------------------------------------------ |
| `modelValue`   | `string \| number \| null` | `undefined` | Input value (v-model)                                  |
| `name`         | `string`                   | `undefined` | Input name attribute                                   |
| `type`         | `InputType`                | `'text'`    | Input type (text, email, password, number, date, etc.) |
| `label`        | `string`                   | `undefined` | Input label                                            |
| `placeholder`  | `string`                   | `undefined` | Placeholder text                                       |
| `required`     | `boolean`                  | `undefined` | Required field                                         |
| `minlength`    | `number`                   | `undefined` | Minimum length                                         |
| `maxlength`    | `number`                   | `undefined` | Maximum length                                         |
| `min`          | `number \| string`         | `undefined` | Minimum value                                          |
| `max`          | `number \| string`         | `undefined` | Maximum value                                          |
| `pattern`      | `string`                   | `undefined` | Validation pattern                                     |
| `step`         | `number`                   | `undefined` | Step value for number inputs                           |
| `autocomplete` | `string`                   | `undefined` | Autocomplete attribute                                 |
| `inputmode`    | `InputMode`                | `undefined` | Input mode hint                                        |
| `autofocus`    | `boolean`                  | `undefined` | Autofocus attribute                                    |
| `icon`         | `BaklavaIcon`              | `undefined` | Icon name                                              |
| `size`         | `InputSize`                | `'medium'`  | Input size (small, medium, large)                      |
| `disabled`     | `boolean`                  | `undefined` | Disabled state                                         |
| `readonly`     | `boolean`                  | `undefined` | Readonly state                                         |
| `labelFixed`   | `boolean`                  | `true`      | Fixed label position                                   |
| `invalidText`  | `string`                   | `undefined` | Error message text                                     |
| `helpText`     | `string`                   | `undefined` | Help text below input                                  |
| `loading`      | `boolean`                  | `undefined` | Loading state                                          |
| `suffixText`   | `string`                   | `undefined` | Suffix text in icon slot                               |

## Events

| Event               | Payload                    | Description                   |
| ------------------- | -------------------------- | ----------------------------- |
| `update:modelValue` | `string \| number \| null` | Emitted when value changes    |
| `invalid`           | `ValidityState`            | Emitted when validation fails |
| `focus`             | `FocusEvent`               | Emitted on focus              |
| `blur`              | `FocusEvent`               | Emitted on blur               |

## Slots

| Slot   | Description                                 |
| ------ | ------------------------------------------- |
| `icon` | Custom icon content (overrides `icon` prop) |

## Types

```typescript
import type { InputProps } from "@baklavue/ui";

interface InputProps {
  modelValue?: string | number | null;
  name?: string;
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "date"
    | "time"
    | "datetime-local"
    | "month"
    | "week"
    | "url"
    | "tel"
    | "search";
  label?: string;
  placeholder?: string;
  required?: boolean;
  minlength?: number;
  maxlength?: number;
  min?: number | string;
  max?: number | string;
  pattern?: string;
  step?: number;
  autocomplete?: string;
  inputmode?:
    | "none"
    | "text"
    | "decimal"
    | "numeric"
    | "tel"
    | "search"
    | "email"
    | "url";
  autofocus?: boolean;
  icon?: string;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  readonly?: boolean;
  labelFixed?: boolean;
  invalidText?: string;
  helpText?: string;
  loading?: boolean;
  suffixText?: string;
}
```

## Examples

### Form with Validation

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <Input
      v-model="form.email"
      type="email"
      label="Email"
      required
      :invalid-text="errors.email"
      @invalid="handleEmailInvalid"
    />
    <Input
      v-model="form.password"
      type="password"
      label="Password"
      required
      :minlength="8"
      :invalid-text="errors.password"
      help-text="Must be at least 8 characters"
      @invalid="handlePasswordInvalid"
    />
    <Button type="submit">Submit</Button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { Input, Button } from '@baklavue/ui'

const form = ref({
  email: '',
  password: ''
})

const errors = ref({
  email: '',
  password: ''
})

const handleEmailInvalid = (validity: ValidityState) => {
  if (validity.typeMismatch) {
    errors.value.email = 'Please enter a valid email'
  } else if (validity.valueMissing) {
    errors.value.email = 'Email is required'
  }
}

const handlePasswordInvalid = (validity: ValidityState) => {
  if (validity.tooShort) {
    errors.value.password = 'Password must be at least 8 characters'
  } else if (validity.valueMissing) {
    errors.value.password = 'Password is required'
  }
}

const handleSubmit = () => {
  console.log('Form submitted:', form.value)
}
</script>
```
