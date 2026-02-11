import type { MaybeRef } from "vue";
import { computed, onScopeDispose, ref, toValue } from "vue";

export interface UseClipboardOptions {
  /** Default text to copy when copy() is called without arguments */
  source?: MaybeRef<string>;
  /** Millisecond duration before `copied` resets to false. Omit to disable auto-reset. */
  copiedDuring?: number;
  /** Fallback to document.execCommand when Clipboard API unavailable (e.g. HTTP) */
  legacy?: boolean;
}

function legacyCopy(text: string): boolean {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const ok = document.execCommand("copy");
  document.body.removeChild(textarea);
  return ok;
}

/**
 * Composable for copying text to the clipboard.
 * Integrates well with useNotification for copy feedback.
 *
 * @example
 * ```ts
 * const { copy, copied } = useClipboard();
 *
 * const handleCopy = () => {
 *   copy("token");
 *   success({ description: "Copied!" });
 * };
 * ```
 *
 * @example
 * ```ts
 * const { copy, copied, isSupported } = useClipboard({
 *   source: ref("default text"),
 *   copiedDuring: 1500,
 *   legacy: true,
 * });
 * await copy(); // copies source
 * ```
 *
 * @param options - Optional configuration
 * @returns copy function, copied ref, and isSupported
 */
export const useClipboard = (options: UseClipboardOptions = {}) => {
  const { source, copiedDuring, legacy = false } = options;
  const copied = ref(false);

  const hasNativeClipboard =
    typeof navigator !== "undefined" && !!navigator.clipboard;
  const isSupported = computed(
    () => hasNativeClipboard || (legacy && typeof document !== "undefined"),
  );

  let resetTimeoutId: ReturnType<typeof setTimeout> | null = null;

  const scheduleCopiedReset = () => {
    if (resetTimeoutId !== null) {
      clearTimeout(resetTimeoutId);
    }
    if (copiedDuring != null && copiedDuring > 0) {
      resetTimeoutId = setTimeout(() => {
        copied.value = false;
        resetTimeoutId = null;
      }, copiedDuring);
    }
  };

  onScopeDispose(() => {
    if (resetTimeoutId !== null) {
      clearTimeout(resetTimeoutId);
    }
  });

  const copy = async (text?: string): Promise<boolean> => {
    copied.value = false;

    const textToCopy = text ?? (source != null ? toValue(source) : undefined);
    if (textToCopy == null || textToCopy === "") {
      return false;
    }

    if (hasNativeClipboard) {
      try {
        await navigator.clipboard.writeText(textToCopy);
        copied.value = true;
        scheduleCopiedReset();
        return true;
      } catch {
        if (legacy) {
          const ok = legacyCopy(textToCopy);
          copied.value = ok;
          scheduleCopiedReset();
          return ok;
        }
        return false;
      }
    }

    if (legacy) {
      const ok = legacyCopy(textToCopy);
      copied.value = ok;
      scheduleCopiedReset();
      return ok;
    }

    return false;
  };

  return {
    copy,
    copied,
    isSupported,
  };
};
