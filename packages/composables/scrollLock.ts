import { ref } from "vue";

let lockCount = 0;
let previousOverflow: string | null = null;

/**
 * Composable for locking body scroll when modals or drawers are open.
 * Supports stacking: multiple lock() calls require matching unlock() calls.
 * Use with useDisclosure for BvDialog and BvDrawer.
 *
 * @example
 * ```ts
 * const { isLocked, lock, unlock } = useScrollLock();
 * const { isOpen, open, close } = useDisclosure();
 *
 * watch(isOpen, (open) => {
 *   if (open) lock();
 *   else unlock();
 * });
 * ```
 *
 * @returns Object with isLocked, lock, unlock, toggleLock
 */
export function useScrollLock() {
  const isLocked = ref(false);

  const lock = () => {
    lockCount++;
    if (lockCount === 1 && typeof document !== "undefined") {
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
    isLocked.value = lockCount > 0;
  };

  const unlock = () => {
    if (lockCount > 0) {
      lockCount--;
      if (lockCount === 0 && typeof document !== "undefined") {
        document.body.style.overflow = previousOverflow ?? "";
        previousOverflow = null;
      }
    }
    isLocked.value = lockCount > 0;
  };

  const toggleLock = () => {
    if (isLocked.value) {
      unlock();
    } else {
      lock();
    }
  };

  return {
    isLocked,
    lock,
    unlock,
    toggleLock,
  };
}
