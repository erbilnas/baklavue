# Forms Composables

## useScrollToError

[useScrollToError](/composables/scrollToError) · `import { useScrollToError } from "@baklavue/composables"`

Scroll to an element with validation error. Scrolls into view, optionally applies a highlight effect, focuses the first focusable control, and announces to screen readers.

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
  scrollContainer: "[data-dialog-body]",
  scrollOffset: { top: 80 },
});

// With default options (e.g. for modals)
const { scrollToError } = useScrollToError({
  defaultOptions: { scrollContainer: "[data-dialog-body]" },
});
```

**Target:** `string` (CSS selector) | `HTMLElement` | `{ scrollTarget: string }`

**Returns:** `{ success: boolean }`

**ScrollToErrorOptions:** `scrollBehavior`, `block`, `shineClass`, `shineDuration`, `focus`, `focusDelay`, `scrollContainer`, `announce`, `scrollOffset`

## useZodForm

[useZodForm](/composables/formValidation) · `import { useZodForm } from "@baklavue/composables"`

Form validation with Zod schemas. Supports lazy (validate on submit, then real-time) or eager (validate on change) modes.

```typescript
const {
  validate,
  validateField,
  errors,
  isValid,
  clearErrors,
  reset,
  getError,
  getErrors,
  handleSubmit,
  scrollToFirstError,
  setFieldValue,
  setErrors,
  setFieldError,
  initialValues,
  isDirty,
  dirtyFields,
  touched,
  touchedFields,
  setFieldTouched,
  isSubmitting,
  isSubmitted,
  submitCount,
} = useZodForm(schema, formData, { mode: "lazy" });

// Manual validation
const onSubmit = async () => {
  const errs = await validate();
  if (!errs) {
    // submit
  } else {
    scrollToFirstError();
  }
};

// Or use handleSubmit (sets isSubmitting while running)
const onSubmit = () =>
  handleSubmit(async (data) => await api.submit(data));
```

**Returns:** `validate`, `validateField`, `errors`, `isValid`, `clearErrors`, `reset`, `getError`, `getErrors`, `handleSubmit`, `scrollToFirstError`, `setFieldValue`, `setErrors`, `setFieldError`, `initialValues`, `isDirty`, `dirtyFields`, `touched`, `touchedFields`, `setFieldTouched`, `isSubmitting`, `isSubmitted`, `submitCount`

**UseZodFormOptions:** `mode?: 'lazy' | 'eager'`, `debounce?: number`

## useFormState

[useFormState](/composables/formState) · `import { useFormState } from "@baklavue/composables"`

Form dirty and touched state without validation. Use with plain ref form data.

**Returns:** `isDirty`, `dirtyFields`, `touched`, `touchedFields`, `setFieldTouched`, `setFieldValue`, `reset`, `initialValues`

## useFieldArray

[useFieldArray](/composables/fieldArray) · `import { useFieldArray } from "@baklavue/composables"`

Dynamic array fields for forms (tags, addresses, line items). Provides stable keys for list rendering.

**Returns:** `fields`, `push`, `remove`, `insert`, `move`, `replace`, `reset`

## useFormPersistence

[useFormPersistence](/composables/formPersistence) · `import { useFormPersistence } from "@baklavue/composables"`

Auto-save form data to localStorage or sessionStorage. Useful for drafts and long forms.

**Returns:** `clear`

**Options:** `storage?: 'localStorage' | 'sessionStorage'`, `debounce?: number`

## useStepperForm

[useStepperForm](/composables/stepperForm) · `import { useStepperForm } from "@baklavue/composables"`

Multi-step form validation with useStepper. Validate before advancing to the next step.

**Returns:** `hasStepError`, `nextWithValidation`

**Options:** `stepFields?: (stepIndex: number) => string[]`
