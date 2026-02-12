import { ref } from "vue";

/**
 * Composable for open/close state used by Dialog, Drawer, Dropdown, Accordion, and Tooltip.
 * Avoids repetitive ref(false), open(), close(), toggle().
 *
 * @example
 * ```ts
 * const { isOpen, open, close, toggle } = useDisclosure(false);
 *
 * // Use with v-model:open on BvDialog, BvDrawer, BvDropdown
 * <BvDialog v-model:open="isOpen" caption="Title">...</BvDialog>
 * ```
 *
 * @param initialState - Initial open state (default: false)
 * @returns Object with isOpen ref and open, close, toggle functions
 */
export const useDisclosure = (initialState = false) => {
  const isOpen = ref(initialState);

  const open = () => {
    isOpen.value = true;
  };

  const close = () => {
    isOpen.value = false;
  };

  const toggle = () => {
    isOpen.value = !isOpen.value;
  };

  return {
    isOpen,
    open,
    close,
    toggle,
  };
};
