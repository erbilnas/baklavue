import { computed, ref } from "vue";

/** Data accepted by the Web Share API */
export interface ShareData {
  title?: string;
  text?: string;
  url?: string;
  files?: File[];
}

export interface UseShareOptions {
  /** Default data to share when share() is called without arguments */
  data?: ShareData;
  /** Callback when share succeeds */
  onSuccess?: () => void;
  /** Callback when share fails or is aborted */
  onError?: (error?: Error) => void;
}

/**
 * Composable for the Web Share API. Share text, URLs, or files via native share sheet (mobile)
 * or fallback. Pairs with useClipboard when share is unavailable.
 *
 * @example
 * ```ts
 * const { share, isSupported, shared } = useShare();
 *
 * const handleShare = async () => {
 *   const ok = await share({ title: "Report", url: "https://example.com/report" });
 *   if (ok) success({ description: "Shared!" });
 * };
 * ```
 *
 * @example
 * ```ts
 * const { share, isSupported } = useShare({
 *   data: { title: "Check this out", url: window.location.href },
 *   onSuccess: () => success({ description: "Shared!" }),
 * });
 * await share(); // uses default data
 * ```
 *
 * @param options - Optional configuration
 * @returns share function, isSupported, canShare, shared, and error
 */
export const useShare = (options: UseShareOptions = {}) => {
  const { data: defaultData, onSuccess, onError } = options;
  const shared = ref(false);
  const error = ref<Error | null>(null);

  const isSupported = computed(
    () => typeof navigator !== "undefined" && "share" in navigator,
  );

  const canShare = computed(() => {
    if (!isSupported.value) return false;
    if (defaultData?.files?.length) {
      return navigator.canShare?.({ files: defaultData.files }) ?? false;
    }
    return navigator.canShare?.({ ...defaultData }) ?? true;
  });

  const share = async (data?: ShareData): Promise<boolean> => {
    shared.value = false;
    error.value = null;

    const toShare = data ?? defaultData;
    if (!toShare || (!toShare.title && !toShare.text && !toShare.url && !toShare.files?.length)) {
      const err = new Error("Share data is required");
      error.value = err;
      onError?.(err);
      return false;
    }

    if (!isSupported.value) {
      const err = new Error("Web Share API is not supported");
      error.value = err;
      onError?.(err);
      return false;
    }

    if (toShare.files?.length && navigator.canShare && !navigator.canShare({ files: toShare.files })) {
      const err = new Error("Cannot share these files");
      error.value = err;
      onError?.(err);
      return false;
    }

    try {
      await navigator.share(toShare);
      shared.value = true;
      onSuccess?.();
      return true;
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err));
      if (e.name !== "AbortError") {
        error.value = e;
        onError?.(e);
      }
      return false;
    }
  };

  return {
    share,
    isSupported,
    canShare,
    shared,
    error,
  };
};
