# useZodForm

A composable for form validation with [Zod](https://zod.dev) schemas. Supports lazy (validate on submit, then real-time) or eager (validate on every change) validation modes. Integrates with `useScrollToError` for scrolling to the first invalid field.

## Prerequisites

Install Zod in your project:

```bash
bun add zod
# or: npm install zod
```

## Basic Usage

<div class="component-demo">

<ZodFormValidationDemo />

</div>

```vue
<template>
  <form @submit.prevent="handleSubmit" style="max-width: 300px; display: flex; flex-direction: column; gap: 1rem;">
    <div data-field="email">
      <BvInput
        v-model="form.email"
        type="email"
        label="Email"
        :invalid-text="getError('email')"
      />
    </div>
    <div data-field="password">
      <BvInput
        v-model="form.password"
        type="password"
        label="Password"
        help-text="Must be at least 8 characters"
        :invalid-text="getError('password')"
      />
    </div>
    <BvButton type="submit">Submit</BvButton>
  </form>
</template>

<script setup lang="ts">
import { BvButton, BvInput } from "@baklavue/ui";
import { useZodForm } from "@baklavue/composables";
import { ref } from "vue";
import { z } from "zod";

const form = ref({
  email: "",
  password: "",
});

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const { validate, getError, scrollToFirstError } = useZodForm(schema, form, {
  mode: "lazy",
});

const handleSubmit = async () => {
  const errors = await validate();
  if (!errors) {
    console.log("Form submitted:", form.value);
  } else {
    scrollToFirstError();
  }
};
</script>
```

## Validation Modes

### Lazy (default)

Validates only when you call `validate()`. After the first validation, errors update in real time as the user types. Best for forms where you want to avoid showing errors until the user attempts to submit.

```typescript
const { validate } = useZodForm(schema, form, { mode: "lazy" });

const handleSubmit = async () => {
  const errors = await validate();
  if (!errors) {
    // submit
  }
};
```

### Eager

Validates immediately when form data changes. Errors appear as soon as the user interacts with fields. Use for shorter forms or when you want immediate feedback.

```typescript
const { validate } = useZodForm(schema, form, { mode: "eager" });
```

## API

### Parameters

```typescript
useZodForm(schema, data, options?)
```

| Parameter | Type | Description |
| --- | --- | --- |
| `schema` | `ZodSchema \| Ref<ZodSchema> \| () => ZodSchema` | Zod schema (object, ref, or getter) |
| `data` | `Ref<T> \| Reactive<T> \| () => T` | Form data (ref, reactive, or getter) |
| `options` | `UseZodFormOptions` | Optional: `{ mode: 'lazy' \| 'eager' }` |

### Return Value

| Property | Type | Description |
| --- | --- | --- |
| `validate` | `() => Promise<FormErrors \| null>` | Runs validation. Returns errors or `null` if valid |
| `errors` | `Ref<FormErrors>` | Reactive errors grouped by field path |
| `isValid` | `Ref<boolean>` | Whether the form is currently valid |
| `clearErrors` | `() => void` | Clears all errors |
| `getError` | `(path: string) => string \| undefined` | Returns first error message for a field path |
| `scrollToFirstError` | `(options?: ScrollToErrorOptions) => void` | Scrolls to first invalid field (requires `data-field` on wrapper) |

### UseZodFormOptions

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `mode` | `'lazy' \| 'eager'` | `'lazy'` | When to run validation |

## Scroll to First Error

Use `scrollToFirstError()` after validation fails to scroll to the first invalid field. Wrap each form control in an element with `data-field` matching the schema path:

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <div data-field="email">
      <BvInput v-model="form.email" :invalid-text="getError('email')" />
    </div>
    <div data-field="password">
      <BvInput v-model="form.password" :invalid-text="getError('password')" />
    </div>
    <BvButton type="submit">Submit</BvButton>
  </form>
</template>

<script setup lang="ts">
const { validate, getError, scrollToFirstError } = useZodForm(schema, form);

const handleSubmit = async () => {
  const errors = await validate();
  if (errors) {
    scrollToFirstError();
  }
};
</script>
```

`scrollToFirstError` accepts the same options as [useScrollToError](/composables/scrollToError) (`scrollBehavior`, `block`, `shineClass`, `shineDuration`, `focus`, `focusDelay`).

## Nested Fields

For nested schema paths like `address.city`, use the dot notation in `getError`:

```typescript
const schema = z.object({
  address: z.object({
    city: z.string().min(1, "City is required"),
  }),
});

// In template
getError("address.city");
```

```vue
<div data-field="address.city">
  <BvInput v-model="form.address.city" :invalid-text="getError('address.city')" />
</div>
```

## TypeScript Support

```typescript
import {
  useZodForm,
  type FormErrors,
  type UseZodFormOptions,
} from "@baklavue/composables";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormData = z.infer<typeof schema>;
const form = ref<FormData>({ email: "", password: "" });

const { validate, errors, isValid, getError } = useZodForm(schema, form);
```
