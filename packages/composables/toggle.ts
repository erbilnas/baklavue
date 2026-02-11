import { ref } from "vue";

/**
 * Composable for a simple boolean toggle. Lighter than useDisclosure when you only
 * need a toggle without open/close semantics. Use useDisclosure for Dialog, Drawer, Dropdown.
 *
 * @example
 * ```ts
 * const [isVisible, toggle] = useToggle(false);
 * // or
 * const { value, toggle } = useToggle(false);
 *
 * toggle(); // flips value
 * ```
 *
 * @example
 * ```ts
 * const [darkMode, setDarkMode] = useToggle(true);
 * setDarkMode(false); // set explicitly
 * setDarkMode(true);
 * ```
 *
 * @param initial - Initial boolean value (default: false)
 * @returns Tuple [ref, toggle] where toggle can be called with no args to flip, or with a boolean to set
 */
export function useToggle(
  initial = false,
): [ReturnType<typeof ref<boolean>>, (value?: boolean) => void] {
  const value = ref(initial);

  const toggle = (val?: boolean) => {
    if (val === undefined) {
      value.value = !value.value;
    } else {
      value.value = val;
    }
  };

  return [value, toggle];
}
