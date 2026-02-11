import { onUnmounted, ref, shallowRef, type Ref } from "vue";

export interface UseFetchOptions {
  /** Run fetch immediately on creation. Default: true */
  immediate?: boolean;
  /** Initial data before request completes. Default: null */
  initialData?: unknown;
  /** Timeout in ms to abort request. 0 = no timeout. Default: 0 */
  timeout?: number;
}

export interface UseFetchReturn<T> {
  /** Response data on success */
  data: Ref<T | null>;
  /** Error if request failed */
  error: Ref<Error | null>;
  /** True while request is in flight */
  isFetching: Ref<boolean>;
  /** True when request has finished (success or error) */
  isFinished: Ref<boolean>;
  /** Execute the fetch manually */
  execute: (throwOnFailed?: boolean) => Promise<void>;
  /** Abort the current request */
  abort: () => void;
}

/**
 * Composable for reactive fetch requests.
 * Provides data, error, loading state, execute, and abort.
 *
 * @example
 * ```ts
 * const { data, error, isFetching, execute } = useFetch<User>(
 *   () => `https://api.example.com/users/${userId.value}`,
 *   { immediate: true }
 * );
 *
 * // Refetch when userId changes
 * watch(userId, execute);
 * ```
 *
 * @param url - URL string, or getter function (for reactive URLs)
 * @param options - Fetch options
 * @returns UseFetchReturn with data, error, isFetching, execute, abort
 */
export function useFetch<T = unknown>(
  url: string | (() => string),
  options: UseFetchOptions = {},
): UseFetchReturn<T> {
  const { immediate = true, initialData = null, timeout = 0 } = options;

  const data = shallowRef<T | null>(initialData as T | null);
  const error = shallowRef<Error | null>(null);
  const isFetching = ref(false);
  const isFinished = ref(false);

  let abortController: AbortController | null = null;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const abort = () => {
    if (abortController) {
      abortController.abort();
    }
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  const execute = async (throwOnFailed = false) => {
    abort();

    const urlString = typeof url === "function" ? url() : url;
    abortController = new AbortController();
    const signal = abortController.signal;

    isFetching.value = true;
    isFinished.value = false;
    error.value = null;

    if (timeout > 0) {
      timeoutId = setTimeout(() => {
        abortController?.abort();
      }, timeout);
    }

    try {
      const response = await fetch(urlString, { signal });

      if (timeoutId !== null) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const contentType = response.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        data.value = (await response.json()) as T;
      } else {
        data.value = (await response.text()) as T;
      }
    } catch (e) {
      if (e instanceof Error && e.name === "AbortError") {
        // Ignore abort errors
        return;
      }
      error.value = e instanceof Error ? e : new Error(String(e));
      if (throwOnFailed) {
        throw error.value;
      }
    } finally {
      isFetching.value = false;
      isFinished.value = true;
      abortController = null;
    }
  };

  if (immediate) {
    execute();
  }

  onUnmounted(abort);

  return {
    data,
    error,
    isFetching,
    isFinished,
    execute,
    abort,
  };
}
