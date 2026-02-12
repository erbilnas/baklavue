import { computed, ref, watch, type Ref } from "vue";

let fieldArrayCounter = 0;

function generateFieldKey(): string {
  return `field-${++fieldArrayCounter}`;
}

export interface UseFieldArrayOptions<T> {
  /** Key getter for each item. If provided, uses this for stable keys instead of generated ids. */
  keyName?: keyof T | ((item: T, index: number) => string);
}

export interface FieldArrayField<T> {
  key: string;
  value: T;
  index: number;
}

/**
 * Composable for dynamic array fields (tags, addresses, line items).
 * Keeps form data in sync and provides stable keys for list rendering.
 *
 * @example
 * ```ts
 * const form = ref({ tags: [] as string[] });
 * const { fields, push, remove, insert, move, replace, reset } = useFieldArray(
 *   () => form.value.tags,
 *   (v) => { form.value.tags = v; }
 * );
 *
 * push('new');
 * remove(0);
 * ```
 *
 * @example
 * ```ts
 * const items = ref([{ name: '' }]);
 * const { fields, push, remove } = useFieldArray(items);
 * ```
 *
 * @param arrayRef - Ref to the array to manage
 * @param options - Optional: keyName for custom keys
 * @returns fields, push, remove, insert, move, replace, reset
 */
export function useFieldArray<T>(
  arrayRef: Ref<T[]>,
  options: UseFieldArrayOptions<T> = {},
): {
  fields: Ref<FieldArrayField<T>[]>;
  push: (value: T) => void;
  remove: (index: number) => void;
  insert: (index: number, value: T) => void;
  move: (fromIndex: number, toIndex: number) => void;
  replace: (values: T[]) => void;
  reset: (values?: T[]) => void;
} {
  const keys = ref<string[]>([]);

  const syncKeys = () => {
    const arr = arrayRef.value;
    const len = arr.length;
    const currentKeys = keys.value;
    if (currentKeys.length === len) return;
    if (currentKeys.length < len) {
      const toAdd = len - currentKeys.length;
      keys.value = [
        ...currentKeys,
        ...Array.from({ length: toAdd }, () => generateFieldKey()),
      ];
    } else {
      keys.value = currentKeys.slice(0, len);
    }
  };

  syncKeys();

  watch(arrayRef, syncKeys, { deep: true });

  const getKey = (item: T, index: number): string => {
    if (options.keyName) {
      if (typeof options.keyName === "function") {
        return String(options.keyName(item, index));
      }
      const val = (item as Record<string, unknown>)[options.keyName as string];
      return val != null
        ? String(val)
        : (keys.value[index] ?? generateFieldKey());
    }
    return keys.value[index] ?? generateFieldKey();
  };

  const fields = computed(() => {
    const arr = arrayRef.value;
    syncKeys();
    return arr.map((value, index) => ({
      key: options.keyName ? getKey(value, index) : (keys.value[index] ?? generateFieldKey()),
      value,
      index,
    }));
  }) as Ref<FieldArrayField<T>[]>;

  const push = (value: T) => {
    keys.value = [...keys.value, generateFieldKey()];
    arrayRef.value = [...arrayRef.value, value];
  };

  const remove = (index: number) => {
    keys.value = keys.value.filter((_, i) => i !== index);
    arrayRef.value = arrayRef.value.filter((_, i) => i !== index);
  };

  const insert = (index: number, value: T) => {
    keys.value = [
      ...keys.value.slice(0, index),
      generateFieldKey(),
      ...keys.value.slice(index),
    ];
    arrayRef.value = [
      ...arrayRef.value.slice(0, index),
      value,
      ...arrayRef.value.slice(index),
    ];
  };

  const move = (fromIndex: number, toIndex: number) => {
    const arr = [...arrayRef.value];
    const [item] = arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, item);
    const keysNext = [...keys.value];
    const [key] = keysNext.splice(fromIndex, 1);
    keysNext.splice(toIndex, 0, key);
    keys.value = keysNext;
    arrayRef.value = arr;
  };

  const replace = (values: T[]) => {
    keys.value = values.map(() => generateFieldKey());
    arrayRef.value = [...values];
  };

  const reset = (values?: T[]) => {
    replace(values ?? []);
  };

  return {
    fields,
    push,
    remove,
    insert,
    move,
    replace,
    reset,
  };
}
