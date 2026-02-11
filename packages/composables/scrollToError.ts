/**
 * Focusable element selectors for finding form controls.
 * Includes native inputs and Baklava custom components.
 */
const FOCUSABLE_SELECTORS =
  "input, select, textarea, button, bl-select, bl-input";

/**
 * Options for customizing scroll-to-error behavior.
 */
export interface ScrollToErrorOptions {
  /** Scroll behavior. Default: `'smooth'` */
  scrollBehavior?: ScrollBehavior;
  /** Vertical scroll position. Default: `'center'` */
  block?: ScrollLogicalPosition;
  /** CSS class to apply for highlight effect. Default: `'error-shine'` */
  shineClass?: string;
  /** Duration in ms to keep the shine class. Use `0` to disable. Default: `2500` */
  shineDuration?: number;
  /** Whether to attempt focusing the first focusable element. Default: `true` */
  focus?: boolean;
  /** Delay in ms before focus attempt. Default: `300` */
  focusDelay?: number;
}

/** Target that can be resolved to an HTMLElement: selector, element, or object with scrollTarget. */
export type ScrollToErrorTarget =
  | string
  | HTMLElement
  | { scrollTarget: string };

/**
 * Resolves the target to an HTMLElement.
 *
 * @param target - CSS selector, HTMLElement, or object with scrollTarget
 * @returns The resolved element or null if not found
 */
function resolveTarget(target: ScrollToErrorTarget): HTMLElement | null {
  if (typeof document === "undefined") return null;

  if (typeof target === "string") {
    const el = document.querySelector(target);
    return el instanceof HTMLElement ? el : null;
  }

  if (target instanceof HTMLElement) {
    return target;
  }

  if (target && typeof target === "object" && "scrollTarget" in target) {
    const selector = target.scrollTarget;
    if (!selector || typeof selector !== "string") return null;
    const el = document.querySelector(selector);
    return el instanceof HTMLElement ? el : null;
  }

  return null;
}

/**
 * Finds the first focusable element within the given element.
 * Prefers inner input/select/textarea for custom components like bl-select.
 *
 * @param element - Container element to search within
 * @returns The focusable element or null
 */
function findFocusable(element: HTMLElement): HTMLElement | null {
  const focusable = element.querySelector(FOCUSABLE_SELECTORS);
  if (!(focusable instanceof HTMLElement)) return null;

  // Prefer inner input/select/textarea for custom components
  const innerInput = focusable.querySelector("input, select, textarea");
  if (innerInput instanceof HTMLElement) {
    return innerInput;
  }
  return focusable;
}

/**
 * Composable for scrolling to an element with validation error.
 * Scrolls into view, optionally applies a highlight effect, and focuses the first focusable control.
 *
 * @example
 * ```ts
 * const { scrollToError } = useScrollToError();
 *
 * // From validation error object
 * scrollToError(validationError);
 *
 * // Direct selector
 * scrollToError('[data-field="tags"]');
 *
 * // With custom options
 * scrollToError('[data-field="tags"]', { shineClass: 'my-shine', shineDuration: 1500 });
 * ```
 */
export const useScrollToError = () => {
  /**
   * Scrolls to the target element and optionally applies highlight and focus.
   *
   * @param target - CSS selector, HTMLElement, or object with scrollTarget (e.g. validation error)
   * @param options - Optional overrides for scroll, shine, and focus behavior
   */
  const scrollToError = (
    target: ScrollToErrorTarget,
    options?: ScrollToErrorOptions,
  ): void => {
    if (typeof document === "undefined") return;

    const element = resolveTarget(target);
    if (!element) return;

    const {
      scrollBehavior = "smooth",
      block = "center",
      shineClass = "error-shine",
      shineDuration = 2500,
      focus = true,
      focusDelay = 300,
    } = options ?? {};

    element.scrollIntoView({ behavior: scrollBehavior, block });

    // Apply shine effect
    let targetElement: HTMLElement | null = null;
    const formControl =
      element.closest(".bl-form-control, [class*='bl-']") || element;
    targetElement = formControl instanceof HTMLElement ? formControl : element;

    if (targetElement && shineClass && shineDuration > 0) {
      targetElement.classList.add(shineClass);
      setTimeout(() => {
        targetElement?.classList.remove(shineClass);
      }, shineDuration);
    }

    // Focus the first focusable element
    if (focus && element instanceof HTMLElement) {
      const focusableElement = findFocusable(element);
      if (focusableElement) {
        setTimeout(() => {
          focusableElement.focus();
        }, focusDelay);
      }
    }
  };

  return {
    scrollToError,
  };
};
