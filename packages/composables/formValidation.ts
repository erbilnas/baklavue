import type { z } from "zod";
import { ref, toValue, watch, type MaybeRefOrGetter, type Ref } from "vue";
import { useScrollToError } from "./scrollToError";
import type { ScrollToErrorOptions } from "./scrollToError";

/** Schema type that supports safeParseAsync (Zod 3/4 compatible) */
type ZodSchemaLike = {
  safeParseAsync: (
    data: unknown,
  ) => Promise<
    | { success: true; data: unknown }
    | { success: false; error: { issues: z.ZodIssue[] } }
  >;
};

/** Options for useZodForm */
export interface UseZodFormOptions {
  /** Validation mode: 'lazy' validates on submit then real-time; 'eager' validates on every change */
  mode?: "lazy" | "eager";
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
 * @param options - Optional: mode ('lazy' | 'eager')
 * @returns validate, errors, isValid, clearErrors, getError, scrollToFirstError
 */
export function useZodForm<T extends ZodSchemaLike>(
  schema: MaybeRefOrGetter<T>,
  data: MaybeRefOrGetter<unknown>,
  options: UseZodFormOptions = {},
): {
  validate: () => Promise<FormErrors>;
  errors: Ref<FormErrors>;
  isValid: Ref<boolean>;
  clearErrors: () => void;
  getError: (path: string) => string | undefined;
  scrollToFirstError: (options?: ScrollToErrorOptions) => void;
} {
  const opts = { mode: "lazy" as const, ...options };

  const isValid = ref(true);
  const errors = ref<FormErrors>(null);

  const clearErrors = () => {
    errors.value = null;
  };

  let unwatch: (() => void) | null = null;

  const runValidationWatch = () => {
    if (unwatch !== null) return;

    unwatch = watch(
      [() => toValue(data), () => toValue(schema)],
      async () => {
        await validate();
      },
      { deep: true },
    );
  };

  const validate = async (): Promise<FormErrors> => {
    clearErrors();

    const schemaVal = toValue(schema);
    const dataVal = toValue(data);

    const result = await schemaVal.safeParseAsync(dataVal);

    isValid.value = result.success;

    if (!result.success) {
      errors.value = groupIssuesByPath(result.error.issues);
      if (opts.mode === "lazy") {
        runValidationWatch();
      }
      return errors.value;
    }

    return null;
  };

  const getError = (path: string): string | undefined => {
    const errs = errors.value;
    if (!errs) return undefined;
    const issues = errs[path];
    if (!issues || issues.length === 0) return undefined;
    return issues[0].message;
  };

  const { scrollToError } = useScrollToError();

  const scrollToFirstError = (scrollOptions?: ScrollToErrorOptions) => {
    const errs = errors.value;
    if (!errs) return;

    const firstPath = Object.keys(errs)[0];
    if (!firstPath) return;

    const selector = `[data-field="${firstPath}"]`;
    scrollToError(selector, scrollOptions);
  };

  if (opts.mode === "eager") {
    runValidationWatch();
  }

  return {
    validate,
    errors,
    isValid,
    clearErrors,
    getError,
    scrollToFirstError,
  };
}
