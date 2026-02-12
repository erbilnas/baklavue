import { onUnmounted } from "vue";
import { useAsyncState } from "./asyncState";
import { useIntervalFn } from "./timer";

export interface UsePollingOptions<T> {
  /** Polling interval in ms */
  interval: number;
  /** Run first fetch immediately. Default: true */
  immediate?: boolean;
  /** Initial data before first fetch. Default: undefined */
  initialData?: T;
  /** Pause when tab is in background. Default: true */
  pauseInBackground?: boolean;
  /** Callback on success */
  onSuccess?: (data: T) => void;
  /** Callback on error */
  onError?: (error: Error) => void;
}

export interface UsePollingReturn<T> {
  /** Fetched data */
  data: ReturnType<typeof useAsyncState<T>>["state"];
  /** Error if fetch failed */
  error: ReturnType<typeof useAsyncState<T>>["error"];
  /** True while fetch is in flight */
  isLoading: ReturnType<typeof useAsyncState<T>>["isLoading"];
  /** Pause polling */
  pause: () => void;
  /** Resume polling */
  resume: () => void;
  /** True when polling is active */
  isActive: ReturnType<typeof useIntervalFn>["isActive"];
}

/**
 * Composable for polling with fetch state.
 * Combines useAsyncState with useIntervalFn for non-query polling scenarios.
 *
 * @example
 * ```ts
 * const { data, pause, resume } = usePolling(
 *   () => fetch('/api/status').then(r => r.json()),
 *   { interval: 5000 }
 * );
 * ```
 *
 * @param fetchFn - Async function that fetches data
 * @param options - interval, immediate, pauseInBackground, onSuccess, onError
 * @returns data, error, isLoading, pause, resume, isActive
 */
export function usePolling<T>(
  fetchFn: () => Promise<T>,
  options: UsePollingOptions<T>,
): UsePollingReturn<T> {
  const {
    interval,
    immediate = true,
    initialData,
    pauseInBackground = true,
    onSuccess,
    onError,
  } = options;

  const { state: data, execute, isLoading, error } = useAsyncState(
    fetchFn,
    { immediate: false, initialData, onSuccess, onError },
  );

  const { pause, resume, isActive } = useIntervalFn(execute, interval, {
    immediate,
  });

  if (pauseInBackground && typeof document !== "undefined") {
    const onVisibilityChange = () => {
      if (document.hidden) {
        pause();
      } else {
        resume();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    if (document.hidden) {
      pause();
    }
    onUnmounted(() => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
    });
  }

  return {
    data,
    error,
    isLoading,
    pause,
    resume,
    isActive,
  };
}
