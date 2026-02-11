import { ref } from "vue";

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
 * @returns copy function and copied ref
 */
export const useClipboard = () => {
  const copied = ref(false);

  const copy = async (text: string): Promise<boolean> => {
    copied.value = false;

    if (typeof navigator === "undefined" || !navigator.clipboard) {
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      copied.value = true;
      return true;
    } catch {
      return false;
    }
  };

  return {
    copy,
    copied,
  };
};
