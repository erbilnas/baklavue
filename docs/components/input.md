# Input

A Vue wrapper for Baklava's `bl-input` component with full v-model support and TypeScript types. Supports text, email, password, number, date, time, and other input types with validation, help text, loading state, and icons.

## Basic Usage

Use `v-model` for two-way binding. Set `label` and `placeholder` for accessibility and UX.

<div class="component-demo">

<InputBasicDemo />

</div>

```vue
<template>
  <BvInput v-model="value" label="Email" placeholder="Enter your email" />
</template>

<script setup>
import { ref } from "vue";
import { BvInput } from "@baklavue/ui";

const value = ref("");
</script>
```

## Input Types

The Input component supports all standard HTML input types: text, email, password, number, date, time, and more.

<div class="component-demo">

<InputTypesDemo />

</div>

```vue
<template>
  <BvInput v-model="text" type="text" label="Text" />
  <BvInput v-model="email" type="email" label="Email" />
  <BvInput v-model="password" type="password" label="Password" />
  <BvInput v-model="number" type="number" label="Number" />
  <BvInput v-model="date" type="date" label="Date" />
</template>

<script setup>
import { ref } from "vue";
import { BvInput } from "@baklavue/ui";

const text = ref("");
const email = ref("");
const password = ref("");
const number = ref(0);
const date = ref("");
</script>
```

## Validation

Use the `required` prop and native validation attributes (`minlength`, `maxlength`, `pattern`, etc.). Listen to the `invalid` event to handle validation failures and display custom error messages via the `invalid-text` prop.

<div class="component-demo">

<InputValidationDemo />

</div>

```vue
<template>
  <BvInput
    v-model="email"
    type="email"
    label="Email"
    required
    :invalid-text="emailError"
    @invalid="handleInvalid"
  />
</template>

<script setup>
import { ref } from "vue";
import { BvInput } from "@baklavue/ui";

const email = ref("");
const emailError = ref("");

const handleInvalid = (validity: ValidityState) => {
  if (validity.typeMismatch) {
    emailError.value = "Please enter a valid email address";
  } else if (validity.valueMissing) {
    emailError.value = "Email is required";
  }
};
</script>
```

## Help Text

Use the `help-text` prop to display helper text below the input.

<div class="component-demo">

<InputHelpTextDemo />

</div>

```vue
<template>
  <BvInput
    v-model="password"
    type="password"
    label="Password"
    help-text="Must be at least 8 characters"
  />
</template>

<script setup>
import { ref } from "vue";
import { BvInput } from "@baklavue/ui";

const password = ref("");
</script>
```

## Loading State

Use the `loading` prop to show a loading indicator while the input is processing (e.g. search-as-you-type).

<div class="component-demo">

<InputLoadingDemo />

</div>

```vue
<template>
  <BvInput
    v-model="search"
    label="Search"
    :loading="isSearching"
    placeholder="Type to search..."
  />
</template>

<script setup>
import { ref } from "vue";
import { BvInput } from "@baklavue/ui";

const search = ref("");
const isSearching = ref(true);
</script>
```

## Disabled and Readonly

Disable or set the input to readonly to prevent user interaction.

<div class="component-demo">

<InputDisabledReadonlyDemo />

</div>

```vue
<template>
  <BvInput v-model="value" label="Disabled" disabled />
  <BvInput v-model="value" label="Readonly" readonly />
</template>

<script setup>
import { ref } from "vue";
import { BvInput } from "@baklavue/ui";

const value = ref("Read-only value");
</script>
```

## Sizes

Use the `size` prop to control the input height. Options: `small`, `medium` (default), `large`.

<div class="component-demo">

<InputSizesDemo />

</div>

```vue
<template>
  <BvInput v-model="small" size="small" label="Small" />
  <BvInput v-model="medium" size="medium" label="Medium" />
  <BvInput v-model="large" size="large" label="Large" />
</template>

<script setup>
import { ref } from "vue";
import { BvInput } from "@baklavue/ui";

const small = ref("");
const medium = ref("");
const large = ref("");
</script>
```

## With Icon

Add an icon to the input using the `icon` prop. Use any Baklava icon name.

<div class="component-demo">

<InputWithIconDemo />

</div>

```vue
<template>
  <BvInput v-model="search" label="Search" icon="search" />
</template>

<script setup>
import { ref } from "vue";
import { BvInput } from "@baklavue/ui";

const search = ref("");
</script>
```

## Complete Example: Form with Validation

A complete form using multiple inputs with validation, help text, and error handling.

<div class="component-demo">

<InputFormValidationDemo />

</div>

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <BvInput
      v-model="form.email"
      type="email"
      label="Email"
      required
      :invalid-text="errors.email"
      @invalid="handleEmailInvalid"
    />
    <BvInput
      v-model="form.password"
      type="password"
      label="Password"
      required
      :minlength="8"
      :invalid-text="errors.password"
      help-text="Must be at least 8 characters"
      @invalid="handlePasswordInvalid"
    />
    <BvButton type="submit">Submit</BvButton>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { BvInput, BvButton } from "@baklavue/ui";

const form = ref({
  email: "",
  password: "",
});

const errors = ref({
  email: "",
  password: "",
});

const handleEmailInvalid = (validity: ValidityState) => {
  if (validity.typeMismatch) {
    errors.value.email = "Please enter a valid email";
  } else if (validity.valueMissing) {
    errors.value.email = "Email is required";
  }
};

const handlePasswordInvalid = (validity: ValidityState) => {
  if (validity.tooShort) {
    errors.value.password = "Password must be at least 8 characters";
  } else if (validity.valueMissing) {
    errors.value.password = "Password is required";
  }
};

const handleSubmit = () => {
  console.log("Form submitted:", form.value);
};
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

## Usage Notes

- **Two-way binding**: Use `v-model` to bind the input value. The component emits `update:modelValue` when the value changes.

- **Validation flow**: Listen to the `invalid` event to handle validation failures. Set `invalid-text` reactively based on the `ValidityState` to display custom error messages.

- **Date/time picker**: For inputs with `type="date"`, `type="time"`, or `type="datetime-local"`, clicking the input triggers the native date/time picker.

- **Accessibility**: The component follows Baklava's accessibility guidelines and includes proper ARIA attributes for screen readers.

- **Styling**: The component uses Baklava's default styling. Custom styling can be applied through CSS variables or by overriding the component styles.
