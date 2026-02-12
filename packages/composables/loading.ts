import { onUnmounted, ref } from "vue";

export interface UseLoadingOptions {
  /** Delay in ms before showing loading state. Useful to avoid flicker for fast operations. */
  delay?: number;
}

/**
 * Composable for generic loading state with optional delay to avoid flicker.
 * Useful with BvSkeleton, BvSpinner, or loading overlays.
 *
 * @example
 * ```ts
 * const { isLoading, showLoading, hideLoading } = useLoading({ delay: 200 });
 *
 * const fetchData = async () => {
 *   showLoading();
 *   try {
 *     await api.getData();
 *   } finally {
 *     hideLoading();
 *   }
 * };
 * ```
 *
 * @example
 * ```ts
 * const { isLoading, withLoading } = useLoading();
 *
 * const handleSave = () => withLoading(async () => {
 *   await api.save();
 * });
 * ```
 *
 * @param options - Options: delay (ms before showing loading)
 * @returns Object with isLoading, showLoading, hideLoading, withLoading
 */
export function useLoading(options: UseLoadingOptions = {}) {
  const { delay = 0 } = options;
  const isLoading = ref(false);
  let delayTimer: ReturnType<typeof setTimeout> | null = null;

  const showLoading = () => {
    if (delay > 0) {
      if (delayTimer !== null) return;
      delayTimer = setTimeout(() => {
        delayTimer = null;
        isLoading.value = true;
      }, delay);
    } else {
      isLoading.value = true;
    }
  };

  const hideLoading = () => {
    if (delayTimer !== null) {
      clearTimeout(delayTimer);
      delayTimer = null;
    }
    isLoading.value = false;
  };

  const withLoading = <T>(fn: () => Promise<T>): Promise<T> => {
    showLoading();
    return fn().finally(hideLoading);
  };

  onUnmounted(() => {
    if (delayTimer !== null) {
      clearTimeout(delayTimer);
    }
  });

  return {
    isLoading,
    showLoading,
    hideLoading,
    withLoading,
  };
}
