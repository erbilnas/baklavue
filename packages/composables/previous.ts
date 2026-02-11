import { ref, watch } from "vue";
import type { Ref } from "vue";

/**
 * Composable that tracks the previous value of a ref.
 * Useful for diffing, dirty detection, undo logic, or "save changes" only when different.
 *
 * @example
 * ```ts
 * const count = ref(0);
 * const previousCount = usePrevious(count);
 *
 * watch(count, (newVal) => {
 *   console.log(`Was ${previousCount.value}, now ${newVal}`);
 * });
 * ```
 *
 * @example
 * ```ts
 * const formData = ref({ name: "" });
 * const initial = usePrevious(formData);
 *
 * const isDirty = computed(() =>
 *   JSON.stringify(formData.value) !== JSON.stringify(initial.value)
 * );
 * ```
 *
 * @param value - Ref to track
 * @returns Ref holding the previous value (undefined on first render)
 */
export function usePrevious<T>(value: Ref<T>): Ref<T | undefined> {
  const previous = ref<T | undefined>(undefined) as Ref<T | undefined>;

  watch(
    value,
    (_, oldVal) => {
      previous.value = oldVal;
    },
    { flush: "sync" },
  );

  return previous;
}
