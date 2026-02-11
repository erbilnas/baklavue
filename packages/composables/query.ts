import {
  onUnmounted,
  ref,
  shallowRef,
  toValue,
  watch,
  type MaybeRefOrGetter,
  type Ref,
} from "vue";

/** Query key - array of values that uniquely identifies the query */
export type QueryKey = readonly unknown[];

/** Hash a query key to a stable string */
function hashQueryKey(key: QueryKey): string {
  return JSON.stringify(key);
}

/** Check if a query key matches a filter (partial match) */
function queryKeyMatches(key: QueryKey, filter: QueryKey): boolean {
  if (filter.length > key.length) return false;
  for (let i = 0; i < filter.length; i++) {
    if (JSON.stringify(filter[i]) !== JSON.stringify(key[i])) {
      return false;
    }
  }
  return true;
}

interface CacheEntry<T = unknown> {
  data: T | null;
  error: Error | null;
  updatedAt: number;
}

/** Shared query cache */
const queryCache = new Map<string, CacheEntry>();

/** Options for useQuery */
export interface UseQueryOptions<T = unknown> {
  /** Unique key for caching. Array of values; reactive getters supported. */
  queryKey: MaybeRefOrGetter<QueryKey>;
  /** Async function that fetches data */
  queryFn: (context: { queryKey: QueryKey }) => Promise<T>;
  /** ms until data is considered stale. 0 = always stale. Default: 0 */
  staleTime?: number;
  /** Number of retries on error, or false for none. Default: 3 */
  retry?: number | boolean;
  /** Delay between retries in ms, or function. Default: exponential backoff */
  retryDelay?: number | ((attempt: number, error: Error) => number);
  /** If false, query won't run. For dependent queries. Default: true */
  enabled?: MaybeRefOrGetter<boolean>;
  /** Refetch when window regains focus. Default: true */
  refetchOnWindowFocus?: boolean;
  /** Refetch when network reconnects. Default: true */
  refetchOnReconnect?: boolean;
  /** Initial data before first fetch */
  initialData?: T | (() => T);
}

/** Return type of useQuery */
export interface UseQueryReturn<T> {
  /** Fetched data */
  data: Ref<T | null>;
  /** Error if request failed */
  error: Ref<Error | null>;
  /** True while request is in flight */
  isFetching: Ref<boolean>;
  /** True when no data yet and fetching */
  isLoading: Ref<boolean>;
  /** True when data is available */
  isSuccess: Ref<boolean>;
  /** True when error occurred */
  isError: Ref<boolean>;
  /** Manual refetch */
  refetch: () => Promise<void>;
}

/** Options for invalidateQueries */
export interface InvalidateQueriesOptions {
  /** Query key or partial key to match (e.g. ["users"] matches ["users", 1]) */
  queryKey?: QueryKey;
}

/** Query client for cache invalidation and manual cache access */
export interface QueryClient {
  invalidateQueries: (options?: InvalidateQueriesOptions) => void;
  getQueryData: <T>(queryKey: QueryKey) => T | undefined;
  setQueryData: <T>(queryKey: QueryKey, data: T | null) => void;
}

function createQueryClient(): QueryClient {
  return {
    invalidateQueries(options?: InvalidateQueriesOptions) {
      if (!options?.queryKey) {
        queryCache.clear();
        return;
      }
      const filter = options.queryKey;
      for (const [cacheKey, _] of queryCache) {
        try {
          const key = JSON.parse(cacheKey) as QueryKey;
          if (queryKeyMatches(key, filter)) {
            queryCache.delete(cacheKey);
          }
        } catch {
          // ignore invalid keys
        }
      }
    },

    getQueryData<T>(queryKey: QueryKey): T | undefined {
      const cacheKey = hashQueryKey(queryKey);
      const entry = queryCache.get(cacheKey);
      return entry?.data as T | undefined;
    },

    setQueryData<T>(queryKey: QueryKey, data: T | null): void {
      const cacheKey = hashQueryKey(queryKey);
      queryCache.set(cacheKey, {
        data,
        error: null,
        updatedAt: Date.now(),
      });
    },
  };
}

let defaultQueryClient: QueryClient | null = null;

/**
 * Returns the default QueryClient for cache invalidation and manual cache access.
 *
 * @example
 * ```ts
 * const queryClient = useQueryClient();
 * queryClient.invalidateQueries({ queryKey: ["users"] });
 * queryClient.setQueryData(["users", 1], newUser);
 * ```
 */
export function useQueryClient(): QueryClient {
  if (!defaultQueryClient) {
    defaultQueryClient = createQueryClient();
  }
  return defaultQueryClient;
}

/** Default retry delay with exponential backoff */
function defaultRetryDelay(attempt: number): number {
  return Math.min(1000 * 2 ** attempt, 30000);
}

/**
 * Composable for data fetching with caching, stale-while-revalidate, and retries.
 * Inspired by TanStack Query.
 *
 * @example
 * ```ts
 * const { data, error, isFetching, refetch } = useQuery({
 *   queryKey: ["users", userId],
 *   queryFn: ({ queryKey }) => fetch(`/api/users/${queryKey[1]}`).then(r => r.json()),
 *   staleTime: 60_000,
 * });
 * ```
 */
export function useQuery<T = unknown>(
  options: UseQueryOptions<T>,
): UseQueryReturn<T> {
  const {
    queryKey,
    queryFn,
    staleTime = 0,
    retry = 3,
    retryDelay = defaultRetryDelay,
    enabled = true,
    refetchOnWindowFocus = true,
    refetchOnReconnect = true,
    initialData,
  } = options;

  const data = shallowRef<T | null>(
    typeof initialData === "function"
      ? (initialData as () => T)()
      : (initialData ?? null),
  );
  const error = shallowRef<Error | null>(null);
  const isFetching = ref(false);

  let abortController: AbortController | null = null;
  let lastFetchKey = "";

  const isLoading = ref(false);
  const isSuccess = ref(false);
  const isError = ref(false);

  function updateDerivedState() {
    isLoading.value = data.value === null && isFetching.value;
    isSuccess.value = data.value !== null && error.value === null;
    isError.value = error.value !== null;
  }

  const maxRetries =
    typeof retry === "boolean" ? (retry ? 3 : 0) : Math.max(0, retry);

  const getRetryDelay = (attempt: number, err: Error): number =>
    typeof retryDelay === "function"
      ? retryDelay(attempt, err)
      : retryDelay;

  async function executeFetch(): Promise<void> {
    const key = toValue(queryKey) as QueryKey;
    const cacheKey = hashQueryKey(key);
    lastFetchKey = cacheKey;

    // Abort any in-flight request for a different key
    if (abortController) {
      abortController.abort();
    }
    abortController = new AbortController();
    const signal = abortController.signal;

    const cached = queryCache.get(cacheKey);
    const now = Date.now();
    const isStale =
      !cached || now - cached.updatedAt > staleTime;

    if (cached && !isStale) {
      data.value = cached.data as T | null;
      error.value = cached.error;
      updateDerivedState();
      return;
    }

    isFetching.value = true;
    error.value = null;
    updateDerivedState();

    let attempt = 0;

    while (true) {
      try {
        const result = await queryFn({ queryKey: key });

        if (signal.aborted || lastFetchKey !== cacheKey) {
          return;
        }

        queryCache.set(cacheKey, {
          data: result,
          error: null,
          updatedAt: Date.now(),
        });
        data.value = result;
        error.value = null;
        break;
      } catch (e) {
        const err = e instanceof Error ? e : new Error(String(e));

        if (signal.aborted || lastFetchKey !== cacheKey) {
          return;
        }

        if (attempt >= maxRetries) {
          error.value = err;
          updateDerivedState();
          break;
        }

        attempt++;
        await new Promise((resolve) =>
          setTimeout(resolve, getRetryDelay(attempt, err)),
        );
      } finally {
        if (!signal.aborted && lastFetchKey === cacheKey) {
          isFetching.value = false;
          updateDerivedState();
        }
      }
    }

    abortController = null;
  }

  async function refetch(): Promise<void> {
    const enabledVal = toValue(enabled);
    if (!enabledVal) return;

    // Force refetch by invalidating cache for this key
    const key = toValue(queryKey) as QueryKey;
    const cacheKey = hashQueryKey(key);
    queryCache.delete(cacheKey);

    await executeFetch();
  }

  function runIfEnabled() {
    if (toValue(enabled)) {
      executeFetch();
    } else {
      data.value =
        typeof initialData === "function"
          ? (initialData as () => T)()
          : (initialData ?? null);
      error.value = null;
      isFetching.value = false;
      updateDerivedState();
    }
  }

  watch(
    () => [toValue(queryKey), toValue(enabled)] as const,
    () => runIfEnabled(),
    { immediate: true },
  );

  if (refetchOnWindowFocus && typeof window !== "undefined") {
    const onFocus = () => {
      if (toValue(enabled)) {
        const key = toValue(queryKey) as QueryKey;
        const cacheKey = hashQueryKey(key);
        const cached = queryCache.get(cacheKey);
        const isStale =
          !cached || Date.now() - cached.updatedAt > staleTime;
        if (isStale) {
          refetch();
        }
      }
    };
    window.addEventListener("focus", onFocus);
    onUnmounted(() => window.removeEventListener("focus", onFocus));
  }

  if (refetchOnReconnect && typeof window !== "undefined") {
    const onOnline = () => {
      if (toValue(enabled)) {
        refetch();
      }
    };
    window.addEventListener("online", onOnline);
    onUnmounted(() => window.removeEventListener("online", onOnline));
  }

  return {
    data,
    error,
    isFetching,
    isLoading,
    isSuccess,
    isError,
    refetch,
  };
}
