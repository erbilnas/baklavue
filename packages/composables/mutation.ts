import { ref, shallowRef } from "vue";

export interface UseMutationOptions<TData = unknown, TError = Error, TVariables = void> {
  /** Async function that performs the mutation */
  mutationFn: (variables: TVariables) => Promise<TData>;
  /** Callback on success */
  onSuccess?: (data: TData, variables: TVariables) => void | Promise<void>;
  /** Callback on error */
  onError?: (error: TError, variables: TVariables) => void | Promise<void>;
  /** Callback when mutation settles (success or error) */
  onSettled?: (
    data: TData | undefined,
    error: TError | null,
    variables: TVariables,
  ) => void | Promise<void>;
}

export interface UseMutationReturn<TData = unknown, TVariables = void> {
  /** Fetched data on success */
  data: ReturnType<typeof shallowRef<TData | null>>;
  /** Error if mutation failed */
  error: ReturnType<typeof ref<Error | null>>;
  /** True while mutation is in flight */
  isPending: ReturnType<typeof ref<boolean>>;
  /** True when mutation succeeded */
  isSuccess: ReturnType<typeof ref<boolean>>;
  /** True when mutation failed */
  isError: ReturnType<typeof ref<boolean>>;
  /** Execute mutation with variables. Fire-and-forget. */
  mutate: (variables: TVariables) => void;
  /** Execute mutation with variables. Returns promise. */
  mutateAsync: (variables: TVariables) => Promise<TData>;
  /** Reset state to initial */
  reset: () => void;
}

/**
 * Composable for mutations (POST/PUT/PATCH/DELETE) with explicit trigger.
 * Pairs with useQuery for cache invalidation after mutations.
 *
 * @example
 * ```ts
 * const queryClient = useQueryClient();
 * const { mutate, mutateAsync, isPending, data } = useMutation({
 *   mutationFn: (user) => fetch('/api/users', { method: 'POST', body: JSON.stringify(user) }).then(r => r.json()),
 *   onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
 * });
 *
 * mutate({ name: 'John' });
 * // or
 * await mutateAsync({ name: 'John' });
 * ```
 *
 * @param options - Mutation options: mutationFn, onSuccess, onError, onSettled, queryClient
 * @returns mutate, mutateAsync, isPending, isSuccess, isError, data, error, reset
 */
export function useMutation<
  TData = unknown,
  TError = Error,
  TVariables = void,
>(
  options: UseMutationOptions<TData, TError, TVariables>,
): UseMutationReturn<TData, TVariables> {
  const { mutationFn, onSuccess, onError, onSettled } = options;

  const data = shallowRef<TData | null>(null);
  const error = ref<Error | null>(null);
  const isPending = ref(false);
  const isSuccess = ref(false);
  const isError = ref(false);

  const reset = () => {
    data.value = null;
    error.value = null;
    isPending.value = false;
    isSuccess.value = false;
    isError.value = false;
  };

  const execute = async (variables: TVariables): Promise<TData> => {
    isPending.value = true;
    data.value = null;
    error.value = null;
    isSuccess.value = false;
    isError.value = false;

    try {
      const result = await mutationFn(variables);
      data.value = result;
      isSuccess.value = true;
      await onSuccess?.(result, variables);
      await onSettled?.(result, null, variables);
      return result;
    } catch (e) {
      const err = e instanceof Error ? e : new Error(String(e));
      error.value = err;
      isError.value = true;
      await onError?.(err as TError, variables);
      await onSettled?.(undefined, err as TError, variables);
      throw e;
    } finally {
      isPending.value = false;
    }
  };

  const mutate = (variables: TVariables) => {
    execute(variables).catch(() => {
      // Errors are handled in execute; mutate is fire-and-forget
    });
  };

  const mutateAsync = (variables: TVariables) => execute(variables);

  return {
    data,
    error,
    isPending,
    isSuccess,
    isError,
    mutate,
    mutateAsync,
    reset,
  } as UseMutationReturn<TData, TVariables>;
}
