import { onUnmounted, ref, shallowRef, watch, type Ref } from "vue";

type ParamValue = string | number | boolean | (string | number | boolean)[];

function serializeParams(params: Record<string, ParamValue>): string {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value == null) continue;
    if (Array.isArray(value)) {
      for (const v of value) {
        searchParams.append(key, String(v));
      }
    } else {
      searchParams.append(key, String(value));
    }
  }
  const serialized = searchParams.toString();
  return serialized ? `?${serialized}` : "";
}

function buildUrl(
  url: string,
  baseURL?: string,
  params?: Record<string, ParamValue>,
): string {
  let fullUrl = url;
  if (baseURL) {
    const isAbsolute = url.startsWith("http://") || url.startsWith("https://");
    if (!isAbsolute) {
      fullUrl = baseURL.replace(/\/$/, "") + (url.startsWith("/") ? url : `/${url}`);
    }
  }
  if (params && Object.keys(params).length > 0) {
    const serialized = serializeParams(params);
    if (serialized) {
      fullUrl += fullUrl.includes("?") ? "&" + serialized.slice(1) : serialized;
    }
  }
  return fullUrl;
}

function buildRequestBody(body: unknown): BodyInit | undefined {
  if (body == null) return undefined;
  if (typeof body === "string" || body instanceof Blob || body instanceof ArrayBuffer || body instanceof FormData || body instanceof URLSearchParams) {
    return body;
  }
  if (typeof body === "object") {
    return JSON.stringify(body);
  }
  return String(body);
}

function defaultRetryDelay(attempt: number): number {
  return Math.min(1000 * 2 ** attempt, 30000);
}

function isRetryableError(error: Error, response?: Response | null): boolean {
  if (response) {
    return response.status >= 500 && response.status < 600;
  }
  return error.message === "Failed to fetch" || error.message === "Network request failed";
}

const IDEMPOTENT_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

export interface ExecuteOverrides {
  /** Override URL for this execution */
  url?: string;
  /** Override body for this execution */
  body?: unknown;
  /** Override params for this execution */
  params?: Record<string, ParamValue>;
}

export interface UseFetchOptions {
  /** Run fetch immediately on creation. Default: true */
  immediate?: boolean;
  /** Initial data before request completes. Default: null */
  initialData?: unknown;
  /** Timeout in ms to abort request. 0 = no timeout. Default: 0 */
  timeout?: number;
  /** HTTP method. Default: GET */
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  /** Request headers */
  headers?: Record<string, string>;
  /** Request body (JSON, FormData, string, etc.) */
  body?: unknown;
  /** URL query params, serialized and appended */
  params?: Record<string, ParamValue>;
  /** Base URL prepended to relative URLs */
  baseURL?: string;
  /** Custom status validation. Default: 200-299 */
  validateStatus?: (status: number) => boolean;
  /** Hook to modify url/options before fetch. Can throw to cancel. */
  beforeFetch?: (ctx: { url: string; options: RequestInit }) => void | Promise<void>;
  /** Hook to transform response data before it's set */
  afterFetch?: (ctx: { response: Response; data: unknown }) => unknown | Promise<unknown>;
  /** Hook called on fetch error. Can rethrow to prevent error from being set. */
  onFetchError?: (ctx: { response: Response | null; error: Error }) => void | Promise<void>;
  /** Number of retries on error, or false for none. Default: 0 */
  retry?: number | boolean;
  /** Delay between retries in ms, or function. Default: exponential backoff */
  retryDelay?: number | ((attempt: number, error: Error) => number);
  /** Condition to retry. Default: network/5xx, and only for GET by default */
  retryCondition?: (error: Error, response: Response | null) => boolean;
  /** Retry non-idempotent methods (POST, PUT, PATCH, DELETE). Default: false */
  retryOnNonIdempotent?: boolean;
  /** Refetch when window regains focus. Default: false */
  refetchOnWindowFocus?: boolean;
  /** Refetch when network reconnects. Default: false */
  refetchOnReconnect?: boolean;
  /** Refetch when URL changes (when url is a getter). Default: false */
  refetchOnUrlChange?: boolean;
  /** Response parsing: json, text, blob, arraybuffer. Default: auto from content-type */
  responseType?: "json" | "text" | "blob" | "arraybuffer";
  /** CORS credentials. Default: same-origin */
  credentials?: RequestCredentials;
}

export interface UseFetchReturn<T> {
  /** Response data on success */
  data: Ref<T | null>;
  /** Error if request failed */
  error: Ref<Error | null>;
  /** HTTP status code of last response, or null */
  statusCode: Ref<number | null>;
  /** True while request is in flight */
  isFetching: Ref<boolean>;
  /** True when request has finished (success or error) */
  isFinished: Ref<boolean>;
  /** Execute the fetch manually. Pass overrides for url/body/params. */
  execute: (options?: boolean | (ExecuteOverrides & { throwOnFailed?: boolean })) => Promise<void>;
  /** Abort the current request */
  abort: () => void;
}

const defaultValidateStatus = (status: number) => status >= 200 && status < 300;

function useFetchInternal<T = unknown>(
  url: string | (() => string),
  options: UseFetchOptions = {},
): UseFetchReturn<T> {
  const {
    immediate = true,
    initialData = null,
    timeout = 0,
    method = "GET",
    headers = {},
    body,
    params,
    baseURL,
    validateStatus = defaultValidateStatus,
    beforeFetch,
    afterFetch,
    onFetchError,
    retry = 0,
    retryDelay = defaultRetryDelay,
    retryCondition,
    retryOnNonIdempotent = false,
    refetchOnWindowFocus = false,
    refetchOnReconnect = false,
    refetchOnUrlChange = false,
    responseType,
    credentials,
  } = options;

  const data = shallowRef<T | null>(initialData as T | null);
  const error = shallowRef<Error | null>(null);
  const statusCode = ref<number | null>(null);
  const isFetching = ref(false);
  const isFinished = ref(false);

  let abortController: AbortController | null = null;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const maxRetries = typeof retry === "boolean" ? (retry ? 3 : 0) : Math.max(0, retry);

  const getRetryDelay = (attempt: number, err: Error): number =>
    typeof retryDelay === "function" ? retryDelay(attempt, err) : retryDelay;

  const shouldRetry = (err: Error, res: Response | null): boolean => {
    if (maxRetries === 0) return false;
    if (!retryOnNonIdempotent && !IDEMPOTENT_METHODS.has(method)) return false;
    if (retryCondition) return retryCondition(err, res);
    return isRetryableError(err, res ?? undefined);
  };

  const abort = () => {
    if (abortController) {
      abortController.abort();
    }
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  const execute = async (
    options?: boolean | (ExecuteOverrides & { throwOnFailed?: boolean }),
  ) => {
    const throwOnFailed =
      typeof options === "boolean" ? options : options?.throwOnFailed ?? false;
    const overrides =
      typeof options === "object" && options !== null
        ? {
            url: options.url,
            body: options.body,
            params: options.params,
          }
        : undefined;

    abort();

    const urlString =
      overrides?.url ?? (typeof url === "function" ? url() : url);
    const effectiveParams = overrides?.params ?? params;
    const effectiveBody = overrides?.body ?? body;

    let fullUrl = buildUrl(urlString, baseURL, effectiveParams);

    const requestBody =
      method !== "GET" ? buildRequestBody(effectiveBody) : undefined;
    const requestHeaders: Record<string, string> = { ...headers };

    if (requestBody != null && typeof requestBody === "string" && !requestHeaders["Content-Type"]) {
      requestHeaders["Content-Type"] = "application/json";
    }

    abortController = new AbortController();

    const init: RequestInit = {
      method,
      headers: requestHeaders,
      signal: abortController.signal,
      ...(requestBody !== undefined && { body: requestBody }),
      ...(credentials !== undefined && { credentials }),
    };

    const fetchCtx = { url: fullUrl, options: init };
    if (beforeFetch) {
      await beforeFetch(fetchCtx);
      fullUrl = fetchCtx.url;
    }

    isFetching.value = true;
    isFinished.value = false;
    error.value = null;
    statusCode.value = null;

    if (timeout > 0) {
      timeoutId = setTimeout(() => {
        abortController?.abort();
      }, timeout);
    }

    let lastError: Error | null = null;
    let lastResponse: Response | null = null;
    let attempt = 0;

    const parseResponse = async (response: Response): Promise<unknown> => {
      if (responseType === "blob") return response.blob();
      if (responseType === "arraybuffer") return response.arrayBuffer();
      if (responseType === "text") return response.text();
      if (responseType === "json") return response.json();

      const contentType = response.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        return response.json();
      }
      return response.text();
    };

    while (true) {
      try {
        const response = await fetch(fullUrl, init);

        if (timeoutId !== null) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }

        lastResponse = response;

        if (!validateStatus(response.status)) {
          const err = new Error(`HTTP ${response.status}: ${response.statusText}`);
          if (onFetchError) await onFetchError({ response, error: err });
          throw err;
        }

        statusCode.value = response.status;

        let parsed = (await parseResponse(response)) as T;

        if (afterFetch) {
          parsed = (await afterFetch({ response, data: parsed })) as T;
        }

        data.value = parsed;
        break;
      } catch (e) {
        if (e instanceof Error && e.name === "AbortError") {
          return;
        }
        lastError = e instanceof Error ? e : new Error(String(e));
        lastResponse = null;

        if (onFetchError) {
          try {
            await onFetchError({ response: null, error: lastError });
          } catch {
            // onFetchError rethrew - don't retry
            error.value = lastError;
            if (throwOnFailed) throw lastError;
            break;
          }
        }

        if (attempt >= maxRetries || !shouldRetry(lastError, lastResponse)) {
          error.value = lastError;
          if (throwOnFailed) throw lastError;
          break;
        }

        attempt++;
        await new Promise((resolve) =>
          setTimeout(resolve, getRetryDelay(attempt, lastError!)),
        );
      }
    }

    isFetching.value = false;
    isFinished.value = true;
    abortController = null;
  };

  if (immediate) {
    execute();
  }

  if (refetchOnUrlChange && typeof url === "function" && typeof window !== "undefined") {
    const stop = watch(
      () => (url as () => string)(),
      (newUrl, oldUrl) => {
        if (oldUrl !== undefined && newUrl !== oldUrl) execute();
      },
      { immediate: false },
    );
    onUnmounted(stop);
  }

  if (refetchOnWindowFocus && typeof window !== "undefined") {
    const onFocus = () => execute();
    window.addEventListener("focus", onFocus);
    onUnmounted(() => window.removeEventListener("focus", onFocus));
  }

  if (refetchOnReconnect && typeof window !== "undefined") {
    const onOnline = () => execute();
    window.addEventListener("online", onOnline);
    onUnmounted(() => window.removeEventListener("online", onOnline));
  }

  onUnmounted(abort);

  return {
    data,
    error,
    statusCode,
    isFetching,
    isFinished,
    execute,
    abort,
  };
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
  return useFetchInternal<T>(url, options);
}

/**
 * Create a preconfigured useFetch instance with default options.
 * Similar to axios.create().
 *
 * @example
 * ```ts
 * const useApiFetch = createFetch({ baseURL: '/api', headers: { 'X-Custom': '...' } });
 * const { data } = useApiFetch('/users', { params: { page: 1 } });
 * ```
 */
export function createFetch(defaultOptions: UseFetchOptions) {
  return function useFetch<T>(
    url: string | (() => string),
    options: UseFetchOptions = {},
  ): UseFetchReturn<T> {
    return useFetchInternal<T>(url, { ...defaultOptions, ...options });
  };
}
