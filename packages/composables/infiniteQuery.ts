import {
  computed,
  onUnmounted,
  ref,
  shallowRef,
  toValue,
  watch,
  type MaybeRefOrGetter,
  type Ref,
} from "vue";
import type { QueryKey } from "./query";

export interface UseInfiniteQueryOptions<
  TData = unknown,
  TPageParam = unknown,
> {
  /** Unique key for caching */
  queryKey: MaybeRefOrGetter<QueryKey>;
  /** Async function that fetches a page. Receives pageParam for cursor/offset. */
  queryFn: (context: { queryKey: QueryKey; pageParam: TPageParam }) => Promise<TData>;
  /** Initial page param for first fetch */
  initialPageParam: TPageParam;
  /** Extract next page param from last page. Return undefined if no more pages. */
  getNextPageParam: (lastPage: TData) => TPageParam | undefined;
  /** Extract previous page param from first page. For bidirectional infinite scroll. */
  getPreviousPageParam?: (firstPage: TData) => TPageParam | undefined;
  /** If false, query won't run. Default: true */
  enabled?: MaybeRefOrGetter<boolean>;
  /** Number of retries on error, or false for none. Default: 3 */
  retry?: number | boolean;
  /** Delay between retries in ms, or function. Default: exponential backoff */
  retryDelay?: number | ((attempt: number, error: Error) => number);
  /** Refetch when window regains focus. Default: true */
  refetchOnWindowFocus?: boolean;
  /** Refetch when network reconnects. Default: true */
  refetchOnReconnect?: boolean;
}

export interface UseInfiniteQueryReturn<TData = unknown> {
  /** Array of fetched pages */
  data: Ref<TData[] | null>;
  /** Error if request failed */
  error: Ref<Error | null>;
  /** True while initial fetch or refetch is in flight */
  isFetching: Ref<boolean>;
  /** True while fetching next page */
  isFetchingNextPage: Ref<boolean>;
  /** True when no data yet and fetching */
  isLoading: Ref<boolean>;
  /** True when data is available */
  isSuccess: Ref<boolean>;
  /** True when error occurred */
  isError: Ref<boolean>;
  /** True if getNextPageParam(lastPage) returned a value */
  hasNextPage: Ref<boolean>;
  /** True if getPreviousPageParam(firstPage) returned a value */
  hasPreviousPage: Ref<boolean>;
  /** Fetch the next page */
  fetchNextPage: () => Promise<void>;
  /** Fetch the previous page */
  fetchPreviousPage: () => Promise<void>;
  /** Refetch from first page (resets pages) */
  refetch: () => Promise<void>;
}

/** Default retry delay with exponential backoff */
function defaultRetryDelay(attempt: number): number {
  return Math.min(1000 * 2 ** attempt, 30000);
}

/**
 * Composable for infinite scroll / cursor-based pagination.
 * Fetches pages and accumulates them. Use with useIntersectionObserver for "load more" on scroll.
 *
 * @example
 * ```ts
 * const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
 *   queryKey: ["items"],
 *   queryFn: ({ pageParam }) =>
 *     fetch(`/api/items?cursor=${pageParam}`).then((r) => r.json()),
 *   initialPageParam: null,
 *   getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
 * });
 *
 * // data = [page1, page2, ...] - array of pages
 * ```
 *
 * @param options - Infinite query options
 * @returns data, fetchNextPage, hasNextPage, isFetchingNextPage, etc.
 */
export function useInfiniteQuery<
  TData = unknown,
  TPageParam = unknown,
>(
  options: UseInfiniteQueryOptions<TData, TPageParam>,
): UseInfiniteQueryReturn<TData> {
  const {
    queryKey,
    queryFn,
    initialPageParam,
    getNextPageParam,
    getPreviousPageParam,
    enabled = true,
    retry = 3,
    retryDelay = defaultRetryDelay,
    refetchOnWindowFocus = true,
    refetchOnReconnect = true,
  } = options;

  const pages = shallowRef<TData[]>([]);
  const error = shallowRef<Error | null>(null);
  const isFetching = ref(false);
  const isFetchingNextPage = ref(false);
  const isFetchingPreviousPage = ref(false);

  const nextPageParam = ref<TPageParam | undefined>(initialPageParam);
  const previousPageParam = ref<TPageParam | undefined>(undefined);

  const data = computed(() =>
    pages.value.length > 0 ? pages.value : null,
  );

  const isLoading = computed(
    () => pages.value.length === 0 && isFetching.value,
  );
  const isSuccess = computed(
    () => pages.value.length > 0 && error.value === null,
  );
  const isError = computed(() => error.value !== null);

  const hasNextPage = computed(() => nextPageParam.value !== undefined);
  const hasPreviousPage = computed(
    () => previousPageParam.value !== undefined,
  );

  const maxRetries =
    typeof retry === "boolean" ? (retry ? 3 : 0) : Math.max(0, retry);
  const getRetryDelay = (attempt: number, err: Error): number =>
    typeof retryDelay === "function"
      ? retryDelay(attempt, err)
      : retryDelay;

  let abortController: AbortController | null = null;

  async function fetchPage(pageParam: TPageParam): Promise<TData> {
    const key = toValue(queryKey) as QueryKey;
    const signal = abortController?.signal;

    let attempt = 0;
    while (true) {
      try {
        const result = await queryFn({ queryKey: key, pageParam });

        if (signal?.aborted) {
          throw new Error("Aborted");
        }

        return result;
      } catch (e) {
        const err = e instanceof Error ? e : new Error(String(e));

        if (signal?.aborted) {
          throw err;
        }

        if (attempt >= maxRetries) {
          throw err;
        }

        attempt++;
        await new Promise((resolve) =>
          setTimeout(resolve, getRetryDelay(attempt, err)),
        );
      }
    }
  }

  async function executeInitialFetch(): Promise<void> {
    if (!toValue(enabled)) return;

    abortController = new AbortController();
    isFetching.value = true;
    error.value = null;
    pages.value = [];
    nextPageParam.value = initialPageParam;
    previousPageParam.value = undefined;

    try {
      const result = await fetchPage(initialPageParam);
      if (!abortController.signal.aborted) {
        pages.value = [result];
        nextPageParam.value = getNextPageParam(result);
        if (getPreviousPageParam) {
          previousPageParam.value = getPreviousPageParam(result);
        }
      }
    } catch (e) {
      if (!abortController.signal.aborted) {
        error.value = e instanceof Error ? e : new Error(String(e));
      }
    } finally {
      if (!abortController.signal.aborted) {
        isFetching.value = false;
      }
      abortController = null;
    }
  }

  async function fetchNextPage(): Promise<void> {
    const param = nextPageParam.value;
    if (param === undefined || isFetchingNextPage.value || !toValue(enabled)) {
      return;
    }

    abortController = new AbortController();
    isFetchingNextPage.value = true;
    error.value = null;

    try {
      const result = await fetchPage(param);
      if (!abortController.signal.aborted) {
        pages.value = [...pages.value, result];
        nextPageParam.value = getNextPageParam(result);
      }
    } catch (e) {
      if (!abortController.signal.aborted) {
        error.value = e instanceof Error ? e : new Error(String(e));
      }
    } finally {
      if (!abortController.signal.aborted) {
        isFetchingNextPage.value = false;
      }
      abortController = null;
    }
  }

  async function fetchPreviousPage(): Promise<void> {
    const param = previousPageParam.value;
    if (
      param === undefined ||
      isFetchingPreviousPage.value ||
      !toValue(enabled) ||
      !getPreviousPageParam
    ) {
      return;
    }

    abortController = new AbortController();
    isFetchingPreviousPage.value = true;
    error.value = null;

    try {
      const result = await fetchPage(param);
      if (!abortController.signal.aborted) {
        pages.value = [result, ...pages.value];
        previousPageParam.value = getPreviousPageParam(result);
      }
    } catch (e) {
      if (!abortController.signal.aborted) {
        error.value = e instanceof Error ? e : new Error(String(e));
      }
    } finally {
      if (!abortController.signal.aborted) {
        isFetchingPreviousPage.value = false;
      }
      abortController = null;
    }
  }

  async function refetch(): Promise<void> {
    await executeInitialFetch();
  }

  function runIfEnabled() {
    if (toValue(enabled)) {
      executeInitialFetch();
    } else {
      pages.value = [];
      error.value = null;
      isFetching.value = false;
      nextPageParam.value = initialPageParam;
      previousPageParam.value = undefined;
    }
  }

  watch(
    () => [toValue(queryKey), toValue(enabled)] as const,
    () => runIfEnabled(),
    { immediate: true },
  );

  if (refetchOnWindowFocus && typeof window !== "undefined") {
    const onFocus = () => {
      if (toValue(enabled) && pages.value.length > 0) {
        refetch();
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
    isFetchingNextPage,
    isLoading,
    isSuccess,
    isError,
    hasNextPage,
    hasPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    refetch,
  };
}
