import type { z } from "zod";
import {
  computed,
  isRef,
  onUnmounted,
  ref,
  toValue,
  watch,
  type MaybeRefOrGetter,
  type Ref,
} from "vue";
import { useDebounceFn } from "./debounce";
import { useScrollToError } from "./scrollToError";
import type { ScrollToErrorOptions, ScrollToErrorResult } from "./scrollToError";

/** Schema type that supports safeParseAsync (Zod 3/4 compatible) */
type ZodSchemaLike = {
  safeParseAsync: (
    data: unknown,
  ) => Promise<
    | { success: true; data: unknown }
    | { success: false; error: { issues: z.ZodIssue[] } }
  >;
  shape?: Record<string, unknown>;
};

/** Helper type to infer form data from a Zod schema. Use with z.infer<typeof schema>. */
export type InferFormData<T extends ZodSchemaLike> = T extends {
  _output: infer O;
}
  ? O
  : unknown;

/** Options for useZodForm */
export interface UseZodFormOptions {
  /** Validation mode: 'lazy' validates on submit then real-time; 'eager' validates on every change */
  mode?: "lazy" | "eager";
  /** Debounce validation in ms for eager mode. 0 = no debounce. Default: 0 */
  debounce?: number;
}

/** Options for scrollToFirstError, including custom field selector */
export interface ScrollToFirstErrorOptions extends ScrollToErrorOptions {
  /** Custom selector for field. Default: path => `[data-field="${path}"]` */
  fieldSelector?: (path: string) => string;
}

/** Errors grouped by field path (e.g. { "email": [...], "address.city": [...] }) */
export type FormErrors = Record<string, z.ZodIssue[]> | null;

/**
 * Groups Zod issues by path string (e.g. ['email'] -> 'email', ['address','city'] -> 'address.city').
 */
function groupIssuesByPath(issues: z.ZodIssue[]): Record<string, z.ZodIssue[]> {
  const grouped: Record<string, z.ZodIssue[]> = {};
  for (const issue of issues) {
    const pathKey = issue.path.map(String).join(".");
    if (!grouped[pathKey]) {
      grouped[pathKey] = [];
    }
    grouped[pathKey].push(issue);
  }
  return grouped;
}

/** Gets value at path (e.g. "address.city"). */
function getValueAtPath(obj: unknown, path: string): unknown {
  const parts = path.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return current;
}

/** Sets value at path (e.g. "address.city"). Mutates obj. */
function setValueAtPath(obj: Record<string, unknown>, path: string, value: unknown): void {
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

/** Extracts schema at path from ZodObject. Returns null if not extractable. */
function getSchemaAtPath(
  schema: ZodSchemaLike,
  path: string,
): ZodSchemaLike | null {
  const shape = schema.shape;
  if (!shape || typeof shape !== "object") return null;
  const parts = path.split(".");
  let current: unknown = shape;
  for (const part of parts) {
    if (!current || typeof current !== "object") return null;
    const sub = (current as Record<string, unknown>)[part];
    if (sub == null) return null;
    current = sub;
  }
  return current && typeof (current as { safeParseAsync?: unknown }).safeParseAsync === "function"
    ? (current as ZodSchemaLike)
    : null;
}

/** Safe clone for form data. JSON fallback for reactive proxies (SSR). */
function safeClone<T>(val: T): T {
  try {
    if (typeof structuredClone === "function") {
      return structuredClone(val) as T;
    }
  } catch {
    /* structuredClone fails on proxies, Symbols, etc. */
  }
  return JSON.parse(JSON.stringify(val)) as T;
}

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

/**
 * Composable for form validation with Zod schemas.
 * Supports lazy (validate on submit, then real-time) or eager (validate on change) modes.
 *
 * @example
 * ```ts
 * const form = ref({ email: '', password: '' });
 * const schema = z.object({
 *   email: z.string().email('Invalid email'),
 *   password: z.string().min(8, 'At least 8 characters'),
 * });
 *
 * const { validate, errors, isValid, getError, scrollToFirstError } = useZodForm(
 *   schema,
 *   form,
 *   { mode: 'lazy' }
 * );
 *
 * const handleSubmit = async () => {
 *   const errs = await validate();
 *   if (!errs) {
 *     // submit
 *   } else {
 *     scrollToFirstError();
 *   }
 * };
 * ```
 *
 * @param schema - Zod schema (object, ref, or getter)
 * @param data - Form data (ref, reactive, or getter)
 * @param options - Optional: mode, debounce
 * @returns validate, validateField, errors, isValid, clearErrors, reset, getError, getErrors, handleSubmit, scrollToFirstError
 */
export function useZodForm<T extends ZodSchemaLike>(
  schema: MaybeRefOrGetter<T>,
  data: MaybeRefOrGetter<unknown>,
  options: UseZodFormOptions = {},
): {
  validate: () => Promise<FormErrors>;
  validateField: (path: string) => Promise<FormErrors>;
  errors: Ref<FormErrors>;
  isValid: Ref<boolean>;
  clearErrors: () => void;
  reset: (initialValues?: unknown) => void;
  getError: (path: string) => string | undefined;
  getErrors: (path: string) => string[];
  handleSubmit: <R>(
    onSubmit: (data: unknown) => R | Promise<R>,
  ) => Promise<R>;
  scrollToFirstError: (options?: ScrollToFirstErrorOptions) => ScrollToErrorResult;
  setFieldValue: (path: string, value: unknown) => void;
  setErrors: (errors: FormErrors) => void;
  setFieldError: (path: string, message: string) => void;
  initialValues: Ref<unknown>;
  isDirty: Ref<boolean>;
  dirtyFields: Ref<Record<string, boolean>>;
  touched: Ref<boolean>;
  touchedFields: Ref<Record<string, boolean>>;
  setFieldTouched: (path: string, value?: boolean) => void;
  isSubmitting: Ref<boolean>;
  isSubmitted: Ref<boolean>;
  submitCount: Ref<number>;
} {
  const opts = {
    mode: "lazy" as const,
    debounce: 0,
    ...options,
  };

  const isValid = ref(true);
  const errors = ref<FormErrors>(null);
  const isSubmitting = ref(false);
  const isSubmitted = ref(false);
  const submitCount = ref(0);
  const touchedFields = ref<Record<string, boolean>>({});

  const initialValues = ref(safeClone(toValue(data)));

  const clearErrors = () => {
    errors.value = null;
  };

  const setErrors = (errs: FormErrors) => {
    if (errs === null) {
      errors.value = null;
      isValid.value = true;
    } else {
      errors.value = errs;
      isValid.value = false;
    }
  };

  const setFieldError = (path: string, message: string) => {
    const current = errors.value ?? {};
    const issue: z.ZodIssue = {
      message,
      path: path.split("."),
      code: "custom",
    };
    errors.value = { ...current, [path]: [issue] };
    isValid.value = false;
  };

  const setFieldValue = (path: string, value: unknown) => {
    const dataVal = toValue(data);
    if (dataVal && typeof dataVal === "object" && !Array.isArray(dataVal)) {
      setValueAtPath(dataVal as Record<string, unknown>, path, value);
      if (isRef(data)) {
        data.value = { ...dataVal };
      }
    }
  };

  const setFieldTouched = (path: string, value = true) => {
    touchedFields.value = { ...touchedFields.value, [path]: value };
  };

  const dirtyFields = computed(() => {
    const current = toValue(data) as Record<string, unknown>;
    const initial = initialValues.value as Record<string, unknown>;
    if (!current || typeof current !== "object") return {};
    const result: Record<string, boolean> = {};
    const collect = (obj: Record<string, unknown>, init: Record<string, unknown>, prefix: string) => {
      for (const key of Object.keys(obj)) {
        const path = prefix ? `${prefix}.${key}` : key;
        const val = obj[key];
        const initVal = init?.[key];
        if (val !== null && typeof val === "object" && !Array.isArray(val) && initVal !== null && typeof initVal === "object" && !Array.isArray(initVal)) {
          collect(val as Record<string, unknown>, initVal as Record<string, unknown>, path);
        } else {
          result[path] = !deepEqual(val, initVal);
        }
      }
    };
    collect(current, initial ?? {}, "");
    return result;
  });

  const isDirty = computed(() => Object.values(dirtyFields.value).some(Boolean));

  const touched = computed(() => Object.values(touchedFields.value).some(Boolean));

  let unwatch: (() => void) | null = null;

  const performValidation = async (): Promise<FormErrors> => {
    const schemaVal = toValue(schema);
    const dataVal = toValue(data);

    const result = await schemaVal.safeParseAsync(dataVal);

    isValid.value = result.success;

    if (!result.success) {
      errors.value = groupIssuesByPath(result.error.issues);
      return errors.value;
    }

    errors.value = null;
    return null;
  };

  const mergeFieldErrors = (path: string, fieldErrors: FormErrors) => {
    const current = errors.value ?? {};
    const next = { ...current };
    if (fieldErrors === null || !(path in fieldErrors)) {
      delete next[path];
    } else {
      next[path] = fieldErrors[path];
    }
    const hasErrors = Object.keys(next).length > 0;
    errors.value = hasErrors ? next : null;
    isValid.value = !hasErrors;
  };

  const validate = async (): Promise<FormErrors> => {
    clearErrors();
    const result = await performValidation();

    if (!result && opts.mode === "lazy") {
      return null;
    }
    if (result && opts.mode === "lazy") {
      runValidationWatch();
    }
    return result;
  };

  const validateField = async (path: string): Promise<FormErrors> => {
    const schemaVal = toValue(schema);
    const dataVal = toValue(data);
    const fieldSchema = getSchemaAtPath(schemaVal, path);

    if (fieldSchema) {
      const fieldValue = getValueAtPath(dataVal, path);
      const result = await fieldSchema.safeParseAsync(fieldValue);
      let fieldErrors: FormErrors;
      if (result.success) {
        fieldErrors = null;
      } else {
        const grouped = groupIssuesByPath(result.error.issues);
        const issues = grouped[path] ?? grouped[""] ?? [];
        fieldErrors = { [path]: issues };
      }
      mergeFieldErrors(path, fieldErrors);
      return errors.value;
    }

    return validate();
  };

  const runValidationWatch = () => {
    if (unwatch !== null) return;

    const runValidation = () => performValidation();

    const debouncedRun =
      opts.debounce > 0 ? useDebounceFn(runValidation, opts.debounce) : runValidation;

    unwatch = watch(
      [() => toValue(data), () => toValue(schema)],
      debouncedRun,
      { deep: true },
    );
  };

  onUnmounted(() => {
    unwatch?.();
  });

  const reset = (initialValuesArg?: unknown) => {
    clearErrors();
    isValid.value = true;
    touchedFields.value = {};
    isSubmitted.value = false;
    submitCount.value = 0;

    const newInitial = initialValuesArg ?? toValue(data);
    initialValues.value = safeClone(newInitial);

    if (initialValuesArg !== undefined && isRef(data)) {
      data.value = safeClone(initialValuesArg);
    }
  };

  const getError = (path: string): string | undefined => {
    const errs = errors.value;
    if (!errs) return undefined;
    const issues = errs[path];
    if (!issues || issues.length === 0) return undefined;
    return issues[0].message;
  };

  const getErrors = (path: string): string[] => {
    const errs = errors.value;
    if (!errs) return [];
    const issues = errs[path];
    if (!issues || issues.length === 0) return [];
    return issues.map((i) => i.message);
  };

  const { scrollToError } = useScrollToError();

  const scrollToFirstError = (
    scrollOptions?: ScrollToFirstErrorOptions,
  ): ScrollToErrorResult => {
    const errs = errors.value;
    if (!errs) return { success: false };

    const firstPath = Object.keys(errs)[0];
    if (!firstPath) return { success: false };

    const defaultSelector = (path: string) => `[data-field="${path}"]`;
    const fieldSelector = scrollOptions?.fieldSelector ?? defaultSelector;
    const selector = fieldSelector(firstPath);

    const { fieldSelector: _omit, ...scrollOpts } = scrollOptions ?? {};
    return scrollToError(selector, scrollOpts);
  };

  const handleSubmit = async <R>(
    onSubmit: (data: unknown) => R | Promise<R>,
  ): Promise<R> => {
    isSubmitted.value = true;
    submitCount.value += 1;
    const errs = await validate();
    if (errs) {
      scrollToFirstError();
      return Promise.reject(errs);
    }
    const dataVal = toValue(data);
    const schemaVal = toValue(schema);
    const parseResult = await schemaVal.safeParseAsync(dataVal);
    const validatedData = parseResult.success ? parseResult.data : dataVal;
    isSubmitting.value = true;
    try {
      return await onSubmit(validatedData);
    } finally {
      isSubmitting.value = false;
    }
  };

  if (opts.mode === "eager") {
    runValidationWatch();
  }

  return {
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
  };
}
