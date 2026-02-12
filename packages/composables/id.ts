import { ref } from "vue";

let idCounter = 0;

/**
 * Generates a stable unique ID for the component instance.
 * Useful for aria-describedby, aria-labelledby, form labels, and other accessibility attributes.
 *
 * @example
 * ```ts
 * const id = useId();
 * // id.value = "bv-1"
 *
 * <div :id="id">...</div>
 * <label :for="id">Name</label>
 * <input :id="id" />
 * ```
 *
 * @param prefix - Optional prefix for the ID (default: "bv")
 * @returns Ref with a stable unique string
 */
export function useId(prefix = "bv") {
  return ref(`${prefix}-${++idCounter}`);
}
