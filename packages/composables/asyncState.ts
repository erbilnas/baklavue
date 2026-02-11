import { ref, shallowRef } from "vue";

export interface UseAsyncStateOptions<T> {
  /** Execute immediately on mount. Default: false */
  immediate?: boolean;
  /** Initial data value. Default: undefined */
  initialData?: T;
  /** Callback on success */
  onSuccess?: (data: T) => void;
  /** Callback on error */
  onError?: (error: Error) => void;
}

/**
 * Composable for generic async state (loading, error, data) without fetch.
 * Complements useFetch/useQuery for non-HTTP async (IndexedDB, Web Worker, custom logic).
 *
 * @example
 * ```ts
 * const { state, execute, isLoading, error } = useAsyncState(async () => {
 *   const data = await readFromIndexedDB();
 *   return data;
 * });
 *
 * await execute();
 * ```
 *
 * @example
 * ```ts
 * const { state, execute, isLoading } = useAsyncState(
 *   () => fetchUser(userId),
 *   { immediate: true, initialData: null }
 * );
 * ```
 *
 * @param asyncFn - Async function returning the data
 * @param options - Optional: immediate, initialData, onSuccess, onError
 * @returns state (data), execute, isLoading, error
 */
export function useAsyncState<T>(
  asyncFn: () => Promise<T>,
  options: UseAsyncStateOptions<T> = {},
): {
  state: ReturnType<typeof shallowRef<T | undefined>>;
  execute: () => Promise<T>;
  isLoading: ReturnType<typeof ref<boolean>>;
  error: ReturnType<typeof ref<Error | null>>;
} {
  const { immediate = false, initialData, onSuccess, onError } = options;

  const state = shallowRef<T | undefined>(initialData);
  const isLoading = ref(false);
  const error = ref<Error | null>(null);

  const execute = async (): Promise<T> => {
    isLoading.value = true;
    error.value = null;

    try {
      const data = await asyncFn();
      state.value = data;
      onSuccess?.(data);
      return data;
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err));
      error.value = e;
      onError?.(e);
      throw e;
    } finally {
      isLoading.value = false;
    }
  };

  if (immediate) {
    execute();
  }

  return {
    state,
    execute,
    isLoading,
    error,
  };
}
