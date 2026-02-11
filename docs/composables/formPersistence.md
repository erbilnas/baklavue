# useFormPersistence

A composable for auto-saving form data to `localStorage` or `sessionStorage`. Useful for long forms, drafts, or preventing data loss on accidental navigation.

## Basic Usage

```vue
<script setup lang="ts">
import { useFormPersistence } from "@baklavue/composables";
import { ref } from "vue";

const form = ref({ email: "", message: "" });
useFormPersistence("contact-draft", form);
</script>
```

Form data is automatically saved when the user types. On page load, if a draft exists in storage, it is restored.

## API

### Parameters

```typescript
useFormPersistence(key, data, options?)
```

| Parameter | Type | Description |
| --- | --- | --- |
| `key` | `string` | Storage key |
| `data` | `Ref<T> \| Reactive<T> \| () => T` | Form data (ref, reactive, or getter) |
| `options` | `UseFormPersistenceOptions` | Optional: `{ storage?: 'localStorage' \| 'sessionStorage', debounce?: number }` |

### Return Value

| Property | Type | Description |
| --- | --- | --- |
| `clear` | `() => void` | Remove persisted data from storage |

### Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `storage` | `'localStorage' \| 'sessionStorage'` | `'localStorage'` | Where to persist |
| `debounce` | `number` | `300` | Debounce writes in ms. Use `0` for immediate write |

## Session vs Local Storage

- **localStorage**: Persists across browser sessions. Use for drafts the user might return to later.
- **sessionStorage**: Persists only for the current tab. Use for forms that should not persist after closing.

```typescript
useFormPersistence("wizard-draft", form, {
  storage: "sessionStorage",
  debounce: 500,
});
```

## Clearing Draft

Call `clear()` when the form is successfully submitted:

```typescript
const { clear } = useFormPersistence("contact-draft", form);

const onSubmit = async () => {
  await api.submit(form.value);
  clear();
};
```
