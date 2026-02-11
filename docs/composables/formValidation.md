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
| `options` | `UseZodFormOptions` | Optional: `{ mode: 'lazy' \| 'eager', debounce?: number }` |

### Return Value

| Property | Type | Description |
| --- | --- | --- |
| `validate` | `() => Promise<FormErrors \| null>` | Runs validation. Returns errors or `null` if valid |
| `validateField` | `(path: string) => Promise<FormErrors \| null>` | Validates only the field at path (use on blur). Falls back to full validation if schema cannot be extracted |
| `errors` | `Ref<FormErrors>` | Reactive errors grouped by field path |
| `isValid` | `Ref<boolean>` | Whether the form is currently valid |
| `clearErrors` | `() => void` | Clears all errors |
| `reset` | `(initialValues?: unknown) => void` | Clears errors, touched fields, and optionally resets form data to initial values |
| `getError` | `(path: string) => string \| undefined` | Returns first error message for a field path |
| `getErrors` | `(path: string) => string[]` | Returns all error messages for a field path |
| `handleSubmit` | `(onSubmit: (data) => R \| Promise<R>) => Promise<R>` | Validates, then calls onSubmit with validated data if valid; otherwise scrolls to first error and rejects |
| `scrollToFirstError` | `(options?: ScrollToFirstErrorOptions) => ScrollToErrorResult` | Scrolls to first invalid field (requires `data-field` on wrapper). Returns `{ success: boolean }` |
| `setFieldValue` | `(path: string, value: unknown) => void` | Programmatically set a field value |
| `setErrors` | `(errors: FormErrors) => void` | Set errors (e.g. from server-side validation) |
| `setFieldError` | `(path: string, message: string) => void` | Set error for a single field |
| `initialValues` | `Ref<unknown>` | Snapshot of initial values (used for dirty check and reset) |
| `isDirty` | `Ref<boolean>` | Whether any field has changed from initial values |
| `dirtyFields` | `Ref<Record<string, boolean>>` | Per-field dirty state |
| `touched` | `Ref<boolean>` | Whether any field has been blurred |
| `touchedFields` | `Ref<Record<string, boolean>>` | Per-field touched state |
| `setFieldTouched` | `(path: string, value?: boolean) => void` | Mark a field as touched (e.g. on blur) |
| `isSubmitting` | `Ref<boolean>` | `true` while `handleSubmit` callback is running |
| `isSubmitted` | `Ref<boolean>` | `true` after first submit attempt |
| `submitCount` | `Ref<number>` | Number of submit attempts |

### UseZodFormOptions

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `mode` | `'lazy' \| 'eager'` | `'lazy'` | When to run validation |
| `debounce` | `number` | `0` | Debounce validation in ms for eager mode. Use for large forms |

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

`scrollToFirstError` accepts the same options as [useScrollToError](/composables/scrollToError) (`scrollBehavior`, `block`, `shineClass`, `shineDuration`, `focus`, `focusDelay`, `scrollContainer`, `announce`, `scrollOffset`), plus `fieldSelector` to customize how field paths map to DOM selectors:

```typescript
scrollToFirstError({
  fieldSelector: (path) => `[name="${path}"]`, // Use name attribute instead of data-field
  scrollContainer: "[data-dialog-body]", // For forms inside modals
  scrollOffset: { top: 80 }, // For fixed headers
});
```

## handleSubmit

Use `handleSubmit(onSubmit)` to validate and submit in one call. If validation fails, it scrolls to the first error and rejects. If valid, it calls `onSubmit` with the validated (and possibly transformed) data:

```typescript
const { handleSubmit } = useZodForm(schema, form);

const onSubmit = () =>
  handleSubmit(async (data) => {
    await api.submit(data);
  });
```

`handleSubmit` sets `isSubmitting` to `true` while the callback runs. Use it to disable the submit button:

```typescript
const { handleSubmit, isSubmitting } = useZodForm(schema, form);

const onSubmit = () =>
  handleSubmit(async (data) => await api.submit(data));

// In template: <BvButton type="submit" :disabled="isSubmitting">Submit</BvButton>
```

For additional loading overlay, combine with [useLoading](/composables/loading):

```typescript
const { handleSubmit, isSubmitting } = useZodForm(schema, form);
const { withLoading } = useLoading();

const onSubmit = () =>
  withLoading(() =>
    handleSubmit(async (data) => await api.submit(data))
  );
```

## reset

Use `reset()` to clear errors and optionally reset form data. Pass initial values when using a ref:

```typescript
const { reset } = useZodForm(schema, form);

// Clear errors only
reset();

// Reset to initial values (when data is a ref)
reset({ email: "", password: "" });
```

## On-Blur Validation

For field-level validation on blur, use `validateField`:

```vue
<div data-field="email">
  <BvInput
    v-model="form.email"
    @blur="validateField('email')"
    :invalid-text="getError('email')"
  />
</div>
```

## Debounce (Eager Mode)

For large forms or expensive schemas in eager mode, add a debounce to avoid validating on every keystroke:

```typescript
const { validate } = useZodForm(schema, form, {
  mode: "eager",
  debounce: 300,
});
```

## Dirty & Touched State

`isDirty` and `dirtyFields` track whether the form has changed from its initial values. Useful for "unsaved changes" dialogs:

```typescript
const { isDirty } = useZodForm(schema, form);

// Before navigation
if (isDirty.value) {
  showConfirmDialog("You have unsaved changes");
}
```

`touched` and `touchedFields` track which fields have been blurred. Call `setFieldTouched(path)` on blur to enable "show error only after touch" UX:

```vue
<BvInput
  v-model="form.email"
  @blur="setFieldTouched('email')"
  :invalid-text="touchedFields.email ? getError('email') : undefined"
/>
```

## Server-Side Errors

Use `setErrors` or `setFieldError` when the API returns validation errors:

```typescript
const { setErrors, setFieldError } = useZodForm(schema, form);

try {
  await api.submit(form.value);
} catch (err) {
  if (err.response?.data?.errors) {
    // Map API errors to FormErrors shape: { "path": ZodIssue[] }
    setErrors(mapApiErrorsToFormErrors(err.response.data.errors));
  }
}
```

For a single field:

```typescript
setFieldError("email", "This email is already registered");
```

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
  type InferFormData,
  type ScrollToFirstErrorOptions,
  type UseZodFormOptions,
} from "@baklavue/composables";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormData = z.infer<typeof schema>;
const form = ref<FormData>({ email: "", password: "" });

const { validate, errors, isValid, getError, handleSubmit } = useZodForm(
  schema,
  form,
);
```
