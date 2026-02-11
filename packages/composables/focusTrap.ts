import { onMounted, onUnmounted, watch, type Ref } from "vue";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (el) => !el.hasAttribute("disabled") && getComputedStyle(el).visibility !== "hidden",
  );
}

export interface UseFocusTrapOptions {
  /** Ref to the container element to trap focus within */
  target: Ref<HTMLElement | null>;
  /** Whether the trap is active. Default: true when target is set */
  active?: Ref<boolean> | boolean;
  /** Focus the first element when activated. Default: true */
  initialFocus?: boolean;
}

/**
 * Composable for trapping focus within a container (e.g. modals, dialogs).
 * Tab cycles to next focusable element; Shift+Tab to previous. Prevents focus from escaping.
 *
 * @example
 * ```ts
 * const dialogRef = ref<HTMLElement | null>(null);
 * const { activate, deactivate, focusFirst } = useFocusTrap({
 *   target: dialogRef,
 *   active: isOpen,
 * });
 *
 * watch(isOpen, (open) => {
 *   if (open) activate();
 *   else deactivate();
 * });
 * ```
 *
 * @param options - Options: target, active, initialFocus
 * @returns Object with activate, deactivate, focusFirst, focusLast
 */
export function useFocusTrap(options: UseFocusTrapOptions) {
  const { target, active = true, initialFocus = true } = options;
  let isActive = false;
  let keydownHandler: ((e: KeyboardEvent) => void) | null = null;

  const getActive = () => (typeof active === "boolean" ? active : active?.value ?? true);

  const focusFirst = () => {
    const el = target.value;
    if (!el) return;
    const focusable = getFocusableElements(el);
    focusable[0]?.focus();
  };

  const focusLast = () => {
    const el = target.value;
    if (!el) return;
    const focusable = getFocusableElements(el);
    focusable[focusable.length - 1]?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== "Tab") return;

    const el = target.value;
    if (!el) return;

    const focusable = getFocusableElements(el);
    if (focusable.length === 0) return;

    const current = document.activeElement as HTMLElement | null;
    const currentIndex = current ? focusable.indexOf(current) : -1;

    if (e.shiftKey) {
      if (currentIndex <= 0) {
        e.preventDefault();
        focusable[focusable.length - 1]?.focus();
      }
    } else {
      if (currentIndex >= focusable.length - 1 || currentIndex === -1) {
        e.preventDefault();
        focusable[0]?.focus();
      }
    }
  };

  const activate = () => {
    if (!target.value || !getActive()) return;
    isActive = true;
    if (initialFocus) {
      focusFirst();
    }
    if (!keydownHandler) {
      keydownHandler = handleKeyDown;
      document.addEventListener("keydown", keydownHandler, true);
    }
  };

  const deactivate = () => {
    isActive = false;
    if (keydownHandler) {
      document.removeEventListener("keydown", keydownHandler, true);
      keydownHandler = null;
    }
  };

  watch(
    target,
    (el, oldEl) => {
      if (!el && oldEl && isActive) {
        deactivate();
      }
      if (el && getActive()) {
        activate();
      }
    },
    { immediate: true },
  );

  if (typeof active === "object" && active !== null) {
    watch(
      active,
      (nowActive) => {
        if (nowActive && target.value) {
          activate();
        } else {
          deactivate();
        }
      },
      { immediate: true },
    );
  }

  onMounted(() => {
    if (target.value && getActive()) {
      activate();
    }
  });

  onUnmounted(deactivate);

  return {
    activate,
    deactivate,
    focusFirst,
    focusLast,
  };
}
