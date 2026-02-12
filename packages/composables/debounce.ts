import { onUnmounted, ref, watch, type Ref } from "vue";

/**
 * Composable that returns a debounced version of a function.
 * The function will only be called after the specified delay has passed
 * since the last invocation. Useful for search inputs, autocomplete, form validation.
 *
 * @example
 * ```ts
 * const debouncedSearch = useDebounceFn((query: string) => {
 *   fetchResults(query);
 * }, 300);
 *
 * // Use with input @input
 * <input @input="(e) => debouncedSearch((e.target as HTMLInputElement).value)" />
 * ```
 *
 * @param fn - Function to debounce
 * @param delay - Delay in milliseconds (default: 200)
 * @returns Debounced function
 */
export function useDebounceFn<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay = 200,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<T>) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, delay);
  };

  onUnmounted(() => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
  });

  return debounced;
}

/**
 * Composable that returns a debounced ref.
 * The ref value updates only after the specified delay has passed
 * since the last change. Useful for debounced v-model on search inputs.
 *
 * @example
 * ```ts
 * const searchQuery = ref("");
 * const debouncedQuery = useDebouncedRef(searchQuery, 300);
 *
 * // debouncedQuery updates 300ms after user stops typing
 * watch(debouncedQuery, (q) => fetchResults(q));
 * ```
 *
 * @param value - Ref or value to debounce
 * @param delay - Delay in milliseconds (default: 200)
 * @returns Ref with debounced value
 */
export function useDebouncedRef<T>(value: Ref<T>, delay = 200): Ref<T> {
  const debounced = ref(value.value) as Ref<T>;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let isFirst = true;

  const scheduleUpdate = () => {
    if (isFirst) {
      isFirst = false;
      debounced.value = value.value;
      return;
    }
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      debounced.value = value.value;
      timeoutId = null;
    }, delay);
  };

  watch(value, scheduleUpdate, { immediate: true });

  onUnmounted(() => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
  });

  return debounced;
}
