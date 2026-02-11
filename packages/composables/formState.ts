import {
  computed,
  isRef,
  ref,
  toValue,
  type MaybeRefOrGetter,
  type Ref,
} from "vue";

/** Deep equality for dirty check. Uses JSON.stringify for simplicity. */
function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (a == null || b == null) return a === b;
  try {
    return JSON.stringify(a) === JSON.stringify(b);
  } catch {
    return false;
  }
}

/** Safe clone for form data. JSON fallback for reactive proxies (SSR). */
function safeClone<T>(val: T): T {
  try {
    if (typeof structuredClone === "function") {
      return structuredClone(val) as T;
    }
  } catch {
    /* structuredClone fails on proxies */
  }
  return JSON.parse(JSON.stringify(val)) as T;
}

/** Sets value at path (e.g. "address.city"). Mutates obj. */
function setValueAtPath(
  obj: Record<string, unknown>,
  path: string,
  value: unknown,
): void {
  const parts = path.split(".");
  const last = parts.pop()!;
  let current: Record<string, unknown> = obj;
  for (const part of parts) {
    if (!(part in current) || typeof current[part] !== "object") {
      current[part] = {};
    }
    current = current[part] as Record<string, unknown>;
  }
  current[last] = value;
}

export interface UseFormStateOptions {
  /** Initial values for reset and dirty check. Defaults to current data when created. */
  initialValues?: MaybeRefOrGetter<unknown>;
}

/**
 * Lightweight composable for form dirty and touched state without validation.
 * Use with plain ref form data or alongside useZodForm.
 *
 * @example
 * ```ts
 * const form = ref({ email: '', name: '' });
 * const { isDirty, dirtyFields, touched, touchedFields, setFieldTouched, setFieldValue, reset } = useFormState(form);
 *
 * // Check before navigation
 * if (isDirty.value) {
 *   showConfirmDialog('Unsaved changes');
 * }
 * ```
 *
 * @param data - Form data (ref, reactive, or getter)
 * @param options - Optional: initialValues
 * @returns isDirty, dirtyFields, touched, touchedFields, setFieldTouched, setFieldValue, reset, initialValues
 */
export function useFormState(
  data: MaybeRefOrGetter<unknown>,
  options: UseFormStateOptions = {},
): {
  isDirty: Ref<boolean>;
  dirtyFields: Ref<Record<string, boolean>>;
  touched: Ref<boolean>;
  touchedFields: Ref<Record<string, boolean>>;
  setFieldTouched: (path: string, value?: boolean) => void;
  setFieldValue: (path: string, value: unknown) => void;
  reset: (initialValuesArg?: unknown) => void;
  initialValues: Ref<unknown>;
} {
  const dataVal = () => toValue(data);
  const getInitial = () =>
    options.initialValues !== undefined
      ? toValue(options.initialValues)
      : dataVal();
  const initialValues = ref(safeClone(getInitial())) as Ref<unknown>;

  const touchedFields = ref<Record<string, boolean>>({});

  const dirtyFields = computed(() => {
    const current = dataVal() as Record<string, unknown>;
    const initial = initialValues.value as Record<string, unknown>;
    if (!current || typeof current !== "object") return {};
    const result: Record<string, boolean> = {};
    const collect = (
      obj: Record<string, unknown>,
      init: Record<string, unknown>,
      prefix: string,
    ) => {
      for (const key of Object.keys(obj)) {
        const path = prefix ? `${prefix}.${key}` : key;
        const val = obj[key];
        const initVal = init?.[key];
        if (
          val !== null &&
          typeof val === "object" &&
          !Array.isArray(val) &&
          initVal !== null &&
          typeof initVal === "object" &&
          !Array.isArray(initVal)
        ) {
          collect(
            val as Record<string, unknown>,
            initVal as Record<string, unknown>,
            path,
          );
        } else {
          result[path] = !deepEqual(val, initVal);
        }
      }
    };
    collect(current, initial ?? {}, "");
    return result;
  });

  const isDirty = computed(() =>
    Object.values(dirtyFields.value).some(Boolean),
  );

  const touched = computed(() =>
    Object.values(touchedFields.value).some(Boolean),
  );

  const setFieldTouched = (path: string, value = true) => {
    touchedFields.value = { ...touchedFields.value, [path]: value };
  };

  const setFieldValue = (path: string, value: unknown) => {
    const val = dataVal();
    if (val && typeof val === "object" && !Array.isArray(val)) {
      setValueAtPath(val as Record<string, unknown>, path, value);
      if (isRef(data)) {
        (data as Ref<unknown>).value = { ...val };
      }
    }
  };

  const reset = (initialValuesArg?: unknown) => {
    touchedFields.value = {};
    const newInitial = initialValuesArg ?? dataVal();
    initialValues.value = safeClone(newInitial);

    if (initialValuesArg !== undefined && isRef(data)) {
      (data as Ref<unknown>).value = safeClone(initialValuesArg);
    }
  };

  return {
    isDirty,
    dirtyFields,
    touched,
    touchedFields,
    setFieldTouched,
    setFieldValue,
    reset,
    initialValues,
  };
}
