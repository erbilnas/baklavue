# useFormState

A lightweight composable for form dirty and touched state without validation. Use with plain ref form data or alongside [useZodForm](/composables/formValidation) when you need state tracking without Zod.

## Basic Usage

```vue
<script setup lang="ts">
import { useFormState } from "@baklavue/composables";
import { ref } from "vue";

const form = ref({ email: "", name: "" });
const { isDirty, dirtyFields, touched, touchedFields, setFieldTouched, setFieldValue, reset } = useFormState(form);

// Check before navigation
const beforeUnload = () => {
  if (isDirty.value) {
    return "You have unsaved changes";
  }
};
</script>
```

## API

### Parameters

```typescript
useFormState(data, options?)
```

| Parameter | Type | Description |
| --- | --- | --- |
| `data` | `Ref<T> \| Reactive<T> \| () => T` | Form data (ref, reactive, or getter) |
| `options` | `UseFormStateOptions` | Optional: `{ initialValues?: Ref \| () => T }` |

### Return Value

| Property | Type | Description |
| --- | --- | --- |
| `isDirty` | `Ref<boolean>` | Whether any field has changed from initial values |
| `dirtyFields` | `Ref<Record<string, boolean>>` | Per-field dirty state |
| `touched` | `Ref<boolean>` | Whether any field has been blurred |
| `touchedFields` | `Ref<Record<string, boolean>>` | Per-field touched state |
| `setFieldTouched` | `(path: string, value?: boolean) => void` | Mark a field as touched |
| `setFieldValue` | `(path: string, value: unknown) => void` | Programmatically set a field value |
| `reset` | `(initialValues?: unknown) => void` | Reset touched state and optionally form data |
| `initialValues` | `Ref<unknown>` | Snapshot of initial values |

## Unsaved Changes Warning

```typescript
const { isDirty } = useFormState(form);

onBeforeRouteLeave((_to, _from, next) => {
  if (isDirty.value) {
    showConfirmDialog({
      title: "Unsaved changes",
      message: "Leave without saving?",
      onConfirm: () => next(),
      onCancel: () => next(false),
    });
  } else {
    next();
  }
});
```

## With useZodForm

`useZodForm` already provides `isDirty`, `dirtyFields`, `touched`, and `touchedFields`. Use `useFormState` when you have a form without Zod validation but still need dirty/touched tracking.
