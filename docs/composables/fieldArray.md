# useFieldArray

A composable for dynamic array fields in forms (tags, addresses, line items). Provides stable keys for list rendering and keeps form data in sync.

## Basic Usage

```vue
<script setup lang="ts">
import { useFieldArray } from "@baklavue/composables";
import { ref } from "vue";

const form = ref({ tags: [] as string[] });
const tagsRef = computed({
  get: () => form.value.tags,
  set: (v) => { form.value = { ...form.value, tags: v }; },
});

const { fields, push, remove, insert } = useFieldArray(tagsRef);
</script>

<template>
  <div v-for="field in fields" :key="field.key">
    <input v-model="field.value" />
    <button type="button" @click="remove(field.index)">Remove</button>
  </div>
  <button type="button" @click="push('')">Add</button>
</template>
```

## With Object Items

```vue
<script setup lang="ts">
const form = ref({ items: [{ name: "", qty: 0 }] });
const itemsRef = computed({
  get: () => form.value.items,
  set: (v) => { form.value = { ...form.value, items: v }; },
});

const { fields, push, remove } = useFieldArray(itemsRef);
</script>

<template>
  <div v-for="field in fields" :key="field.key">
    <input v-model="field.value.name" placeholder="Name" />
    <input v-model.number="field.value.qty" type="number" placeholder="Qty" />
    <button type="button" @click="remove(field.index)">Remove</button>
  </div>
  <button type="button" @click="push({ name: '', qty: 0 })">Add item</button>
</template>
```

## API

### Parameters

```typescript
useFieldArray(arrayRef, options?)
```

| Parameter | Type | Description |
| --- | --- | --- |
| `arrayRef` | `Ref<T[]>` | Ref to the array (or writable computed) |
| `options` | `UseFieldArrayOptions<T>` | Optional: `{ keyName?: keyof T \| (item, index) => string }` |

### Return Value

| Property | Type | Description |
| --- | --- | --- |
| `fields` | `Ref<FieldArrayField<T>[]>` | Array of `{ key, value, index }` for v-for |
| `push` | `(value: T) => void` | Append item |
| `remove` | `(index: number) => void` | Remove item at index |
| `insert` | `(index: number, value: T) => void` | Insert item at index |
| `move` | `(fromIndex: number, toIndex: number) => void` | Reorder items |
| `replace` | `(values: T[]) => void` | Replace entire array |
| `reset` | `(values?: T[]) => void` | Reset to values or empty array |

### Custom Keys

Use `keyName` when items have a unique identifier:

```typescript
const { fields } = useFieldArray(itemsRef, {
  keyName: "id", // or: (item, index) => item.id
});
```

## With useZodForm

Use with [useZodForm](/composables/formValidation) for validation of array fields:

```typescript
const schema = z.object({
  items: z.array(z.object({
    name: z.string().min(1),
    qty: z.number().min(1),
  })),
});

const form = useZodForm(schema, formData);
const { fields, push, remove } = useFieldArray(itemsRef);

// In template, use data-field for scroll-to-error: data-field="items.0.name"
```
